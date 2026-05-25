import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { createConnection, type Socket } from 'node:net'
import { existsSync } from 'node:fs'
import { promises as fs } from 'node:fs'
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { z } from 'zod'
import type {
  ErrorResponse,
  FileEntry,
  OkResponse,
  PlayerStatus,
  PlaylistDocument,
  PlaylistSummary,
  QueueItem,
} from '@mpv/contract'

const audioExtensions = new Set(['.aac', '.flac', '.m4a', '.mp3', '.ogg', '.opus', '.wav'])
const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

interface AppConfig {
  host: string
  port: number
  musicRoot: string
  playlistsDir: string
  mpvSocketPath: string
  mpvBin: string
  maxFolderItems: number
}

const config: AppConfig = {
  host: process.env.HOST ?? '0.0.0.0',
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  musicRoot: resolve(process.env.MUSIC_ROOT ?? process.cwd()),
  playlistsDir: resolve(process.env.PLAYLISTS_DIR ?? join(process.cwd(), '.mpv-web-control', 'playlists')),
  mpvSocketPath: process.env.MPV_SOCKET_PATH ?? '/tmp/mpv-web-control.sock',
  mpvBin: process.env.MPV_BIN ?? 'mpv',
  maxFolderItems: Number.parseInt(process.env.MAX_FOLDER_ITEMS ?? '5000', 10),
}

const pathInputSchema = z.object({ path: z.string().default('.') })
const queueFileSchema = z.object({ path: z.string().min(1) })
const queueFolderSchema = z.object({ path: z.string().min(1) })
const pauseSchema = z.object({ pause: z.boolean().optional() })
const volumeSchema = z.object({ volume: z.number().min(0).max(100) })
const seekSchema = z.object({ position: z.number().min(0) })
const jumpSchema = z.object({ index: z.number().int().min(0) })
const playlistNameSchema = z.object({ name: z.string().trim().min(1).max(80) })
const playlistIdSchema = z.object({ id: z.string().trim().min(1).max(120) })
const loadPlaylistSchema = z.object({ id: z.string().trim().min(1).max(120), mode: z.enum(['replace', 'append']).default('replace') })

function errorResponse(message: string): ErrorResponse {
  return { error: message }
}

function okResponse(): OkResponse {
  return { ok: true }
}

function isPlayableAudio(name: string): boolean {
  return audioExtensions.has(extname(name).toLowerCase())
}

function toRelativeLibraryPath(absolutePath: string): string {
  return relative(config.musicRoot, absolutePath).split(sep).join('/')
}

function resolveLibraryPath(inputPath: string): string {
  if (isAbsolute(inputPath)) {
    throw new Error('Absolute paths are not allowed')
  }

  const absolutePath = resolve(config.musicRoot, inputPath)
  const relativePath = relative(config.musicRoot, absolutePath)

  if (relativePath === '') {
    return absolutePath
  }

  if (relativePath.startsWith('..') || isAbsolute(relativePath)) {
    throw new Error('Path escapes MUSIC_ROOT')
  }

  return absolutePath
}

function playlistIdFromName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || `playlist-${Date.now()}`
}

function playlistFilePath(id: string): string {
  if (id.includes('/') || id.includes('\\') || id.includes('..')) {
    throw new Error('Invalid playlist id')
  }
  return join(config.playlistsDir, `${id}.json`)
}

function makeQueueItem(absolutePath: string): QueueItem {
  return {
    id: toRelativeLibraryPath(absolutePath),
    path: toRelativeLibraryPath(absolutePath),
    name: basename(absolutePath),
  }
}

interface MpvResponse<T> {
  data?: T
  error: string
  request_id: number
}

class MpvService {
  private child: ChildProcessWithoutNullStreams | null = null
  private socket: Socket | null = null
  private buffer = ''
  private nextRequestId = 1
  private readonly pending = new Map<number, (response: MpvResponse<unknown>) => void>()
  private startPromise: Promise<void> | null = null

  isRunning(): boolean {
    return this.child !== null && this.socket !== null && !this.socket.destroyed
  }

  async ensureStarted(): Promise<void> {
    if (this.isRunning()) {
      return
    }

    if (this.startPromise !== null) {
      return this.startPromise
    }

    this.startPromise = this.doStart()
    try {
      await this.startPromise
    } catch (error) {
      this.startPromise = null
      throw error
    }
  }

  private async doStart(): Promise<void> {
    await this.unlinkSocketIfPresent()

    this.child = spawn(config.mpvBin, [
      '--no-video',
      '--idle=yes',
      '--terminal=no',
      `--input-ipc-server=${config.mpvSocketPath}`,
    ], {
      stdio: 'pipe',
    })

    this.child.once('exit', () => {
      this.socket?.destroy()
      this.socket = null
      this.child = null
      this.startPromise = null
    })

    await this.waitForSocket()
    await this.connectSocket()
  }

