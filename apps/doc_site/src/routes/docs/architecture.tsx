import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/architecture')({
  component: Architecture,
})

function Architecture() {
  return (
    <article className="prose-docs rise-in">
      <p className="island-kicker mb-3">Architecture</p>
      <h1>How the pieces fit together</h1>
      <p>
        Three packages in a pnpm workspace monorepo, one mpv process, one Unix socket. That's the whole system.
      </p>

      <h2>The workspace</h2>
      <pre>{`mpv-web-control/
  packages/
    contract/    ← shared TypeScript types (API shapes)
  apps/
    server/      ← Hono backend
    client/      ← React SPA (TanStack Router + Query)
    doc_site/    ← this docs site (TanStack Start)`}</pre>
      <p>
        The contract package is the glue. Both the server and client import their types from it — request shapes, response shapes, the works. When you change an API endpoint, you update the contract package, rebuild it, and both sides pick up the new types. TypeScript catches mismatches at build time instead of runtime.
      </p>

      <h2>Server (Hono)</h2>
      <p>
        The backend is a Hono app running on Node.js. It does three things:
      </p>
      <ul>
        <li><strong>File system API</strong> — reads <code>MUSIC_ROOT</code> and returns folder contents as JSON. Validates that every path stays inside the root.</li>
        <li><strong>mpv IPC bridge</strong> — opens a Unix domain socket to mpv's JSON IPC interface. Translates HTTP requests into mpv commands and returns the results.</li>
        <li><strong>Playlist storage</strong> — reads and writes JSON files in <code>PLAYLISTS_DIR</code>. No database, just the file system.</li>
      </ul>
      <p>
        In production mode, it also serves the built React SPA as static files. During development, Vite handles that separately.
      </p>

      <h2>Client (React + TanStack)</h2>
      <p>
        The frontend is a single-page app built with React, TanStack Router, and TanStack Query. Router handles navigation between the browser view, the player, and the playlists page. Query handles data fetching, caching, and background refreshes.
      </p>
      <p>
        When you browse folders, the client fetches from <code>/api/browse</code>. When you hit play, it POSTs to <code>/api/player/play</code>. The API responses are typed from the contract package, so the frontend always knows the shape of the data it's getting back.
      </p>

      <h2>The mpv connection</h2>
      <p>
        mpv runs as a separate process with <code>--no-video --idle=yes</code>. The server spawns it if it's not already running, then connects to its JSON IPC socket. Every player action (play, pause, seek, volume change) becomes a JSON message sent over that socket.
      </p>
      <p>
        The socket lives at <code>/tmp/mpv-web-control.sock</code> by default. If mpv dies, the server catches the disconnect and tries to reconnect. You can also run your own mpv instance with <code>--input-ipc-server=/tmp/mpv-web-control.sock</code> and the server will find it.
      </p>

      <h2>Why this shape</h2>
      <p>
        The file-based playlist storage and the lack of a database are deliberate choices. This runs on a Raspberry Pi. SD cards die. Databases corrupt. A folder of JSON files survives almost anything — you can back it up with <code>cp</code>, edit playlists in a text editor, and recover from a dead card by just copying the directory.
      </p>
      <p>
        The contract package exists because TypeScript's structural typing only gets you so far. When you have a backend and a frontend sharing the same API surface, explicit shared types save you from the "I changed the server but forgot the client" class of bugs. It's three extra seconds of build time for a lot fewer 2 AM debugging sessions.
      </p>
    </article>
  )
}
