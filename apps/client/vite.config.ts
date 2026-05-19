import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const mockStatus = {
  mpvRunning: true,
  paused: false,
  position: 0,
  duration: 0,
  volume: 75,
  currentIndex: null as number | null,
  current: null as { id: string; path: string; name: string } | null,
  queue: [] as Array<{ id: string; path: string; name: string }>,
  error: null as string | null,
}

const state = { ...mockStatus }

let playlistCounter = 2
const playlists: Array<{
  id: string
  name: string
  itemCount: number
  createdAt: string
  updatedAt: string
}> = [
  {
    id: 'pl-1',
    name: 'Chill Vibes',
    itemCount: 3,
    createdAt: '2025-05-10T10:00:00Z',
    updatedAt: '2025-05-10T10:00:00Z',
  },
  {
    id: 'pl-2',
    name: 'Workout Mix',
    itemCount: 5,
    createdAt: '2025-05-12T14:30:00Z',
    updatedAt: '2025-05-13T09:00:00Z',
  },
]

const mockLibrary: Record<
  string,
  Array<{ name: string; path: string; isDirectory: boolean; playable: boolean }>
> = {
  '.': [
    { name: 'Music', path: 'Music', isDirectory: true, playable: false },
    { name: 'Podcasts', path: 'Podcasts', isDirectory: true, playable: false },
    { name: 'Ambient.mp3', path: 'Ambient.mp3', isDirectory: false, playable: true },
    { name: 'Intro.flac', path: 'Intro.flac', isDirectory: false, playable: true },
  ],
  Music: [
    { name: 'Rock', path: 'Music/Rock', isDirectory: true, playable: false },
    { name: 'Jazz', path: 'Music/Jazz', isDirectory: true, playable: false },
    { name: 'Electronic', path: 'Music/Electronic', isDirectory: true, playable: false },
    { name: 'Synthwave Mix.mp3', path: 'Music/Synthwave Mix.mp3', isDirectory: false, playable: true },
    { name: 'Lo-Fi Beats.ogg', path: 'Music/Lo-Fi Beats.ogg', isDirectory: false, playable: true },
  ],
  'Music/Rock': [
    { name: 'ACDC - Thunderstruck.mp3', path: 'Music/Rock/ACDC - Thunderstruck.mp3', isDirectory: false, playable: true },
    { name: 'Led Zeppelin - Stairway to Heaven.flac', path: 'Music/Rock/Led Zeppelin - Stairway to Heaven.flac', isDirectory: false, playable: true },
    { name: 'Queen - Bohemian Rhapsody.mp3', path: 'Music/Rock/Queen - Bohemian Rhapsody.mp3', isDirectory: false, playable: true },
  ],
  'Music/Jazz': [
    { name: 'Miles Davis - So What.mp3', path: 'Music/Jazz/Miles Davis - So What.mp3', isDirectory: false, playable: true },
    { name: 'Coltrane - A Love Supreme.flac', path: 'Music/Jazz/Coltrane - A Love Supreme.flac', isDirectory: false, playable: true },
  ],
  'Music/Electronic': [
    { name: 'Daft Punk - Around the World.mp3', path: 'Music/Electronic/Daft Punk - Around the World.mp3', isDirectory: false, playable: true },
    { name: 'Chemical Brothers - Block Rockin Beats.flac', path: 'Music/Electronic/Chemical Brothers - Block Rockin Beats.flac', isDirectory: false, playable: true },
  ],
  Podcasts: [
    { name: 'Tech Talk', path: 'Podcasts/Tech Talk', isDirectory: true, playable: false },
    { name: 'Episode 42 - The Future.mp3', path: 'Podcasts/Episode 42 - The Future.mp3', isDirectory: false, playable: true },
  ],
  'Podcasts/Tech Talk': [
    { name: 'EP01 - Intro.mp3', path: 'Podcasts/Tech Talk/EP01 - Intro.mp3', isDirectory: false, playable: true },
    { name: 'EP02 - Deep Dive.flac', path: 'Podcasts/Tech Talk/EP02 - Deep Dive.flac', isDirectory: false, playable: true },
    { name: 'EP03 - Q&A.mp3', path: 'Podcasts/Tech Talk/EP03 - Q&A.mp3', isDirectory: false, playable: true },
  ],
}

function addToQueue(filePath: string) {
  const name = filePath.split('/').pop() ?? filePath
  state.queue.push({ id: `q-${Date.now()}-${Math.random()}`, path: filePath, name })
  if (!state.current) {
    state.currentIndex = 0
    state.current = state.queue[0]
    state.position = 0
    state.duration = 180 + Math.floor(Math.random() * 120)
    state.paused = false
  }
}

