#!/usr/bin/env node
// procs — safe background-process manager for agent-driven dev/debug loops.
//
// Tracks launched processes and explicitly approved adoptions. Every proc is
// registered with its pid, process-group id, command, and OS start-time. On stop,
// the start-time is re-checked before each signal; unverifiable identities fail closed.
// It NEVER maps a port back to a pid to kill it (the classic `lsof -ti:PORT | kill`
// footgun that nukes whatever happens to hold the port). Ports are resolved pid->port
// for display only.
//
// Usage:
//   procs start <label> [--port N] [--cwd DIR] -- <cmd...>   spawn + track a long-runner
//   procs list                                               table of tracked procs (alive?, port)
//   procs logs <label> [-n N]                                last N log lines (default 60)
//   procs info <label>                                       full registry record + resolved port
//   procs stop <label>                                       SIGTERM->SIGKILL; identity checks cannot be bypassed
//   procs stop-all                                           stop every tracked proc
//   procs adopt <label> --pid N --confirm [--port M]          explicitly approved, single-PID adoption
//   procs gc                                                 drop registry entries whose pid is dead
//
// Registry dir: $PROCS_DIR or ./.scratchpad/procs (gitignored). One <label>.json + <label>.log per proc.

import { spawnSync, spawn } from 'node:child_process'
import { once } from 'node:events'
import {
  closeSync,
  constants,
  existsSync,
  lstatSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  rmSync,
  rmdirSync,
  writeFileSync,
} from 'node:fs'
import { hostname } from 'node:os'
import { basename, join, resolve } from 'node:path'

const REG_DIR = process.env.PROCS_DIR
  ? resolve(process.env.PROCS_DIR)
  : resolve(process.cwd(), '.scratchpad/procs')

const die = (msg) => {
  throw new Error(msg)
}

const ensureDir = () => {
  mkdirSync(REG_DIR, { recursive: true, mode: 0o700 })
  const stat = lstatSync(REG_DIR)
  if (!stat.isDirectory() || stat.isSymbolicLink() || stat.uid !== process.getuid()) {
    die('Registry must be a real directory owned by the current user')
  }
}

const validateLabel = (label) => {
  if (typeof label !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(label)) {
    die(
      'Label must contain 1-64 letters, digits, underscores, or hyphens, starting with a letter or digit'
    )
  }
  return label
}
const validatePid = (pid) => {
  if (!Number.isSafeInteger(pid) || pid <= 1 || pid > 2_147_483_647)
    die('PID must be an integer greater than 1')
  return pid
}
const recPath = (label) => join(REG_DIR, `${validateLabel(label)}.json`)
const logPath = (label) => join(REG_DIR, `${validateLabel(label)}.log`)

const withLock = async (label, action) => {
  validateLabel(label)
  ensureDir()
  const lock = join(REG_DIR, `${label}.lock`)
  try {
    mkdirSync(lock, { mode: 0o700 })
  } catch (error) {
    if (error.code === 'EEXIST')
      die(`"${label}" is locked; inspect the existing operation before retrying`)
    throw error
  }
  try {
    return await action()
  } finally {
    rmdirSync(lock)
  }
}

const openRegular = (file, flags) => {
  if (existsSync(file) && !lstatSync(file).isFile()) die(`Refusing non-regular file: ${file}`)
  return openSync(file, flags | constants.O_NOFOLLOW, 0o600)
}

const readRec = (label) => {
  const p = recPath(label)
  if (!existsSync(p)) return null
  const fd = openRegular(p, constants.O_RDONLY)
  try {
    return JSON.parse(readFileSync(fd, 'utf8'))
  } finally {
    closeSync(fd)
  }
}

const writeRec = (rec) => {
  const fd = openRegular(
    recPath(rec.label),
    constants.O_WRONLY | constants.O_CREAT | constants.O_TRUNC
  )
  try {
    writeFileSync(fd, `${JSON.stringify(rec, null, 2)}\n`)
  } finally {
    closeSync(fd)
  }
}

