import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/getting-started')({
  component: () => (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Getting started</h1>
      <div className="rounded border bg-white p-4 shadow-sm">
        <ol>
          <li>Install dependencies with <code>pnpm install</code>.</li>
          <li>Run docs locally with <code>pnpm --filter doc_site dev</code>.</li>
          <li>Build static output with <code>pnpm --filter doc_site build</code>.</li>
        </ol>
      </div>
    </section>
  ),
})
