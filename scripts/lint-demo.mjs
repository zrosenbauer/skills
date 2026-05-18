#!/usr/bin/env node
/**
 * lint-demo — scaffold a few intentionally-broken skills + agent so
 * `pnpm skill-toolkit lint` has something to surface. Useful for
 * showing off the ctx.report output without modifying real skills.
 *
 *   node scripts/lint-demo.mjs           # set up (creates temp dirs) + print commands
 *   node scripts/lint-demo.mjs teardown  # remove the temp dirs
 *   node scripts/lint-demo.mjs --help    # this help
 */

import { mkdirSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * Demo targets created on `setup`, removed on `teardown`. Each entry
 * is `{ path, contents }` relative to the repo root. Order matters for
 * teardown — files first, then their parent directories (which must
 * be empty before `rmdir`).
 */
const DEMO_FILES = [
  {
    path: 'skills/_demo-bad-one/SKILL.md',
    contents: `---
name: _demo-bad-one
description: First, process this. Then handle it.
---

# _demo-bad-one

Body.
`,
  },
  {
    path: 'skills/_demo-bad-two/SKILL.md',
    contents: `---
name: wrong-name
description: This skill should be used when you want to do something. Skip when not.

# --- Claude Code extensions ---
user-invocable: true
---

# wrong-name

A skill that mostly works but has some issues to show off.

## Workflow

Steps go here.

## Notes

Some notes.
`,
  },
  {
    path: '.claude/agents/BadAgent.md',
    contents: `---
description: too short
---

Body.
`,
  },
]

/**
 * Commands the demo prints for the user to copy-paste. Pure text —
 * the script doesn't run them, the user does.
 */
const COMMANDS = [
  {
    label: 'Default — all severities, all targets',
    cmd: 'pnpm skill-toolkit lint',
  },
  {
    label: 'Only errors',
    cmd: 'pnpm skill-toolkit lint --severity error',
  },
  {
    label: 'One skill at a time, with fix hints',
    cmd: 'pnpm skill-toolkit lint _demo-bad-one --fix',
  },
  {
    label: 'Agents only',
    cmd: 'pnpm skill-toolkit lint --target=agents',
  },
  {
    label: 'JSON output (machine-readable; the report middleware path is skipped)',
    cmd: 'pnpm skill-toolkit lint --format=json',
  },
]

function setup() {
  console.log('Creating demo skills + agent…\n')
  for (const file of DEMO_FILES) {
    const abs = join(REPO_ROOT, file.path)
    mkdirSync(dirname(abs), { recursive: true })
    writeFileSync(abs, file.contents)
    console.log(`  + ${file.path}`)
  }

  console.log('\nRun any of these to see the ctx.report output:\n')
  for (const { label, cmd } of COMMANDS) {
    console.log(`  # ${label}`)
    console.log(`  ${cmd}\n`)
  }

  console.log('When done:\n')
  console.log('  node scripts/lint-demo.mjs teardown\n')
}

function teardown() {
  console.log('Removing demo files…\n')
  for (const file of DEMO_FILES) {
    const abs = join(REPO_ROOT, file.path)
    try {
      rmSync(abs)
      console.log(`  - ${file.path}`)
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
      console.log(`  - ${file.path} (already gone)`)
    }
  }

  // Remove the parent dirs we created (only if empty — leave alone
  // otherwise, in case the user has real .claude/agents/ content).
  const parents = ['skills/_demo-bad-one', 'skills/_demo-bad-two', '.claude/agents', '.claude']
  for (const rel of parents) {
    const abs = join(REPO_ROOT, rel)
    try {
      rmdirSync(abs)
      console.log(`  - ${rel}/`)
    } catch (err) {
      if (err.code === 'ENOTEMPTY') {
        console.log(`  - ${rel}/ (not empty — left in place)`)
      } else if (err.code !== 'ENOENT') {
        throw err
      }
    }
  }

  console.log('\nDone.')
}

function help() {
  console.log(`
lint-demo — scaffold broken skills/agents so \`pnpm skill-toolkit lint\` has output to show

Usage:
  node scripts/lint-demo.mjs           # set up demo + print commands to run
  node scripts/lint-demo.mjs teardown  # remove the demo
  node scripts/lint-demo.mjs --help    # this help

The setup creates 2 broken skills under skills/_demo-bad-{one,two}/
and one broken agent under .claude/agents/BadAgent.md. None of these
land in real skill output — they only exist to demonstrate the lint.
`)
}

const arg = process.argv[2]
if (arg === 'teardown' || arg === '--cleanup') {
  teardown()
} else if (arg === '--help' || arg === '-h') {
  help()
} else if (arg === undefined || arg === 'setup') {
  setup()
} else {
  console.error(`Unknown argument: ${arg}`)
  help()
  process.exit(1)
}
