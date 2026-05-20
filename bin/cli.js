#!/usr/bin/env node

import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createInterface } from 'node:readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkgRoot = resolve(__dirname, '..')

const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json'), 'utf8'))

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
  --music-root    Set music root directory (install command)
  --port          Set HTTP port (install command)
  --user          Set service user (install command)
  --no-enable     Do not enable or start the systemd service (install command)
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

function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function doInstall(args) {
  let musicRoot = null
  let port = null
  let user = null
  let noEnable = false
  const rest = []

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--music-root' && args[i + 1]) {
      musicRoot = args[i + 1]
      i++
    } else if (args[i] === '--port' && args[i + 1]) {
      port = args[i + 1]
      i++
    } else if (args[i] === '--user' && args[i + 1]) {
      user = args[i + 1]
      i++
    } else if (args[i] === '--no-enable') {
      noEnable = true
    } else {
      rest.push(args[i])
    }
  }

  if (!musicRoot) {
    musicRoot = await prompt('Music root directory: ')
    if (!musicRoot) {
      console.error('Music root is required.')
      process.exit(1)
    }
  }

  if (!port) {
    port = await prompt('HTTP port [3000]: ')
    if (!port) port = '3000'
  }

  const installArgs = ['--from-npm', '--music-root', musicRoot, '--port', port]
  if (user) installArgs.push('--user', user)
  if (noEnable) installArgs.push('--no-enable')

  runScript('install.sh', [...installArgs, ...rest])
}

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

switch (command) {
  case 'start': {
    startServer().catch((err) => {
      console.error(err)
      process.exit(1)
    })
    break
  }
  case 'install': {
    doInstall(commandArgs).catch((err) => {
      console.error(err)
      process.exit(1)
    })
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
