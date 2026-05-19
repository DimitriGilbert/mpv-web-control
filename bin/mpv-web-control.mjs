#!/usr/bin/env node

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkgRoot = resolve(__dirname, '..')

const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json'), 'utf8'))

// --- Command implementations ---------------------------------------------------

function printVersion() {
  console.log(`mpv-web-control v${pkg.version}`)
}

function printHelp() {
  console.log(`Usage: mpv-web-control <command> [options]

Commands:
  start           Start the server (default if no command given)
  install         Install as systemd service (requires root)
  uninstall       Uninstall the systemd service
  package         Create a distributable tarball
  version         Print version
  help            Show this help

Options:
  -v, --version   Print version
  -h, --help      Show this help
`)
}

async function startServer() {
  const serverPath = resolve(pkgRoot, 'apps/server/dist/index.js')
  await import(serverPath)
}

function runScript(scriptName, args) {
  const scriptPath = resolve(pkgRoot, 'scripts', scriptName)
  execFileSync(scriptPath, args, { stdio: 'inherit', cwd: pkgRoot })
}

// --- Argument parsing ----------------------------------------------------------

const argv = process.argv.slice(2)
const first = argv[0]

if (first === '--version' || first === '-v') {
  printVersion()
  process.exit(0)
}

if (first === '--help' || first === '-h') {
  printHelp()
  process.exit(0)
}

const command = first ?? 'start'
const commandArgs = argv.slice(first !== undefined ? 1 : 0)

// --- Dispatch ------------------------------------------------------------------

switch (command) {
  case 'start': {
    startServer().catch((err) => {
      console.error(err)
      process.exit(1)
    })
    break
  }
  case 'install': {
    runScript('install.sh', commandArgs)
    break
  }
  case 'uninstall': {
    runScript('install.sh', ['--uninstall'])
    break
  }
  case 'package': {
    runScript('package.sh', [])
    break
  }
  case 'version': {
    printVersion()
    break
  }
  case 'help': {
    printHelp()
    break
  }
  default: {
    console.error(`Unknown command: ${command}`)
    console.error('Run "mpv-web-control help" for usage.')
    process.exit(1)
  }
}
