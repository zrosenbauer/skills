#!/usr/bin/env node
/**
 * invoke-cli — invoke a registered AI CLI with a prompt.
 *
 * Two input modes:
 *
 *   1. Verbatim stdin (no flags) — for trusted-only prompts:
 *        echo "review this code" | invoke-cli.mjs codex
 *
 *   2. Wrapped composition (--instructions + --untrusted-content) — for
 *      forwarding third-party content (PR diffs, scraped pages, issue bodies)
 *      to the child CLI. The script composes:
 *
 *        <instructions verbatim>
 *
 *        <anti-injection preamble naming the salted tag>
 *
 *        <untrusted-{{salt}}>
 *        <untrusted content verbatim>
 *        </untrusted-{{salt}}>
 *
 *      The salt is fresh per-invocation, so attacker-embedded closing tags
 *      cannot escape the wrap. See contributing/prompt-injection.md.
 *
 * Usage:
 *   node invoke-cli.mjs <cli-id> [--timeout <seconds>] [--dry-run]
 *   node invoke-cli.mjs <cli-id> --instructions <file> --untrusted-content <file> [...]
 *
 * Reads the prompt from stdin (mode 1) or composes it from the two files
 * (mode 2). Looks up <cli-id> in `cli-registry.mjs`. Prefers `stdinTemplate`
 * (pipes prompt to the child's stdin); falls back to `promptTemplate` (passes
 * the prompt as the last argv argument). Times out after <timeout> seconds
 * (default 120s).
 *
 * Exit codes:
 *   0  — child exited 0
 *   1  — argument error (no cli-id, unknown id, empty prompt, missing file)
 *   2  — child exited non-zero
 *   3  — timeout
 *   4  — child binary not on $PATH
 *
 * Examples:
 *   echo "review this code" | node invoke-cli.mjs codex
 *   node invoke-cli.mjs codex --instructions persona.md --untrusted-content diff.txt
 *   node invoke-cli.mjs codex --instructions p.md --untrusted-content d.txt --dry-run
 */

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

import { buildInvocation, findEntry, locateBinary } from './cli-registry.mjs'
import { composeWrappedPrompt } from './prompt-shield/compose.mjs'

const argv = process.argv.slice(2)
const cliId = argv[0]
const flags = parseFlags(argv.slice(1))

if (!cliId || cliId.startsWith('--')) {
  process.stderr.write(
    'Usage: invoke-cli <cli-id> [--timeout <s>] [--dry-run]\n' +
      '       invoke-cli <cli-id> --instructions <file> --untrusted-content <file> [...]\n'
  )
  process.exit(1)
}

const entry = findEntry(cliId)
if (!entry) {
  process.stderr.write(`Unknown cli-id: ${cliId}\n`)
  process.stderr.write('Run `node detect-clis.mjs --names-only` to see available ids.\n')
  process.exit(1)
}

const composition = composePrompt(flags)
const prompt = composition.prompt

if (!prompt.trim()) {
  process.stderr.write(
    'Empty prompt. Pipe via stdin or pass --instructions <file> --untrusted-content <file>\n'
  )
  process.exit(1)
}

const plan = buildInvocation(entry, prompt)

if (flags.dryRun) {
  process.stdout.write(
    JSON.stringify(
      {
        cli: { id: entry.id, name: entry.name, binary: entry.binary },
        mode: plan.mode,
        command: plan.command,
        args: plan.args,
        stdinBytes: plan.stdin === null ? 0 : Buffer.byteLength(plan.stdin),
        wrapped: composition.wrapped,
        wrappedSalt: composition.salt ?? null,
      },
      null,
      2
    ) + '\n'
  )
  process.exit(0)
}

const located = locateBinary(entry.binary)
if (!located.available) {
  process.stderr.write(`${entry.binary} not found on $PATH\n`)
  process.exit(4)
}

const result = spawnSync(plan.command, plan.args, {
  input: plan.stdin ?? undefined,
  encoding: 'utf8',
  timeout: flags.timeout * 1000,
  stdio: ['pipe', 'pipe', 'pipe'],
  maxBuffer: 50 * 1024 * 1024,
})

if (result.error?.code === 'ETIMEDOUT') {
  process.stderr.write(`invoke-cli: timed out after ${flags.timeout}s\n`)
  process.exit(3)
}
if (result.error) {
  process.stderr.write(`invoke-cli: ${result.error.message}\n`)
  process.exit(2)
}

process.stdout.write(result.stdout ?? '')
if (result.stderr) process.stderr.write(result.stderr)
process.exit(result.status === 0 ? 0 : 2)

/**
 * Resolve the prompt from either flags (composed + wrapped) or stdin (verbatim).
 *
 * @param {ReturnType<typeof parseFlags>} f
 * @returns {{ prompt: string, wrapped: boolean, salt: string | null }}
 */
function composePrompt(f) {
  if (f.untrustedContent && !f.instructions) {
    process.stderr.write('--untrusted-content requires --instructions\n')
    process.exit(1)
  }

  if (f.instructions && f.untrustedContent) {
    const instructions = readFileOrExit(f.instructions, '--instructions')
    const untrusted = readFileOrExit(f.untrustedContent, '--untrusted-content')
    const composed = composeWrappedPrompt({ instructions, untrusted })
    return { prompt: composed.prompt, wrapped: true, salt: composed.salt }
  }

  if (f.instructions) {
    return { prompt: readFileOrExit(f.instructions, '--instructions'), wrapped: false, salt: null }
  }

  return { prompt: readStdin(), wrapped: false, salt: null }
}

/**
 * @param {string} filePath
 * @param {string} flagName
 * @returns {string}
 */
function readFileOrExit(filePath, flagName) {
  if (!existsSync(filePath)) {
    process.stderr.write(`${flagName} file not found: ${filePath}\n`)
    process.exit(1)
  }
  return readFileSync(filePath, 'utf8')
}

/** @param {string[]} rest */
function parseFlags(rest) {
  let timeout = 120
  let dryRun = false
  let instructions = null
  let untrustedContent = null
  for (let i = 0; i < rest.length; i += 1) {
    const a = rest[i]
    if (a === '--dry-run') {
      dryRun = true
      continue
    }
    if (a === '--timeout') {
      const next = rest[i + 1]
      const n = Number(next)
      if (!Number.isFinite(n) || n <= 0) {
        process.stderr.write(`--timeout requires a positive number; got: ${next}\n`)
        process.exit(1)
      }
      timeout = n
      i += 1
      continue
    }
    if (a === '--instructions') {
      const next = rest[i + 1]
      if (!next || next.startsWith('--')) {
        process.stderr.write('--instructions requires a file path\n')
        process.exit(1)
      }
      instructions = next
      i += 1
      continue
    }
    if (a === '--untrusted-content') {
      const next = rest[i + 1]
      if (!next || next.startsWith('--')) {
        process.stderr.write('--untrusted-content requires a file path\n')
        process.exit(1)
      }
      untrustedContent = next
      i += 1
      continue
    }
  }
  return { timeout, dryRun, instructions, untrustedContent }
}

function readStdin() {
  try {
    return readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}
