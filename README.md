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
```

Default URL:

```txt
http://<pi-ip>:3000
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

## Security Notes

This app is intended for trusted LAN use. It protects filesystem access by rejecting absolute paths and path traversal outside `MUSIC_ROOT`, but it does not implement authentication.

Do not expose this service directly to the public internet.
