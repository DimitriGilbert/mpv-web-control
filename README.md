# mpv-web-control

A local-network web controller for `mpv --no-video`, intended for a Raspberry Pi or homelab box connected to speakers.

## Stack

- pnpm workspace monorepo
- Hono backend
- React SPA with TanStack Router and TanStack Query
- Shared TypeScript contract package
- File-based playlists, no database
- `mpv` JSON IPC socket for playback control

## Requirements

- Node.js 22 LTS or newer
- pnpm 9 or newer recommended
- `mpv` installed on the host that will play audio

On Debian/Raspberry Pi OS:

```bash
sudo apt update
sudo apt install mpv
```

## Install

```bash
pnpm install
```

## Build

```bash
pnpm build
```

## Development

Run the full development stack (server + client) from one terminal:

```bash
MUSIC_ROOT=/path/to/music pnpm dev
```

If you want to run each app separately:

```bash
MUSIC_ROOT=/path/to/music pnpm dev:server
pnpm dev:client
```

Open the Vite dev server, usually:

```txt
http://localhost:5173
```

## Workspace Checks

Run all package and app builds:

```bash
pnpm build
```

Run full type checks across all packages/apps:

```bash
pnpm check-types
```

## Production

Build the frontend and backend:

```bash
pnpm build
```

Start the backend, which also serves the built SPA:

```bash
MUSIC_ROOT=/path/to/music pnpm start

# or choose a specific port at runtime
MUSIC_ROOT=/path/to/music pnpm start -- --port 8080
```

Default URL:

```txt
http://<pi-ip>:3000
```

### One-command homelab install (recommended)

For non-programmer homelab setup, use the installer script:

```bash
sudo MUSIC_ROOT=/srv/media/music SERVICE_USER=$USER bash scripts/install.sh
```

Optional overrides:

```bash
sudo NON_INTERACTIVE=1 \
  MUSIC_ROOT=/srv/media/music \
  PORT=8080 \
  INSTALL_DIR=/opt/mpv-web-control \
  PLAYLISTS_DIR=/var/lib/mpv-web-control/playlists \
  MPV_BIN=/usr/bin/mpv \
  bash scripts/install.sh
```

After install:

```bash
systemctl status mpv-web-control.service
journalctl -u mpv-web-control.service -f
```

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `HOST` | `0.0.0.0` | Bind address for LAN access. |
| `PORT` | `3000` | Server port. |
| `MUSIC_ROOT` | current working directory | Root folder for browsing and playback. |
| `PLAYLISTS_DIR` | `.mpv-web-control/playlists` under the current working directory | Directory for playlist JSON files. |
| `MPV_SOCKET_PATH` | `/tmp/mpv-web-control.sock` | mpv IPC socket path. |
| `MPV_BIN` | `mpv` | mpv executable path. |
| `MAX_FOLDER_ITEMS` | `5000` | Safety cap for recursive folder queueing. |

`PORT` can also be overridden at runtime with `--port <number>` (or `-p <number>`) when starting the server.

## Manual Homelab Production Setup

### 1) Build once

```bash
pnpm install --frozen-lockfile
pnpm build
```

### 2) Create a runtime env file

Create `/etc/mpv-web-control.env`:

```bash
HOST=0.0.0.0
PORT=3000
MUSIC_ROOT=/srv/media/music
PLAYLISTS_DIR=/var/lib/mpv-web-control/playlists
MPV_SOCKET_PATH=/run/mpv-web-control/mpv.sock
MPV_BIN=/usr/bin/mpv
MAX_FOLDER_ITEMS=5000
```

Create state directories:

```bash
sudo mkdir -p /var/lib/mpv-web-control/playlists /run/mpv-web-control
sudo chown -R $USER:$USER /var/lib/mpv-web-control /run/mpv-web-control
```

### 3) Run as a systemd service

Create `/etc/systemd/system/mpv-web-control.service`:

```ini
[Unit]
Description=mpv web control
After=network.target

[Service]
Type=simple
User=YOUR_USER
WorkingDirectory=/path/to/mpv-web-control
EnvironmentFile=/etc/mpv-web-control.env
ExecStart=/usr/bin/pnpm --filter server start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mpv-web-control
sudo systemctl status mpv-web-control
```

### 4) Optional reverse proxy (recommended)

Put Nginx/Caddy in front for TLS and access control. Keep this app LAN-only unless you add authentication at the proxy layer.

## Features

- Browse folders under `MUSIC_ROOT` only.
- Queue individual audio files.
- Queue folders recursively.
- Play/pause, next, previous, stop.
- Seek timeline.
- Volume control.
- Save current queue as a JSON playlist.
- Load, append, and delete playlists.
- No database.

## Security Notes

This app is intended for trusted LAN use. It protects filesystem access by rejecting absolute paths and path traversal outside `MUSIC_ROOT`, but it does not implement authentication.

Do not expose this service directly to the public internet.
