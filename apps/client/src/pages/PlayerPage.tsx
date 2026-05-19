import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { api } from '../api'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Slider } from '#/components/ui/slider'
import { Badge } from '#/components/ui/badge'
import { ScrollArea } from '#/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import { Input } from '#/components/ui/input'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function PlayerPage(): JSX.Element {
  const queryClient = useQueryClient()
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [playlistName, setPlaylistName] = useState('')
  const [localVolume, setLocalVolume] = useState<number | null>(null)
  const [localSeek, setLocalSeek] = useState<number | null>(null)

  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: api.status,
    refetchInterval: 1000,
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
  const savePlaylist = useMutation({
    mutationFn: api.savePlaylist,
    onSuccess: () => {
      setSaveDialogOpen(false)
      setPlaylistName('')
    },
  })

  if (statusQuery.error instanceof Error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
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
      <div className="flex items-center justify-center min-h-[60vh]">
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
    <div className="space-y-6 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-6 lg:space-y-0">
      {mutationError instanceof Error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive lg:col-span-2">
          {mutationError.message}
        </div>
      )}

      {/* Now Playing Card */}
      <Card>
        <CardContent className="pt-6">
          {status.mpvRunning && status.current ? (
            <div className="space-y-1 mb-4">
              <h2 className="text-xl font-semibold truncate">{status.current.name}</h2>
              <p className="text-sm text-muted-foreground truncate">{status.current.path}</p>
            </div>
          ) : status.mpvRunning ? (
            <div className="space-y-1 mb-4">
              <h2 className="text-xl font-semibold text-muted-foreground">Nothing Playing</h2>
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
            <div className="space-y-1 mb-4">
              <h2 className="text-xl font-semibold text-muted-foreground">Player Idle</h2>
              <p className="text-sm text-muted-foreground">mpv is running but idle.</p>
            </div>
          )}

          {/* Transport Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => previous.mutate()}
              disabled={previous.isPending}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => stop.mutate()}
              disabled={stop.isPending}
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => playPause.mutate(undefined)}
              disabled={playPause.isPending}
            >
              {status.paused ? (
                <Play className="h-5 w-5 ml-0.5" />
              ) : (
                <Pause className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => next.mutate()}
              disabled={next.isPending}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Seek Bar */}
          <div className="mt-6 space-y-2">
            <Slider
              min={0}
              max={maxDuration || 1}
              step={0.25}
              value={[displayPosition]}
              onValueChange={handleSeekChange}
              onValueCommit={handleSeekCommit}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(displayPosition)}</span>
              <span>{formatTime(maxDuration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="mt-4 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => volumeMut.mutate(displayVolume > 0 ? 0 : 50)}
            >
              {displayVolume > 0 ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
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
            <span className="text-xs text-muted-foreground w-10 text-right">
              {Math.round(displayVolume)}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Queue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Queue</CardTitle>
            <Badge variant="secondary">{status.queue.length}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={status.queue.length === 0}
                >
                  <Save className="h-3.5 w-3.5" />
                  Save as Playlist
                </Button>
              </DialogTrigger>
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
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
              onClick={() => clear.mutate()}
              disabled={status.queue.length === 0 || clear.isPending}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {status.queue.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">
              Queue is empty.{' '}
              <Link
                to="/browse"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Browse
              </Link>{' '}
              your library to add tracks.
            </p>
          ) : (
            <ScrollArea className="max-h-[300px] lg:max-h-[calc(100vh-280px)] overflow-hidden">
              <div className="space-y-1">
                {status.queue.map((item, index) => (
                  <button
                    type="button"
                    key={`${item.path}-${index}`}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-sm text-left transition-colors ${
                      index === status.currentIndex
                        ? 'bg-accent/50 font-medium'
                        : 'hover:bg-accent/30 cursor-pointer'
                    }`}
                    disabled={jumpTo.isPending}
                    onClick={() => {
                      if (index !== status.currentIndex) {
                        jumpTo.mutate(index)
                      }
                    }}
                  >
                    <span className="w-6 text-right text-muted-foreground tabular-nums">
                      {index + 1}
                    </span>
                    {index === status.currentIndex && (
                      <Play className="h-3 w-3 shrink-0" />
                    )}
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