  async clear(): Promise<void> {
    await this.command(['playlist-clear'])
  }

  async loadFile(absolutePath: string, mode: 'replace' | 'append'): Promise<void> {
    const mpvMode = mode === 'replace' ? 'replace' : 'append-play'
    await this.command(['loadfile', absolutePath, mpvMode])
  }

  async loadFiles(paths: string[], mode: 'replace' | 'append'): Promise<void> {
    if (mode === 'replace') {
      await this.clear()
    }
    for (const path of paths) {
      await this.loadFile(path, 'append')
    }
  }

  async next(): Promise<void> {
    await this.command(['playlist-next', 'force'])
  }

  async previous(): Promise<void> {
    await this.command(['playlist-prev', 'force'])
  }

  async stop(): Promise<void> {
    await this.command(['stop'])
  }

  async remove(index: number): Promise<void> {
    await this.command(['playlist-remove', index])
  }

  async jumpTo(index: number): Promise<void> {
    await this.command(['set_property', 'playlist-pos', index])
  }

  async setPause(pause: boolean | undefined): Promise<void> {
    if (pause === undefined) {
      await this.command(['cycle', 'pause'])
      return
    }
    await this.command(['set_property', 'pause', pause])
  }

  async setVolume(volume: number): Promise<void> {
    await this.command(['set_property', 'volume', volume])
  }

  async seek(position: number): Promise<void> {
    await this.command(['seek', position, 'absolute', 'exact'])
  }

  private async safeProperty<T>(name: string): Promise<T | null> {
    try {
      return await this.property<T>(name)
    } catch {
      return null
    }
  }

  async status(): Promise<PlayerStatus> {
    await this.ensureStarted()
    const [paused, position, duration, volume, playlist, playlistPos] = await Promise.all([
      this.safeProperty<boolean>('pause'),
      this.safeProperty<number>('time-pos'),
      this.safeProperty<number>('duration'),
      this.safeProperty<number>('volume'),
      this.safeProperty<MpvPlaylistItem[]>('playlist'),
      this.safeProperty<number>('playlist-pos'),
    ])

    const queue = (playlist ?? []).map((item) => makeQueueItem(item.filename))
    const currentIndex = playlistPos === null || playlistPos < 0 ? null : playlistPos
    const current = currentIndex === null ? null : queue.at(currentIndex) ?? null

    return {
      mpvRunning: this.isRunning(),
      paused: paused ?? true,
      position: position ?? 0,
      duration: duration ?? 0,
      volume: volume ?? 100,
      currentIndex,
      current,
      queue,
      error: null,
    }
  }

  private async command<T = unknown>(command: readonly unknown[]): Promise<MpvResponse<T>> {
    await this.ensureStarted()
    const requestId = this.nextRequestId
    this.nextRequestId += 1

    const payload = `${JSON.stringify({ command, request_id: requestId })}\n`
    return new Promise<MpvResponse<T>>((resolveCommand, rejectCommand) => {
      const socket = this.socket
      if (socket === null) {
        rejectCommand(new Error('mpv socket is not connected'))
        return
      }
      const timeout = setTimeout(() => {
        this.pending.delete(requestId)
        rejectCommand(new Error('Timed out waiting for mpv response'))
      }, 5000)
      this.pending.set(requestId, (response) => {
        clearTimeout(timeout)
        if (response.error !== 'success') {
          rejectCommand(new Error(`mpv command failed: ${response.error}`))
          return
        }
        resolveCommand(response as MpvResponse<T>)
      })
      socket.write(payload)
    })
  }

  private async property<T>(name: string): Promise<T> {
    const response = await this.command<T>(['get_property', name])
    return response.data as T
  }

  private handleSocketData(data: Buffer): void {
    this.buffer += data.toString('utf8')
    let newlineIndex = this.buffer.indexOf('\n')

    while (newlineIndex >= 0) {
      const rawMessage = this.buffer.slice(0, newlineIndex).trim()
      this.buffer = this.buffer.slice(newlineIndex + 1)
      newlineIndex = this.buffer.indexOf('\n')

      if (rawMessage.length === 0) {
        continue
      }

      let parsed: ReturnType<typeof mpvResponseSchema.safeParse>
      try {
        parsed = mpvResponseSchema.safeParse(JSON.parse(rawMessage))
      } catch (error) {
        console.error('Failed to parse mpv message:', rawMessage, error)
        continue
      }

      if (!parsed.success) {
        continue
      }

      const resolver = this.pending.get(parsed.data.request_id)
      if (resolver !== undefined) {
        this.pending.delete(parsed.data.request_id)
        resolver(parsed.data)
      }
    }
  }

