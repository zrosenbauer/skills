import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { applySync, planSync, syncAll, type SyncReport } from './sync-scripts.js'

interface RepoFile {
  path: string
  contents: string
}

function makeRepo(files: RepoFile[]): { root: string; cleanup: () => void } {
  const root = mkdtempSync(path.join(tmpdir(), 'sync-scripts-test-'))
  // Marker file used by findRepoRoot
  writeFileSync(path.join(root, 'pnpm-workspace.yaml'), 'packages:\n  - "packages/*"\n', 'utf8')
  for (const file of files) {
    const abs = path.join(root, file.path)
    mkdirSync(path.dirname(abs), { recursive: true })
    writeFileSync(abs, file.contents, 'utf8')
  }
  return { root, cleanup: () => rmSync(root, { recursive: true, force: true }) }
}

const skillStub = (name: string): RepoFile[] => [
  {
    path: `skills/${name}/SKILL.md`,
    contents: `---\nname: ${name}\ndescription: test skill ${name}\n---\n\n# ${name}\n`,
  },
]

function firstReport(reports: SyncReport[]): SyncReport {
  const [report] = reports
  if (!report) throw new Error('expected at least one report')
  return report
}

describe('planSync', () => {
  it('returns no reports when no skill declares a manifest', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skill-scripts/foo/foo.mjs', contents: 'export const x = 1\n' },
    ])
    try {
      expect(planSync(repo.root)).toEqual([])
    } finally {
      repo.cleanup()
    }
  })

  it('flags drift when source and target differ', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'export const x = 1\n' },
      { path: 'skills/alpha/scripts/foo/foo.mjs', contents: 'export const x = 999\n' },
    ])
    try {
      const reports = planSync(repo.root)
      expect(reports).toHaveLength(1)
      const report = firstReport(reports)
      expect(report.drift).toHaveLength(1)
      const [drift] = report.drift
      if (!drift) throw new Error('expected one drift entry')
      expect(drift.relative).toBe('foo.mjs')
    } finally {
      repo.cleanup()
    }
  })

  it('flags missing source script', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      {
        path: 'skills/alpha/scripts.json',
        contents: JSON.stringify({ scripts: ['nonexistent'] }),
      },
    ])
    try {
      const reports = planSync(repo.root)
      expect(reports).toHaveLength(1)
      expect(firstReport(reports).missingScript).toBe(true)
    } finally {
      repo.cleanup()
    }
  })

  it('does not flag drift when source and target match', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'export const x = 1\n' },
      { path: 'skills/alpha/scripts/foo/foo.mjs', contents: 'export const x = 1\n' },
    ])
    try {
      expect(firstReport(planSync(repo.root)).drift).toHaveLength(0)
    } finally {
      repo.cleanup()
    }
  })

  it('skips test files and README from vendoring', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'src\n' },
      { path: 'skill-scripts/foo/foo.test.mjs', contents: 'tests\n' },
      { path: 'skill-scripts/foo/README.md', contents: 'docs\n' },
    ])
    try {
      const vendoredFiles = firstReport(planSync(repo.root)).files.map((f) => f.relative)
      expect(vendoredFiles).toEqual(['foo.mjs'])
    } finally {
      repo.cleanup()
    }
  })

  it('detects extra files in vendored target as drift (someone hand-edited)', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'src\n' },
      { path: 'skills/alpha/scripts/foo/foo.mjs', contents: 'src\n' },
      { path: 'skills/alpha/scripts/foo/extra.mjs', contents: 'sneaked in\n' },
    ])
    try {
      const driftPaths = firstReport(planSync(repo.root)).drift.map((d) => d.relative)
      expect(driftPaths).toContain('extra.mjs')
    } finally {
      repo.cleanup()
    }
  })
})

describe('applySync / syncAll', () => {
  it('writes vendored files to the target dir', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'export const x = 1\n' },
    ])
    try {
      syncAll(repo.root)
      const target = path.join(repo.root, 'skills/alpha/scripts/foo/foo.mjs')
      expect(readFileSync(target, 'utf8')).toBe('export const x = 1\n')
    } finally {
      repo.cleanup()
    }
  })

  it('removes stale vendored files when source removes them', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'src\n' },
      { path: 'skills/alpha/scripts/foo/old.mjs', contents: 'should be removed\n' },
    ])
    try {
      syncAll(repo.root)
      const oldPath = path.join(repo.root, 'skills/alpha/scripts/foo/old.mjs')
      expect(() => readFileSync(oldPath)).toThrow()
    } finally {
      repo.cleanup()
    }
  })

  it('after sync, the plan reports zero drift', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      { path: 'skills/alpha/scripts.json', contents: JSON.stringify({ scripts: ['foo'] }) },
      { path: 'skill-scripts/foo/foo.mjs', contents: 'export const x = 1\n' },
      { path: 'skills/alpha/scripts/foo/foo.mjs', contents: 'export const x = 999\n' },
    ])
    try {
      expect(firstReport(planSync(repo.root)).drift).toHaveLength(1)
      syncAll(repo.root)
      expect(firstReport(planSync(repo.root)).drift).toHaveLength(0)
    } finally {
      repo.cleanup()
    }
  })

  it('applySync is a no-op for missing-script reports', () => {
    const repo = makeRepo([
      ...skillStub('alpha'),
      {
        path: 'skills/alpha/scripts.json',
        contents: JSON.stringify({ scripts: ['nonexistent'] }),
      },
    ])
    try {
      const report = firstReport(planSync(repo.root))
      expect(() => applySync(report)).not.toThrow()
    } finally {
      repo.cleanup()
    }
  })
})
