#!/usr/bin/env bash
set -euo pipefail

# ── mpv-web-control release script ──────────────────────────────────────────
# Creates a versioned release: bumps versions, tags, pushes, packages, and
# publishes to GitHub Releases and npm.
#
# Usage:
#   scripts/release.sh <version> [--no-gh] [--no-npm] [--dry-run]
#
# Arguments:
#   <version>   Required. Semver version (e.g. 1.0.0, 2.3.1)
#   --no-gh     Skip GitHub release creation
#   --no-npm    Skip npm publish
#   --dry-run   Print what would happen without executing mutating commands

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
readonly REPO_ROOT

readonly SEMVER_REGEX='^[0-9]+\.[0-9]+\.[0-9]+$'
readonly GITHUB_REPO="DimitriGilbert/mpv-web-control"

# ── helpers ──────────────────────────────────────────────────────────────────

info()    { printf '\033[1;34m[INFO]\033[0m  %s\n' "$*"; }
ok()      { printf '\033[1;32m[ OK ]\033[0m  %s\n' "$*"; }
warn()    { printf '\033[1;33m[WARN]\033[0m  %s\n' "$*"; }
die()     { printf '\033[1;31m[FAIL]\033[0m  %s\n' "$*" >&2; exit 1; }
dryrun()  { printf '\033[1;36m[DRY RUN]\033[0m %s\n' "$*"; }

# ── argument parsing ────────────────────────────────────────────────────────

VERSION=""
NO_GH=false
NO_NPM=false
DRY_RUN=false

parse_args() {
  if [[ $# -lt 1 ]]; then
    die "Usage: scripts/release.sh <version> [--no-gh] [--no-npm] [--dry-run]"
  fi

  VERSION="$1"
  shift

  for arg in "$@"; do
    case "$arg" in
      --no-gh)   NO_GH=true ;;
      --no-npm)  NO_NPM=true ;;
      --dry-run) DRY_RUN=true ;;
      *)         die "Unknown option: ${arg}" ;;
    esac
  done
}

# ── version validation ──────────────────────────────────────────────────────

validate_version() {
  if [[ ! "$VERSION" =~ $SEMVER_REGEX ]]; then
    die "Invalid version '${VERSION}'. Must be semver (e.g. 1.0.0, 2.3.1)"
  fi
}

# ── preflight checks ────────────────────────────────────────────────────────

preflight_checks() {
  info "Running preflight checks..."

  command -v git  &>/dev/null || die "git is required but not found in PATH"
  command -v node &>/dev/null || die "node is required but not found in PATH"
  command -v pnpm &>/dev/null || die "pnpm is required but not found in PATH"

  # Working tree must be clean
  if ! git -C "$REPO_ROOT" diff --quiet 2>/dev/null || \
     ! git -C "$REPO_ROOT" diff --cached --quiet 2>/dev/null; then
    die "Working tree is not clean. Commit or stash your changes first."
  fi

  # Branch check
  local current_branch
  current_branch="$(git -C "$REPO_ROOT" rev-parse --abbrev-ref HEAD)"
  if [[ "$current_branch" != "main" && "$current_branch" != "master" ]]; then
    warn "Not on main/master branch (current: ${current_branch}). Continuing anyway."
  fi

  # GitHub auth check
  if [[ "$NO_GH" == false ]]; then
    command -v gh &>/dev/null || die "gh CLI is required for GitHub releases but not found in PATH"
    if ! gh auth status &>/dev/null 2>&1; then
      die "gh auth status failed. Run 'gh auth login' first."
    fi
    ok "GitHub CLI authenticated"
  fi

  # npm auth check
  if [[ "$NO_NPM" == false ]]; then
    if ! npm whoami &>/dev/null 2>&1; then
      die "npm whoami failed. Run 'npm login' first."
    fi
    ok "npm authenticated"
  fi

  ok "Preflight checks passed"
}

