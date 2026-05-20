import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/getting-started')({
  component: GettingStarted,
})

function GettingStarted() {
  return (
    <article className="prose-docs rise-in">
      <p className="island-kicker mb-3">Getting started</p>
      <h1>From zero to playing music in two minutes</h1>
      <p>
        You'll need a machine running Linux (a Raspberry Pi, some Debian box, whatever) with <code>mpv</code> installed and a folder full of audio files. That's the whole prerequisite list.
      </p>

      <h2>Install mpv</h2>
      <p>On Debian or Raspberry Pi OS:</p>
      <pre>{`sudo apt update
sudo apt install mpv`}</pre>
      <p>
        On macOS it's <code>brew install mpv</code>. On Arch, <code>pacman -S mpv</code>. You know the drill.
      </p>

      <h2>Install from npm</h2>
      <p>
        For a homelab box, install the CLI globally and let it create the systemd service:
      </p>
      <pre>{`npm install -g mpv-web-control
sudo mpv-web-control install --user <linux-user> --music-root <path> --port <port>`}</pre>
      <p>
        Use the Linux user that can read your music files, for example <code>didi</code>. If you omit <code>--music-root</code>, the CLI prompts for it. If you omit <code>--port</code>, it prompts and defaults to <code>3000</code>.
      </p>
      <p>
        The install command writes <code>/etc/mpv-web-control/env</code>, installs the systemd unit, and enables and starts/restarts the service by default.
      </p>
      <pre>{`sudo systemctl status mpv-web-control
sudo journalctl -u mpv-web-control -f`}</pre>

      <h2>Build from source</h2>
      <p>
        If you're hacking on the project, clone it and install workspace dependencies:
      </p>
      <pre>{`git clone <repo-url> mpv-web-control
cd mpv-web-control
pnpm install`}</pre>
      <p>
        Node 22 or newer, pnpm 9 or newer. If you're on a Pi and don't have pnpm yet: <code>corepack enable && corepack prepare pnpm@latest --activate</code>.
      </p>

      <h2>Build</h2>
      <pre>{`pnpm build`}</pre>
      <p>
        This compiles the shared contract package, the Hono backend, and the React frontend in one pass. Takes maybe 15 seconds on a Pi 4.
      </p>

      <h2>Run it</h2>
      <pre>{`MUSIC_ROOT=/mnt/my-music pnpm start`}</pre>
      <p>
        The server binds to <code>0.0.0.0:3000</code> by default, so anything on your local network can reach it. Open <code>http://&lt;your-pi-ip&gt;:3000</code> on your phone or laptop.
      </p>
      <p>
        If mpv isn't already running in the background, the server starts it for you and connects over a Unix socket at <code>/tmp/mpv-web-control.sock</code>.
      </p>

      <h2>Manage the service</h2>
      <p>
        To install the unit and config without enabling or starting the service, add <code>--no-enable</code>:
      </p>
      <pre>{`sudo mpv-web-control install --user <linux-user> --music-root <path> --port <port> --no-enable`}</pre>
      <p>
        Runtime config lives at <code>/etc/mpv-web-control/env</code>. Playlist data is stored under <code>/var/lib/mpv-web-control/playlists</code>.
      </p>
      <p>
        To uninstall:
      </p>
      <pre>{`sudo mpv-web-control uninstall`}</pre>
      <p>
        Uninstall stops, disables, and removes the service, then asks what to do with config and data directories. It does not delete Linux users.
      </p>

      <h2>Development mode</h2>
      <p>
        If you're hacking on the code, run the backend and frontend separately:
      </p>
      <pre>{`# terminal 1
MUSIC_ROOT=/mnt/music pnpm dev:server

# terminal 2
pnpm dev:client`}</pre>
      <p>
        The frontend dev server runs on Vite's default port (5173) with hot reload. The backend restarts on file changes via <code>tsx watch</code>.
      </p>

      <h2>What's next?</h2>
      <ul>
        <li>Check the <a href="/docs/configuration">configuration reference</a> for env variables you can tweak.</li>
        <li>Read about <a href="/docs/features">what the app can do</a>.</li>
        <li>Peek at the <a href="/docs/architecture">architecture</a> if you want to understand the plumbing.</li>
      </ul>
    </article>
  )
}
