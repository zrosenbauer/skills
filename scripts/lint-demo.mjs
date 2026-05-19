#!/usr/bin/env node
/**
 * lint-demo — scaffold a handful of intentionally-broken skills + agents
 * so `pnpm skill-toolkit lint` has something to surface. Useful for
 * showing off the ctx.report output (including code frames) without
 * modifying real skills.
 *
 *   ./scripts/lint-demo.mjs           # set up demo + print commands
 *   ./scripts/lint-demo.mjs teardown  # remove the demo
 *   ./scripts/lint-demo.mjs --help    # this help
 *
 * The setup creates demo skills/agents that collectively trigger every
 * lint rule the toolkit ships. The linter does loose YAML parsing —
 * each rule narrows fields natively — so `fm-missing-name` and
 * `fm-missing-description` are reachable just by omitting fields, and
 * `fm-invalid-yaml` requires actual YAML syntax (not schema) errors.
 */

import { mkdirSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const LONG_DESC =
  'This skill should be used when the user wants verbose output. ' +
  'Common triggers include "trigger one", "trigger two", and "trigger three". ' +
  'Bakes in a lot of words. Skip when not needed. '.repeat(15)

const HUGE_BODY = '## Section\n\nContent line.\n\n'.repeat(150)

/**
 * Demo targets created on `setup`, removed on `teardown`. Each entry
 * is `{ path, contents, triggers }` where `triggers` is the prose
 * comment shown in --help so a reader can map demo → rule coverage.
 */
const DEMO_FILES = [
  {
    path: 'skills/bad-content/SKILL.md',
    triggers:
      'fm-name-mismatch · desc-* (too-short, no-trigger, few-triggers, anti-shortcut, no-skip) · body-few-sections · body-todo · body-no-example · fm-missing-{argument-hint,user-invocable} · no-{readme,license}',
    contents: `---
name: wrong-name
description: First, process this.
---

# bad-content

Body content.

## Workflow

TODO: do something.
`,
  },
  {
    path: 'skills/missing-fields/SKILL.md',
    triggers:
      'fm-missing-name · fm-missing-description · body-few-sections · body-no-example · fm-missing-{argument-hint,user-invocable} · no-{readme,license}',
    contents: `---
some-other-field: true
---

# missing-fields

Body content with no required frontmatter fields.
`,
  },
  {
    path: 'skills/_demo-invalid-yaml/SKILL.md',
    triggers: 'dir-name (non-kebab) · fm-invalid-yaml (genuinely broken YAML)',
    contents: `---
name: "unclosed
description: trailing colon: : :
  bad indent
---

# _demo-invalid-yaml

Body content.

## Section one

Content.

## Section two

More content.

## Section three

<example>
<input>demo</input>
<output>demo</output>
</example>
`,
  },
  {
    path: 'skills/verbose/SKILL.md',
    triggers:
      'desc-too-long · body-few-sections · body-no-example · fm-missing-{argument-hint,user-invocable} · no-{readme,license}',
    contents: `---
name: verbose
description: ${LONG_DESC}
---

# verbose

Body content without enough sections or an example.
`,
  },
  {
    path: 'skills/huge-body/SKILL.md',
    triggers: 'body-too-long · fm-missing-{argument-hint,user-invocable} · no-{readme,license}',
    contents: `---
name: huge-body
description: This skill should be used when demonstrating the body-too-long rule. Common triggers include "trigger one", "trigger two", "trigger three". Skip when not testing.
---

# huge-body

${HUGE_BODY}

<example>
<input>demo</input>
<output>demo</output>
</example>
`,
  },
  {
    path: '.claude/agents/BadAgent.md',
    triggers: 'agent file-name (non-kebab) · agent fm-missing-name',
    contents: `---
description: A test agent demonstrating the missing-name + non-kebab file-name rules.
---

Body.
`,
  },
  {
    path: '.claude/agents/agent-mismatch.md',
    triggers: 'agent fm-name-mismatch',
    contents: `---
name: wrong-name
description: A test agent for demonstrating the name-mismatch rule.
---

Body.
`,
  },
  {
    path: '.claude/agents/agent-missing-desc.md',
    triggers: 'agent fm-missing-description',
    contents: `---
name: agent-missing-desc
---

Body — frontmatter has name but no description.
`,
  },
]

/**
 * Commands the demo prints for the user to copy-paste. Pure text —
 * the script doesn't run them, the user does.
 */
const COMMANDS = [
  {
    label: 'Default — all severities, all targets, every rule fires',
    cmd: 'pnpm skill-toolkit lint',
  },
  {
    label: 'Only errors',
    cmd: 'pnpm skill-toolkit lint --severity error',
  },
  {
    label: 'One skill at a time, with fix hints',
    cmd: 'pnpm skill-toolkit lint bad-content --fix',
  },
  {
    label: 'Agents only (BadAgent + agent-mismatch + agent-missing-desc)',
    cmd: 'pnpm skill-toolkit lint --target=agents',
  },
  {
    label: 'JSON output (machine-readable; bypasses ctx.report)',
    cmd: 'pnpm skill-toolkit lint --format=json',
  },
]

function setup() {
  console.log('Creating demo skills + agents…\n')
  for (const file of DEMO_FILES) {
    const abs = join(REPO_ROOT, file.path)
    mkdirSync(dirname(abs), { recursive: true })
    writeFileSync(abs, file.contents)
    console.log(`  + ${file.path}`)
    console.log(`      ${file.triggers}`)
  }

  console.log('\nRun any of these to see the ctx.report output:\n')
  for (const { label, cmd } of COMMANDS) {
    console.log(`  # ${label}`)
    console.log(`  ${cmd}\n`)
  }

  console.log('When done:\n')
  console.log('  ./scripts/lint-demo.mjs teardown\n')
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

  // Remove demo-created parent dirs only when empty — leave alone
  // otherwise, in case the user has real .claude/agents/ content.
  const parents = [
    'skills/bad-content',
    'skills/missing-fields',
    'skills/_demo-invalid-yaml',
    'skills/verbose',
    'skills/huge-body',
    '.claude/agents',
    '.claude',
  ]
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
  ./scripts/lint-demo.mjs           # set up demo + print commands to run
  ./scripts/lint-demo.mjs teardown  # remove the demo
  ./scripts/lint-demo.mjs --help    # this help

Demo targets and the rules each one triggers:
${DEMO_FILES.map((f) => `  • ${f.path}\n      ${f.triggers}`).join('\n')}
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