# ── guard: typecheck ────────────────────────────────────────────────────────

guard_typecheck() {
  info "Running typecheck..."
  if ! pnpm typecheck; then
    die "Typecheck failed. Fix type errors before releasing."
  fi
  ok "Typecheck passed"
}

# ── guard: build ────────────────────────────────────────────────────────────

guard_build() {
  info "Building all packages..."
  if ! pnpm build; then
    die "Build failed. Fix build errors before releasing."
  fi
  ok "Build complete"
}

# ── guard: verify build outputs ─────────────────────────────────────────────

guard_verify_outputs() {
  info "Verifying build outputs..."

  local server_out="${REPO_ROOT}/apps/server/dist/index.js"
  local client_out="${REPO_ROOT}/apps/client/dist/index.html"

  [[ -f "$server_out" ]] || die "Server build output not found: ${server_out}"
  [[ -f "$client_out" ]] || die "Client build output not found: ${client_out}"

  ok "Build outputs verified"
}

# ── bump versions ───────────────────────────────────────────────────────────

bump_version_in_file() {
  local file="$1"

  if [[ ! -f "$file" ]]; then
    return 0
  fi

  # Check the file actually has a version field
  if ! grep -q '"version"' "$file" 2>/dev/null; then
    return 0
  fi

  if command -v jq &>/dev/null; then
    local tmp
    tmp="$(mktemp)"
    jq --arg v "$VERSION" '.version = $v' "$file" > "$tmp" && mv "$tmp" "$file"
  else
    # sed fallback: replace "version": "<anything>" with the new version
    sed -i -E 's/"version"[[:space:]]*:[[:space:]]*"[^"]*"/"version": "'"${VERSION}"'"/' "$file"
  fi
}

bump_versions() {
  info "Bumping versions to ${VERSION}..."

  local package_files=(
    "${REPO_ROOT}/package.json"
    "${REPO_ROOT}/apps/server/package.json"
    "${REPO_ROOT}/apps/client/package.json"
    "${REPO_ROOT}/packages/contract/package.json"
  )

  if [[ "$DRY_RUN" == true ]]; then
    for f in "${package_files[@]}"; do
      if [[ -f "$f" ]] && grep -q '"version"' "$f" 2>/dev/null; then
        dryrun "Would bump version to ${VERSION} in ${f#"${REPO_ROOT}"/}"
      fi
    done
    return 0
  fi

  for f in "${package_files[@]}"; do
    bump_version_in_file "$f"
  done

  ok "Versions bumped to ${VERSION}"
}

# ── git operations ──────────────────────────────────────────────────────────

git_commit_tag_push() {
  local package_files=(
    "package.json"
    "apps/server/package.json"
    "apps/client/package.json"
    "packages/contract/package.json"
  )

  if [[ "$DRY_RUN" == true ]]; then
    dryrun "Would git add: ${package_files[*]}"
    dryrun "Would git commit -m 'release v${VERSION}'"
    dryrun "Would git tag v${VERSION}"
    dryrun "Would git push && git push --tags"
    return 0
  fi

  # Stage only the package.json files that exist
  local files_to_add=()
  for f in "${package_files[@]}"; do
    if [[ -f "${REPO_ROOT}/${f}" ]]; then
      files_to_add+=("${REPO_ROOT}/${f}")
    fi
  done

  info "Committing version bump..."
  git -C "$REPO_ROOT" add "${files_to_add[@]}" || die "git add failed"
  git -C "$REPO_ROOT" commit -m "release v${VERSION}" || die "git commit failed"
  ok "Committed version bump"

  info "Tagging v${VERSION}..."
  git -C "$REPO_ROOT" tag "v${VERSION}" || die "git tag failed (does tag v${VERSION} already exist?)"
  ok "Tagged v${VERSION}"

  info "Pushing to remote..."
  git -C "$REPO_ROOT" push -u origin HEAD || die "git push failed — commit and tag exist locally but were NOT pushed"
  git -C "$REPO_ROOT" push --tags || die "git push --tags failed — commit was pushed but tag was NOT"
  ok "Pushed commit and tag to remote"
}

