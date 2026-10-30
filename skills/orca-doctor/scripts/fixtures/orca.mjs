#!/usr/bin/env node
import { appendFileSync } from 'node:fs'

const args = process.argv.slice(2)
appendFileSync(
  process.env.DOCTOR_TEST_LOG,
  JSON.stringify({ args, command: process.env.ORCA_CLI_COMMAND }) + '\n'
)
const mode = process.env.DOCTOR_TEST_MODE
if (mode === 'invalid-json') {
  console.log('not JSON')
  process.exit(0)
}
if (mode === 'error') {
  console.log(JSON.stringify({ ok: false, error: { code: 'runtime_unavailable' } }))
  process.exit(0)
}
const name = args.slice(0, 2).join(' ')
const primary = {
  id: `repo::${process.cwd()}`,
  repoId: 'repo',
  hostId: 'local',
  path: process.cwd(),
  isMainWorktree: true,
  instanceId: 'main-instance',
  identity: {
    key: 'wt2:local:main-instance',
    executionHostId: 'local',
    instanceId: 'main-instance',
  },
}
const listing = {
  worktrees: [primary],
  totalCount: 1,
  truncated: false,
  hostScope: { hostIds: ['local'], omittedHostIds: [] },
}
function response() {
  if (args[0] === 'status')
    return {
      target: { kind: 'local' },
      runtime: { state: 'ready', appVersion: 'fixture' },
      graph: { state: 'ready' },
    }
  if (name === 'worktree current') return { worktree: primary }
  if (name === 'repo show')
    return {
      repo: {
        id: 'repo',
        path: process.cwd(),
        kind: 'git',
        externalWorktreeVisibility: 'show',
        hookSettings: { mode: 'auto', scripts: { archive: 'private hook contents' } },
      },
    }
  if (name === 'worktree list') {
    if (mode === 'pagination' && args[args.indexOf('--limit') + 1] === '100') {
      return { ...listing, totalCount: 101, truncated: true }
    }
    if (mode === 'incomplete') return { ...listing, truncated: true }
    return listing
  }
  if (name === 'worktree ps')
    return {
      ...listing,
      worktrees: [
        {
          worktreeId: primary.id,
          repoId: 'repo',
          hostId: 'local',
          path: primary.path,
          worktreeInstanceId: primary.instanceId,
          hasHostSidebarActivity: false,
          liveTerminalCount: 0,
          hasAttachedPty: false,
          isActive: false,
          status: 'inactive',
          agents: [],
          preview: 'private terminal transcript',
        },
      ],
    }
  console.error('Unexpected command: ' + JSON.stringify(args))
  process.exit(2)
}
const result = response()
console.log(
  JSON.stringify({
    ok: true,
    result,
    _meta: {
      runtimeId:
        mode === 'restart' && name === 'worktree ps' ? 'different-runtime' : 'fixture-runtime',
    },
  })
)
