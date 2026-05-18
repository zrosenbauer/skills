import { existsSync } from 'node:fs'
import path from 'node:path'

import { findSkills } from '../skills/find.js'
import { readManifest } from '../skills/manifest.js'
import type { SkillRecord } from '../skills/types.js'
import { listVendorableFiles, manifestVendorablePaths } from './discovery.js'
import { filesMatch } from './hash.js'
import { VENDOR_SOURCES, type VendorSource } from './registry.js'
import type { SyncReport, VendoredFile } from './types.js'

/**
 * Read all skill manifests in the repo and return one report per
 * (skill, asset-kind, asset-name) triple. Iterates the
 * `VENDOR_SOURCES` registry so every supported asset kind gets
 * planned in a single pass. Pure — never writes.
 */
export function planSync(repoRoot: string): SyncReport[] {
  const skills = findSkills(repoRoot)
  const reports: SyncReport[] = []
  for (const skill of skills) {
    const manifest = readManifest(skill)
    if (!manifest) continue
    for (const source of VENDOR_SOURCES) {
      const names = source.readNames(manifest)
      if (!names) continue
      for (const assetName of names) {
        reports.push(buildReport({ repoRoot, skill, source, assetName }))
      }
    }
  }
  return reports
}

interface BuildReportParams {
  /**
   * Absolute path to the monorepo root — used to resolve the
   * asset's source directory under `<source.sourceRoot>/<assetName>/`.
   */
  repoRoot: string
  /**
   * The skill consuming the asset.
   */
  skill: SkillRecord
  /**
   * Vendor-source descriptor: where the asset lives and where copies
   * go.
   */
  source: VendorSource
  /**
   * One entry from the consuming skill's matching manifest array
   * (e.g. `skill.json.scripts[i]` or `skill.json.references[i]`).
   */
  assetName: string
}

/**
 * Build the sync report for one (skill, asset) pair. Compares source
 * files against the vendored copies via hash, and flags any
 * vendored-side extras as drift so files added directly to the target
 * dir don't silently linger.
 */
function buildReport({ repoRoot, skill, source, assetName }: BuildReportParams): SyncReport {
  const sourceDir = path.join(repoRoot, source.sourceRoot, assetName)
  const targetDir = path.join(skill.location.dir, source.targetSubdir, assetName)
  if (!existsSync(sourceDir)) {
    return {
      skill: skill.location.name,
      assetKind: source.kind,
      assetName,
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
    assetKind: source.kind,
    assetName,
    targetDir,
    files,
    drift,
    missingAsset: false,
  }
}
