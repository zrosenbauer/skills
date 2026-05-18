/**
 * Kind of asset being vendored. Each kind maps to one canonical
 * source root and one target subdirectory under the consuming skill.
 * Add a new kind here + an entry in `VENDOR_SOURCES` (registry.ts) to
 * extend sync to a new asset type.
 */
export type AssetKind = 'scripts' | 'references'

/**
 * One file copied from a canonical source into a consuming skill's
 * vendored subdirectory. Carries both ends of the copy so the planner
 * and applier can reuse the same record.
 */
export interface VendoredFile {
  /**
   * Path relative to the vendored directory root. Used for display and
   * for matching source files to target extras during drift detection.
   */
  relative: string
  /**
   * Absolute path to the canonical source file under the asset's
   * source root (e.g. `skill-scripts/<name>/...`).
   */
  source: string
  /**
   * Absolute path to the vendored copy under the consuming skill
   * (e.g. `<skill>/scripts/<name>/...`).
   */
  target: string
}

/**
 * Result of one sync attempt: the files copied (or that would be
 * copied in --check mode), and any drift detected when comparing
 * target hashes to source hashes.
 */
export interface SyncReport {
  /**
   * Skill that owns the consuming `skill.json` manifest entry.
   */
  skill: string
  /**
   * Which kind of asset this report covers (`scripts`,
   * `references`, ...). Drives the source-root + target-subdir
   * lookup and gets surfaced in the CLI output so consumers can
   * grep by type.
   */
  assetKind: AssetKind
  /**
   * Canonical asset name being vendored (the entry from the
   * matching manifest array, e.g. `skill.json.scripts[i]`).
   */
  assetName: string
  /**
   * Top-level vendored directory for this asset under the skill.
   * Used by `applySync` to wholesale-replace the directory so files
   * removed from the source allowlist also disappear from the
   * vendored copy.
   */
  targetDir: string
  /**
   * Every file that should appear in the vendored copy, derived from
   * the source's `files` allowlist or convention-based discovery.
   */
  files: VendoredFile[]
  /**
   * Files where the vendored copy diverges from source — different
   * hash, or present only in the target. Drives the `--check` exit
   * code.
   */
  drift: VendoredFile[]
  /**
   * True when the asset's canonical source directory doesn't exist
   * (e.g. `skill-scripts/<assetName>/` is missing). Treated as an
   * error in the CLI so misconfigured manifests don't sync silently.
   */
  missingAsset: boolean
}
