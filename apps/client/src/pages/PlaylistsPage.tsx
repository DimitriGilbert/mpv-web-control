import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ListMusic,
  Play,
  Plus,
  Trash2,
  Save,
  Loader2,
} from 'lucide-react'

import { api } from '../api'
import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Badge } from '#/components/ui/badge'
import { ScrollArea } from '#/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function PlaylistsPage(): JSX.Element {
  const [name, setName] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)
  const queryClient = useQueryClient()

  const { data: playlists = [], isLoading, error } = useQuery({
    queryKey: ['playlists'],
    queryFn: api.playlists,
  })

  const save = useMutation({
    mutationFn: api.savePlaylist,
    onSuccess: () => {
      setName('')
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
  })

  const load = useMutation({
    mutationFn: (id: string) => api.loadPlaylist(id, 'replace'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const append = useMutation({
    mutationFn: (id: string) => api.loadPlaylist(id, 'append'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const remove = useMutation({
    mutationFn: api.deletePlaylist,
    onSuccess: () => {
      setDeleteTarget(null)
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    },
  })

  const onSave = () => {
    const trimmed = name.trim()
    if (trimmed.length > 0) {
      save.mutate(trimmed)
    }
  }

  const mutationError = save.error ?? load.error ?? append.error ?? remove.error
  const isMutating = save.isPending || load.isPending || append.isPending || remove.isPending

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Playlists</h1>

      {/* Save playlist section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Save Current Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Playlist name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSave()
              }}
              className="flex-1"
            />
            <Button
              onClick={onSave}
              disabled={save.isPending || name.trim().length === 0}
            >
              {save.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Errors */}
      {error instanceof Error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.message}
        </div>
      )}
      {mutationError instanceof Error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {mutationError.message}
        </div>
      )}

      {/* Playlist list */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading playlists...
            </div>
          ) : playlists.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
              <ListMusic className="h-12 w-12" />
              <p className="text-sm">
                No playlists yet. Save your current queue to create one.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[60vh]">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors border-b last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold truncate">{playlist.name}</span>
                      <Badge variant="secondary" className="shrink-0">
                        {playlist.itemCount} {playlist.itemCount === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Created {formatDate(playlist.createdAt)}
                      {playlist.updatedAt !== playlist.createdAt && (
                        <> · Updated {formatDate(playlist.updatedAt)}</>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={isMutating}
                      onClick={() => load.mutate(playlist.id)}
                      title="Load (replace queue)"
                    >
                      <Play className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={isMutating}
                      onClick={() => append.mutate(playlist.id)}
                      title="Append to queue"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      disabled={isMutating}
                      onClick={() => setDeleteTarget({ id: playlist.id, name: playlist.name })}
                      title="Delete playlist"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
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
              disabled={remove.isPending}
              onClick={() => {
                if (deleteTarget) {
                  remove.mutate(deleteTarget.id)
                }
              }}
            >
              {remove.isPending && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
