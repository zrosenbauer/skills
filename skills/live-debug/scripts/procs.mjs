#!/usr/bin/env node
// procs — safe background-process manager for agent-driven dev/debug loops.
//
// Core guarantee: this tool only ever kills processes IT started. Every proc is
// registered with its pid, process-group id, command, and OS start-time. On stop,
// the start-time is re-checked so a recycled pid can never be signalled by mistake.
// It NEVER maps a port back to a pid to kill it (the classic `lsof -ti:PORT | kill`
// footgun that nukes whatever happens to hold the port). Ports are resolved pid->port
// for display only.
//
// Usage:
//   procs start <label> [--port N] [--cwd DIR] -- <cmd...>   spawn + track a long-runner
//   procs list                                               table of tracked procs (alive?, port)
//   procs logs <label> [-n N]                                last N log lines (default 60)
//   procs info <label>                                       full registry record + resolved port
//   procs stop <label> [--force]                             SIGTERM->SIGKILL the group; --force skips start-time guard
//   procs stop-all [--force]                                 stop every tracked proc
//   procs adopt <label> --pid N [--port M] [--cmd "sig"]     register an already-running pid (e.g. a harness bg task)
//   procs gc                                                 drop registry entries whose pid is dead
//
// Registry dir: $PROCS_DIR or ./.scratchpad/procs (gitignored). One <label>.json + <label>.log per proc.

import { spawnSync, spawn } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { basename, join, resolve } from 'node:path'

const REG_DIR = process.env.PROCS_DIR
  ? resolve(process.env.PROCS_DIR)
  : resolve(process.cwd(), '.scratchpad/procs')

const die = (msg) => {
  process.stderr.write(`procs: ${msg}\n`)
  process.exit(1)
}

const ensureDir = () => {
  if (!existsSync(REG_DIR)) mkdirSync(REG_DIR, { recursive: true })
}

const recPath = (label) => join(REG_DIR, `${label}.json`)
const logPath = (label) => join(REG_DIR, `${label}.log`)

const readRec = (label) => {
  const p = recPath(label)
  if (!existsSync(p)) return null
  return JSON.parse(readFileSync(p, 'utf8'))
}

const writeRec = (rec) => writeFileSync(recPath(rec.label), `${JSON.stringify(rec, null, 2)}\n`)

const isAlive = (pid) => {
  try {
    process.kill(pid, 0)
    return true
  } catch (err) {
    return err.code === 'EPERM' // exists but not ours
  }
}

// OS start-time of a pid, used as the anti-reuse fingerprint. Empty string if gone.
const startTime = (pid) => {
  const out = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], { encoding: 'utf8' })
  return out.status === 0 ? out.stdout.trim() : ''
}

// Live command line of a pid, for display + adopt signature checks.
const cmdOf = (pid) => {
  const out = spawnSync('ps', ['-o', 'command=', '-p', String(pid)], { encoding: 'utf8' })
  return out.status === 0 ? out.stdout.trim() : ''
}

// Resolve the listening TCP port(s) a proc owns — scoped to the process GROUP,
// then the pid. Never the other direction.
const resolvePort = (rec) => {
  const scopes = [
    ['-g', String(rec.pgid ?? rec.pid)],
    ['-p', String(rec.pid)],
  ]
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

const parseFlags = (args) => {
  const flags = {}
  const rest = []
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = args[i + 1]
      if (next === undefined || next.startsWith('--')) flags[key] = true
      else {
        flags[key] = next
        i += 1
      }
    } else rest.push(a)
  }
  return { flags, rest }
}

const cmdStart = (argv) => {
  const dashdash = argv.indexOf('--')
  if (dashdash === -1) die('start needs: <label> [--port N] [--cwd DIR] -- <cmd...>')
  const head = argv.slice(0, dashdash)
  const cmd = argv.slice(dashdash + 1)
  const { flags, rest } = parseFlags(head)
  const label = rest[0]
  if (!label) die('start needs a <label>')
  if (!cmd.length) die('start needs a command after --')

  ensureDir()
  const existing = readRec(label)
  if (existing && isAlive(existing.pid)) {
    die(`"${label}" already running (pid ${existing.pid}). Stop it first or pick another label.`)
  }

  const cwd = flags.cwd ? resolve(String(flags.cwd)) : process.cwd()
  const logFd = openSync(logPath(label), 'a')
  const child = spawn(cmd[0], cmd.slice(1), {
    cwd,
    detached: true, // own process group; child.pid === pgid
    stdio: ['ignore', logFd, logFd],
    env: { ...process.env, PROCS_LABEL: label },
  })
  child.unref()

  const rec = {
    label,
    pid: child.pid,
    pgid: child.pid,
    cmd,
    cwd,
    declaredPort: flags.port ? Number(flags.port) : null,
    startTime: startTime(child.pid),
    startedAt: new Date().toISOString(),
    log: logPath(label),
  }
  writeRec(rec)
  process.stdout.write(
    `started ${label} pid ${rec.pid}\n  cmd: ${cmd.join(' ')}\n  log: ${rec.log}\n`
  )
  process.stdout.write(`  tail: node ${basename(process.argv[1])} logs ${label}\n`)
}

