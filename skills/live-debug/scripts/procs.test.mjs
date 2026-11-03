import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { once } from 'node:events'
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { setTimeout } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(new URL('./procs.mjs', import.meta.url))
const alive = (pid) => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    if (error.code === 'ESRCH') return false
    throw error
  }
}
const waitFor = async (check, tries = 100) => {
  if (check()) return
  if (!tries) throw new Error('Timed out waiting for fixture readiness')
  await setTimeout(50)
  return waitFor(check, tries - 1)
}

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'live-debug-test-'))
  const registry = join(cwd, 'registry')
  const children = new Set()
  t.after(async () => {
    for (const pid of children) {
      try {
        process.kill(pid, 'SIGKILL')
      } catch (error) {
        if (error.code !== 'ESRCH') throw error
      }
    }
    await setTimeout(100)
    rmSync(cwd, { recursive: true, force: true })
  })
  const run = (args, env = {}) =>
    spawnSync(process.execPath, [script, ...args], {
      cwd,
      encoding: 'utf8',
      timeout: 20_000,
      env: { ...process.env, PROCS_DIR: registry, ...env },
    })
  const recordPath = (label) => join(registry, `${label}.json`)
  const read = (label) => JSON.parse(readFileSync(recordPath(label), 'utf8'))
  const write = (label, value) => writeFileSync(recordPath(label), JSON.stringify(value))
  const start = async (label = 'dev', body = '') => {
    const ready = join(cwd, `${label}-ready`)
    const code = `import {writeFileSync} from 'node:fs'; ${body}; writeFileSync(${JSON.stringify(ready)}, 'ready'); setInterval(() => {}, 1000)`
    const result = run(['start', label, '--', process.execPath, '--input-type=module', '-e', code])
    assert.equal(result.status, 0, result.stderr)
    const rec = read(label)
    children.add(rec.pid)
    await waitFor(() => existsSync(ready))
    return rec
  }
  return { cwd, registry, children, run, read, write, recordPath, start }
}

test('starts, inspects, reads logs, and stops an owned process without touching another process', async (t) => {
  const f = fixture(t)
  const rec = await f.start('dev', `console.log('fixture output')`)
  const unrelated = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], {
    stdio: 'ignore',
  })
  await once(unrelated, 'spawn')
  f.children.add(unrelated.pid)
  assert.equal(rec.pgid, rec.pid)
  assert.equal(rec.kind, 'owned')
  assert.ok(rec.startTime)
  assert.match(f.run(['list']).stdout, /dev\s+\d+\s+up/)
  assert.equal(JSON.parse(f.run(['info', 'dev']).stdout).alive, true)
  assert.match(f.run(['logs', 'dev', '-n', '5']).stdout, /fixture output/)
  const stopped = f.run(['stop', 'dev'])
  assert.equal(stopped.status, 0, stopped.stderr)
  assert.equal(existsSync(f.recordPath('dev')), false)
  assert.equal(alive(unrelated.pid), true)
})

test('rejects PID zero, one, negatives, non-integers, and unsupported force bypasses', (t) => {
  const f = fixture(t)
  for (const pid of ['0', '1', '-1', '2.5', '2e3', 'NaN', '2147483648']) {
    assert.notEqual(f.run(['adopt', 'dev', '--pid', pid, '--confirm']).status, 0, pid)
  }
  assert.notEqual(f.run(['stop', 'dev', '--force']).status, 0)
  assert.notEqual(f.run(['stop-all', '--force']).status, 0)
  assert.equal(existsSync(f.registry), false)
})

