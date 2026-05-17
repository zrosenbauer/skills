import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import type { SyncReport } from './types.js'

/**
 * Apply a sync report — copies files from source to target, replacing the
 * vendored directory's contents wholesale so removed source files don't
 * linger as stale vendored copies.
 */
export function applySync(report: SyncReport): void {
  if (report.missingScript) return
  if (report.files.length === 0) return

  if (existsSync(report.targetDir)) rmSync(report.targetDir, { recursive: true, force: true })
  mkdirSync(report.targetDir, { recursive: true })

  for (const file of report.files) {
    mkdirSync(path.dirname(file.target), { recursive: true })
    writeFileSync(file.target, readFileSync(file.source))
  }
}