const cmdAdopt = (argv) => {
  const { flags, rest } = parseFlags(argv)
  const label = rest[0]
  if (!label) die('adopt needs a <label>')
  if (!flags.pid) die('adopt needs --pid N')
  const pid = Number(flags.pid)
  if (!isAlive(pid)) die(`pid ${pid} is not alive`)
  ensureDir()
  const rec = {
    label,
    pid,
    pgid: pid,
    cmd: flags.cmd ? [String(flags.cmd)] : [cmdOf(pid) || 'adopted'],
    cwd: process.cwd(),
    declaredPort: flags.port ? Number(flags.port) : null,
    startTime: startTime(pid),
    startedAt: new Date().toISOString(),
    adopted: true,
    log: null,
  }
  writeRec(rec)
  process.stdout.write(`adopted ${label} -> pid ${pid}\n`)
}

const cmdList = () => {
  ensureDir()
  const recs = readdirSync(REG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(REG_DIR, f), 'utf8')))
  if (!recs.length) {
    process.stdout.write('no tracked procs\n')
    return
  }
  const rows = recs.map((rec) => {
    const alive = isAlive(rec.pid)
    const ports = alive ? resolvePort(rec) : []
    const declared = rec.declaredPort ? `${rec.declaredPort}?` : '-'
    const portStr = ports.length ? ports.join(',') : declared
    return {
      label: rec.label,
      pid: String(rec.pid),
      state: alive ? 'up' : 'dead',
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
  const { flags, rest } = parseFlags(argv)
  const label = rest[0]
  if (!label) die('logs needs a <label>')
  const rec = readRec(label)
  if (!rec) die(`no such proc "${label}"`)
  if (!rec.log || !existsSync(rec.log)) die(`no log file for "${label}"`)
  const n = flags.n ? Number(flags.n) : 60
  const lines = readFileSync(rec.log, 'utf8').split('\n')
  process.stdout.write(`${lines.slice(-n - 1).join('\n')}\n`)
}

const cmdInfo = (argv) => {
  const { rest } = parseFlags(argv)
  const rec = readRec(rest[0])
  if (!rec) die(`no such proc "${rest[0]}"`)
  const alive = isAlive(rec.pid)
  process.stdout.write(
    `${JSON.stringify({ ...rec, alive, ports: alive ? resolvePort(rec) : [] }, null, 2)}\n`
  )
}

const killGroup = (rec, signal) => {
  try {
    process.kill(-rec.pgid, signal) // negative pid => whole group
  } catch {
    try {
      process.kill(rec.pid, signal)
    } catch {
      /* already gone */
    }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const stopOne = async (label, force) => {
  const rec = readRec(label)
  if (!rec) {
    process.stdout.write(`"${label}": no record, nothing to stop\n`)
    return
  }
  if (!isAlive(rec.pid)) {
    rmSync(recPath(label), { force: true })
    process.stdout.write(`"${label}": already dead, cleared record\n`)
    return
  }
  // Anti-reuse guard: the live pid must be the same process we started.
  const now = startTime(rec.pid)
  if (!force && rec.startTime && now && now !== rec.startTime) {
    die(
      `"${label}": pid ${rec.pid} start-time changed ("${rec.startTime}" -> "${now}"). ` +
        `The pid was likely recycled by an unrelated process — REFUSING to kill. ` +
        `Verify with: ps -p ${rec.pid} -o pid,lstart,command  (use --force only if you are certain).`
    )
  }
  killGroup(rec, 'SIGTERM')
  for (let i = 0; i < 30 && isAlive(rec.pid); i += 1) await sleep(100)
  if (isAlive(rec.pid)) {
    killGroup(rec, 'SIGKILL')
    await sleep(200)
  }
  rmSync(recPath(label), { force: true })
  process.stdout.write(`stopped ${label} (pid ${rec.pid})\n`)
}

const cmdStop = async (argv) => {
  const { flags, rest } = parseFlags(argv)
  if (!rest[0]) die('stop needs a <label>')
  await stopOne(rest[0], Boolean(flags.force))
}

const cmdStopAll = async (argv) => {
  const { flags } = parseFlags(argv)
  ensureDir()
  const labels = readdirSync(REG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
  if (!labels.length) {
    process.stdout.write('no tracked procs\n')
    return
  }
  for (const label of labels) await stopOne(label, Boolean(flags.force))
}

const cmdGc = () => {
  ensureDir()
  const files = readdirSync(REG_DIR).filter((f) => f.endsWith('.json'))
  let dropped = 0
  for (const f of files) {
    const rec = JSON.parse(readFileSync(join(REG_DIR, f), 'utf8'))
    if (!isAlive(rec.pid)) {
      rmSync(join(REG_DIR, f), { force: true })
      dropped += 1
    }
  }
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

const handler = table[sub]
if (!handler) {
  const names = Object.keys(table).join(', ')
  process.stderr.write(`procs: unknown command "${sub ?? ''}". commands: ${names}\n`)
  process.exit(sub ? 1 : 0)
}
await handler(rest)
