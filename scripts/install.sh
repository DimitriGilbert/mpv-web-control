#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# mpv-web-control installer
#
# Usage:
#   sudo ./scripts/install.sh                        # auto-detect tarball
#   sudo ./scripts/install.sh /path/to/tarball.gz    # specify tarball
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

    # Auto-detect: look in <script_dir>/../dist/
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
        echo "  sudo $0 --uninstall"
        exit 1
    fi

    local tarball
    tarball=$(find "${dist_dir}" -maxdepth 1 -name 'mpv-web-control*.tar.gz' -type f 2>/dev/null | head -1)

    if [[ -z "${tarball}" ]]; then
        log_error "No tarball found in ${dist_dir}/"
        echo "  Expected: mpv-web-control-<version>.tar.gz"
        echo ""
        echo "Build first:  pnpm build && pnpm package"
        exit 1
    fi

    echo "${tarball}"
}

# --- Extract tarball ----------------------------------------------------------

extract_tarball() {
    local tarball="$1"

    log_step "Installing to ${INSTALL_DIR}"

    # Backup existing config if present
    if [[ -f "${CONFIG_FILE}" ]]; then
        local backup
        backup="/tmp/${SERVICE_NAME}-env-backup.$(date +%s)"
        cp "${CONFIG_FILE}" "${backup}"
        log_info "Backed up config to ${backup}"
    fi

    # Remove old installation
    if [[ -d "${INSTALL_DIR}" ]]; then
        rm -rf "${INSTALL_DIR}"
        log_info "Removed previous installation."
    fi

    # Create the install directory
    mkdir -p "${INSTALL_DIR}"

    # Extract: the tarball contains a top-level mpv-web-control/ directory.
    # We strip that leading component so contents land directly in INSTALL_DIR.
    tar xzf "${tarball}" --strip-components=1 -C "${INSTALL_DIR}"

    # Set ownership
    chown -R "${SYSTEM_USER}:${SYSTEM_GROUP}" "${INSTALL_DIR}"

    log_info "Extracted $(basename "${tarball}") to ${INSTALL_DIR}"
}

# --- Config file --------------------------------------------------------------

install_config() {
    log_step "Installing configuration"

    mkdir -p "${CONFIG_DIR}"

    local example_env="${INSTALL_DIR}/mpv-web-control.env"

    if [[ -f "${CONFIG_FILE}" ]]; then
        log_info "Config file ${CONFIG_FILE} already exists — keeping it."
    else
        if [[ -f "${example_env}" ]]; then
            cp "${example_env}" "${CONFIG_FILE}"
            log_info "Installed config from example: ${CONFIG_FILE}"
        else
            # Create a minimal config if no example exists
            cat > "${CONFIG_FILE}" <<'ENVEOF'
# mpv-web-control configuration
# See: https://github.com/user/mpv-web-control for docs

# MUSIC_ROOT — root directory for music browsing
# Uncomment and set to your music library path:
# MUSIC_ROOT=/mnt/music

# PORT — HTTP listen port (default: 8080)
# PORT=8080
ENVEOF
            log_info "Created default config: ${CONFIG_FILE}"
        fi
    fi

    chown "${SYSTEM_USER}:${SYSTEM_GROUP}" "${CONFIG_FILE}"
    chmod 600 "${CONFIG_FILE}"

    # Warn if MUSIC_ROOT is still commented out
    if grep -qE '^\s*#\s*MUSIC_ROOT' "${CONFIG_FILE}" 2>/dev/null \
       && ! grep -qE '^\s*MUSIC_ROOT=' "${CONFIG_FILE}" 2>/dev/null; then
        log_warn "MUSIC_ROOT is not set in ${CONFIG_FILE}."
        log_warn "The service will default to the working directory."
    fi
}

# --- Systemd service ----------------------------------------------------------

install_service() {
    log_step "Installing systemd service"

    cat > "${SERVICE_FILE}" <<EOF
[Unit]
Description=mpv-web-control - web remote for mpv
After=network.target
Wants=mpv.service

[Service]
Type=simple
User=${SYSTEM_USER}
Group=${SYSTEM_GROUP}
WorkingDirectory=${INSTALL_DIR}
ExecStart=${INSTALL_DIR}/start.sh
EnvironmentFile=${CONFIG_FILE}
Restart=on-failure
RestartSec=5

# Security hardening
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
    echo "  Install path: ${INSTALL_DIR}"
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

    # 1. Stop service
    if systemctl is-active --quiet "${SERVICE_NAME}" 2>/dev/null; then
        systemctl stop "${SERVICE_NAME}"
        log_info "Stopped ${SERVICE_NAME} service."
    else
        log_info "Service was not running."
    fi

    # 2. Disable service
    if systemctl is-enabled --quiet "${SERVICE_NAME}" 2>/dev/null; then
        systemctl disable "${SERVICE_NAME}" &>/dev/null
        log_info "Disabled ${SERVICE_NAME} service."
    fi

    # 3. Remove service file
    if [[ -f "${SERVICE_FILE}" ]]; then
        rm -f "${SERVICE_FILE}"
        log_info "Removed ${SERVICE_FILE}"
    fi

    systemctl daemon-reload

    # 4. Remove installation directory
    if [[ -d "${INSTALL_DIR}" ]]; then
        rm -rf "${INSTALL_DIR}"
        log_info "Removed ${INSTALL_DIR}"
    else
        log_info "Install directory ${INSTALL_DIR} does not exist."
    fi

    # 5. Ask about config
    if [[ -d "${CONFIG_DIR}" ]]; then
        if ask_yes_no "Remove configuration directory ${CONFIG_DIR}?"; then
            rm -rf "${CONFIG_DIR}"
            log_info "Removed ${CONFIG_DIR}"
        else
            log_info "Kept ${CONFIG_DIR}"
        fi
    fi

    # 6. Ask about user
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
    echo "  Removed:"
    echo "    - ${SERVICE_FILE}"
    echo "    - ${INSTALL_DIR}/"
    echo ""
}

# --- Main ---------------------------------------------------------------------

main() {
    local arg="${1:-}"

    if [[ "${arg}" == "--uninstall" ]]; then
        check_root
        uninstall
        exit 0
    fi

    # If the arg looks like a flag we don't know, bail
    if [[ "${arg}" == --* ]]; then
        log_error "Unknown option: ${arg}"
        echo "Usage:"
        echo "  sudo $0 [PATH_TO_TARBALL]"
        echo "  sudo $0 --uninstall"
        exit 1
    fi

    check_root "${arg:-}"

    # Resolve tarball
    local tarball
    tarball=$(detect_tarball "${arg:-}")

    echo -e "${BOLD}mpv-web-control installer${RESET}"
    echo "  Tarball: ${tarball}"
    echo ""

    # Prerequisites
    log_step "Checking prerequisites"
    check_node
    check_mpv

    # Install steps
    create_system_user
    extract_tarball "${tarball}"
    install_config
    install_service

    # Done
    print_install_summary
}

main "$@"