const isAlive = (pid) => {
  validatePid(pid)
  try {
    process.kill(pid, 0)
    return true
  } catch (err) {
    if (err.code === 'ESRCH') return false
    throw err
  }
}

// OS start-time of a pid; null means it exited during inspection.
const startTime = (pid) => {
  validatePid(pid)
  const out = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], {
    encoding: 'utf8',
    timeout: 5000,
    env: { ...process.env, LC_ALL: 'C', TZ: 'UTC' },
  })
  if (out.status !== 0 || !out.stdout.trim()) {
    if (!isAlive(pid)) return null
    die(`Cannot verify start-time for pid ${pid}; refusing to signal`)
  }
  return out.stdout.trim()
}

const processDetails = (pid) => {
  validatePid(pid)
  const out = spawnSync('ps', ['-o', 'pgid=,uid=,stat=', '-p', String(pid)], {
    encoding: 'utf8',
    timeout: 5000,
  })
  if (out.status !== 0) {
    if (!isAlive(pid)) return null
    die(`Cannot verify process identity for pid ${pid}`)
  }
  const [group, uid, state] = out.stdout.trim().split(/\s+/)
  if (!state || !/^\d+$/.test(uid)) die(`Invalid process identity for pid ${pid}`)
  return { pgid: validatePid(Number(group)), uid: Number(uid), state }
}

const verifyIdentity = (rec) => {
  validatePid(rec.pid)
  validateLabel(rec.label)
  if (
    rec.version !== 1 ||
    rec.host !== hostname() ||
    rec.uid !== process.getuid() ||
    typeof rec.startTime !== 'string' ||
    !rec.startTime.trim() ||
    !['owned', 'adopted'].includes(rec.kind)
  )
    die('Invalid or unverifiable record; refusing to signal')
  if (!isAlive(rec.pid)) return false
  const details = processDetails(rec.pid)
  if (!details) return false
  if (details.uid !== rec.uid) die('Process owner changed; refusing to signal')
  if (details.state.startsWith('Z')) return false
  const currentStart = startTime(rec.pid)
  if (currentStart === null) return false
  if (currentStart !== rec.startTime)
    die(`"${rec.label}": start-time changed; REFUSING to kill a reused PID`)
  if (rec.kind === 'owned' && (rec.pgid !== rec.pid || details.pgid !== rec.pgid)) {
    die('Process group changed or was not created by this tool; refusing to signal')
  }
  return true
}

// Live command line of a pid, for display only.
const cmdOf = (pid) => {
  const out = spawnSync('ps', ['-o', 'command=', '-p', String(pid)], { encoding: 'utf8' })
  return out.status === 0 ? out.stdout.trim() : ''
}

// Resolve the listening TCP port(s) a proc owns — scoped to the process GROUP,
// then the pid. Never the other direction.
const resolvePort = (rec) => {
  validatePid(rec.pid)
  const scopes =
    rec.kind === 'owned'
      ? [
          ['-g', String(validatePid(rec.pgid))],
          ['-p', String(rec.pid)],
        ]
      : [['-p', String(rec.pid)]]
  for (const scope of scopes) {
    const out = spawnSync('lsof', ['-nP', '-iTCP', '-sTCP:LISTEN', '-a', ...scope], {
      encoding: 'utf8',
    })
    if (out.status !== 0 || !out.stdout) continue
    const ports = [...out.stdout.matchAll(/:(\d+)\s+\(LISTEN\)/g)].map((m) => Number(m[1]))
    if (ports.length) return [...new Set(ports)].toSorted((a, b) => a - b)
  }
  return []
}

