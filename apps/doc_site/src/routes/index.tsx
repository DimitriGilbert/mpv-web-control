import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">mpv-web-control documentation</h1>
      <p className="text-gray-600">A focused, production-ready docs site for setup, usage, and deployment.</p>
      <div className="grid gap-4">
        <article className="rounded border bg-white p-4 shadow-sm">
          <h2 className="font-medium">What you get</h2>
          <p className="text-gray-600">Static docs app with TanStack Router, GitHub Pages deployment, and a custom CNAME.</p>
        </article>
      </div>
    </section>
  ),
})
