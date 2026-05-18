import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/" className="hover:underline">Overview</Link>
        <Link to="/getting-started" className="hover:underline">Getting started</Link>
        <Link to="/deployment" className="hover:underline">Deployment</Link>
      </nav>
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  ),
})
