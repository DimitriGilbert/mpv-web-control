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
sudo mpv-web-control install --user <linux-user> --music-root <path> --port <port>
```

Use the Linux user that can read your music files, for example:

```bash
sudo mpv-web-control install --user didi --music-root /mnt/music --port 3000
```

If `--music-root` is omitted, the installer prompts for it. If `--port` is omitted, it prompts and defaults to `3000`. The install command writes `/etc/mpv-web-control/env`, installs the systemd unit, and enables and starts/restarts the service by default.

For a one-off foreground run:

```bash
mpv-web-control start
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

Recommended homelab install:

```bash
npm install -g mpv-web-control
sudo mpv-web-control install --user <linux-user> --music-root <path> --port <port>
```

`--user` controls the systemd service user. Pick the account that can read the music files, such as `didi` on a personal server. Omit `--music-root` to be prompted for it. Omit `--port` to be prompted with a default of `3000`.

The installer enables and starts/restarts the service by default. To install only the unit and config without enabling or starting it:

```bash
sudo mpv-web-control install --user <linux-user> --music-root <path> --port <port> --no-enable
```

Runtime config lives at `/etc/mpv-web-control/env`. Playlist data is stored under `/var/lib/mpv-web-control/playlists`.

Uninstall:

```bash
sudo mpv-web-control uninstall
```

Uninstall stops, disables, and removes the service, then asks what to do with config and data directories. It does not delete Linux users.

Status and logs:

```bash
sudo systemctl status mpv-web-control
sudo journalctl -u mpv-web-control -f
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
| `PLAYLISTS_DIR` | `.mpv-web-control/playlists` under the current working directory | Directory for playlist JSON files. The systemd install uses `/var/lib/mpv-web-control/playlists`. |
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
