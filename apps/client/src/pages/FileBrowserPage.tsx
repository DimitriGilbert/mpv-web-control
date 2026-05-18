import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api'

export function FileBrowserPage(): JSX.Element {
  const [path, setPath] = useState('.')
  const queryClient = useQueryClient()
  const { data: entries = [], isLoading, error } = useQuery({
    queryKey: ['library', path],
    queryFn: () => api.listLibrary(path),
  })

  const queueFile = useMutation({
    mutationFn: api.queueFile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const queueFolder = useMutation({
    mutationFn: api.queueFolder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['status'] }),
  })

  const parentPath = useMemo(() => {
    if (path === '.') {
      return null
    }
    const segments = path.split('/').filter(Boolean)
    segments.pop()
    return segments.length === 0 ? '.' : segments.join('/')
  }, [path])

  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Library</h1>
          <p className="text-sm text-gray-600">{path}</p>
        </div>
        {parentPath !== null ? (
          <button className="rounded bg-gray-900 px-3 py-2 text-white" onClick={() => setPath(parentPath)}>
            Up
          </button>
        ) : null}
      </header>

      {error instanceof Error ? <p className="rounded bg-red-100 p-3 text-red-800">{error.message}</p> : null}
      {isLoading ? <p>Loading…</p> : null}

      <div className="overflow-hidden rounded border bg-white">
        {entries.length === 0 && !isLoading ? <p className="p-4 text-gray-600">No playable files or folders here.</p> : null}
        {entries.map((entry) => (
          <div key={entry.path} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b p-3 last:border-b-0">
            <button
              className="min-w-0 text-left"
              onClick={() => {
                if (entry.isDirectory) {
                  setPath(entry.path)
                  return
                }
                queueFile.mutate(entry.path)
              }}
            >
              <span className="block truncate font-medium">{entry.name}</span>
              <span className="text-xs text-gray-500">{entry.isDirectory ? 'Folder' : 'Audio file'}</span>
            </button>
            {entry.isDirectory ? (
              <button
                className="rounded bg-emerald-700 px-3 py-2 text-sm text-white disabled:opacity-50"
                disabled={queueFolder.isPending}
                onClick={() => queueFolder.mutate(entry.path)}
              >
                Queue folder
              </button>
            ) : (
              <button
                className="rounded bg-blue-700 px-3 py-2 text-sm text-white disabled:opacity-50"
                disabled={queueFile.isPending}
                onClick={() => queueFile.mutate(entry.path)}
              >
                Queue
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
