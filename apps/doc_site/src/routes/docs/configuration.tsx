import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/configuration')({
  component: Configuration,
})

function Configuration() {
  return (
    <article className="prose-docs rise-in">
      <p className="island-kicker mb-3">Configuration</p>
      <h1>Environment variables</h1>
      <p>
        Everything is configured through environment variables. No config files, no settings UI, no YAML. Set them when you start the server and you're done.
      </p>

      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>HOST</code></td>
            <td><code>0.0.0.0</code></td>
            <td>Bind address. Default listens on all interfaces so LAN devices can connect. Set to <code>127.0.0.1</code> if you only want local access.</td>
          </tr>
          <tr>
            <td><code>PORT</code></td>
            <td><code>3000</code></td>
            <td>Server port. Change this if something else is using 3000.</td>
          </tr>
          <tr>
            <td><code>MUSIC_ROOT</code></td>
            <td>Current working directory</td>
            <td>The root folder for browsing and playback. This is the only required variable you should actually care about. Point it at your music collection.</td>
          </tr>
          <tr>
            <td><code>PLAYLISTS_DIR</code></td>
            <td><code>.mpv-web-control/playlists</code> under CWD</td>
            <td>Where playlist JSON files are stored. Defaults to a hidden directory in your working dir. Change it if you want playlists somewhere specific.</td>
          </tr>
          <tr>
            <td><code>MPV_SOCKET_PATH</code></td>
            <td><code>/tmp/mpv-web-control.sock</code></td>
            <td>Path to the mpv IPC socket. If you're running multiple instances, give each one its own socket.</td>
          </tr>
          <tr>
            <td><code>MPV_BIN</code></td>
            <td><code>mpv</code></td>
            <td>Path to the mpv binary. Only change this if mpv is installed in a non-standard location or you want to use a specific version.</td>
          </tr>
          <tr>
            <td><code>MAX_FOLDER_ITEMS</code></td>
            <td><code>5000</code></td>
            <td>Safety cap for recursive folder queueing. Prevents accidentally adding tens of thousands of files to your queue because you clicked the wrong folder.</td>
          </tr>
        </tbody>
      </table>

      <h2>Typical setups</h2>

      <h3>Basic — Pi with a USB drive</h3>
      <pre>{`MUSIC_ROOT=/media/usb/music pnpm start`}</pre>
      <p>
        The USB drive is mounted at <code>/media/usb</code>. Your music lives in a folder called <code>music</code>. That one variable is all you need.
      </p>

      <h3>Advanced — custom paths and port</h3>
      <pre>{`MUSIC_ROOT=/srv/audio \\
PLAYLISTS_DIR=/srv/data/playlists \\
MPV_SOCKET_PATH=/run/mpv/control.sock \\
PORT=8080 \\
pnpm start`}</pre>
      <p>
        Running on a proper server with dedicated paths. The socket goes in <code>/run</code> (tmpfs, cleaned on reboot). Port 8080 because 3000 is taken by something else.
      </p>

      <h3>systemd service</h3>
      <pre>{`[Unit]
Description=mpv-web-control
After=network.target

[Service]
Type=simple
User=mpv
WorkingDirectory=/opt/mpv-web-control
ExecStart=/usr/bin/pnpm start
Environment=MUSIC_ROOT=/srv/music
Environment=PORT=3000
Restart=on-failure

[Install]
WantedBy=multi-user.target`}</pre>
      <p>
        Drop this in <code>/etc/systemd/system/mpv-web-control.service</code> and run <code>systemctl enable --now mpv-web-control</code>. Now it starts on boot and restarts if it crashes.
      </p>
      <p>
        The <code>scripts/install.sh</code> script automates all of this — systemd unit, system user, directory layout, the lot. You only need to write the unit file by hand if you're doing something custom. See <a href="/docs/getting-started">Getting Started</a> for the packaged deployment flow.
      </p>
    </article>
  )
}