test('rejects traversal labels and symbolic-link records or logs before starting a child', (t) => {
  const f = fixture(t)
  const outside = join(f.cwd, 'outside.txt')
  writeFileSync(outside, 'unchanged')
  for (const label of ['../outside', 'a/b', '.', '', 'x'.repeat(65)]) {
    assert.notEqual(
      f.run(['start', label, '--', process.execPath, '-e', 'setInterval(()=>{},1000)']).status,
      0
    )
  }
  mkdirSync(f.registry)
  for (const extension of ['json', 'log']) {
    const link = join(f.registry, `linked.${extension}`)
    symlinkSync(outside, link)
    assert.notEqual(
      f.run(['start', 'linked', '--', process.execPath, '-e', 'setInterval(()=>{},1000)']).status,
      0
    )
    rmSync(link)
  }
  assert.equal(readFileSync(outside, 'utf8'), 'unchanged')
})

test('refuses missing or mismatched identity metadata without signaling a live process', async (t) => {
  const f = fixture(t)
  const rec = await f.start()
  for (const patch of [
    { startTime: '' },
    { startTime: 'reused pid' },
    { host: 'another-host' },
    { uid: -1 },
    { pgid: 0 },
    { version: 0 },
    { pid: 0 },
    { label: 'another' },
  ]) {
    f.write('dev', { ...rec, ...patch })
    assert.notEqual(f.run(['stop', 'dev']).status, 0)
    assert.equal(alive(rec.pid), true)
    assert.equal(existsSync(f.recordPath('dev')), true)
  }
  f.write('dev', rec)
  assert.equal(f.run(['stop', 'dev']).status, 0)
})

test('fails closed when ps cannot verify identity', async (t) => {
  const f = fixture(t)
  const rec = await f.start()
  const result = f.run(['stop', 'dev'], { PATH: f.cwd })
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /Cannot verify/)
  assert.equal(alive(rec.pid), true)
  assert.equal(existsSync(f.recordPath('dev')), true)
})

