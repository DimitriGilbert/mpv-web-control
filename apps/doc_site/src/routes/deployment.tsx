import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deployment')({
  component: () => (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">GitHub Pages deployment</h1>
      <div className="rounded border bg-white p-4 shadow-sm">
        <p>Deploy with the built-in script:</p>
        <pre><code>pnpm --filter doc_site deploy</code></pre>
        <p>The published site includes a CNAME for <code>mpv-web-control.dbuild.dev</code>.</p>
      </div>
    </section>
  ),
})
