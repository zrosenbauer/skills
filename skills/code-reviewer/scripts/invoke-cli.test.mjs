import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

import { buildInvocation, findEntry } from './cli-registry.mjs'

const SCRIPT = path.join(import.meta.dirname, 'invoke-cli.mjs')

function run(args = [], stdin = '') {
  return spawnSync('node', [SCRIPT, ...args], { encoding: 'utf8', input: stdin })
}

function withTempFiles(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'invoke-cli-test-'))
  const paths = {}
  for (const [name, content] of Object.entries(files)) {
    const p = path.join(dir, name)
    writeFileSync(p, content, 'utf8')
    paths[name] = p
  }
  return { dir, paths, cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

test('exits 1 with no cli-id', () => {
  const r = run([], 'prompt')
  assert.equal(r.status, 1)
  assert.match(r.stderr, /Usage/)
})

test('exits 1 on unknown cli-id', () => {
  const r = run(['definitely-unknown-cli'], 'prompt')
  assert.equal(r.status, 1)
  assert.match(r.stderr, /Unknown cli-id/i)
})

test('exits 1 when stdin is empty for a known cli', () => {
  const r = run(['claude-code'], '')
  assert.equal(r.status, 1)
  assert.match(r.stderr, /Empty prompt/i)
})

test('--dry-run prints a JSON plan and exits 0 without spawning the CLI', () => {
  const r = run(['codex', '--dry-run'], 'review this code')
  assert.equal(r.status, 0)
  const plan = JSON.parse(r.stdout)
  assert.equal(plan.cli.id, 'codex')
  assert.equal(plan.mode, 'stdin')
  assert.equal(plan.command, 'codex')
  assert.deepEqual(plan.args, ['exec', '-'])
  assert.equal(plan.stdinBytes, Buffer.byteLength('review this code'))
})

test('--dry-run for an argv-mode CLI shows promptTemplate substitution', () => {
  const r = run(['aider', '--dry-run'], 'find issues')
  assert.equal(r.status, 0)
  const plan = JSON.parse(r.stdout)
  assert.equal(plan.mode, 'argv')
  assert.equal(plan.command, 'aider')
  assert.ok(plan.args.includes('find issues'), 'prompt should be substituted into argv')
  assert.ok(plan.args.includes('--message'))
  assert.equal(plan.stdinBytes, 0)
})

test('--timeout requires a positive number', () => {
  const r = run(['codex', '--timeout', 'abc', '--dry-run'], 'p')
  assert.equal(r.status, 1)
  assert.match(r.stderr, /positive number/)
})

test('--timeout accepts a positive number', () => {
  const r = run(['codex', '--timeout', '30', '--dry-run'], 'p')
  assert.equal(r.status, 0)
})

// Unit tests for buildInvocation — exported for direct testing
test('buildInvocation: stdin mode for entry with stdinTemplate', () => {
  const entry = findEntry('codex')
  const plan = buildInvocation(entry, 'hello world')
  assert.equal(plan.mode, 'stdin')
  assert.equal(plan.command, 'codex')
  assert.deepEqual(plan.args, ['exec', '-'])
  assert.equal(plan.stdin, 'hello world')
})

test('buildInvocation: argv mode when no stdinTemplate', () => {
  const entry = findEntry('aider')
  const plan = buildInvocation(entry, 'review this')
  assert.equal(plan.mode, 'argv')
  assert.equal(plan.command, 'aider')
  assert.ok(plan.args.includes('review this'))
  assert.equal(plan.stdin, null)
})

test('buildInvocation: substitutes {{PROMPT}} verbatim including special chars', () => {
  const entry = findEntry('aider')
  const tricky = 'review this `code` with $VARS and "quotes"'
  const plan = buildInvocation(entry, tricky)
  assert.ok(plan.args.includes(tricky), 'special chars must be passed verbatim through argv')
})

test('buildInvocation: throws if promptTemplate lacks {{PROMPT}}', () => {
  const broken = {
    id: 'broken',
    name: 'Broken',
    binary: 'broken',
    promptTemplate: 'broken --no-placeholder',
    stdinTemplate: null,
  }
  assert.throws(() => buildInvocation(broken, 'p'), /PROMPT/)
})

test('--instructions + --untrusted-content composes a wrapped prompt', () => {
  const tmp = withTempFiles({
    'persona.md': 'You are reviewing a PR. Find issues.',
    'diff.txt': '+ malicious()\n- safe()',
  })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['persona.md'],
      '--untrusted-content',
      tmp.paths['diff.txt'],
    ])
    assert.equal(r.status, 0)
    const plan = JSON.parse(r.stdout)
    assert.equal(plan.wrapped, true)
    assert.match(plan.wrappedSalt, /^[0-9a-f]{12}$/)
    assert.ok(plan.stdinBytes > 0)
  } finally {
    tmp.cleanup()
  }
})

