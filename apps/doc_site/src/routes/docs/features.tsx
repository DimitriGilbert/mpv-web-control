import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/features')({
  component: Features,
})

function Features() {
  return (
    <article className="prose-docs rise-in">
      <p className="island-kicker mb-3">Features</p>
      <h1>What you get</h1>
      <p>
        mpv-web-control is deliberately small. It doesn't stream audio over the network, manage a library database, or try to be Spotify. Here's what it actually does.
      </p>

      <h2>File browsing</h2>
      <p>
        The browser view shows every folder and audio file under <code>MUSIC_ROOT</code>. You can't escape that root — path traversal attempts get rejected flat-out. Folders sort alphabetically. Files show their name and extension. That's it. No metadata scraping, no cover art fetcher, no tags. If you want that, use a proper music manager.
      </p>
      <p>
        Tap a file to queue it. Tap a folder to queue everything inside, recursively. A safety cap of 5,000 items prevents you from accidentally queuing a mount point (configurable via <code>MAX_FOLDER_ITEMS</code>).
      </p>

      <h2>Playback controls</h2>
      <p>
        Play. Pause. Next track. Previous track. Stop. They do exactly what they say. The seek bar shows your position in the current track and lets you scrub. The volume slider talks directly to mpv — no intermediate layer, no latency.
      </p>
      <p>
        All of this happens over mpv's JSON IPC protocol through a Unix domain socket. The backend translates your clicks into IPC commands and pipes them to mpv. Response time is effectively instant on a local network.
      </p>

      <h2>Playlist management</h2>
      <p>
        Hit "save" on your current queue and it writes a JSON file to disk under <code>PLAYLISTS_DIR</code>. Load that playlist later to replace your queue, or append it to keep what's already playing. Delete playlists you don't want anymore.
      </p>
      <p>
        The files are plain JSON arrays of file paths. You can edit them by hand, sync them between machines, or version-control them. No database means no schema migrations, no corrupted SQLite files, no "please run <code>npm run migrate</code>" messages.
      </p>

      <h2>Security model</h2>
      <p>
        This thing runs on your LAN. It's designed for trusted networks — your apartment, your home lab, maybe a small office. Here's what it protects against:
      </p>
      <ul>
        <li><strong>Path traversal</strong> — the backend rejects <code>..</code> sequences and absolute paths. You stay inside <code>MUSIC_ROOT</code>.</li>
        <li><strong>Socket hijacking</strong> — the mpv IPC socket lives at a known path. Only the user running the server can talk to it.</li>
      </ul>
      <p>
        What it doesn't have: authentication, rate limiting, CORS restrictions, or CSRF tokens. Don't put this on the public internet. If you need remote access, put it behind a VPN or an SSH tunnel.
      </p>

      <h2>What it doesn't do</h2>
      <p>
        Some things are deliberately out of scope:
      </p>
      <ul>
        <li>No audio streaming — mpv plays locally through whatever audio output the host machine uses.</li>
        <li>No metadata or tag reading — files are just files.</li>
        <li>No user accounts or multi-user anything.</li>
        <li>No mobile app — the web interface works fine in mobile browsers.</li>
        <li>No lyrics, no scrobbling, no recommendations. It plays the files you tell it to play.</li>
      </ul>
    </article>
  )
}
