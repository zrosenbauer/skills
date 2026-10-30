import { lstatSync, realpathSync } from 'node:fs'
import path from 'node:path'

interface SyncPaths {
  repoRoot: string
  skillDir: string
  sourceDir: string
  destDir: string
}

/** Reject paths that cannot be safely interpreted relative to a shipping root. */
export function assertRelativeVendorPath(value: string): void {
  if (
    !value ||
    value.includes('\\') ||
    value.includes(':') ||
    value.includes('\0') ||
    path.isAbsolute(value) ||
    value.split('/').includes('..') ||
    path.normalize(value) === '.'
  ) {
    throw new Error(`Unsafe vendor path: ${JSON.stringify(value)}`)
  }
}

function resolvedPath(value: string): string {
  try {
    lstatSync(value)
    return realpathSync(value)
  } catch (error) {
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error
    // A dangling symlink must fail closed, not be treated as a missing directory.
    try {
      lstatSync(value)
    } catch {
      const parent = path.dirname(value)
      if (parent === value) throw error
      return path.join(resolvedPath(parent), path.basename(value))
    }
    throw new Error(`Unresolvable vendor path: ${value}`, { cause: error })
  }
}

function isWithin(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate)
  return (
    relative !== '' &&
    relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  )
}

/** Check both lexical containment and existing symlink targets, including missing children. */
export function assertPathWithin(root: string, candidate: string): void {
  if (
    !isWithin(path.resolve(root), path.resolve(candidate)) ||
    !isWithin(resolvedPath(root), resolvedPath(candidate))
  ) {
    throw new Error(`Vendor path escapes its root: ${candidate} (root: ${root})`)
  }
}

/** Validate roots and reject overlapping trees before planning or applying a destructive sync. */
export function assertSyncPaths({ repoRoot, skillDir, sourceDir, destDir }: SyncPaths): void {
  assertPathWithin(repoRoot, skillDir)
  assertPathWithin(repoRoot, sourceDir)
  assertPathWithin(skillDir, destDir)
  const source = resolvedPath(sourceDir)
  const dest = resolvedPath(destDir)
  if (source === dest || isWithin(source, dest) || isWithin(dest, source)) {
    throw new Error(`Vendor source and destination overlap: ${sourceDir} -> ${destDir}`)
  }
}
