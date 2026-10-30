#!/usr/bin/env node
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'

import { auditWorktrees } from './audit.mjs'
import { readOrca, resolveOrcaCommand } from './orca-runtime.mjs'

function requireResult(result, label) {
  if (!result.ok) throw new Error(`${label}: ${result.error}`)
  return result.value
}

function readInventory(args, options) {
  const initial = readOrca([...args, '--limit', '100'], options)
  if (!initial.ok || initial.value.truncated !== true) return initial
  const count = initial.value.totalCount
  if (!Number.isSafeInteger(count) || count <= 100 || count > 10_000) return initial
  return readOrca([...args, '--limit', String(count)], options)
}

function repoSelector(input) {
  if (/^(id|name|path):/.test(input)) return input
  return `path:${resolve(input)}`
}

function audit(repoInput) {
  const command = resolveOrcaCommand()
  const options = { env: { ...process.env, ORCA_CLI_COMMAND: command }, cwd: process.cwd() }
  const statusResult = readOrca(['status'], options)
  const status = requireResult(statusResult, 'Runtime status')
  if (status.runtime?.state !== 'ready' || status.graph?.state !== 'ready') {
    throw new Error('Orca runtime and graph must both be ready. No inventory was classified.')
  }
  const currentResult = readOrca(['worktree', 'current'], options)
  const current = currentResult.ok ? currentResult.value.worktree : null
  if (!repoInput && !current?.repoId) {
    throw new Error(
      `Cannot resolve the invoking worktree; pass a repo selector. ${currentResult.error ?? ''}`
    )
  }
  const selector = repoInput ? repoSelector(repoInput) : `id:${current.repoId}`
  const repoResult = readOrca(['repo', 'show', '--repo', selector], options)
  const { repo } = requireResult(repoResult, 'Repository settings')
  if (!repo?.id || repo.kind !== 'git') throw new Error('Select an Orca-registered Git repository.')
  const inventoryResult = readInventory(['worktree', 'list', '--repo', `id:${repo.id}`], options)
  const activityResult = readInventory(['worktree', 'ps'], options)
  const inventory = requireResult(inventoryResult, 'Worktree inventory')
  const activity = requireResult(activityResult, 'Worktree activity')
  if (inventory.worktrees?.some((worktree) => worktree?.repoId !== repo.id)) {
    throw new Error('Orca returned a worktree outside the selected repository.')
  }
  const reads = [statusResult, currentResult, repoResult, inventoryResult, activityResult].filter(
    (r) => r.ok
  )
  if (
    !statusResult.runtimeId ||
    reads.some((result) => result.runtimeId !== statusResult.runtimeId)
  ) {
    throw new Error(
      'Runtime identity changed or is missing. Rerun the audit before using its findings.'
    )
  }
  const findings = auditWorktrees({
    inventory,
    activity,
    current,
    cwd: options.cwd,
    isLocalRuntime: status.target?.kind === 'local',
    repoId: repo.id,
  })
  return {
    ok: true,
    context: {
      command,
      runtimeId: statusResult.runtimeId,
      version: status.runtime.appVersion ?? null,
      target: status.target?.kind ?? 'unknown',
      invokedFrom: options.cwd,
      currentWorktree: current
        ? { id: current.id, hostId: current.hostId, path: current.path }
        : null,
      currentWorktreeError: currentResult.ok ? null : currentResult.error,
      repo: {
        id: repo.id,
        path: repo.path,
        kind: repo.kind,
        externalWorktreeVisibility: repo.externalWorktreeVisibility ?? null,
        hooks: {
          mode: repo.hookSettings?.mode ?? null,
          setupRunPolicy: repo.hookSettings?.setupRunPolicy ?? null,
          archiveConfigured: Boolean(repo.hookSettings?.scripts?.archive),
        },
      },
    },
    coverage: {
      complete: findings.complete,
      inventory: { truncated: inventory.truncated ?? null, hostScope: inventory.hostScope ?? null },
      activity: { truncated: activity.truncated ?? null, hostScope: activity.hostScope ?? null },
    },
    limitations: [
      'Orca listings do not expose dirtiness, locks, Git operations, or integration proof. No row is certified safe to delete.',
      'Both inventories come from Orca; this is not an independent Git orphan scan.',
      'Remote paths and missing paths are inspection-only. No settings or worktrees are changed by this script.',
    ],
    worktrees: findings.worktrees,
    activityOnly: findings.activityOnly,
  }
}

try {
  const { values, positionals } = parseArgs({
    options: { help: { type: 'boolean', short: 'h' } },
    allowPositionals: true,
  })
  if (values.help) {
    console.log(
      'Usage: node doctor.mjs [repo-selector]\nRead-only Orca audit. Defaults to the invoking worktree’s repo.\nSelector: id:<id>, name:<name>, path:<repo-path>, or a repository path.\nExit codes: 0 complete audit, 1 incomplete audit or runtime error. Requires Node 24+.'
    )
  } else {
    if (positionals.length > 1) throw new Error('Expected at most one repository selector.')
    const report = audit(positionals[0])
    console.log(JSON.stringify(report, null, 2))
    process.exitCode = report.coverage.complete ? 0 : 1
  }
} catch (error) {
  console.log(
    JSON.stringify({ ok: false, command: resolveOrcaCommand(), error: error.message }, null, 2)
  )
  process.exitCode = 1
}
