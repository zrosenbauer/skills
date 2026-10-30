import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, chmodSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const doctor = fileURLToPath(new URL('./doctor.mjs', import.meta.url))
const wrapper = fileURLToPath(new URL('./orca.mjs', import.meta.url))

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'orca doctor test '))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const executable = join(root, 'orca fixture.mjs')
  const log = join(root, 'calls.jsonl')
  copyFileSync(new URL('./fixtures/orca.mjs', import.meta.url), executable)
  chmodSync(executable, 0o755)
  const env = {
    ...process.env,
    ORCA_CLI_COMMAND: executable,
    DOCTOR_TEST_LOG: log,
    DOCTOR_TEST_MODE: '',
  }
  return { root, executable, log, env }
}

test('audits through real subprocesses, forwards override, and excludes unrelated context', (t) => {
  const { root, executable, log, env } = fixture(t)
  const result = spawnSync(process.execPath, [doctor], { cwd: root, env, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stdout + result.stderr)
  const report = JSON.parse(result.stdout)
  assert.equal(report.context.command, executable)
  assert.equal(report.context.repo.hooks.archiveConfigured, true)
  assert.deepEqual(report.worktrees[0].actions, ['inspect'])
  assert.ok(!result.stdout.includes('private hook contents'))
  assert.ok(!result.stdout.includes('private terminal transcript'))
  const calls = readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse)
  assert.deepEqual(
    calls.map(({ args }) => args.slice(0, 2)),
    [
      ['status', '--json'],
      ['worktree', 'current'],
      ['repo', 'show'],
      ['worktree', 'list'],
      ['worktree', 'ps'],
    ]
  )
  assert.ok(calls.every((call) => call.command === executable))
})

test('retries a truncated inventory with the advertised count', (t) => {
  const { root, log, env } = fixture(t)
  const result = spawnSync(process.execPath, [doctor], {
    cwd: root,
    env: { ...env, DOCTOR_TEST_MODE: 'pagination' },
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stdout + result.stderr)
  const calls = readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse)
  assert.ok(calls.some(({ args }) => args.includes('101')))
})

test('fails closed on incomplete inventories, runtime restarts, and invalid responses', (t) => {
  const { root, env } = fixture(t)
  for (const mode of ['incomplete', 'restart', 'invalid-json', 'error']) {
    const result = spawnSync(process.execPath, [doctor], {
      cwd: root,
      env: { ...env, DOCTOR_TEST_MODE: mode },
      encoding: 'utf8',
    })
    assert.equal(result.status, 1, mode)
    const report = JSON.parse(result.stdout)
    assert.ok(report.ok === false || report.coverage.complete === false)
    assert.ok((report.worktrees ?? []).every((row) => row.actions.length === 1))
  }
})

test('does not fall back when an explicit executable is missing', (t) => {
  const { root, env } = fixture(t)
  const result = spawnSync(process.execPath, [doctor], {
    cwd: root,
    env: { ...env, ORCA_CLI_COMMAND: join(root, 'missing') },
    encoding: 'utf8',
  })
  assert.equal(result.status, 1)
  assert.match(JSON.parse(result.stdout).error, /ENOENT/)
})

test('forwards selectors as literal argv through the wrapper', (t) => {
  const { root, log, env } = fixture(t)
  const selector = 'name:$(touch do-not-create); repository with spaces'
  const result = spawnSync(
    process.execPath,
    [wrapper, 'repo', 'show', '--repo', selector, '--json'],
    {
      cwd: root,
      env,
      encoding: 'utf8',
    }
  )
  assert.equal(result.status, 0, result.stderr)
  const call = JSON.parse(readFileSync(log, 'utf8').trim())
  assert.equal(call.args[3], selector)
})