  private async unlinkSocketIfPresent(): Promise<void> {
    try {
      await fs.unlink(config.mpvSocketPath)
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        return
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Unable to remove stale mpv socket')
    }
  }

  private async waitForSocket(): Promise<void> {
    const deadline = Date.now() + 5000
    while (Date.now() < deadline) {
      if (existsSync(config.mpvSocketPath)) {
        return
      }
      await new Promise((resolveTimer) => setTimeout(resolveTimer, 100))
    }
    throw new Error(`mpv IPC socket was not created at ${config.mpvSocketPath}`)
  }

  private async connectSocket(): Promise<void> {
    await new Promise<void>((resolveConnect, rejectConnect) => {
      const socket = createConnection(config.mpvSocketPath)
      let connected = false
      socket.once('connect', () => {
        connected = true
        this.socket = socket
        socket.on('data', (data) => this.handleSocketData(data))
        socket.once('close', () => {
          this.socket = null
        })
        resolveConnect()
      })
      socket.on('error', (error) => {
        if (!connected) {
          rejectConnect(error)
        } else {
          console.error('Socket error:', error)
        }
      })
    })
  }
}

interface MpvPlaylistItem {
  filename: string
}

const mpvResponseSchema = z.object({
  data: z.unknown().optional(),
  error: z.string(),
  request_id: z.number().int(),
})

const playlistDocumentSchema: z.ZodType<PlaylistDocument> = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  items: z.array(z.object({ path: z.string() })),
})

const mpv = new MpvService()

async function collectAudioFiles(directory: string, accumulator: string[] = []): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const sorted = entries.sort((left, right) => left.name.localeCompare(right.name))

  for (const entry of sorted) {
    if (accumulator.length >= config.maxFolderItems) {
      throw new Error(`Folder contains more than ${config.maxFolderItems} playable files`)
    }

    const absolutePath = join(directory, entry.name)
    if (entry.isDirectory()) {
      await collectAudioFiles(absolutePath, accumulator)
    } else if (entry.isFile() && isPlayableAudio(entry.name)) {
      accumulator.push(absolutePath)
    }
  }

  return accumulator
}

async function readPlaylist(id: string): Promise<PlaylistDocument> {
  const text = await fs.readFile(playlistFilePath(id), 'utf8')
  return playlistDocumentSchema.parse(JSON.parse(text))
}

async function writePlaylist(document: PlaylistDocument): Promise<void> {
  await fs.mkdir(config.playlistsDir, { recursive: true })
  await fs.writeFile(playlistFilePath(document.id), `${JSON.stringify(document, null, 2)}\n`, 'utf8')
}

async function playlistSummaries(): Promise<PlaylistSummary[]> {
  await fs.mkdir(config.playlistsDir, { recursive: true })
  const entries = await fs.readdir(config.playlistsDir, { withFileTypes: true })
  const summaries: PlaylistSummary[] = []

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      continue
    }
    const id = entry.name.slice(0, -5)
    const document = await readPlaylist(id)
    summaries.push({
      id: document.id,
      name: document.name,
      itemCount: document.items.length,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    })
  }

  return summaries.sort((left, right) => left.name.localeCompare(right.name))
}

const app = new Hono()

app.onError((error, c) => {
  const fsErrorCodes = new Set(['ENOENT', 'EACCES', 'EISDIR', 'ENOTDIR', 'EMFILE', 'ENFILE', 'ENAMETOOLONG', 'ENOSPC', 'ELOOP', 'ENOTEMPTY', 'EEXIST', 'EPERM'])
  let message: string
  if (error instanceof Error && 'code' in error && fsErrorCodes.has((error as NodeJS.ErrnoException).code ?? '')) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') {
      message = 'File not found'
    } else if (code === 'EACCES') {
      message = 'Permission denied'
    } else {
      message = 'Filesystem error'
    }
  } else {
    message = error instanceof Error ? error.message : 'Unknown server error'
  }
  return c.json(errorResponse(message), 500)
})

app.get('/api/library', zValidator('query', pathInputSchema), async (c) => {
  const { path } = c.req.valid('query')
  const absolutePath = resolveLibraryPath(path)
  const stats = await fs.stat(absolutePath)
  if (!stats.isDirectory()) {
    return c.json(errorResponse('Path is not a directory'), 400)
  }

  const entries = await fs.readdir(absolutePath, { withFileTypes: true })
  const response: FileEntry[] = entries
    .filter((entry) => entry.isDirectory() || isPlayableAudio(entry.name))
    .sort((left, right) => {
      if (left.isDirectory() && !right.isDirectory()) return -1
      if (!left.isDirectory() && right.isDirectory()) return 1
      return left.name.localeCompare(right.name)
    })
    .map((entry) => ({
      name: entry.name,
      path: toRelativeLibraryPath(join(absolutePath, entry.name)),
      isDirectory: entry.isDirectory(),
      playable: !entry.isDirectory() && isPlayableAudio(entry.name),
    }))

  return c.json(response, 200)
})

