import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FileEntry } from '@mpv/contract'
import {
  ChevronDown,
  ChevronRight,
  FileAudio,
  Folder,
  FolderOpen,
  Home,
  Loader2,
  Play,
  Plus,
  Search,
} from 'lucide-react'

import { api } from '../api'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { ScrollArea } from '#/components/ui/scroll-area'

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
        className="flex items-center gap-2 px-4 py-2 hover:bg-accent/50 transition-colors border-b last:border-b-0"
        style={{ paddingLeft: `${depth * 24 + 16}px` }}
      >
        {entry.isDirectory ? (
          <button
            type="button"
            className="shrink-0 p-0.5 rounded hover:bg-accent"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
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
            <Folder className="h-4 w-4 shrink-0 text-amber-500" />
          ) : (
            <FileAudio className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <span className={`truncate ${entry.isDirectory ? 'font-medium' : ''}`}>
            {entry.name}
          </span>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isMutating}
            onClick={() =>
              entry.isDirectory ? playFolder(entry.path) : playFile(entry.path)
            }
            title="Play (replace queue)"
          >
            <Play className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isMutating}
            onClick={() =>
              entry.isDirectory
                ? queueFolder.mutate(entry.path)
                : queueFile.mutate(entry.path)
            }
            title="Add to queue"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {expanded && entry.isDirectory && (
        isLoading ? (
          <div
            className="py-2 text-muted-foreground"
            style={{ paddingLeft: `${(depth + 1) * 24 + 16}px` }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
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

export function FileBrowserPage() {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Library</h1>
      </div>

      <nav className="flex items-center gap-1 text-sm flex-wrap" aria-label="Library path">
        <Button
          variant={path === '.' ? 'secondary' : 'ghost'}
          size="sm"
          className="h-7 gap-1 px-2"
          onClick={() => navigateToBreadcrumb(-1)}
        >
          <Home className="h-3.5 w-3.5" />
          Root
        </Button>
        {breadcrumbs.map((segment, index) => (
          <div key={`${segment}-${index}`} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <Button
              variant={index === breadcrumbs.length - 1 ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 px-2"
              onClick={() => navigateToBreadcrumb(index)}
            >
              {segment}
            </Button>
          </div>
        ))}
      </nav>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter files and folders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {error instanceof Error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.message}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-muted-foreground">
              <FolderOpen className="h-12 w-12" />
              <p className="text-sm">
                {entries.length === 0
                  ? 'No playable files or folders here.'
                  : 'No results match your search.'}
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-220px)]">
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
