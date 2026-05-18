#!/usr/bin/env bash
set -euo pipefail

# mpv-web-control homelab installer

APP_NAME="mpv-web-control"
SERVICE_NAME="${APP_NAME}.service"
ENV_FILE="/etc/${APP_NAME}.env"
DEFAULT_INSTALL_DIR="/opt/${APP_NAME}"
DEFAULT_STATE_DIR="/var/lib/${APP_NAME}"
DEFAULT_RUN_DIR="/run/${APP_NAME}"
DEFAULT_PORT="3000"
DEFAULT_HOST="0.0.0.0"

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INSTALL_DIR="${INSTALL_DIR:-$DEFAULT_INSTALL_DIR}"
MUSIC_ROOT="${MUSIC_ROOT:-}"
PORT="${PORT:-$DEFAULT_PORT}"
HOST="${HOST:-$DEFAULT_HOST}"
PLAYLISTS_DIR="${PLAYLISTS_DIR:-$DEFAULT_STATE_DIR/playlists}"
RUN_DIR="${RUN_DIR:-$DEFAULT_RUN_DIR}"
MPV_SOCKET_PATH="${MPV_SOCKET_PATH:-$RUN_DIR/mpv.sock}"
MPV_BIN="${MPV_BIN:-/usr/bin/mpv}"
MAX_FOLDER_ITEMS="${MAX_FOLDER_ITEMS:-5000}"
SERVICE_USER="${SERVICE_USER:-${SUDO_USER:-${USER:-}}}"
SERVICE_GROUP="${SERVICE_GROUP:-$SERVICE_USER}"
NON_INTERACTIVE="${NON_INTERACTIVE:-0}"

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<USAGE
Usage: sudo bash scripts/install.sh [options]

Environment overrides:
  INSTALL_DIR=/opt/mpv-web-control
  MUSIC_ROOT=/srv/media/music           (required)
  PORT=3000
  HOST=0.0.0.0
  PLAYLISTS_DIR=/var/lib/mpv-web-control/playlists
  RUN_DIR=/run/mpv-web-control
  MPV_SOCKET_PATH=/run/mpv-web-control/mpv.sock
  MPV_BIN=/usr/bin/mpv
  MAX_FOLDER_ITEMS=5000
  SERVICE_USER=youruser
  SERVICE_GROUP=yourgroup
  NON_INTERACTIVE=1                     (skip prompts)

Examples:
  sudo MUSIC_ROOT=/srv/music SERVICE_USER=pi bash scripts/install.sh
  sudo NON_INTERACTIVE=1 MUSIC_ROOT=/srv/music PORT=8080 bash scripts/install.sh
USAGE
  exit 0
fi

if [[ "$EUID" -ne 0 ]]; then
  echo "❌ Please run as root (use sudo)."
  exit 1
fi

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "❌ Missing required command: $1"; exit 1; }
}

need_cmd systemctl
need_cmd pnpm
need_cmd node
need_cmd install

if [[ -z "$MUSIC_ROOT" && "$NON_INTERACTIVE" != "1" ]]; then
  read -r -p "Music library root path (e.g. /srv/media/music): " MUSIC_ROOT
fi

if [[ -z "$MUSIC_ROOT" ]]; then
  echo "❌ MUSIC_ROOT is required. Set MUSIC_ROOT=/path/to/music"
  exit 1
fi

if [[ ! -d "$MUSIC_ROOT" ]]; then
  echo "❌ MUSIC_ROOT does not exist: $MUSIC_ROOT"
  exit 1
fi

if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [[ "$PORT" -lt 1 ]] || [[ "$PORT" -gt 65535 ]]; then
  echo "❌ PORT must be an integer between 1 and 65535"
  exit 1
fi

if [[ ! -x "$MPV_BIN" ]]; then
  echo "⚠️ MPV_BIN not executable at $MPV_BIN; installer will continue but service may fail until fixed."
fi

echo "==> Installing app to $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"
rsync -a --delete \
  --exclude .git \
  --exclude node_modules \
  --exclude "apps/*/dist" \
  "$REPO_DIR/" "$INSTALL_DIR/"

cd "$INSTALL_DIR"

echo "==> Installing dependencies and building"
pnpm install --frozen-lockfile
pnpm build

echo "==> Creating state directories"
mkdir -p "$PLAYLISTS_DIR" "$RUN_DIR"
chown -R "$SERVICE_USER:$SERVICE_GROUP" "$DEFAULT_STATE_DIR" "$RUN_DIR" || true

cat > "$ENV_FILE" <<EOFENV
HOST=$HOST
PORT=$PORT
MUSIC_ROOT=$MUSIC_ROOT
PLAYLISTS_DIR=$PLAYLISTS_DIR
MPV_SOCKET_PATH=$MPV_SOCKET_PATH
MPV_BIN=$MPV_BIN
MAX_FOLDER_ITEMS=$MAX_FOLDER_ITEMS
EOFENV
chmod 0644 "$ENV_FILE"

echo "==> Writing systemd service: /etc/systemd/system/$SERVICE_NAME"
cat > "/etc/systemd/system/$SERVICE_NAME" <<EOFSVC
[Unit]
Description=mpv web control
After=network.target sound.target

[Service]
Type=simple
User=$SERVICE_USER
Group=$SERVICE_GROUP
WorkingDirectory=$INSTALL_DIR
EnvironmentFile=$ENV_FILE
ExecStart=/usr/bin/pnpm --filter server start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOFSVC

systemctl daemon-reload
systemctl enable --now "$SERVICE_NAME"

IP_ADDR="$(hostname -I 2>/dev/null | awk '{print $1}')"
echo ""
echo "✅ Installation complete"
echo "Service: $SERVICE_NAME"
echo "Status: systemctl status $SERVICE_NAME"
echo "Logs:   journalctl -u $SERVICE_NAME -f"
if [[ -n "$IP_ADDR" ]]; then
  echo "Open:   http://$IP_ADDR:$PORT"
else
  echo "Open:   http://<host-ip>:$PORT"
fi
