#!/usr/bin/env bash
set -euo pipefail

# ── mpv-web-control packaging script ────────────────────────────────────────
# Bundles server + client into a self-contained tarball with production deps.
# Must be run from the monorepo root: bash scripts/package.sh

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGING_BASE="${REPO_ROOT}/dist/staging"
STAGING_DIR="${STAGING_BASE}/mpv-web-control"
# ── helpers ──────────────────────────────────────────────────────────────────

info()  { printf '\033[1;34m[INFO]\033[0m  %s\n' "$*"; }
ok()    { printf '\033[1;32m[ OK ]\033[0m  %s\n' "$*"; }
die()   { printf '\033[1;31m[FAIL]\033[0m  %s\n' "$*" >&2; exit 1; }

# ── version detection ────────────────────────────────────────────────────────

detect_version() {
  # 1. Try "version" field in root package.json
  if command -v jq &>/dev/null; then
    local ver
    ver="$(jq -r '.version // empty' "${REPO_ROOT}/package.json" 2>/dev/null || true)"
    if [[ -n "$ver" ]]; then
      echo "$ver"
      return
    fi
  fi

  # 2. Try git describe --tags
  if git -C "$REPO_ROOT" rev-parse --is-inside-work-tree &>/dev/null; then
    local tag
    tag="$(git -C "$REPO_ROOT" describe --tags --always 2>/dev/null || true)"
    if [[ -n "$tag" ]]; then
      echo "$tag"
      return
    fi
  fi

  # 3. Fallback
  echo "dev"
}

VERSION="$(detect_version)"
TARBALL="${REPO_ROOT}/dist/mpv-web-control-${VERSION}.tar.gz"

# ── preflight ────────────────────────────────────────────────────────────────

info "mpv-web-control packager — version ${VERSION}"

[[ -f "${REPO_ROOT}/package.json" ]] || die "package.json not found — run from the monorepo root"
command -v pnpm &>/dev/null          || die "pnpm is required but not found in PATH"
command -v node  &>/dev/null         || die "node is required but not found in PATH"

# ── build ────────────────────────────────────────────────────────────────────

info "Building all packages..."
pnpm build
ok "Build complete"

# Verify expected build outputs exist
[[ -f "${REPO_ROOT}/apps/server/dist/index.js" ]]  || die "Server build output not found: apps/server/dist/index.js"
[[ -f "${REPO_ROOT}/apps/client/dist/index.html" ]] || die "Client build output not found: apps/client/dist/index.html"

# ── clean previous artifacts ─────────────────────────────────────────────────

info "Cleaning previous packaging artifacts..."
rm -rf "${STAGING_BASE}"
mkdir -p "${STAGING_DIR}"

# ── copy server dist ────────────────────────────────────────────────────────

info "Copying server build output..."
mkdir -p "${STAGING_DIR}/apps/server/dist"
cp "${REPO_ROOT}/apps/server/dist/index.js" "${STAGING_DIR}/apps/server/dist/index.js"

# ── copy client dist ────────────────────────────────────────────────────────

info "Copying client build output..."
mkdir -p "${STAGING_DIR}/apps/client/dist"
cp -r "${REPO_ROOT}/apps/client/dist/." "${STAGING_DIR}/apps/client/dist/"

# ── production dependencies via pnpm deploy ──────────────────────────────────

info "Resolving production dependencies..."
mkdir -p "${STAGING_DIR}/node_modules"

src_nm="${REPO_ROOT}/node_modules"
if [[ -d "$src_nm" ]]; then
  for dep in hono @hono/node-server @hono/zod-validator zod; do
    if [[ -d "${src_nm}/${dep}" ]]; then
      mkdir -p "${STAGING_DIR}/node_modules/$(dirname "$dep")"
      cp -r "${src_nm}/${dep}" "${STAGING_DIR}/node_modules/${dep}"
    fi
  done
fi

ok "Production dependencies installed"

# ── minimal package.json ────────────────────────────────────────────────────

info "Writing package.json..."
cat > "${STAGING_DIR}/package.json" <<'PKGJSON'
{
  "name": "mpv-web-control",
  "type": "module",
  "scripts": {
    "start": "node apps/server/dist/index.js"
  }
}
PKGJSON

# ── example environment file ────────────────────────────────────────────────

info "Writing mpv-web-control.env..."
cat > "${STAGING_DIR}/mpv-web-control.env" <<'ENVFILE'
#HOST=0.0.0.0
#PORT=3000
#MUSIC_ROOT=
#PLAYLISTS_DIR=
#MPV_SOCKET_PATH=/tmp/mpv-web-control.sock
#MPV_BIN=mpv
#MAX_FOLDER_ITEMS=5000
ENVFILE

# ── start.sh entry point ────────────────────────────────────────────────────

info "Writing start.sh..."
cat > "${STAGING_DIR}/start.sh" <<'ENTRYPOINT'
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v node &>/dev/null; then
  echo "error: 'node' is required but not found in PATH" >&2
  exit 1
fi

# System-level config (installed by the user or distro package)
if [[ -f /etc/mpv-web-control/env ]]; then
  # shellcheck source=/dev/null
  source /etc/mpv-web-control/env
fi

# Local override, co-located with the installation
if [[ -f "${SCRIPT_DIR}/mpv-web-control.env" ]]; then
  # shellcheck source=/dev/null
  source "${SCRIPT_DIR}/mpv-web-control.env"
fi

exec node apps/server/dist/index.js
ENTRYPOINT

chmod +x "${STAGING_DIR}/start.sh"

# ── tarball ──────────────────────────────────────────────────────────────────

info "Creating tarball..."
mkdir -p "${REPO_ROOT}/dist"

tar -czf "${TARBALL}" -C "${STAGING_BASE}" "mpv-web-control"

TARBALL_SIZE="$(du -h "${TARBALL}" | cut -f1)"

# ── cleanup staging ─────────────────────────────────────────────────────────

info "Cleaning up staging directory..."
rm -rf "${STAGING_BASE}"

# ── done ─────────────────────────────────────────────────────────────────────

ok "Package created: ${TARBALL} (${TARBALL_SIZE})"
