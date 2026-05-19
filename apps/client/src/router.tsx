import {
  createRouter,
  createRootRoute,
  createRoute,
  Link,
  Outlet,
  redirect,
  useRouterState,
} from '@tanstack/react-router'
import { Disc3, FolderOpen, ListMusic, Sun, Moon, Monitor } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import { useTheme } from '#/components/ThemeProvider'

import { FileBrowserPage } from './pages/FileBrowserPage'
import { PlayerPage } from './pages/PlayerPage'
import { PlaylistsPage } from './pages/PlaylistsPage'
import { MiniPlayer } from './components/MiniPlayer'

function Layout() {
  const { theme, setTheme } = useTheme()
  const location = useRouterState({ select: (s) => s.location })

  const isActive = (path: string) => location.pathname === path
  const isPlayerPage = location.pathname === '/player'

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  const nextTheme = () =>
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')
  const themeLabel =
    theme === 'light' ? 'Light mode' : theme === 'dark' ? 'Dark mode' : 'System theme'

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <nav className="sticky top-0 z-50 bg-card border-b">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="font-bold text-lg tracking-tight">MPV Control</div>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive('/player') ? 'secondary' : 'ghost'}
                    size="sm"
                    asChild
                  >
                    <Link to="/player">
                      <Disc3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Player</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Player</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive('/browse') ? 'secondary' : 'ghost'}
                    size="sm"
                    asChild
                  >
                    <Link to="/browse">
                      <FolderOpen className="h-4 w-4" />
                      <span className="hidden sm:inline">Browse</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Browse</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive('/playlists') ? 'secondary' : 'ghost'}
                    size="sm"
                    asChild
                  >
                    <Link to="/playlists">
                      <ListMusic className="h-4 w-4" />
                      <span className="hidden sm:inline">Playlists</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Playlists</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextTheme}
                    aria-label={themeLabel}
                  >
                    <ThemeIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{themeLabel}</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </nav>
        {!isPlayerPage && <MiniPlayer />}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  )
}

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/player' })
  },
})

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/browse',
  component: FileBrowserPage,
})

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/player',
  component: PlayerPage,
})

const playlistsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/playlists',
  component: PlaylistsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  playerRoute,
  browseRoute,
  playlistsRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
