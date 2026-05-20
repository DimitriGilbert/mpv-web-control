#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# mpv-web-control installer
#
# Usage:
#   sudo ./scripts/install.sh [PATH_TO_TARBALL]
#   sudo ./scripts/install.sh --from-npm --music-root /path/to/music
#   sudo ./scripts/install.sh --uninstall
# =============================================================================

readonly SERVICE_NAME="mpv-web-control"
readonly INSTALL_DIR="/opt/mpv-web-control"
readonly CONFIG_DIR="/etc/mpv-web-control"
readonly CONFIG_FILE="${CONFIG_DIR}/env"
readonly SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
readonly SYSTEM_USER="${SERVICE_NAME}"
readonly SYSTEM_GROUP="${SERVICE_NAME}"
readonly DATA_DIR="/var/lib/${SERVICE_NAME}"

SERVICE_USER=""
SERVICE_GROUP=""
ENABLE_SERVICE=true

# --- Colors ------------------------------------------------------------------

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
RESET='\033[0m'

log_info()    { echo -e "${GREEN}[OK]${RESET} $*"; }
log_warn()    { echo -e "${YELLOW}[WARN]${RESET} $*"; }
log_error()   { echo -e "${RED}[ERROR]${RESET} $*" >&2; }
log_step()    { echo -e "\n${BOLD}==>${RESET} $*"; }

# --- Helpers ------------------------------------------------------------------

ask_yes_no() {
    local prompt="$1"
    local answer
    while true; do
        echo -n -e "${YELLOW}${prompt} [y/N]: ${RESET}"
        read -r answer
        case "${answer}" in
            [yY]|[yY][eE][sS]) return 0 ;;
            *) return 1 ;;
        esac
    done
}

# --- Root check ---------------------------------------------------------------

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root."
        echo "  sudo $0 $*"
        exit 1
    fi
}

# --- Prerequisites ------------------------------------------------------------

check_node() {
    if ! command -v node &>/dev/null; then
        log_error "Node.js is not installed."
        echo "  Install Node.js v22 or later: https://nodejs.org/"
        exit 1
    fi

    local node_version
    node_version=$(node -v 2>/dev/null | sed 's/^v//' | cut -d. -f1)
    if [[ "${node_version}" -lt 22 ]]; then
        log_error "Node.js v22+ is required (found v${node_version})."
        exit 1
    fi
    log_info "Node.js $(node -v) found."
}

check_mpv() {
    if ! command -v mpv &>/dev/null; then
        log_warn "mpv is not installed. The server will not be able to control playback."
        log_warn "Install mpv before starting the service: https://mpv.io/"
    else
        log_info "mpv $(mpv --version | head -1 | awk '{print $2}') found."
    fi
}

# --- System user --------------------------------------------------------------

create_system_user() {
    local user="${SERVICE_USER:-${SYSTEM_USER}}"

    if id "${user}" &>/dev/null; then
        log_info "User '${user}' already exists."
        return 0
    fi

    useradd --system --no-create-home --shell /usr/sbin/nologin "${user}"
    log_info "Created system user '${user}'."
}

# --- Tarball detection --------------------------------------------------------

detect_tarball() {
    local provided_path="${1:-}"

    if [[ -n "${provided_path}" ]]; then
        if [[ ! -f "${provided_path}" ]]; then
            log_error "Tarball not found: ${provided_path}"
            exit 1
        fi
        echo "${provided_path}"
        return 0
    fi

    local script_dir
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local repo_root
    repo_root="$(cd "${script_dir}/.." && pwd)"
    local dist_dir="${repo_root}/dist"

    if [[ ! -d "${dist_dir}" ]]; then
        log_error "No dist/ directory found at ${dist_dir}"
        echo ""
        echo "Usage:"
        echo "  sudo $0 [PATH_TO_TARBALL]"
        echo "  sudo $0 --from-npm --music-root /path/to/music"
        echo "  sudo $0 --uninstall"
        exit 1
    fi

    local tarball
    tarball=$(find "${dist_dir}" -maxdepth 1 -name 'mpv-web-control*.tar.gz' -type f 2>/dev/null | head -1)

    if [[ -z "${tarball}" ]]; then
        log_error "No tarball found in ${dist_dir}/"
        echo "  Expected: mpv-web-control-<version>.tar.gz"
        echo ""
        echo "Build first:  bash scripts/package.sh"
        exit 1
    fi

    echo "${tarball}"
}

# --- Extract tarball ----------------------------------------------------------

extract_tarball() {
    local tarball="$1"

    log_step "Installing to ${INSTALL_DIR}"

    if [[ -f "${CONFIG_FILE}" ]]; then
        local backup
        backup="/tmp/${SERVICE_NAME}-env-backup.$(date +%s)"
        cp "${CONFIG_FILE}" "${backup}"
        log_info "Backed up config to ${backup}"
    fi

    if [[ -d "${INSTALL_DIR}" ]]; then
        rm -rf "${INSTALL_DIR}"
        log_info "Removed previous installation."
    fi

    mkdir -p "${INSTALL_DIR}"

    tar xzf "${tarball}" --strip-components=1 -C "${INSTALL_DIR}"

    chown -R "${SERVICE_USER:-${SYSTEM_USER}}:${SERVICE_GROUP:-${SYSTEM_GROUP}}" "${INSTALL_DIR}"

    log_info "Extracted $(basename "${tarball}") to ${INSTALL_DIR}"
}

