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

### From npm (recommended)

```bash
npm install -g mpv-web-control
```

Then run:

```bash
mpv-web-control start
```

Or use without installing:

```bash
npx mpv-web-control start
```

### From source

```bash
git clone https://github.com/DimitriGilbert/mpv-web-control.git
cd mpv-web-control
pnpm install
pnpm build
MUSIC_ROOT=/path/to/music pnpm start
```

## CLI

```
mpv-web-control <command>

Commands:
  start       Start the server (default)
  install     Install as systemd service (requires root)
  uninstall   Uninstall the systemd service
  package     Create a distributable tarball
  version     Print version
  help        Show help
```

## Production Deployment (Linux)

Build a tarball on any machine:

```bash
bash scripts/package.sh
```

Copy the tarball to the target machine, then:

```bash
sudo bash scripts/install.sh mpv-web-control-*.tar.gz
sudo nano /etc/mpv-web-control/env   # set MUSIC_ROOT
sudo systemctl start mpv-web-control
```

Uninstall:

```bash
sudo bash scripts/install.sh --uninstall
```

## Development

Run backend and frontend in separate terminals:

```bash
MUSIC_ROOT=/path/to/music pnpm dev:server
pnpm dev:client
```

Open the Vite dev server, usually:

```txt
http://localhost:5173
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

## Releasing

```bash
bash scripts/release.sh <version> [--no-gh] [--no-npm] [--dry-run]
```

The release script:
1. Validates the version (semver required)
2. Runs typecheck and build as guards
3. Bumps version in all package.json files
4. Commits, tags, and pushes
5. Creates a GitHub Release with the tarball attached
6. Publishes to npm

Flags:
- `--no-gh` — skip GitHub Release creation
- `--no-npm` — skip npm publish
- `--dry-run` — print what would happen without executing mutations (checks and builds still run)

Example:

```bash
bash scripts/release.sh 1.0.0 --dry-run   # preview
bash scripts/release.sh 1.0.0             # full release
```

## Security Notes

This app is intended for trusted LAN use. It protects filesystem access by rejecting absolute paths and path traversal outside `MUSIC_ROOT`, but it does not implement authentication.

Do not expose this service directly to the public internet.