app.get('/api/status', async (c) => {
  const status = await mpv.status()
  return c.json(status, 200)
})

app.post('/api/queue/file', zValidator('json', queueFileSchema), async (c) => {
  const { path } = c.req.valid('json')
  const absolutePath = resolveLibraryPath(path)
  const stats = await fs.stat(absolutePath)
  if (!stats.isFile() || !isPlayableAudio(absolutePath)) {
    return c.json(errorResponse('Path is not a playable audio file'), 400)
  }
  await mpv.loadFile(absolutePath, 'append')
  return c.json(okResponse(), 200)
})

app.post('/api/queue/folder', zValidator('json', queueFolderSchema), async (c) => {
  const { path } = c.req.valid('json')
  const absolutePath = resolveLibraryPath(path)
  const stats = await fs.stat(absolutePath)
  if (!stats.isDirectory()) {
    return c.json(errorResponse('Path is not a directory'), 400)
  }
  const files = await collectAudioFiles(absolutePath)
  await mpv.loadFiles(files, 'append')
  return c.json(okResponse(), 200)
})

app.post('/api/queue/clear', async (c) => {
  await mpv.clear()
  return c.json(okResponse(), 200)
})

app.delete('/api/queue/:index', zValidator('param', z.object({ index: z.coerce.number().int().min(0) })), async (c) => {
  const { index } = c.req.valid('param')
  await mpv.remove(index)
  return c.json(okResponse(), 200)
})

app.post('/api/player/playpause', zValidator('json', pauseSchema), async (c) => {
  const { pause } = c.req.valid('json')
  await mpv.setPause(pause)
  return c.json(await mpv.status(), 200)
})

app.post('/api/player/next', async (c) => {
  await mpv.next()
  return c.json(okResponse(), 200)
})

app.post('/api/player/previous', async (c) => {
  await mpv.previous()
  return c.json(okResponse(), 200)
})

app.post('/api/player/stop', async (c) => {
  await mpv.stop()
  return c.json(okResponse(), 200)
})

app.post('/api/player/volume', zValidator('json', volumeSchema), async (c) => {
  const { volume } = c.req.valid('json')
  await mpv.setVolume(volume)
  return c.json(await mpv.status(), 200)
})

app.post('/api/player/seek', zValidator('json', seekSchema), async (c) => {
  const { position } = c.req.valid('json')
  await mpv.seek(position)
  return c.json(await mpv.status(), 200)
})

app.post('/api/player/jump', zValidator('json', jumpSchema), async (c) => {
  const { index } = c.req.valid('json')
  await mpv.jumpTo(index)
  return c.json(okResponse(), 200)
})

app.get('/api/playlists', async (c) => {
  return c.json(await playlistSummaries(), 200)
})

app.post('/api/playlists', zValidator('json', playlistNameSchema), async (c) => {
  const { name } = c.req.valid('json')
  const status = await mpv.status()
  const now = new Date().toISOString()
  const id = playlistIdFromName(name)
  const existing = await readPlaylist(id).catch(() => null)
  const document: PlaylistDocument = {
    id,
    name,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    items: status.queue.map((item) => ({ path: item.path })),
  }
  await writePlaylist(document)
  return c.json(document, 200)
})

app.post('/api/playlists/load', zValidator('json', loadPlaylistSchema), async (c) => {
  const { id, mode } = c.req.valid('json')
  const playlist = await readPlaylist(id)
  const paths = playlist.items.map((item) => resolveLibraryPath(item.path))
  await mpv.loadFiles(paths, mode)
  return c.json(okResponse(), 200)
})

app.delete('/api/playlists/:id', zValidator('param', playlistIdSchema), async (c) => {
  const { id } = c.req.valid('param')
  await fs.unlink(playlistFilePath(id))
  return c.json(okResponse(), 200)
})

const clientDist = resolve(appRoot, 'apps/client/dist')
app.use('/*', serveStatic({ root: clientDist }))
app.get('*', serveStatic({ path: join(clientDist, 'index.html') }))

export type AppType = typeof app
export { app }

if (process.env.NODE_ENV !== 'test') {
  serve({ fetch: app.fetch, port: config.port, hostname: config.host })
  console.log(`mpv-web-control listening on http://${config.host}:${config.port}`)
  console.log(`MUSIC_ROOT=${config.musicRoot}`)
}