# --- Config file --------------------------------------------------------------

install_config() {
    local music_root="${1:-}"
    local port="${2:-}"

    log_step "Installing configuration"

    mkdir -p "${CONFIG_DIR}"

    if [[ -f "${CONFIG_FILE}" ]]; then
        log_info "Config file ${CONFIG_FILE} already exists — keeping it."
    else
        local example_env="${INSTALL_DIR}/mpv-web-control.env"

        if [[ -f "${example_env}" ]]; then
            cp "${example_env}" "${CONFIG_FILE}"
            log_info "Installed config from example: ${CONFIG_FILE}"
        else
            cat > "${CONFIG_FILE}" <<'ENVEOF'
# mpv-web-control configuration
#HOST=0.0.0.0
#PORT=3000
#MPV_SOCKET_PATH=/tmp/mpv-web-control.sock
#MPV_BIN=mpv
#MAX_FOLDER_ITEMS=5000
ENVEOF
            log_info "Created default config: ${CONFIG_FILE}"
        fi
    fi

    if [[ -n "${music_root}" ]]; then
        if grep -qE '^\s*MUSIC_ROOT=' "${CONFIG_FILE}" 2>/dev/null; then
            sed -i "s|^\s*MUSIC_ROOT=.*|MUSIC_ROOT=${music_root}|" "${CONFIG_FILE}"
        else
            echo "MUSIC_ROOT=${music_root}" >> "${CONFIG_FILE}"
        fi
        log_info "Set MUSIC_ROOT=${music_root}"
    fi

    if [[ -n "${port}" ]]; then
        if grep -qE '^\s*PORT=' "${CONFIG_FILE}" 2>/dev/null; then
            sed -i "s|^\s*PORT=.*|PORT=${port}|" "${CONFIG_FILE}"
        else
            echo "PORT=${port}" >> "${CONFIG_FILE}"
        fi
        log_info "Set PORT=${port}"
    fi

    if ! grep -qE '^\s*PLAYLISTS_DIR=' "${CONFIG_FILE}" 2>/dev/null; then
        echo "PLAYLISTS_DIR=${DATA_DIR}/playlists" >> "${CONFIG_FILE}"
        log_info "Set PLAYLISTS_DIR=${DATA_DIR}/playlists"
    fi

    chown "${SERVICE_USER:-${SYSTEM_USER}}:${SERVICE_GROUP:-${SERVICE_USER:-${SYSTEM_USER}}}" "${CONFIG_FILE}"
    chmod 600 "${CONFIG_FILE}"

    if ! grep -qE '^\s*MUSIC_ROOT=' "${CONFIG_FILE}" 2>/dev/null; then
        log_warn "MUSIC_ROOT is not set in ${CONFIG_FILE}."
        log_warn "The service will default to the working directory."
    fi
}

# --- Systemd service ----------------------------------------------------------

install_service() {
    local exec_start="$1"
    local working_dir="$2"
    local music_root="${3:-}"

    local user="${SERVICE_USER:-${SYSTEM_USER}}"
    local group="${SERVICE_GROUP:-${user}}"

    log_step "Installing systemd service"

    local rw_paths="/tmp ${DATA_DIR}"
    if [[ -n "${music_root}" ]]; then
        rw_paths="${rw_paths} ${music_root}"
    fi

    mkdir -p "${DATA_DIR}"
    chown "${user}:${group}" "${DATA_DIR}"

    cat > "${SERVICE_FILE}" <<EOF
[Unit]
Description=mpv-web-control - web remote for mpv
After=network.target

[Service]
Type=simple
User=${user}
Group=${group}
WorkingDirectory=${working_dir}
ExecStart=${exec_start}
EnvironmentFile=${CONFIG_FILE}
Restart=on-failure
RestartSec=5

NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=read-only
ReadWritePaths=${rw_paths}

[Install]
WantedBy=multi-user.target
EOF

    chmod 644 "${SERVICE_FILE}"

    systemctl daemon-reload
    if [[ "${ENABLE_SERVICE}" == true ]]; then
        systemctl enable "${SERVICE_NAME}" &>/dev/null
        systemctl restart "${SERVICE_NAME}" || {
            log_error "Failed to start ${SERVICE_NAME}. Check logs with: sudo journalctl -u ${SERVICE_NAME} -n 50 --no-pager"
            exit 1
        }
        log_info "Service installed, enabled, and started."
        return 0
    fi

    log_info "Service installed. Enable/start skipped (--no-enable)."
}

# --- Install summary ----------------------------------------------------------

