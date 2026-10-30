import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { auditWorktrees, hasCompleteCoverage, inspectPath } from './audit.mjs'
import { resolveOrcaCommand } from './orca-runtime.mjs'

function inventory(worktrees, extra = {}) {
  return {
    worktrees,
    totalCount: worktrees.length,
    truncated: false,
    hostScope: { hostIds: ['local'], omittedHostIds: [] },
    ...extra,
  }
}

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'orca-doctor-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const path = join(root, 'feature')
  mkdirSync(path)
  const worktree = {
    id: `repo::${path}`,
    repoId: 'repo',
    path,
    hostId: 'local',
    instanceId: 'feature-instance',
    identity: {
      key: 'wt2:local:feature-instance',
      executionHostId: 'local',
      instanceId: 'feature-instance',
    },
    isMainWorktree: false,
    branch: 'refs/heads/feature',
    head: 'commit',
  }
  const session = {
    worktreeId: worktree.id,
    repoId: 'repo',
    path,
    hostId: 'local',
    worktreeInstanceId: 'feature-instance',
    hasHostSidebarActivity: false,
    liveTerminalCount: 0,
    hasAttachedPty: false,
    isActive: false,
    status: 'inactive',
    agents: [],
  }
  const params = {
    inventory: inventory([worktree]),
    activity: inventory([session]),
    current: { id: 'repo::primary', hostId: 'local' },
    cwd: root,
    isLocalRuntime: true,
    repoId: 'repo',
  }
  return { root, path, worktree, session, params }
}

test('resolves the configured executable before dev and platform defaults', () => {
  assert.equal(
    resolveOrcaCommand({
      env: { ORCA_CLI_COMMAND: '/path with spaces/orca', ORCA_DEV_REPO_ROOT: '/dev' },
      platform: 'linux',
    }),
    '/path with spaces/orca'
  )
  assert.equal(
    resolveOrcaCommand({ env: { ORCA_DEV_REPO_ROOT: '/dev' }, platform: 'linux' }),
    'orca-dev'
  )
  assert.equal(resolveOrcaCommand({ env: {}, platform: 'linux' }), 'orca-ide')
  assert.equal(
    resolveOrcaCommand({ env: { ORCA_TERMINAL_HANDLE: 'term_1' }, platform: 'linux' }),
    'orca'
  )
  assert.equal(resolveOrcaCommand({ env: {}, platform: 'darwin' }), 'orca')
})

test('reports hidden inactive worktrees without claiming Git safety', (t) => {
  const { params } = fixture(t)
  const result = auditWorktrees(params)
  assert.equal(result.complete, true)
  assert.equal(result.worktrees[0].state, 'hidden')
  assert.equal(result.worktrees[0].gitSafety, 'not-exposed-by-orca-listings')
  assert.deepEqual(result.worktrees[0].actions, ['inspect', 'reveal', 'confirm-native-removal'])
})

test('protects the invoking checkout through a symlink and from a subdirectory', (t) => {
  const { root, path, params } = fixture(t)
  mkdirSync(join(path, 'src'))
  const alias = join(root, 'alias')
  symlinkSync(path, alias, 'dir')
  const result = auditWorktrees({ ...params, cwd: join(alias, 'src') })
  assert.ok(result.worktrees[0].protection.includes('current'))
  assert.deepEqual(result.worktrees[0].actions, ['inspect'])
})

test('protects primary worktrees and the native current worktree independently', (t) => {
  const { worktree, params } = fixture(t)
  for (const change of [
    { current: worktree },
    { inventory: inventory([{ ...worktree, isMainWorktree: true }]) },
  ]) {
    assert.deepEqual(auditWorktrees({ ...params, ...change }).worktrees[0].actions, ['inspect'])
  }
})

test('blocks recovery when either inventory is incomplete or has conflicting rows', (t) => {
  const { worktree, params } = fixture(t)
  for (const broken of [
    { ...params.inventory, truncated: true },
    { ...params.inventory, truncated: undefined },
    { ...params.inventory, totalCount: 10 },
    { ...params.inventory, hostScope: { hostIds: ['local'], omittedHostIds: ['ssh:offline'] } },
    { ...params.inventory, hostScope: { hostIds: ['other'], omittedHostIds: [] } },
    inventory([worktree, worktree]),
  ]) {
    assert.equal(hasCompleteCoverage(broken), false)
    assert.deepEqual(auditWorktrees({ ...params, inventory: broken }).worktrees[0].actions, [
      'inspect',
    ])
  }
  assert.deepEqual(
    auditWorktrees({ ...params, activity: { ...params.activity, truncated: true } }).worktrees[0]
      .actions,
    ['inspect']
  )
})

test('does not confuse missing, stale-instance, or unknown activity with inactivity', (t) => {
  const { session, params } = fixture(t)
  for (const sessions of [
    [],
    [{ ...session, worktreeInstanceId: 'replacement' }],
    [{ ...session, liveTerminalCount: 1 }],
    [{ ...session, hasAttachedPty: undefined }],
    [{ ...session, isActive: undefined }],
    [{ ...session, hasHostSidebarActivity: undefined }],
    [{ ...session, status: 'working' }],
    [{ ...session, agents: [{ state: 'waiting' }] }],
  ]) {
    assert.deepEqual(
      auditWorktrees({ ...params, activity: inventory(sessions) }).worktrees[0].actions,
      ['inspect']
    )
  }
})

test('does not inspect remote paths against the local filesystem or merge hosts', (t) => {
  const { worktree, session, params } = fixture(t)
  const remote = auditWorktrees({ ...params, isLocalRuntime: false }).worktrees[0]
  assert.equal(remote.pathState, 'remote')
  assert.deepEqual(remote.actions, ['inspect'])
  const result = auditWorktrees({
    ...params,
    activity: inventory([{ ...session, hostId: 'ssh:host' }], {
      hostScope: { hostIds: ['ssh:host'], omittedHostIds: [] },
    }),
  })
  assert.equal(result.worktrees[0].activity, 'unknown')
  assert.deepEqual(result.worktrees[0].actions, ['inspect'])
  assert.equal(result.activityOnly[0].id, worktree.id)
})

test('retains missing paths and absent caller identity for inspection', (t) => {
  const { root, worktree, params } = fixture(t)
  assert.equal(inspectPath(join(root, 'missing')).state, 'missing')
  const missing = auditWorktrees({
    ...params,
    inventory: inventory([{ ...worktree, path: join(root, 'missing') }]),
  })
  assert.equal(missing.worktrees[0].state, 'missing-path')
  assert.deepEqual(missing.worktrees[0].actions, ['inspect'])
  assert.deepEqual(auditWorktrees({ ...params, current: null }).worktrees[0].actions, ['inspect'])
})
