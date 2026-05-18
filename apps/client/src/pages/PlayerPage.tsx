import type { ChangeEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { QueueItem } from '@mpv/contract'
import { api } from '../api'

function secondsLabel(value: number): string {
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function PlayerPage(): JSX.Element {
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
  const volume = useMutation({ mutationFn: api.setVolume, onSuccess: updateStatus })
  const seek = useMutation({ mutationFn: api.seek, onSuccess: updateStatus })
  const next = useMutation({ mutationFn: api.next, onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }) })
  const previous = useMutation({ mutationFn: api.previous, onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }) })
  const stop = useMutation({ mutationFn: api.stop, onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }) })
  const clear = useMutation({ mutationFn: api.clearQueue, onSettled: () => queryClient.invalidateQueries({ queryKey: ['status'] }) })

  if (statusQuery.isLoading) {
    return <p>Loading player…</p>
  }

  if (statusQuery.error instanceof Error) {
    return <p className="rounded bg-red-100 p-3 text-red-800">{statusQuery.error.message}</p>
  }

  const status = statusQuery.data
  if (status === undefined) {
    return <p>No player status available.</p>
  }

  const maxDuration = Math.max(0, status.duration)
  const position = Math.min(Math.max(0, status.position), maxDuration)

  const onVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    volume.mutate(Number(event.target.value))
  }

  const onSeek = (event: ChangeEvent<HTMLInputElement>) => {
    seek.mutate(Number(event.target.value))
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold">Now Playing</h1>
        <p className="text-sm text-gray-600">mpv is {status.mpvRunning ? 'running' : 'not running'}</p>
      </header>

      <div className="rounded border bg-white p-4 shadow-sm">
        <h2 className="truncate text-xl font-semibold">{status.current?.name ?? 'Nothing loaded'}</h2>
        <p className="truncate text-sm text-gray-600">{status.current?.path ?? 'Queue something from the library.'}</p>

        <div className="mt-4 flex items-center gap-3">
          <button className="rounded bg-gray-900 px-3 py-2 text-white" onClick={() => previous.mutate()}>
            Previous
          </button>
          <button className="rounded bg-blue-700 px-4 py-2 text-white" onClick={() => playPause.mutate(undefined)}>
            {status.paused ? 'Play' : 'Pause'}
          </button>
          <button className="rounded bg-gray-900 px-3 py-2 text-white" onClick={() => next.mutate()}>
            Next
          </button>
          <button className="rounded bg-red-700 px-3 py-2 text-white" onClick={() => stop.mutate()}>
            Stop
          </button>
        </div>

        <div className="mt-5">
          <input className="w-full" type="range" min={0} max={maxDuration} step={0.25} value={position} onChange={onSeek} />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{secondsLabel(position)}</span>
            <span>{secondsLabel(maxDuration)}</span>
          </div>
        </div>

        <label className="mt-4 block text-sm font-medium" htmlFor="volume">
          Volume: {Math.round(status.volume)}
        </label>
        <input id="volume" className="w-full" type="range" min={0} max={100} step={1} value={status.volume} onChange={onVolumeChange} />
      </div>

      <section className="rounded border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Queue</h2>
          <button className="rounded bg-gray-200 px-3 py-2 text-sm" onClick={() => clear.mutate()}>
            Clear queue
          </button>
        </div>
        {status.queue.length === 0 ? <p className="text-gray-600">Queue is empty.</p> : null}
        <ol className="list-decimal space-y-1 pl-5">
          {status.queue.map((item: QueueItem, index: number) => (
            <li key={`${item.path}-${index}`} className={index === status.currentIndex ? 'font-semibold text-blue-800' : ''}>
              {item.name}
            </li>
          ))}
        </ol>
      </section>
    </section>
  )
}
