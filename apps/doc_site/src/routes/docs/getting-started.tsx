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

      <h2>Get the code</h2>
      <p>
        If you just want to run it, install from npm:
      </p>
      <pre>{`npm install -g mpv-web-control
mpv-web-control start`}</pre>
      <p>
        Or build from source:
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

      <h2>Deploy to a server</h2>
      <p>
        If you're running this on a headless machine (Pi, VPS, whatever) and want it to start on boot, use the packaging script:
      </p>
      <pre>{`# On your build machine:
git clone <repo-url> mpv-web-control
cd mpv-web-control
pnpm install
bash scripts/package.sh`}</pre>
      <p>
        This produces a tarball in <code>dist/</code>. Copy it to the target machine and run the installer:
      </p>
      <pre>{`# On the target machine:
sudo bash scripts/install.sh mpv-web-control-*.tar.gz`}</pre>
      <p>
        The installer creates a system user, extracts everything to <code>/opt/mpv-web-control</code>, installs a systemd service, and writes a config file to <code>/etc/mpv-web-control/env</code>. You need to set <code>MUSIC_ROOT</code> there before starting:
      </p>
      <pre>{`sudo nano /etc/mpv-web-control/env
sudo systemctl start mpv-web-control`}</pre>
      <p>
        To uninstall: <code>sudo bash scripts/install.sh --uninstall</code>.
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
