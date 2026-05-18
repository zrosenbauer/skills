import type { SkillManifest } from '../skills/manifest.js'
import type { AssetKind } from './types.js'

/**
 * One vendorable asset type: how to read it from a skill manifest,
 * where its canonical source lives, and where it gets copied to under
 * the consuming skill. Add an entry here to extend `sync` to a new
 * asset type — no other code changes needed.
 */
export interface VendorSource {
  /**
   * Asset kind discriminant.
   */
  kind: AssetKind
  /**
   * Repo-relative directory holding canonical copies. Consuming
   * skills declare which sub-folders of this root they want vendored
   * via the manifest field named `manifestField`.
   */
  sourceRoot: string
  /**
   * Subdirectory under the consuming skill where copies land
   * (e.g. `'scripts'` for `<skill>/scripts/<name>/`).
   */
  targetSubdir: string
  /**
   * Reader that extracts the asset-name list for this kind from a
   * parsed `skill.json`. Returns `undefined` when the manifest omits
   * the field — sync skips that (skill, kind) pair quietly.
   */
  readNames: (manifest: SkillManifest) => string[] | undefined
}

/**
 * Canonical registry of vendorable asset kinds. Today: just
 * `scripts`. The schema also defines `references` as an optional
 * manifest field so consumers can declare them — adding the registry
 * entry below + creating a `skill-references/` directory is all that's
 * needed to wire it up.
 */
export const VENDOR_SOURCES: VendorSource[] = [
  {
    kind: 'scripts',
    sourceRoot: 'skill-scripts',
    targetSubdir: 'scripts',
    readNames: (m) => m.scripts,
  },
  {
    kind: 'references',
    sourceRoot: 'skill-references',
    targetSubdir: 'references',
    readNames: (m) => m.references,
  },
]
