#!/usr/bin/env node
// Preflight check for svg-creator's runtime needs.
//
// Verifies:
//   - Node ≥ 20         (hard requirement — exit 1 if missing)
//   - sharp resolvable  (required by convert.mjs — offer to install)
//   - chrome-devtools MCP (optional — recommended for agent-driven
//                          screenshot verification of the preview)
//
// Usage:
//   node preflight.mjs              # check, print status
//   node preflight.mjs --install    # install missing required deps
//   node preflight.mjs --yes        # skip confirmation prompts (use with --install)
//
// Exit codes: 0 = all required deps present, 1 = required missing, 2 = bad invocation.

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { homedir } from 'node:os'
import { resolve, join } from 'node:path'
import { stdin, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'

const args = new Set(process.argv.slice(2))
const wantInstall = args.has('--install')
const skipConfirm = args.has('--yes') || args.has('-y')

const req = createRequire(resolve(process.cwd(), '_'))

const checks = []

// ---- Node version --------------------------------------------------------

const nodeVersion = process.versions.node
const nodeMajor = Number(nodeVersion.split('.')[0])
checks.push({
  name: 'Node ≥ 20',
  ok: nodeMajor >= 20,
  required: true,
  detail: `current: ${nodeVersion}`,
  fix: 'install Node 20+ from https://nodejs.org or via nvm/fnm/volta',
  installable: false,
})

// ---- sharp ---------------------------------------------------------------

let sharpOk = false
try {
  req.resolve('sharp')
  sharpOk = true
} catch {
  /* not resolvable */
}
checks.push({
  name: 'sharp (SVG → PNG / JPEG / WebP / AVIF)',
  ok: sharpOk,
  required: true,
  detail: sharpOk ? 'resolvable from cwd' : 'not resolvable from cwd',
  fix: detectInstallCmd('sharp'),
  installable: true,
  pkg: 'sharp',
})

// ---- chrome-devtools MCP (optional) --------------------------------------

const cdpHints = detectChromeDevtoolsMcp()
checks.push({
  name: 'chrome-devtools MCP (optional, enables agent screenshot verification)',
  ok: cdpHints.found,
  required: false,
  detail: cdpHints.detail,
  fix: 'install via your agent harness (e.g., `claude plugins install chrome-devtools-mcp`) — see https://github.com/ChromeDevTools/chrome-devtools-mcp',
  installable: false,
})

// ---- Report --------------------------------------------------------------

const pad = (s, n) => s + ' '.repeat(Math.max(0, n - s.length))

console.log('svg-creator preflight\n')
for (const c of checks) {
  console.log(`${markFor(c)} ${pad(c.name, 56)} ${c.detail}${tagFor(c)}`)
  if (!c.ok) console.log(`    fix: ${c.fix}`)
}

const missingRequired = checks.filter((c) => c.required && !c.ok)

if (!missingRequired.length) {
  console.log('\nall required deps present.')
  process.exit(0)
}

console.log(`\n${missingRequired.length} required dep(s) missing.`)

// ---- Install path --------------------------------------------------------

if (!wantInstall) {
  console.log('\nrerun with `--install` to install them, or run the fix command(s) above manually.')
  process.exit(1)
}

const installable = missingRequired.filter((c) => c.installable)
if (!installable.length) {
  console.log('\nnone of the missing deps can be auto-installed by this script — fix manually.')
  process.exit(1)
}

if (!skipConfirm) {
  const rl = createInterface({ input: stdin, output: stdout })
  const list = installable.map((c) => c.pkg).join(', ')
  const ans = (await rl.question(`\ninstall ${list}? [y/N] `)).trim().toLowerCase()
  rl.close()
  if (ans !== 'y' && ans !== 'yes') {
    console.log('aborted.')
    process.exit(1)
  }
}

const packageManager = detectPackageManager()
let allOk = true
for (const c of installable) {
  const cmd = installCmdFor(packageManager, c.pkg)
  console.log(`\n→ ${cmd.join(' ')}`)
  const result = spawnSync(cmd[0], cmd.slice(1), { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`✗ ${c.pkg} install failed (exit ${result.status})`)
    allOk = false
  }
}

process.exit(allOk ? 0 : 1)

// ---------------------------------------------------------------------------

function detectPackageManager() {
  const cwd = process.cwd()
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  if (existsSync(join(cwd, 'bun.lockb')) || existsSync(join(cwd, 'bun.lock'))) return 'bun'
  if (existsSync(join(cwd, 'package-lock.json'))) return 'npm'
  return 'npm'
}

function installCmdFor(pm, pkg) {
  switch (pm) {
    case 'pnpm':
      return ['pnpm', 'add', '-D', pkg]
    case 'yarn':
      return ['yarn', 'add', '-D', pkg]
    case 'bun':
      return ['bun', 'add', '-d', pkg]
    case 'npm':
    default:
      return ['npm', 'install', '-D', pkg]
  }
}

function detectInstallCmd(pkg) {
  return installCmdFor(detectPackageManager(), pkg).join(' ')
}

function markFor(c) {
  if (c.ok) return '✓'
  return c.required ? '✗' : '○'
}

function tagFor(c) {
  if (c.ok) return ''
  return c.required ? '  REQUIRED' : '  optional'
}

function detectChromeDevtoolsMcp() {
  const candidates = [
    join(homedir(), '.claude.json'),
    join(homedir(), '.claude', 'config.json'),
    join(process.cwd(), '.mcp.json'),
    join(process.cwd(), '.claude', 'mcp.json'),
  ]
  for (const path of candidates) {
    if (!existsSync(path)) continue
    try {
      const text = readFileSync(path, 'utf8')
      if (/chrome.devtools/i.test(text)) {
        return { found: true, detail: `referenced in ${path.replace(homedir(), '~')}` }
      }
    } catch {
      /* ignore */
    }
  }
  return {
    found: false,
    detail:
      'not detected in known config files (this is informational — the skill works without it)',
  }
}
