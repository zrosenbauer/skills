import { existsSync } from 'node:fs'
import path from 'node:path'

import { findSkills } from '../skills/find.js'
import { readManifest } from '../skills/manifest.js'
import type { SkillManifest } from '../skills/manifest.js'
import type { SkillRecord } from '../skills/types.js'
import { listVendorableFiles, manifestVendorablePaths } from './discovery.js'
import { filesMatch } from './hash.js'
import type { SyncReport, VendoredFile } from './types.js'

type VendorDirective = NonNullable<SkillManifest['vendor']>[number]

/**
 * Read all skill manifests in the repo and return one report per
 * vendor directive (skill × `skill.json.vendor[i]`). Each report
 * resolves `src` against the repo root and `output` against the
 * consuming skill's directory. Pure — never writes.
 */
export function planSync(repoRoot: string): SyncReport[] {
  const skills = findSkills(repoRoot)
  const reports: SyncReport[] = []
  for (const skill of skills) {
    const manifest = readManifest(skill)
    if (!manifest?.vendor) continue
    for (const directive of manifest.vendor) {
      reports.push(buildReport({ repoRoot, skill, directive }))
    }
  }
  return reports
}

interface BuildReportParams {
  /**
   * Absolute path to the monorepo root — used to resolve the
   * directive's `src`.
   */
  repoRoot: string
  /**
   * The skill consuming the directive. Provides the base for
   * resolving `output`.
   */
  skill: SkillRecord
  /**
   * The vendor directive being planned.
   */
  directive: VendorDirective
}

/**
 * Build the sync report for one (skill, directive) pair. Compares
 * source files against the vendored copies via hash, and flags any
 * vendored-side extras as drift so files added directly to the
 * target dir don't silently linger.
 */
function buildReport({ repoRoot, skill, directive }: BuildReportParams): SyncReport {
  const sourceDir = path.join(repoRoot, directive.src)
  const targetDir = path.join(skill.location.dir, directive.output)
  const assetName = path.basename(directive.output)

  if (!existsSync(sourceDir)) {
    return {
      skill: skill.location.name,
      kind: directive.kind,
      assetName,
      sourceDir,
      targetDir,
      files: [],
      drift: [],
      missingAsset: true,
    }
  }

  const relativePaths = manifestVendorablePaths(sourceDir) ?? listVendorableFiles(sourceDir)
  const files = relativePaths.map((rel) => ({
    relative: rel,
    source: path.join(sourceDir, rel),
    target: path.join(targetDir, rel),
  }))

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
    kind: directive.kind,
    assetName,
    sourceDir,
    targetDir,
    files,
    drift,
    missingAsset: false,
  }
}
