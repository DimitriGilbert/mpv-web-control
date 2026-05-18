import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

export function PlaylistsPage(): JSX.Element {
  const [name, setName] = useState('')
  const queryClient = useQueryClient()
  const playlists = useQuery({ queryKey: ['playlists'], queryFn: api.playlists })

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['playlists'] }),
  })

  const onSave = () => {
    const trimmed = name.trim()
    if (trimmed.length > 0) {
      save.mutate(trimmed)
    }
  }

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold">Playlists</h1>
        <p className="text-sm text-gray-600">Save and restore queues without a database.</p>
      </header>

      <div className="flex gap-2 rounded border bg-white p-4">
        <input
          className="min-w-0 flex-1 rounded border px-3 py-2"
          placeholder="Playlist name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button className="rounded bg-blue-700 px-4 py-2 text-white" onClick={onSave} disabled={save.isPending}>
          Save current queue
        </button>
      </div>

      {playlists.error instanceof Error ? <p className="rounded bg-red-100 p-3 text-red-800">{playlists.error.message}</p> : null}
      {playlists.isLoading ? <p>Loading playlists…</p> : null}

      <div className="overflow-hidden rounded border bg-white">
        {(playlists.data ?? []).length === 0 && !playlists.isLoading ? <p className="p-4 text-gray-600">No playlists yet.</p> : null}
        {(playlists.data ?? []).map((playlist) => (
          <div key={playlist.id} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b p-3 last:border-b-0">
            <div>
              <h2 className="font-semibold">{playlist.name}</h2>
              <p className="text-sm text-gray-600">{playlist.itemCount} item{playlist.itemCount === 1 ? '' : 's'}</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded bg-emerald-700 px-3 py-2 text-sm text-white" onClick={() => load.mutate(playlist.id)}>
                Load
              </button>
              <button className="rounded bg-gray-700 px-3 py-2 text-sm text-white" onClick={() => append.mutate(playlist.id)}>
                Append
              </button>
              <button className="rounded bg-red-700 px-3 py-2 text-sm text-white" onClick={() => remove.mutate(playlist.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