const parseFlags = (args, allowed = [], booleans = []) => {
  const flags = {}
  const rest = []
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i]
    if (a.startsWith('-')) {
      const key = a === '-n' ? 'n' : a.slice(2)
      if (!allowed.includes(key) || Object.hasOwn(flags, key))
        die(`Unknown or duplicate option: ${a}`)
      if (booleans.includes(key)) {
        flags[key] = true
        continue
      }
      const next = args[i + 1]
      if (next === undefined || next.startsWith('--')) die(`Missing value for ${a}`)
      else {
        flags[key] = next
        i += 1
      }
    } else rest.push(a)
  }
  return { flags, rest }
}

const positiveInteger = (value, name, max = 2_147_483_647) => {
  if (
    typeof value !== 'string' ||
    !/^[1-9]\d*$/.test(value) ||
    !Number.isSafeInteger(Number(value)) ||
    Number(value) > max
  )
    die(`${name} must be a positive integer <= ${max}`)
  return Number(value)
}

const cmdStart = async (argv) => {
  const dashdash = argv.indexOf('--')
  if (dashdash === -1) die('start needs: <label> [--port N] [--cwd DIR] -- <cmd...>')
  const head = argv.slice(0, dashdash)
  const cmd = argv.slice(dashdash + 1)
  const { flags, rest } = parseFlags(head, ['port', 'cwd'])
  const label = validateLabel(rest[0])
  if (rest.length !== 1) die('start needs exactly one label')
  if (!cmd.length) die('start needs a command after --')
  const port = flags.port ? positiveInteger(flags.port, 'Port', 65535) : null

  return withLock(label, async () => {
    const existing = readRec(label)
    if (existing && isAlive(existing.pid)) {
      die(`"${label}" already running (pid ${existing.pid}). Stop it first or pick another label.`)
    }
    if (existing) {
      if (existing.label !== label) die('Record label does not match its filename')
      verifyIdentity(existing)
      if (hasLiveGroupMembers(existing))
        die('Descendants remain from the previous job; refusing to overwrite its record')
    }

    const cwd = flags.cwd ? resolve(String(flags.cwd)) : process.cwd()
    const logFd = openRegular(
      logPath(label),
      constants.O_WRONLY | constants.O_APPEND | constants.O_CREAT
    )
    const child = spawn(cmd[0], cmd.slice(1), {
      cwd,
      detached: true, // own process group; child.pid === pgid
      stdio: ['ignore', logFd, logFd],
      env: { ...process.env, PROCS_LABEL: label },
    })
    try {
      await once(child, 'spawn')
    } finally {
      closeSync(logFd)
    }

    let rec
    try {
      const pid = validatePid(child.pid)
      const pgid = processDetails(pid).pgid
      if (pid !== pgid) die('Detached child is not its own group leader')
      rec = {
        version: 1,
        kind: 'owned',
        host: hostname(),
        uid: process.getuid(),
        label,
        pid: child.pid,
        pgid: child.pid,
        cmd,
        cwd,
        declaredPort: port,
        startTime: startTime(child.pid),
        startedAt: new Date().toISOString(),
        log: logPath(label),
      }
      if (!verifyIdentity(rec)) die('Child exited before it could be tracked')
      writeRec(rec)
    } catch (error) {
      child.kill('SIGTERM')
      throw error
    } finally {
      child.unref()
    }
    process.stdout.write(
      `started ${label} pid ${rec.pid}\n  cmd: ${cmd.join(' ')}\n  log: ${rec.log}\n`
    )
    process.stdout.write(`  tail: node ${basename(process.argv[1])} logs ${label}\n`)
  })
}

