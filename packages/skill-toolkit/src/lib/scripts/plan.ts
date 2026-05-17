import { existsSync } from 'node:fs'
import path from 'node:path'

import { findSkills } from '../skills/find.js'
import type { SkillRecord } from '../skills/types.js'
import { listVendorableFiles, manifestVendorablePaths } from './discovery.js'
import { filesMatch } from './hash.js'
import { readManifest } from './manifest.js'
import { SKILL_SCRIPTS_DIR, type SyncReport, type VendoredFile } from './types.js'

/**
 * Read all skill manifests in the repo and return one report per
 * (skill, declared-script) pair. Pure — never writes.
 */
export function planSync(repoRoot: string): SyncReport[] {
  const skills = findSkills(repoRoot)
  const reports: SyncReport[] = []
  for (const skill of skills) {
    const manifest = readManifest(skill)
    if (!manifest?.scripts) continue
    for (const scriptName of manifest.scripts) {
      reports.push(buildReport({ repoRoot, skill, scriptName }))
    }
  }
  return reports
}

/**
 * Inputs to `buildReport`. Bundled into an object so the call site
 * reads as `buildReport({ repoRoot, skill, scriptName })`.
 */
interface BuildReportParams {
  /**
   * Absolute path to the monorepo root — used to resolve
   * `skill-scripts/<name>/` source directories.
   */
  repoRoot: string
  /**
   * The skill consuming the script. Provides the target directory
   * (`<skill.dir>/scripts/<scriptName>/`).
   */
  skill: SkillRecord
  /**
   * One entry from the consuming skill's `skill.json.scripts` list.
   */
  scriptName: string
}

/**
 * Build the sync report for one (skill, script) pair. Compares source files
 * against the vendored copies via hash, and flags any vendored-side extras as
 * drift so files added directly to the target dir don't silently linger.
 */
function buildReport({ repoRoot, skill, scriptName }: BuildReportParams): SyncReport {
  const sourceDir = path.join(repoRoot, SKILL_SCRIPTS_DIR, scriptName)
  const targetDir = path.join(skill.location.dir, 'scripts', scriptName)
  if (!existsSync(sourceDir)) {
    return {
      skill: skill.location.name,
      scriptName,
      targetDir,
      files: [],
      drift: [],
      missingScript: true,
    }
  }

  const relativePaths = manifestVendorablePaths(sourceDir) ?? listVendorableFiles(sourceDir)
  const files = relativePaths.map((rel) => ({
    relative: rel,
    source: path.join(sourceDir, rel),
    target: path.join(targetDir, rel),
  }))

  // After enumerating source files, also check for any extra files in the
  // vendored target dir that don't exist in the source — those are drift too
  // (someone added a file directly to the vendored copy).
  const targetExtras = existsSync(targetDir)
    ? listVendorableFiles(targetDir).filter((rel) => !files.some((f) => f.relative === rel))
    : []
  const drift: VendoredFile[] = [
    ...files.filter((f) => !filesMatch(f.source, f.target)),
    ...targetExtras.map((rel) => ({
      relative: rel,
      source: path.join(sourceDir, rel),
      target: path.join(targetDir, rel),
    })),
  ]

  return {
    skill: skill.location.name,
    scriptName,
    targetDir,
    files,
    drift,
    missingScript: false,
  }
}
