import type {
  FileEntry,
  OkResponse,
  PlayerStatus,
  PlaylistDocument,
  PlaylistSummary,
} from '@mpv/contract'

class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

async function parseError(response: Response): Promise<string> {
  const text = await response.text()
  if (text.length === 0) {
    return response.statusText
  }

  try {
    const parsed = JSON.parse(text) as { error?: unknown }
    return typeof parsed.error === 'string' ? parsed.error : text
  } catch {
    return text
  }
}

async function requestJson<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
  })

  if (!response.ok) {
    throw new ApiError(await parseError(response), response.status)
  }

  return response.json() as Promise<TResponse>
}

export const api = {
  listLibrary(path: string): Promise<FileEntry[]> {
    const params = new URLSearchParams({ path })
    return requestJson<FileEntry[]>(`/api/library?${params.toString()}`)
  },
  status(): Promise<PlayerStatus> {
    return requestJson<PlayerStatus>('/api/status')
  },
  queueFile(path: string): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/queue/file', {
      method: 'POST',
      body: JSON.stringify({ path }),
    })
  },
  queueFolder(path: string): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/queue/folder', {
      method: 'POST',
      body: JSON.stringify({ path }),
    })
  },
  clearQueue(): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/queue/clear', { method: 'POST' })
  },
  playPause(pause?: boolean): Promise<PlayerStatus> {
    return requestJson<PlayerStatus>('/api/player/playpause', {
      method: 'POST',
      body: JSON.stringify({ pause }),
    })
  },
  next(): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/player/next', { method: 'POST' })
  },
  previous(): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/player/previous', { method: 'POST' })
  },
  stop(): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/player/stop', { method: 'POST' })
  },
  setVolume(volume: number): Promise<PlayerStatus> {
    return requestJson<PlayerStatus>('/api/player/volume', {
      method: 'POST',
      body: JSON.stringify({ volume }),
    })
  },
  seek(position: number): Promise<PlayerStatus> {
    return requestJson<PlayerStatus>('/api/player/seek', {
      method: 'POST',
      body: JSON.stringify({ position }),
    })
  },
  playlists(): Promise<PlaylistSummary[]> {
    return requestJson<PlaylistSummary[]>('/api/playlists')
  },
  savePlaylist(name: string): Promise<PlaylistDocument> {
    return requestJson<PlaylistDocument>('/api/playlists', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  },
  loadPlaylist(id: string, mode: 'replace' | 'append'): Promise<OkResponse> {
    return requestJson<OkResponse>('/api/playlists/load', {
      method: 'POST',
      body: JSON.stringify({ id, mode }),
    })
  },
  deletePlaylist(id: string): Promise<OkResponse> {
    return requestJson<OkResponse>(`/api/playlists/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
  },
}