const cmdAdopt = async (argv) => {
  const { flags, rest } = parseFlags(argv, ['pid', 'port', 'cmd', 'confirm'], ['confirm'])
  const label = validateLabel(rest[0])
  if (rest.length !== 1) die('adopt needs exactly one label')
  if (!flags.pid) die('adopt needs --pid N')
  const pid = validatePid(positiveInteger(flags.pid, 'PID'))
  if (!flags.confirm) die('adopt requires explicit user approval followed by --confirm')
  const port = flags.port ? positiveInteger(flags.port, 'Port', 65535) : null
  if (!isAlive(pid)) die(`pid ${pid} is not alive`)
  if (processDetails(pid).uid !== process.getuid())
    die('Cannot adopt a process owned by another user')
  return withLock(label, () => {
    if (readRec(label)) die(`"${label}" already has a record; adoption cannot overwrite it`)
    const rec = {
      version: 1,
      kind: 'adopted',
      host: hostname(),
      uid: process.getuid(),
      label,
      pid,
      pgid: null,
      cmd: flags.cmd ? [String(flags.cmd)] : [cmdOf(pid) || 'adopted'],
      cwd: process.cwd(),
      declaredPort: port,
      startTime: startTime(pid),
      startedAt: new Date().toISOString(),
      adopted: true,
      log: null,
    }
    if (!verifyIdentity(rec)) die('Process exited before adoption could be verified')
    writeRec(rec)
    process.stdout.write(`adopted ${label} -> pid ${pid}\n`)
  })
}

const cmdList = () => {
  ensureDir()
  const recs = readdirSync(REG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => readRec(f.slice(0, -5)))
  if (!recs.length) {
    process.stdout.write('no tracked procs\n')
    return
  }
  const rows = recs.map((rec) => {
    let state
    try {
      state = verifyIdentity(rec) ? 'up' : 'dead'
    } catch {
      state = 'unverifiable'
    }
    const alive = state === 'up'
    const ports = alive ? resolvePort(rec) : []
    const declared = rec.declaredPort ? `${rec.declaredPort}?` : '-'
    const portStr = ports.length ? ports.join(',') : declared
    return {
      label: rec.label,
      pid: String(rec.pid),
      state,
      port: portStr,
      cmd: rec.cmd.join(' ').slice(0, 48),
    }
  })
  const col = (key, min) => Math.max(min, ...rows.map((r) => r[key].length))
  const w = {
    label: col('label', 5),
    pid: col('pid', 5),
    state: col('state', 5),
    port: col('port', 4),
  }
  const line = (r) =>
    `${r.label.padEnd(w.label)}  ${r.pid.padEnd(w.pid)}  ${r.state.padEnd(w.state)}  ${r.port.padEnd(w.port)}  ${r.cmd}`
  process.stdout.write(
    `${line({ label: 'LABEL', pid: 'PID', state: 'STATE', port: 'PORT', cmd: 'CMD' })}\n`
  )
  for (const r of rows) process.stdout.write(`${line(r)}\n`)
}

const cmdLogs = (argv) => {
  const { flags, rest } = parseFlags(argv, ['n'])
  const label = rest[0]
  if (rest.length !== 1) die('logs needs exactly one label')
  const rec = readRec(label)
  if (!rec) die(`no such proc "${label}"`)
  if (!rec.log || !existsSync(logPath(label))) die(`no log file for "${label}"`)
  const n = flags.n ? positiveInteger(flags.n, 'Line count', 100_000) : 60
  const fd = openRegular(logPath(label), constants.O_RDONLY)
  let lines
  try {
    lines = readFileSync(fd, 'utf8').split('\n')
  } finally {
    closeSync(fd)
  }
  process.stdout.write(`${lines.slice(-n - 1).join('\n')}\n`)
}

const cmdInfo = (argv) => {
  const { rest } = parseFlags(argv)
  if (rest.length !== 1) die('info needs exactly one label')
  const rec = readRec(rest[0])
  if (!rec) die(`no such proc "${rest[0]}"`)
  const alive = verifyIdentity(rec)
  process.stdout.write(
    `${JSON.stringify({ ...rec, alive, ports: alive ? resolvePort(rec) : [] }, null, 2)}\n`
  )
}

