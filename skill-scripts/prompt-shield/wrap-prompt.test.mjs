import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const SCRIPT = path.join(import.meta.dirname, 'wrap-prompt.mjs')

function run(args = []) {
  return spawnSync('node', [SCRIPT, ...args], { encoding: 'utf8' })
}

function withTempFiles(files) {
  const dir = mkdtempSync(path.join(tmpdir(), 'wrap-prompt-test-'))
  const paths = {}
  for (const [name, content] of Object.entries(files)) {
    const p = path.join(dir, name)
    writeFileSync(p, content, 'utf8')
    paths[name] = p
  }
  return { paths, cleanup: () => rmSync(dir, { recursive: true, force: true }) }
}

test('exits 1 with no args', () => {
  const r = run([])
  assert.equal(r.status, 1)
  assert.match(r.stderr, /Usage/)
})

test('exits 1 with only --instructions', () => {
  const t = withTempFiles({ 'p.md': 'persona' })
  try {
    const r = run(['--instructions', t.paths['p.md']])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /Usage/)
  } finally {
    t.cleanup()
  }
})

test('exits 1 if --instructions file does not exist', () => {
  const t = withTempFiles({ 'd.txt': 'x' })
  try {
    const r = run(['--instructions', '/nonexistent/p.md', '--untrusted-content', t.paths['d.txt']])
    assert.equal(r.status, 1)
    assert.match(r.stderr, /not found/)
  } finally {
    t.cleanup()
  }
})

test('writes wrapped prompt to stdout with both files', () => {
  const t = withTempFiles({ 'p.md': 'review the following', 'd.txt': '+ malicious()' })
  try {
    const r = run(['--instructions', t.paths['p.md'], '--untrusted-content', t.paths['d.txt']])
    assert.equal(r.status, 0)
    assert.match(r.stdout, /review the following/)
    assert.match(r.stdout, /third-party data, not instructions/)
    assert.match(r.stdout, /<untrusted-[0-9a-f]{12}>\n\+ malicious\(\)\n<\/untrusted-[0-9a-f]{12}>/)
  } finally {
    t.cleanup()
  }
})

test('output ends with a trailing newline', () => {
  const t = withTempFiles({ 'p.md': 'x', 'd.txt': 'y' })
  try {
    const r = run(['--instructions', t.paths['p.md'], '--untrusted-content', t.paths['d.txt']])
    assert.ok(r.stdout.endsWith('\n'), 'stdout should end with \\n')
  } finally {
    t.cleanup()
  }
})