print_install_summary() {
    echo ""
    echo -e "${GREEN}${BOLD}Installation complete!${RESET}"
    echo ""
    echo "  Config file:  ${CONFIG_FILE}"
    echo ""
    echo "  Edit config:  sudo nano ${CONFIG_FILE}"
    echo "  Restart:      sudo systemctl restart ${SERVICE_NAME}"
    echo "  Status:       sudo systemctl status ${SERVICE_NAME}"
    echo "  Logs:         sudo journalctl -u ${SERVICE_NAME} -f"
    echo ""
}

# --- Uninstall ----------------------------------------------------------------

uninstall() {
    log_step "Uninstalling mpv-web-control"

    if systemctl is-active --quiet "${SERVICE_NAME}" 2>/dev/null; then
        systemctl stop "${SERVICE_NAME}"
        log_info "Stopped ${SERVICE_NAME} service."
    else
        log_info "Service was not running."
    fi

    if systemctl is-enabled --quiet "${SERVICE_NAME}" 2>/dev/null; then
        systemctl disable "${SERVICE_NAME}" &>/dev/null
        log_info "Disabled ${SERVICE_NAME} service."
    fi

    if [[ -f "${SERVICE_FILE}" ]]; then
        rm -f "${SERVICE_FILE}"
        log_info "Removed ${SERVICE_FILE}"
    fi

    systemctl daemon-reload

    if [[ -d "${INSTALL_DIR}" ]]; then
        rm -rf "${INSTALL_DIR}"
        log_info "Removed ${INSTALL_DIR}"
    else
        log_info "Install directory ${INSTALL_DIR} does not exist."
    fi

    if [[ -d "${CONFIG_DIR}" ]]; then
        if ask_yes_no "Remove configuration directory ${CONFIG_DIR}?"; then
            rm -rf "${CONFIG_DIR}"
            log_info "Removed ${CONFIG_DIR}"
        else
            log_info "Kept ${CONFIG_DIR}"
        fi
    fi

    if [[ -d "${DATA_DIR}" ]]; then
        if ask_yes_no "Remove data directory ${DATA_DIR}?"; then
            rm -rf "${DATA_DIR}"
            log_info "Removed ${DATA_DIR}"
        else
            log_info "Kept ${DATA_DIR}"
        fi
    fi

    echo ""
    echo -e "${GREEN}${BOLD}Uninstall complete.${RESET}"
    echo ""
    echo "  Removed:"
    echo "    - ${SERVICE_FILE}"
    echo "    - ${INSTALL_DIR}/"
    echo ""
}

# --- Install from npm ---------------------------------------------------------

install_from_npm() {
    local music_root="${1:-}"
    local port="${2:-}"

    echo -e "${BOLD}mpv-web-control installer (npm)${RESET}"
    echo ""

    log_step "Checking prerequisites"
    check_node
    check_mpv

    create_system_user

    local bin_path
    bin_path="$(command -v mpv-web-control)" || true
    if [[ -z "${bin_path}" ]]; then
        log_error "mpv-web-control not found in PATH"
        exit 1
    fi

    local npm_pkg_dir
    npm_pkg_dir="$(dirname "$(dirname "${bin_path}")")"

    log_info "Found mpv-web-control at ${bin_path}"

    install_config "${music_root}" "${port}"

    install_service "${bin_path} start" "${npm_pkg_dir}" "${music_root}"

    print_install_summary
}

# --- Install from tarball -------------------------------------------------------

install_from_tarball() {
    local tarball_arg="${1:-}"

    local tarball
    tarball=$(detect_tarball "${tarball_arg}")

    echo -e "${BOLD}mpv-web-control installer${RESET}"
    echo "  Tarball: ${tarball}"
    echo ""

    log_step "Checking prerequisites"
    check_node
    check_mpv

    create_system_user
    extract_tarball "${tarball}"
    install_config "" ""
    install_service "${INSTALL_DIR}/start.sh" "${INSTALL_DIR}" ""

    print_install_summary
}

# --- Main ---------------------------------------------------------------------

main() {
    local arg="${1:-}"
    local music_root=""
    local port=""

    if [[ "${arg}" == "--uninstall" ]]; then
        check_root
        uninstall
        exit 0
    fi

    if [[ "${arg}" == "--from-npm" ]]; then
        shift || true
        while [[ $# -gt 0 ]]; do
            case "$1" in
                --music-root)
                    music_root="${2:-}"
                    shift 2 || true
                    ;;
                --port)
                    port="${2:-}"
                    shift 2 || true
                    ;;
                --user)
                    SERVICE_USER="${2:-}"
                    SERVICE_GROUP="${SERVICE_USER}"
                    shift 2 || true
                    ;;
                --no-enable)
                    ENABLE_SERVICE=false
                    shift || true
                    ;;
                *)
                    shift || true
                    ;;
            esac
        done

        check_root
        install_from_npm "${music_root}" "${port}"
        exit 0
    fi

    check_root "${arg:-}"
    install_from_tarball "${arg:-}"
}

main "$@"
