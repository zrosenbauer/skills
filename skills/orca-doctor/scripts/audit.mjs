import { realpathSync, statSync } from 'node:fs'
import { isAbsolute, relative, sep } from 'node:path'

/** Keeps missing directories distinct from inaccessible or remote paths. */
export function inspectPath(path) {
  if (typeof path !== 'string' || !isAbsolute(path)) return { state: 'unknown' }
  try {
    if (!statSync(path).isDirectory()) return { state: 'unknown' }
    return { state: 'present', canonical: realpathSync(path) }
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return { state: 'missing' }
    return { state: 'unknown', error: error.code }
  }
}

/** Requires explicit completeness evidence from both native inventories. */
export function hasCompleteCoverage(inventory) {
  return (
    Array.isArray(inventory?.worktrees) &&
    inventory.truncated === false &&
    Number.isSafeInteger(inventory.totalCount) &&
    inventory.totalCount === inventory.worktrees.length &&
    Array.isArray(inventory.hostScope?.hostIds) &&
    inventory.hostScope.hostIds.length > 0 &&
    Array.isArray(inventory.hostScope?.omittedHostIds) &&
    inventory.hostScope.omittedHostIds.length === 0 &&
    inventory.worktrees.every(
      (row, index, rows) =>
        row &&
        inventory.hostScope.hostIds.includes(row.hostId) &&
        typeof (row.id ?? row.worktreeId) === 'string' &&
        !rows
          .slice(0, index)
          .some(
            (previous) =>
              previous.hostId === row.hostId &&
              (previous.id ?? previous.worktreeId) === (row.id ?? row.worktreeId)
          )
    )
  )
}

function isInside(root, path) {
  if (!root || !path) return false
  const suffix = relative(root, path)
  return suffix === '' || (suffix !== '..' && !suffix.startsWith(`..${sep}`) && !isAbsolute(suffix))
}

function activityState(row) {
  if (!row) return 'unknown'
  if (row.liveTerminalCount > 0 || row.hasAttachedPty === true || row.isActive === true)
    return 'active'
  if (
    row.liveTerminalCount !== 0 ||
    row.hasAttachedPty !== false ||
    row.isActive !== false ||
    row.status !== 'inactive' ||
    !Array.isArray(row.agents)
  ) {
    return 'unknown'
  }
  if (row.agents.some((agent) => agent?.state !== 'done')) return 'unknown'
  return 'inactive'
}

function classifyRow({ worktree, sessions, current, cwd, isLocalRuntime, complete }) {
  const hostId = worktree.hostId
  const matches = sessions.filter((row) => row.hostId === hostId && row.worktreeId === worktree.id)
  const session = matches.length === 1 ? matches[0] : undefined
  const sameInstance =
    typeof worktree.instanceId === 'string' && session?.worktreeInstanceId === worktree.instanceId
  const activity = activityState(sameInstance ? session : undefined)
  const path =
    isLocalRuntime && hostId === 'local' ? inspectPath(worktree.path) : { state: 'remote' }
  const isCurrent =
    (current?.hostId === hostId && current?.id === worktree.id) ||
    (isLocalRuntime && hostId === 'local' && isInside(path.canonical, cwd))
  const isPrimary = worktree.isMainWorktree === true || worktree.git?.isMainWorktree === true
  const identity = worktree.identity
  const hasIdentity =
    typeof identity?.key === 'string' &&
    identity.key.length > 0 &&
    identity.executionHostId === hostId &&
    identity.instanceId === worktree.instanceId
  const isKnown =
    complete &&
    sameInstance &&
    hasIdentity &&
    typeof current?.id === 'string' &&
    typeof current?.hostId === 'string' &&
    typeof session.hasHostSidebarActivity === 'boolean' &&
    typeof worktree.isMainWorktree === 'boolean' &&
    path.state === 'present'
  const visibility = sameInstance ? session.hasHostSidebarActivity : undefined
  let state = 'unknown'
  if (visibility === true) state = 'visible'
  if (visibility === false) state = 'hidden'
  if (path.state === 'missing') state = 'missing-path'
  const protection = [
    ...(isPrimary ? ['primary'] : []),
    ...(isCurrent ? ['current'] : []),
    ...(activity === 'active' ? ['active'] : []),
  ]
  const canRecover = isKnown && protection.length === 0 && activity === 'inactive'
  return {
    id: worktree.id,
    selector: hasIdentity ? `identity:${identity.key}` : null,
    hostId,
    path: worktree.path,
    canonicalPath: path.canonical ?? null,
    pathState: path.state,
    branch: worktree.branch ?? null,
    head: worktree.head ?? null,
    state,
    activity,
    protection,
    gitSafety: 'not-exposed-by-orca-listings',
    actions: [
      'inspect',
      ...(canRecover && state === 'hidden' ? ['reveal'] : []),
      ...(canRecover ? ['confirm-native-removal'] : []),
    ],
  }
}

/** Reconciles Orca inventory and activity by host, worktree ID, and instance. */
export function auditWorktrees({ inventory, activity, current, cwd, isLocalRuntime, repoId }) {
  const complete = hasCompleteCoverage(inventory) && hasCompleteCoverage(activity)
  const sessions = Array.isArray(activity?.worktrees) ? activity.worktrees : []
  const worktrees = Array.isArray(inventory?.worktrees) ? inventory.worktrees : []
  const canonicalCwd = inspectPath(cwd).canonical
  return {
    complete,
    worktrees: worktrees.map((worktree) =>
      classifyRow({
        worktree,
        sessions,
        current,
        cwd: canonicalCwd,
        isLocalRuntime,
        complete,
      })
    ),
    activityOnly: sessions
      .filter(
        (row) =>
          row.repoId === repoId &&
          !worktrees.some(
            (worktree) => row.hostId === worktree.hostId && row.worktreeId === worktree.id
          )
      )
      .map((row) => ({
        id: row.worktreeId,
        hostId: row.hostId,
        path: row.path,
        actions: ['inspect'],
      })),
  }
}
