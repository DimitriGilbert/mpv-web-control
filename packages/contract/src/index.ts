export interface FileEntry {
  name: string
  path: string
  isDirectory: boolean
  playable: boolean
}

export interface QueueItem {
  id: string
  path: string
  name: string
}

export interface PlayerStatus {
  mpvRunning: boolean
  paused: boolean
  position: number
  duration: number
  volume: number
  currentIndex: number | null
  current: QueueItem | null
  queue: QueueItem[]
  error: string | null
}

export interface PlaylistSummary {
  id: string
  name: string
  itemCount: number
  createdAt: string
  updatedAt: string
}

export interface PlaylistDocument {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  items: Array<{ path: string }>
}

export interface OkResponse {
  ok: true
}

export interface ErrorResponse {
  error: string
}
