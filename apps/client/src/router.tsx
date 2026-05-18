import { createRouter, createRootRoute, createRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { FileBrowserPage } from './pages/FileBrowserPage'
import { PlayerPage } from './pages/PlayerPage'
import { PlaylistsPage } from './pages/PlaylistsPage'

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/player" className="hover:underline">Player</Link>
        <Link to="/browse" className="hover:underline">Browse</Link>
        <Link to="/playlists" className="hover:underline">Playlists</Link>
      </nav>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  ),
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

const routeTree = rootRoute.addChildren([indexRoute, playerRoute, browseRoute, playlistsRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
