import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  component: DocsLayout,
})

const navItems = [
  { to: '/docs/getting-started', label: 'Getting Started' },
  { to: '/docs/features', label: 'Features' },
  { to: '/docs/configuration', label: 'Configuration' },
  { to: '/docs/architecture', label: 'Architecture' },
]

function DocsLayout() {
  return (
    <main className="page-wrap px-4 pb-16 pt-6 sm:pt-10">
      <div className="flex gap-10 lg:gap-16">
        <aside className="hidden w-52 flex-shrink-0 md:block">
          <nav className="sticky top-24 space-y-1">
            <p className="island-kicker mb-3 px-3.5">Documentation</p>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="sidebar-link"
                activeProps={{ className: 'sidebar-link is-active' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  )
}