test('requires approval for adoption and signals only the adopted PID', async (t) => {
  const f = fixture(t)
  const child = spawn(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' })
  await once(child, 'spawn')
  f.children.add(child.pid)
  assert.notEqual(f.run(['adopt', 'external', '--pid', String(child.pid)]).status, 0)
  const adopted = f.run(['adopt', 'external', '--pid', String(child.pid), '--confirm'])
  assert.equal(adopted.status, 0, adopted.stderr)
  assert.equal(f.read('external').kind, 'adopted')
  assert.equal(f.read('external').pgid, null)
  assert.notEqual(f.run(['adopt', 'external', '--pid', String(child.pid), '--confirm']).status, 0)
  assert.equal(f.run(['stop', 'external']).status, 0)
})

test('does not leave a record or lock after a spawn error', (t) => {
  const f = fixture(t)
  const result = f.run(['start', 'broken', '--', join(f.cwd, 'missing-command')])
  assert.notEqual(result.status, 0)
  assert.equal(existsSync(f.recordPath('broken')), false)
  assert.equal(existsSync(join(f.registry, 'broken.lock')), false)
})

test('refuses duplicate starts and pre-existing locks without overwriting a live label', async (t) => {
  const f = fixture(t)
  const rec = await f.start()
  const duplicate = f.run([
    'start',
    'dev',
    '--',
    process.execPath,
    '-e',
    'setInterval(()=>{},1000)',
  ])
  assert.notEqual(duplicate.status, 0)
  assert.equal(f.read('dev').pid, rec.pid)
  assert.equal(alive(rec.pid), true)
  mkdirSync(join(f.registry, 'locked.lock'))
  assert.notEqual(
    f.run(['start', 'locked', '--', process.execPath, '-e', 'setInterval(()=>{},1000)']).status,
    0
  )
  assert.equal(existsSync(f.recordPath('locked')), false)
})

test('escalates a verified process that ignores SIGTERM', async (t) => {
  const f = fixture(t)
  await f.start('stubborn', `process.on('SIGTERM', () => {})`)
  const result = f.run(['stop', 'stubborn'])
  assert.equal(result.status, 0, result.stderr)
  assert.equal(existsSync(f.recordPath('stubborn')), false)
})

test('refuses escalation if identity changes after SIGTERM', async (t) => {
  const f = fixture(t)
  const marker = join(f.cwd, 'terminated')
  const rec = await f.start(
    'changing',
    `process.on('SIGTERM', () => writeFileSync(${JSON.stringify(marker)}, 'yes'))`
  )
  const ps = join(f.cwd, 'ps')
  writeFileSync(
    ps,
    `#!${process.execPath}
const fs = require('node:fs');
const {spawnSync} = require('node:child_process');
if (process.argv.includes('lstart=') && fs.existsSync(${JSON.stringify(marker)})) {
  console.log('changed identity');
} else {
  const result = spawnSync('/bin/ps', process.argv.slice(2), {encoding:'utf8'});
  process.stdout.write(result.stdout ?? '');
  process.exitCode = result.status ?? 1;
}
`
  )
  chmodSync(ps, 0o755)
  const stopped = f.run(['stop', 'changing'], { PATH: `${f.cwd}:${process.env.PATH}` })
  assert.notEqual(stopped.status, 0)
  assert.match(stopped.stderr, /start-time changed/)
  assert.equal(existsSync(marker), true)
  assert.equal(alive(rec.pid), true)
  assert.equal(existsSync(f.recordPath('changing')), true)
})

test('preserves the record when a group leader exits but a descendant remains', async (t) => {
  const f = fixture(t)
  const childFile = join(f.cwd, 'descendant-pid')
  const childReady = join(f.cwd, 'descendant-ready')
  await f.start(
    'parent',
    `
    const {spawn} = await import('node:child_process');
    const child = spawn(process.execPath, ['-e', ${JSON.stringify(`process.on('SIGTERM',()=>{}); require('node:fs').writeFileSync(${JSON.stringify(childReady)}, 'ready'); setInterval(()=>{},1000)`)}], {stdio:'ignore'});
    writeFileSync(${JSON.stringify(childFile)}, String(child.pid));
  `
  )
  const childPid = Number(readFileSync(childFile, 'utf8'))
  f.children.add(childPid)
  await waitFor(() => existsSync(childReady))
  const stopped = f.run(['stop', 'parent'])
  assert.notEqual(stopped.status, 0)
  assert.match(stopped.stderr, /[Dd]escendants remain|descendants remain/)
  assert.equal(alive(childPid), true)
  assert.equal(existsSync(f.recordPath('parent')), true)
  const restarted = f.run([
    'start',
    'parent',
    '--',
    process.execPath,
    '-e',
    'setInterval(()=>{},1000)',
  ])
  assert.notEqual(restarted.status, 0)
  assert.match(restarted.stderr, /[Dd]escendants remain/)
  assert.equal(f.run(['gc']).status, 0)
  assert.equal(existsSync(f.recordPath('parent')), true)
})

test('rejects malformed options and never treats inherited table keys as commands', (t) => {
  const f = fixture(t)
  for (const args of [
    ['constructor'],
    ['toString'],
    ['list', 'extra'],
    ['stop-all', 'extra'],
    ['start', 'dev', '--port', '65536', '--', 'node'],
    ['start', 'dev', '--port', 'nope', '--', 'node'],
    ['start', 'dev', '--unknown', 'x', '--', 'node'],
    ['start', 'dev', '--port', '3000', '--port', '3001', '--', 'node'],
  ])
    assert.notEqual(f.run(args).status, 0, args.join(' '))
})

test('stop-all stops owned jobs and gc clears exited jobs without touching live records', async (t) => {
  const f = fixture(t)
  const first = await f.start('first')
  await f.start('second')
  process.kill(first.pid, 'SIGTERM')
  await waitFor(() => !alive(first.pid))
  const collected = f.run(['gc'])
  assert.equal(collected.status, 0, collected.stderr)
  assert.equal(existsSync(f.recordPath('first')), false)
  assert.equal(existsSync(f.recordPath('second')), true)
  const stopped = f.run(['stop-all'])
  assert.equal(stopped.status, 0, stopped.stderr)
  assert.equal(existsSync(f.recordPath('second')), false)
})