function addFolderToQueue(folderPath: string) {
  const entries = mockLibrary[folderPath]
  if (entries) {
    for (const e of entries) {
      if (e.playable) addToQueue(e.path)
    }
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function mockHandler(url: URL, method: string, body: Record<string, unknown>): Response {
  if (url.pathname === '/api/status' && method === 'GET') {
    return json(state)
  }

  if (url.pathname === '/api/library' && method === 'GET') {
    const dirPath = url.searchParams.get('path') ?? '.'
    const entries = mockLibrary[dirPath] ?? []
    return json(entries)
  }

  if (url.pathname === '/api/queue/file' && method === 'POST') {
    addToQueue(body.path as string)
    return json({ ok: true })
  }

  if (url.pathname === '/api/queue/folder' && method === 'POST') {
    addFolderToQueue(body.path as string)
    return json({ ok: true })
  }

  if (url.pathname === '/api/queue/clear' && method === 'POST') {
    state.queue = []
    state.current = null
    state.currentIndex = null
    state.position = 0
    state.duration = 0
    state.paused = true
    return json({ ok: true })
  }

  if (url.pathname === '/api/player/playpause' && method === 'POST') {
    state.paused = !state.paused
    return json(state)
  }

  if (url.pathname === '/api/player/next' && method === 'POST') {
    if (state.currentIndex !== null && state.currentIndex < state.queue.length - 1) {
      state.currentIndex += 1
      state.current = state.queue[state.currentIndex]
      state.position = 0
      state.duration = 180 + Math.floor(Math.random() * 120)
    }
    return json({ ok: true })
  }

  if (url.pathname === '/api/player/previous' && method === 'POST') {
    if (state.currentIndex !== null && state.currentIndex > 0) {
      state.currentIndex -= 1
      state.current = state.queue[state.currentIndex]
      state.position = 0
      state.duration = 180 + Math.floor(Math.random() * 120)
    }
    return json({ ok: true })
  }

  if (url.pathname === '/api/player/stop' && method === 'POST') {
    state.queue = []
    state.current = null
    state.currentIndex = null
    state.position = 0
    state.duration = 0
    state.paused = true
    return json({ ok: true })
  }

  if (url.pathname === '/api/player/volume' && method === 'POST') {
    state.volume = Math.max(0, Math.min(100, body.volume as number))
    return json(state)
  }

  if (url.pathname === '/api/player/seek' && method === 'POST') {
    state.position = body.position as number
    return json(state)
  }

  if (url.pathname === '/api/player/jump' && method === 'POST') {
    const index = body.index as number
    if (index >= 0 && index < state.queue.length) {
      state.currentIndex = index
      state.current = state.queue[index]
      state.position = 0
      state.duration = 180 + Math.floor(Math.random() * 120)
    }
    return json({ ok: true })
  }

  if (url.pathname === '/api/playlists' && method === 'GET') {
    return json(playlists)
  }

  if (url.pathname === '/api/playlists' && method === 'POST') {
    const name = body.name as string
    const id = `pl-${++playlistCounter}`
    playlists.push({
      id,
      name,
      itemCount: state.queue.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return json({
      id,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: state.queue.map((q) => ({ path: q.path })),
    })
  }

  if (url.pathname === '/api/playlists/load' && method === 'POST') {
    return json({ ok: true })
  }

  const deleteMatch = url.pathname.match(/^\/api\/playlists\/(.+)$/)
  if (deleteMatch && method === 'DELETE') {
    const id = deleteMatch[1]
    const idx = playlists.findIndex((p) => p.id === id)
    if (idx !== -1) playlists.splice(idx, 1)
    return json({ ok: true })
  }

  return json({ error: 'Not found' }, 404)
}

function mockApiPlugin(): Plugin {
  let positionInterval: ReturnType<typeof setInterval> | null = null

  function startPlayback() {
    if (positionInterval) clearInterval(positionInterval)
    positionInterval = setInterval(() => {
      if (!state.paused && state.current) {
        state.position += 0.25
        if (state.position >= state.duration) {
          const nextIdx =
            state.currentIndex !== null && state.currentIndex < state.queue.length - 1
              ? state.currentIndex + 1
              : null
          if (nextIdx !== null) {
            state.currentIndex = nextIdx
            state.current = state.queue[nextIdx]
            state.position = 0
            state.duration = 180 + Math.floor(Math.random() * 120)
          } else {
            state.paused = true
            state.position = state.duration
          }
        }
      }
    }, 250)
  }

  return {
    name: 'mock-api',
    configureServer(server) {
      startPlayback()
      server.middlewares.use('/api', async (req, res, next) => {
        try {
          const url = new URL('/api' + (req.url ?? '/'), `http://localhost:${server.config.server.port}`)
          const method = req.method ?? 'GET'
          let body: Record<string, unknown> = {}
          if (method !== 'GET' && method !== 'HEAD') {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk)
            const raw = Buffer.concat(chunks).toString('utf-8')
            if (raw) body = JSON.parse(raw)
          }
          const response = mockHandler(url, method, body)
          res.statusCode = response.status
          response.headers.forEach((v, k) => res.setHeader(k, v))
          res.end(await response.text())
        } catch (err) {
          next(err)
        }
      })
    },
  }
}

const USE_MOCK = !process.env.VITE_API_URL

export default defineConfig({
  plugins: [react(), tailwindcss(), ...(USE_MOCK ? [mockApiPlugin()] : [])],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: '[name].js',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: false,
    ...(!USE_MOCK && {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    }),
  },
})
