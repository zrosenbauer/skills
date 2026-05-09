import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const SCRIPT = path.join(import.meta.dirname, 'secret-shield.mjs')

function run(args = []) {
  return spawnSync('node', [SCRIPT, ...args], { encoding: 'utf8' })
}

function withTempFile(name, content) {
  const dir = mkdtempSync(path.join(tmpdir(), 'secret-shield-test-'))
  const file = path.join(dir, name)
  writeFileSync(file, content, 'utf8')
  return { file, cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

test('exits 1 with no args', () => {
  const r = run([])
  assert.equal(r.status, 1)
  assert.match(r.stderr, /Usage/)
})

test('exits 1 with --scan but no file', () => {
  const r = run(['--scan'])
  assert.equal(r.status, 1)
})

test('exits 1 if file does not exist', () => {
  const r = run(['--scan', '/nonexistent/file.txt'])
  assert.equal(r.status, 1)
  assert.match(r.stderr, /not found/)
})

test('exits 1 if both --scan and --redact passed', () => {
  const t = withTempFile('x.txt', 'safe')
  try {
    const r = run(['--scan', '--redact', t.file])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /not both/)
  } finally {
    t.cleanup()
  }
})

test('--scan exits 0 on clean content with JSON report', () => {
  const t = withTempFile('clean.txt', 'no secrets here\n')
  try {
    const r = run(['--scan', t.file])
    assert.equal(r.status, 0)
    const report = JSON.parse(r.stdout)
    assert.equal(report.hasFindings, false)
    assert.deepEqual(report.findings, [])
  } finally {
    t.cleanup()
  }
})

test('--scan exits 1 when secrets present, reports findings', () => {
  const t = withTempFile('dirty.txt', `aws=${'AKIA' + 'IOSFODNN7EXAMPLE'}\n`)
  try {
    const r = run(['--scan', t.file])
    assert.equal(r.status, 1)
    const report = JSON.parse(r.stdout)
    assert.equal(report.hasFindings, true)
    assert.equal(report.findings[0].id, 'aws-access-key')
  } finally {
    t.cleanup()
  }
})

test('--scan --quiet suppresses stdout, only exits with code', () => {
  const t = withTempFile('dirty.txt', `aws=${'AKIA' + 'IOSFODNN7EXAMPLE'}\n`)
  try {
    const r = run(['--scan', '--quiet', t.file])
    assert.equal(r.status, 1)
    assert.equal(r.stdout, '')
  } finally {
    t.cleanup()
  }
})

test('--redact writes redacted content to stdout, exits 0', () => {
  const t = withTempFile('dirty.txt', `aws=${'AKIA' + 'IOSFODNN7EXAMPLE'}\n`)
  try {
    const r = run(['--redact', t.file])
    assert.equal(r.status, 0)
    assert.match(r.stdout, /\[REDACTED-aws-access-key-1]/)
    assert.ok(!r.stdout.includes('AKIA' + 'IOSFODNN7EXAMPLE'))
  } finally {
    t.cleanup()
  }
})

test('--redact on clean content is a passthrough', () => {
  const t = withTempFile('clean.txt', 'just code\nno secrets\n')
  try {
    const r = run(['--redact', t.file])
    assert.equal(r.status, 0)
    assert.equal(r.stdout, 'just code\nno secrets\n')
  } finally {
    t.cleanup()
  }
})
