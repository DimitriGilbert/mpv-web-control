import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FileEntry } from '@mpv/contract'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Square,
  Volume2,
  VolumeX,
  Music,
  Save,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
  FileAudio,
  Folder,
  Home,
  Search,
  ListMusic,
  Loader2,
  X,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { api } from '../api'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Slider } from '#/components/ui/slider'
import { Badge } from '#/components/ui/badge'
import { ScrollArea } from '#/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Input } from '#/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface TreeNodeProps {
  entry: FileEntry
  depth: number
  onNavigate: (path: string) => void
}

function TreeNode({ entry, depth, onNavigate }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(false)
  const queryClient = useQueryClient()

  const { data: children = [], isLoading } = useQuery({
    queryKey: ['library', entry.path],
    queryFn: () => api.listLibrary(entry.path),
    enabled: expanded && entry.isDirectory,
  })

  const queueFile = useMutation({
    mutationFn: api.queueFile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const queueFolder = useMutation({
    mutationFn: api.queueFolder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const clearQueue = useMutation({
    mutationFn: api.clearQueue,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const isMutating = queueFile.isPending || queueFolder.isPending || clearQueue.isPending

  const playFile = (filePath: string) => {
    clearQueue.mutate(undefined, {
      onSuccess: () => queueFile.mutate(filePath),
    })
  }

  const playFolder = (folderPath: string) => {
    clearQueue.mutate(undefined, {
      onSuccess: () => queueFolder.mutate(folderPath),
    })
  }

  return (
    <>
      <div
        className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent/50 transition-colors border-b last:border-b-0"
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {entry.isDirectory ? (
          <button
            type="button"
            className="shrink-0 p-0.5 rounded hover:bg-accent"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}

        <button
          type="button"
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
          onClick={() => {
            if (entry.isDirectory) {
              onNavigate(entry.path)
            } else {
              queueFile.mutate(entry.path)
            }
          }}
        >
          {entry.isDirectory ? (
            <Folder className="h-3.5 w-3.5 shrink-0 text-amber-500" />
          ) : (
            <FileAudio className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}
          <span className={`truncate text-sm ${entry.isDirectory ? 'font-medium' : ''}`}>
            {entry.name}
          </span>
        </button>

        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={isMutating}
            onClick={() =>
              entry.isDirectory ? playFolder(entry.path) : playFile(entry.path)
            }
            title="Play (replace queue)"
          >
            <Play className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={isMutating}
            onClick={() =>
              entry.isDirectory
                ? queueFolder.mutate(entry.path)
                : queueFile.mutate(entry.path)
            }
            title="Add to queue"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {expanded && entry.isDirectory && (
        isLoading ? (
          <div
            className="py-2 text-muted-foreground"
            style={{ paddingLeft: `${(depth + 1) * 20 + 12}px` }}
          >
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          </div>
        ) : (
          children.map((child) => (
            <TreeNode key={child.path} entry={child} depth={depth + 1} onNavigate={onNavigate} />
          ))
        )
      )}
    </>
  )
}

function BrowseTab() {
  const [path, setPath] = useState('.')
  const [search, setSearch] = useState('')

  const { data: entries = [], isLoading, error } = useQuery({
    queryKey: ['library', path],
    queryFn: () => api.listLibrary(path),
  })

  const filtered = useMemo(() => {
    if (search.trim() === '') return entries
    const q = search.toLowerCase()
    return entries.filter((e) => e.name.toLowerCase().includes(q))
  }, [entries, search])

  const breadcrumbs = useMemo(() => {
    if (path === '.') return []
    return path.split('/').filter(Boolean)
  }, [path])

  const navigateToBreadcrumb = (index: number) => {
    const segments = path.split('/').filter(Boolean)
    const newPath = index === -1 ? '.' : segments.slice(0, index + 1).join('/')
    setPath(newPath)
    setSearch('')
  }

  const navigateInto = (dirPath: string) => {
    setPath(dirPath)
    setSearch('')
  }

  return (
    <div className="flex flex-col h-full gap-2">
      <nav className="flex items-center gap-1 text-xs flex-wrap shrink-0" aria-label="Library path">
        <Button
          variant={path === '.' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-6 gap-1 px-1.5 text-xs"
          onClick={() => navigateToBreadcrumb(-1)}
        >
          <Home className="h-3 w-3" />
          Root
        </Button>
        {breadcrumbs.map((segment, index) => (
          <div key={`${segment}-${index}`} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <Button
              variant={index === breadcrumbs.length - 1 ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 px-1.5 text-xs"
              onClick={() => navigateToBreadcrumb(index)}
            >
              {segment}
            </Button>
          </div>
        ))}
      </nav>

      <div className="relative shrink-0">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Filter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 h-7 text-xs"
        />
      </div>

      {error instanceof Error && (
        <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive shrink-0">
          {error.message}
        </div>
      )}

      <Card className="flex-1 min-h-0">
        <CardContent className="p-0 h-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
              <Folder className="h-8 w-8" />
              <p className="text-xs">
                {entries.length === 0
                  ? 'No files here.'
                  : 'No results.'}
              </p>
            </div>
          ) : (
            <ScrollArea className="h-full">
              {filtered.map((entry) => (
                <TreeNode key={entry.path} entry={entry} depth={0} onNavigate={navigateInto} />
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function PlayerPage() {
  const queryClient = useQueryClient()
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const [localVolume, setLocalVolume] = useState<number | null>(null)
  const [localSeek, setLocalSeek] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: api.status,
    refetchInterval: 1000,
  })

  const { data: playlists = [], isLoading: playlistsLoading, error: playlistsError } = useQuery({
    queryKey: ['playlists'],
    queryFn: api.playlists,
  })

  const updateStatus = (status: Awaited<ReturnType<typeof api.status>>) => {
    queryClient.setQueryData(['status'], status)
  }

  const playPause = useMutation({ mutationFn: api.playPause, onSuccess: updateStatus })
  const volumeMut = useMutation({ mutationFn: api.setVolume, onSuccess: updateStatus })
  const seekMut = useMutation({ mutationFn: api.seek, onSuccess: updateStatus })
  const next = useMutation({
    mutationFn: api.next,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const previous = useMutation({
    mutationFn: api.previous,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const stop = useMutation({
    mutationFn: api.stop,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const jumpTo = useMutation({
    mutationFn: api.jumpTo,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const clear = useMutation({
    mutationFn: api.clearQueue,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const removeFromQueue = useMutation({
    mutationFn: api.removeFromQueue,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const savePlaylist = useMutation({
    mutationFn: api.savePlaylist,
    onSuccess: () => {
      setSaveDialogOpen(false)
      setPlaylistName('')
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
  })
  const loadPlaylist = useMutation({
    mutationFn: (id: string) => api.loadPlaylist(id, 'replace'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const appendPlaylist = useMutation({
    mutationFn: (id: string) => api.loadPlaylist(id, 'append'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const removePlaylist = useMutation({
    mutationFn: api.deletePlaylist,
    onSuccess: () => {
      setDeleteTarget(null)
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
  })

  if (statusQuery.error instanceof Error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Music className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h2 className="text-xl font-semibold">No Player Connected</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Start mpv or check your connection.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const status = statusQuery.data
  if (status === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  const mutationError =
    playPause.error ??
    volumeMut.error ??
    seekMut.error ??
    next.error ??
    previous.error ??
    stop.error ??
    clear.error
  const maxDuration = Math.max(0, status.duration)
  const position = Math.min(Math.max(0, status.position), maxDuration)
  const displayVolume = localVolume ?? status.volume
  const displayPosition = localSeek ?? position

  const handleSeekChange = (values: number[]) => {
    setLocalSeek(values[0])
  }
  const handleSeekCommit = (values: number[]) => {
    seekMut.mutate(values[0])
    setLocalSeek(null)
  }
  const handleVolumeChange = (values: number[]) => {
    setLocalVolume(values[0])
  }
  const handleVolumeCommit = (values: number[]) => {
    volumeMut.mutate(values[0])
    setLocalVolume(null)
  }

  const onSavePlaylist = () => {
    const trimmed = playlistName.trim()
    if (trimmed.length > 0) {
      savePlaylist.mutate(trimmed)
    }
  }

  return (
    <div className="flex flex-col h-full gap-2">
      {mutationError instanceof Error && (
        <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive shrink-0">
          {mutationError.message}
        </div>
      )}

      <Card className="shrink-0">
        <CardContent className="px-4 py-1">
          {status.mpvRunning && status.current ? (
            <div className="mb-0.5">
              <h2 className="text-lg font-semibold truncate">{status.current.name}</h2>
              <p className="text-sm text-muted-foreground truncate">{status.current.path}</p>
            </div>
          ) : status.mpvRunning ? (
            <div className="mb-0.5">
              <h2 className="text-lg font-semibold text-muted-foreground">Nothing Playing</h2>
              <p className="text-sm text-muted-foreground">
                <Link
                  to="/browse"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Browse your library
                </Link>{' '}
                to start playing.
              </p>
            </div>
          ) : (
            <div className="mb-0.5">
              <h2 className="text-lg font-semibold text-muted-foreground">Player Idle</h2>
              <p className="text-sm text-muted-foreground">mpv is running but idle.</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11"
                onClick={() => previous.mutate()}
                disabled={previous.isPending}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11"
                onClick={() => stop.mutate()}
                disabled={stop.isPending}
              >
                <Square className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => playPause.mutate(undefined)}
                disabled={playPause.isPending}
              >
                {status.paused ? (
                  <Play className="h-6 w-6 ml-0.5" />
                ) : (
                  <Pause className="h-6 w-6" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11"
                onClick={() => next.mutate()}
                disabled={next.isPending}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 flex-[2] min-w-0">
              <span className="text-sm text-muted-foreground tabular-nums w-12 text-right shrink-0">
                {formatTime(displayPosition)}
              </span>
              <Slider
                min={0}
                max={maxDuration || 1}
                step={0.25}
                value={[displayPosition]}
                onValueChange={handleSeekChange}
                onValueCommit={handleSeekCommit}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground tabular-nums w-12 shrink-0">
                {formatTime(maxDuration)}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-[1] min-w-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={() => volumeMut.mutate(displayVolume > 0 ? 0 : 50)}
              >
                {displayVolume > 0 ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[displayVolume]}
                onValueChange={handleVolumeChange}
                onValueCommit={handleVolumeCommit}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-10 text-right tabular-nums shrink-0">
                {Math.round(displayVolume)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="queue" className="flex-1 min-h-0 flex flex-col">
        <TabsList className="shrink-0 w-full">
          <TabsTrigger value="queue" className="flex-1 gap-1.5">
            <ListMusic className="h-3.5 w-3.5" />
            Queue
            <Badge variant="secondary" className="h-4 px-1 text-[10px]">
              {status.queue.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="browse" className="flex-1 gap-1.5">
            <Folder className="h-3.5 w-3.5" />
            Browse
          </TabsTrigger>
          <TabsTrigger value="playlists" className="flex-1 gap-1.5">
            <ListMusic className="h-3.5 w-3.5" />
            Playlists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queue" className="flex-1 min-h-0 mt-2">
          <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between px-3 py-1.5 border-b shrink-0">
              <span className="text-xs text-muted-foreground">
                {status.queue.length} track{status.queue.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 gap-1 text-xs px-2"
                  disabled={status.queue.length === 0}
                  onClick={() => setSaveDialogOpen(true)}
                >
                  <Save className="h-3 w-3" />
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 text-xs px-2 text-destructive hover:text-destructive"
                  disabled={status.queue.length === 0 || clear.isPending}
                  onClick={() => clear.mutate()}
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </Button>
              </div>
            </div>
            <CardContent className="flex-1 min-h-0 p-0">
              {status.queue.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                  <ListMusic className="h-8 w-8" />
                  <p className="text-xs">
                    Queue is empty.{' '}
                    <Link
                      to="/browse"
                      className="underline underline-offset-2 hover:text-foreground transition-colors"
                    >
                      Browse
                    </Link>{' '}
                    to add tracks.
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div>
                    {status.queue.map((item, index) => (
                      <div
                        key={`${item.path}-${index}`}
                        className={`flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors border-b last:border-b-0 ${
                          index === status.currentIndex
                            ? 'bg-accent/50 font-medium'
                            : 'hover:bg-accent/30'
                        }`}
                      >
                        <button
                          type="button"
                          className="flex items-center gap-2 flex-1 min-w-0 text-left"
                          disabled={jumpTo.isPending}
                          onClick={() => {
                            if (index !== status.currentIndex) {
                              jumpTo.mutate(index)
                            }
                          }}
                        >
                          <span className="w-5 text-right text-muted-foreground tabular-nums shrink-0">
                            {index + 1}
                          </span>
                          {index === status.currentIndex && (
                            <Play className="h-3 w-3 shrink-0" />
                          )}
                          <span className="truncate">{item.name}</span>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 hover:opacity-100 [&:hover]:opacity-100 focus:opacity-100 text-muted-foreground hover:text-destructive"
                          style={{ opacity: undefined }}
                          disabled={removeFromQueue.isPending}
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromQueue.mutate(index)
                          }}
                          title="Remove from queue"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="flex-1 min-h-0 mt-2">
          <BrowseTab />
        </TabsContent>

        <TabsContent value="playlists" className="flex-1 min-h-0 mt-2">
          <Card className="h-full flex flex-col">
            <CardContent className="flex-1 min-h-0 p-0">
              {playlistsError instanceof Error && (
                <div className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive m-2 shrink-0">
                  {playlistsError.message}
                </div>
              )}
              {playlistsLoading ? (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </div>
              ) : playlists.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                  <ListMusic className="h-8 w-8" />
                  <p className="text-xs">No playlists yet. Save your queue to create one.</p>
                </div>
              ) : (
                <ScrollArea className="h-full">
                  {playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-accent/50 transition-colors border-b last:border-b-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold truncate">{playlist.name}</span>
                          <Badge variant="secondary" className="shrink-0 h-4 px-1 text-[10px]">
                            {playlist.itemCount}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          {formatDate(playlist.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-0.5 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          disabled={loadPlaylist.isPending || appendPlaylist.isPending}
                          onClick={() => loadPlaylist.mutate(playlist.id)}
                          title="Load (replace queue)"
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          disabled={loadPlaylist.isPending || appendPlaylist.isPending}
                          onClick={() => appendPlaylist.mutate(playlist.id)}
                          title="Append to queue"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          disabled={removePlaylist.isPending}
                          onClick={() => setDeleteTarget({ id: playlist.id, name: playlist.name })}
                          title="Delete playlist"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Playlist</DialogTitle>
            <DialogDescription>
              Save the current queue as a playlist for later.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSavePlaylist()
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={onSavePlaylist}
              disabled={playlistName.trim().length === 0 || savePlaylist.isPending}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Playlist</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteTarget?.name}&rdquo;? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={removePlaylist.isPending}
              onClick={() => {
                if (deleteTarget) {
                  removePlaylist.mutate(deleteTarget.id)
                }
              }}
            >
              {removePlaylist.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
