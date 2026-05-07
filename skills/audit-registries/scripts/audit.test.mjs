import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { test } from 'node:test'

const SCRIPT = path.join(import.meta.dirname, 'audit.mjs')

function run(args = []) {
  return spawnSync('node', [SCRIPT, ...args], { encoding: 'utf8' })
}

test('exits 0 even when entries are stale (staleness is data, not failure)', () => {
  const r = run(['--offline', '--only', 'cli-binaries'])
  assert.equal(r.status, 0)
})

test('emits parseable JSON', () => {
  const r = run(['--offline', '--only', 'cli-binaries'])
  const parsed = JSON.parse(r.stdout)
  assert.ok(typeof parsed.auditedAt === 'string')
  assert.ok(typeof parsed.summary === 'object')
  assert.ok(Array.isArray(parsed.categories))
})

test('output has the documented shape (top-level fields)', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'cli-binaries']).stdout)
  for (const k of ['fresh', 'stale', 'gone', 'new', 'errored']) {
    assert.equal(typeof parsed.summary[k], 'number')
  }
})

test('--only filters to a single category', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'cli-binaries']).stdout)
  assert.equal(parsed.categories.length, 1)
  assert.equal(parsed.categories[0].name, 'cli-binaries')
})

test('cli-binaries entries have id + status + details', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'cli-binaries']).stdout)
  for (const e of parsed.categories[0].entries) {
    assert.equal(typeof e.id, 'string')
    assert.match(e.status, /^(fresh|stale|gone|new|errored)$/)
    assert.ok(Array.isArray(e.details))
    assert.equal(typeof e.autoFixable, 'boolean')
  }
})

test('cli-binaries finds at least one entry', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'cli-binaries']).stdout)
  assert.ok(parsed.categories[0].entries.length >= 5)
})

test('--pretty emits indented JSON', () => {
  const r = run(['--offline', '--only', 'cli-binaries', '--pretty'])
  assert.ok(r.stdout.includes('\n  '), 'pretty output should include indentation')
})

test('--offline skips network categories', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'deps-versions']).stdout)
  assert.equal(parsed.categories[0].skipped, 'offline mode')
})

test('--offline skill-sh-diff is also skipped', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'skills-sh-diff']).stdout)
  assert.equal(parsed.categories[0].skipped, 'offline mode')
})

test('summary counts match per-category status totals', () => {
  const parsed = JSON.parse(run(['--offline', '--only', 'cli-binaries']).stdout)
  const fromEntries = parsed.categories[0].entries.reduce(
    (acc, e) => {
      acc[e.status] = (acc[e.status] ?? 0) + 1
      return acc
    },
    {},
  )
  for (const k of ['fresh', 'stale', 'gone', 'new', 'errored']) {
    assert.equal(parsed.summary[k], fromEntries[k] ?? 0)
  }
})
