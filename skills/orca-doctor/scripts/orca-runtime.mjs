import { spawnSync } from 'node:child_process'

/** Selects one Orca executable without probing a different installation on failure. */
export function resolveOrcaCommand({ env = process.env, platform = process.platform } = {}) {
  if (env.ORCA_CLI_COMMAND) return env.ORCA_CLI_COMMAND
  if (env.ORCA_DEV_REPO_ROOT) return 'orca-dev'
  if (platform === 'linux' && !env.ORCA_TERMINAL_HANDLE) return 'orca-ide'
  return 'orca'
}

/** Runs Orca directly; the override is an executable path/name, never shell text. */
export function runOrca(args, { env = process.env, cwd = process.cwd(), inherit = false } = {}) {
  const command = resolveOrcaCommand({ env })
  return spawnSync(command, args, {
    cwd,
    env: { ...env, ORCA_CLI_COMMAND: command },
    shell: false,
    encoding: 'utf8',
    stdio: inherit ? 'inherit' : 'pipe',
    ...(inherit ? {} : { timeout: 30_000, maxBuffer: 16 * 1024 * 1024 }),
  })
}

/** Reads a documented Orca JSON envelope, preserving CLI failures as data. */
export function readOrca(args, options) {
  const result = runOrca([...args, '--json'], options)
  if (result.error || result.status !== 0) {
    return {
      ok: false,
      error:
        result.error?.message || result.stderr?.trim() || result.stdout?.trim() || 'Orca failed',
    }
  }
  try {
    const envelope = JSON.parse(result.stdout)
    if (envelope.ok !== true || !envelope.result || typeof envelope.result !== 'object') {
      return { ok: false, error: JSON.stringify(envelope.error ?? envelope) }
    }
    const { result: value, _meta: metadata } = envelope
    return { ok: true, value, runtimeId: metadata?.runtimeId }
  } catch (error) {
    return { ok: false, error: `Invalid Orca JSON: ${error.message}` }
  }
}
