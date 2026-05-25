import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { api } from '../api'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MiniPlayer() {
  const queryClient = useQueryClient()

  const statusQuery = useQuery({
    queryKey: ['status'],
    queryFn: api.status,
    refetchInterval: 1000,
  })

  const updateStatus = (status: Awaited<ReturnType<typeof api.status>>) => {
    queryClient.setQueryData(['status'], status)
  }

  const playPause = useMutation({ mutationFn: api.playPause, onSuccess: updateStatus })
  const next = useMutation({
    mutationFn: api.next,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })
  const previous = useMutation({
    mutationFn: api.previous,
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const status = statusQuery.data
  if (!status || !status.mpvRunning) return null

  return (
    <div className="bg-card border-b">
      <div className="flex items-center gap-3 px-4 h-10">
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => previous.mutate()}
            disabled={previous.isPending}
          >
            <SkipBack className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => playPause.mutate(undefined)}
            disabled={playPause.isPending}
          >
            {status.paused ? (
              <Play className="h-3.5 w-3.5" />
            ) : (
              <Pause className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => next.mutate()}
            disabled={next.isPending}
          >
            <SkipForward className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-2">
          {status.current ? (
            <span className="text-sm truncate">{status.current.name}</span>
          ) : (
            <span className="text-sm text-muted-foreground truncate">Nothing playing</span>
          )}
        </div>

        <div className="text-xs text-muted-foreground tabular-nums shrink-0">
          {status.current ? (
            <>
              {formatTime(status.position)} / {formatTime(status.duration)}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
