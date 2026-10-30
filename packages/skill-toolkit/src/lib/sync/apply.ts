import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { assertPathWithin, assertSyncPaths } from './paths.js'
import type { SyncReport } from './types.js'

/**
 * Apply a sync report — copies files from source to target, replacing the
 * vendored directory's contents wholesale so removed source files don't
 * linger as stale vendored copies.
 */
export function applySync(report: SyncReport): void {
  if (report.missingAsset) return
  if (report.files.length === 0) return

  assertSyncPaths(report)
  for (const file of report.files) {
    assertPathWithin(report.sourceDir, file.source)
    assertPathWithin(report.destDir, file.target)
  }
  const contents = report.files.map((file) => ({ ...file, bytes: readFileSync(file.source) }))

  if (existsSync(report.destDir)) rmSync(report.destDir, { recursive: true, force: true })
  mkdirSync(report.destDir, { recursive: true })

  for (const file of contents) {
    mkdirSync(path.dirname(file.target), { recursive: true })
    writeFileSync(file.target, file.bytes)
  }
}
