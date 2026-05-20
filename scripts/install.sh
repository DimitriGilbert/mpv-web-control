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
    if id "${SYSTEM_USER}" &>/dev/null; then
        log_info "User '${SYSTEM_USER}' already exists."
        return 0
    fi

    useradd --system --no-create-home --shell /usr/sbin/nologin "${SYSTEM_USER}"
    log_info "Created system user '${SYSTEM_USER}'."
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

    chown -R "${SYSTEM_USER}:${SYSTEM_GROUP}" "${INSTALL_DIR}"

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

    chown "${SYSTEM_USER}:${SYSTEM_GROUP}" "${CONFIG_FILE}"
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

    log_step "Installing systemd service"

    cat > "${SERVICE_FILE}" <<EOF
[Unit]
Description=mpv-web-control - web remote for mpv
After=network.target

[Service]
Type=simple
User=${SYSTEM_USER}
Group=${SYSTEM_GROUP}
WorkingDirectory=${working_dir}
ExecStart=${exec_start}
EnvironmentFile=${CONFIG_FILE}
Restart=on-failure
RestartSec=5

NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/tmp
PrivateTmp=false

[Install]
WantedBy=multi-user.target
EOF

    chmod 644 "${SERVICE_FILE}"

    systemctl daemon-reload
    systemctl enable "${SERVICE_NAME}" &>/dev/null

    log_info "Service installed and enabled."
}

# --- Install summary ----------------------------------------------------------

print_install_summary() {
    echo ""
    echo -e "${GREEN}${BOLD}Installation complete!${RESET}"
    echo ""
    echo "  Config file:  ${CONFIG_FILE}"
    echo ""
    echo "  Edit config:  sudo nano ${CONFIG_FILE}"
    echo "  Start:        sudo systemctl start ${SERVICE_NAME}"
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

    if id "${SYSTEM_USER}" &>/dev/null; then
        if ask_yes_no "Remove system user '${SYSTEM_USER}'?"; then
            userdel "${SYSTEM_USER}" 2>/dev/null || true
            log_info "Removed user '${SYSTEM_USER}'."
        else
            log_info "Kept user '${SYSTEM_USER}'."
        fi
    fi

    echo ""
    echo -e "${GREEN}${BOLD}Uninstall complete.${RESET}"
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

    install_config "${music_root}" "${port}" "${bin_path} start" "${npm_pkg_dir}"

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
    install_config ""
    install_service "${INSTALL_DIR}/start.sh" "${INSTALL_DIR}"

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