const killGroup = (rec, signal) => {
  if (!verifyIdentity(rec)) return false
  try {
    process.kill(rec.kind === 'owned' ? -rec.pgid : rec.pid, signal)
    return true
  } catch (error) {
    if (error.code === 'ESRCH') return false
    throw error
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const waitForExit = async (rec, tries = 30) => {
  if (!verifyIdentity(rec)) return true
  if (tries === 0) return false
  await sleep(100)
  return waitForExit(rec, tries - 1)
}

const hasLiveGroupMembers = (rec) => {
  if (rec.kind !== 'owned') return false
  validatePid(rec.pgid)
  const out = spawnSync('ps', ['-eo', 'pgid=,stat='], { encoding: 'utf8', timeout: 5000 })
  if (out.status !== 0) die('Cannot verify group exit; preserving the record')
  return out.stdout
    .trim()
    .split('\n')
    .some((line) => {
      const [group, state] = line.trim().split(/\s+/)
      return Number(group) === rec.pgid && state && !state.startsWith('Z')
    })
}

const stopOne = async (label) =>
  withLock(label, async () => {
    const rec = readRec(label)
    if (!rec) {
      process.stdout.write(`"${label}": no record, nothing to stop\n`)
      return
    }
    if (rec.label !== label) die('Record label does not match its filename')
    if (!verifyIdentity(rec)) {
      if (hasLiveGroupMembers(rec))
        die('Group leader exited but descendants remain; refusing to signal an unverifiable group')
      rmSync(recPath(label), { force: true })
      process.stdout.write(`"${label}": already dead, cleared record\n`)
      return
    }
    killGroup(rec, 'SIGTERM')
    if (!(await waitForExit(rec))) {
      killGroup(rec, 'SIGKILL')
      if (!(await waitForExit(rec, 10))) die('Process did not exit; preserving the record')
    }
    if (hasLiveGroupMembers(rec))
      die('Descendants remain after leader exit; preserving the record for inspection')
    rmSync(recPath(label), { force: true })
    process.stdout.write(`stopped ${label} (pid ${rec.pid})\n`)
  })

const cmdStop = async (argv) => {
  const { rest } = parseFlags(argv)
  if (rest.length !== 1) die('stop needs exactly one label')
  await stopOne(rest[0])
}

const cmdStopAll = async (argv) => {
  const { rest } = parseFlags(argv)
  if (rest.length) die('stop-all does not accept arguments')
  ensureDir()
  const labels = readdirSync(REG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
  if (!labels.length) {
    process.stdout.write('no tracked procs\n')
    return
  }
  await labels.reduce((previous, label) => previous.then(() => stopOne(label)), Promise.resolve())
}

const cmdGc = async () => {
  ensureDir()
  const files = readdirSync(REG_DIR).filter((f) => f.endsWith('.json'))
  let dropped = 0
  await files.reduce(
    (previous, f) =>
      previous.then(() =>
        withLock(f.slice(0, -5), () => {
          const rec = readRec(f.slice(0, -5))
          if (!verifyIdentity(rec) && !hasLiveGroupMembers(rec)) {
            rmSync(recPath(f.slice(0, -5)))
            dropped += 1
          }
        })
      ),
    Promise.resolve()
  )
  process.stdout.write(`gc: dropped ${dropped} dead record(s)\n`)
}

const [, , sub, ...rest] = process.argv
const table = {
  start: cmdStart,
  adopt: cmdAdopt,
  list: cmdList,
  ls: cmdList,
  logs: cmdLogs,
  info: cmdInfo,
  port: cmdInfo,
  stop: cmdStop,
  'stop-all': cmdStopAll,
  gc: cmdGc,
}

const handler = Object.hasOwn(table, sub) ? table[sub] : null
if (!handler) {
  const names = Object.keys(table).join(', ')
  process.stderr.write(`procs: unknown command "${sub ?? ''}". commands: ${names}\n`)
  process.exit(sub ? 1 : 0)
}
try {
  if (!['darwin', 'linux'].includes(process.platform))
    die('This tool supports macOS and Linux only')
  if (['list', 'ls', 'gc'].includes(sub) && rest.length) die(`${sub} does not accept arguments`)
  await handler(rest)
} catch (error) {
  process.stderr.write(`procs: ${error.message}\n`)
  process.exitCode = 1
}