test('--untrusted-content without --instructions errors', () => {
  const tmp = withTempFiles({ 'diff.txt': 'x' })
  try {
    const r = run(['codex', '--dry-run', '--untrusted-content', tmp.paths['diff.txt']])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /requires --instructions/)
  } finally {
    tmp.cleanup()
  }
})

test('--instructions alone reads the file as the verbatim prompt', () => {
  const tmp = withTempFiles({ 'persona.md': 'just review' })
  try {
    const r = run(['codex', '--dry-run', '--instructions', tmp.paths['persona.md']])
    assert.equal(r.status, 0)
    const plan = JSON.parse(r.stdout)
    assert.equal(plan.wrapped, false)
    assert.equal(plan.wrappedSalt, null)
    assert.equal(plan.stdinBytes, Buffer.byteLength('just review'))
  } finally {
    tmp.cleanup()
  }
})

test('--instructions errors if file does not exist', () => {
  const r = run(['codex', '--dry-run', '--instructions', '/nonexistent/path/persona.md'])
  assert.equal(r.status, 1)
  assert.match(r.stderr, /not found/)
})

test('--untrusted-content errors if file does not exist', () => {
  const tmp = withTempFiles({ 'persona.md': 'p' })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['persona.md'],
      '--untrusted-content',
      '/nonexistent/diff.txt',
    ])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /not found/)
  } finally {
    tmp.cleanup()
  }
})

test('legacy stdin mode still works (no flags = verbatim)', () => {
  const r = run(['codex', '--dry-run'], 'verbatim trusted prompt')
  assert.equal(r.status, 0)
  const plan = JSON.parse(r.stdout)
  assert.equal(plan.wrapped, false)
  assert.equal(plan.wrappedSalt, null)
  assert.equal(plan.stdinBytes, Buffer.byteLength('verbatim trusted prompt'))
})

test('--secret-mode scan (default) refuses to forward when secrets present', () => {
  const tmp = withTempFiles({
    'persona.md': 'review',
    'diff.txt': `${'AKIA' + 'IOSFODNN7EXAMPLE'}\n`,
  })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['persona.md'],
      '--untrusted-content',
      tmp.paths['diff.txt'],
    ])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /Aborted/)
    assert.match(r.stderr, /aws-access-key/)
  } finally {
    tmp.cleanup()
  }
})

test('--secret-mode redact rewrites secrets and proceeds', () => {
  const tmp = withTempFiles({
    'persona.md': 'review',
    'diff.txt': `aws_key=${'AKIA' + 'IOSFODNN7EXAMPLE'}\n`,
  })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['persona.md'],
      '--untrusted-content',
      tmp.paths['diff.txt'],
      '--secret-mode',
      'redact',
    ])
    assert.equal(r.status, 0)
    const plan = JSON.parse(r.stdout)
    assert.equal(plan.wrapped, true)
    assert.equal(plan.secretMode, 'redact')
    assert.equal(plan.secretsRedacted, 1)
  } finally {
    tmp.cleanup()
  }
})

test('--secret-mode allow forwards secrets verbatim', () => {
  const tmp = withTempFiles({
    'persona.md': 'review',
    'diff.txt': `aws=${'AKIA' + 'IOSFODNN7EXAMPLE'}\n`,
  })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['persona.md'],
      '--untrusted-content',
      tmp.paths['diff.txt'],
      '--secret-mode',
      'allow',
    ])
    assert.equal(r.status, 0)
    const plan = JSON.parse(r.stdout)
    assert.equal(plan.secretMode, 'allow')
    assert.equal(plan.secretsRedacted, 0)
  } finally {
    tmp.cleanup()
  }
})

test('--secret-mode rejects invalid values', () => {
  const tmp = withTempFiles({ 'p.md': 'p', 'd.txt': 'safe' })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['p.md'],
      '--untrusted-content',
      tmp.paths['d.txt'],
      '--secret-mode',
      'banana',
    ])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /one of: scan, redact, allow/)
  } finally {
    tmp.cleanup()
  }
})

test('clean untrusted content passes through scan mode', () => {
  const tmp = withTempFiles({
    'persona.md': 'review',
    'diff.txt': '+ added line\n- removed line\n',
  })
  try {
    const r = run([
      'codex',
      '--dry-run',
      '--instructions',
      tmp.paths['persona.md'],
      '--untrusted-content',
      tmp.paths['diff.txt'],
    ])
    assert.equal(r.status, 0)
    const plan = JSON.parse(r.stdout)
    assert.equal(plan.secretMode, 'scan')
    assert.equal(plan.secretsRedacted, 0)
  } finally {
    tmp.cleanup()
  }
})