# ── package tarball ─────────────────────────────────────────────────────────

create_tarball() {
  if [[ "${DRY_RUN}" == true ]]; then
    dryrun "Would create tarball via scripts/package.sh"
    return 0
  fi
  info "Creating package tarball..."
  if ! bash "${REPO_ROOT}/scripts/package.sh"; then
    die "Package script failed"
  fi
  ok "Tarball created"
}

# ── GitHub release ──────────────────────────────────────────────────────────

github_release() {
  if [[ "$NO_GH" == true ]]; then
    info "Skipping GitHub release (--no-gh)"
    return 0
  fi

  if [[ "$DRY_RUN" == true ]]; then
    dryrun "Would run: gh release create v${VERSION} with tarball"
    return 0
  fi

  local tarball
  tarball="${REPO_ROOT}/dist/mpv-web-control-${VERSION}.tar.gz"

  if [[ ! -f "$tarball" ]]; then
    die "Tarball not found: ${tarball}"
  fi

  info "Creating GitHub release v${VERSION}..."
  if ! gh release create "v${VERSION}" "$tarball" --repo "$GITHUB_REPO" --title "v${VERSION}" --notes "Release v${VERSION}"; then
    die "GitHub release creation failed"
  fi
  ok "GitHub release created: https://github.com/${GITHUB_REPO}/releases/tag/v${VERSION}"
}

# ── npm publish ─────────────────────────────────────────────────────────────

npm_publish() {
  if [[ "$NO_NPM" == true ]]; then
    info "Skipping npm publish (--no-npm)"
    return 0
  fi

  if [[ "$DRY_RUN" == true ]]; then
    dryrun "Would run: npm publish --dry-run"
    npm publish --dry-run
    return 0
  fi

  info "Publishing to npm..."
  local npm_output
  npm_output="$(npm publish 2>&1)" || die "npm publish failed:\n${npm_output}"
  ok "Published to npm: https://www.npmjs.com/package/mpv-web-control"
}

# ── summary ─────────────────────────────────────────────────────────────────

print_summary() {
  echo ""
  printf '\033[1;32m%s\033[0m\n' "══════════════════════════════════════════"
  printf '\033[1;32m%s\033[0m\n' "  Release v${VERSION} complete!"
  printf '\033[1;32m%s\033[0m\n' "══════════════════════════════════════════"
  echo ""
  echo "  Version:       ${VERSION}"
  echo "  Git tag:       v${VERSION}"

  if [[ "$NO_GH" == false ]]; then
    echo "  GitHub:        https://github.com/${GITHUB_REPO}/releases/tag/v${VERSION}"
  else
    echo "  GitHub:        (skipped)"
  fi

  if [[ "$NO_NPM" == false ]]; then
    echo "  npm:           https://www.npmjs.com/package/mpv-web-control"
  else
    echo "  npm:           (skipped)"
  fi

  if [[ "$DRY_RUN" == true ]]; then
    echo "  Tarball:       (skipped)"
  else
    echo "  Tarball:       dist/mpv-web-control-${VERSION}.tar.gz"
  fi
  echo ""

  if [[ "$DRY_RUN" == true ]]; then
    printf '\033[1;36m%s\033[0m\n' "  (dry run — no mutations were performed)"
    echo ""
  fi
}

# ── main ────────────────────────────────────────────────────────────────────

main() {
  parse_args "$@"
  validate_version

  info "mpv-web-control release — v${VERSION}"

  preflight_checks
  guard_typecheck
  guard_build
  guard_verify_outputs
  bump_versions
  git_commit_tag_push
  create_tarball
  github_release
  npm_publish
  print_summary
}

main "$@"
