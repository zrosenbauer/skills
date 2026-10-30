import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, expect, it } from 'vitest'

import { applySync } from './apply.js'
import { planSync } from './plan.js'

const fixtures: string[] = []

afterEach(() => {
  for (const dir of fixtures.splice(0)) rmSync(dir, { recursive: true, force: true })
})

function fixture() {
  const outer = mkdtempSync(path.join(os.tmpdir(), 'skill-sync-safety-'))
  fixtures.push(outer)
  const repo = path.join(outer, 'repo')
  const skill = path.join(repo, 'skills/example')
  const source = path.join(repo, 'skill-scripts/example')
  const dest = path.join(skill, 'scripts/example')
  mkdirSync(source, { recursive: true })
  mkdirSync(dest, { recursive: true })
  writeFileSync(path.join(source, 'safe.mjs'), 'export const value = 1\n')
  writeFileSync(path.join(dest, 'sentinel'), 'keep')
  writeFileSync(path.join(outer, 'sentinel'), 'outside')
  writeFileSync(
    path.join(skill, 'SKILL.md'),
    '---\nname: example\ndescription: Example\n---\n# Example\n'
  )
  const manifest = (src = 'skill-scripts/example', target = 'scripts/example') =>
    writeFileSync(
      path.join(skill, 'skill.json'),
      JSON.stringify({ vendor: [{ src, dest: target }] })
    )
  manifest()
  return { outer, repo, skill, source, dest, manifest }
}

it.each(['../', '.', '/', 'scripts/../../..', 'C:\\temp', 'scripts\\..\\..'])(
  'rejects unsafe destination %s without deleting anything',
  (dest) => {
    const f = fixture()
    f.manifest('skill-scripts/example', dest)
    expect(() => planSync(f.repo)).toThrow()
    expect(readFileSync(path.join(f.dest, 'sentinel'), 'utf8')).toBe('keep')
    expect(readFileSync(path.join(f.outer, 'sentinel'), 'utf8')).toBe('outside')
  }
)

it('rejects a source outside the repository before modifying the destination', () => {
  const f = fixture()
  f.manifest('../', 'scripts/example')
  expect(() => planSync(f.repo)).toThrow()
  expect(readFileSync(path.join(f.dest, 'sentinel'), 'utf8')).toBe('keep')
})

it('rejects destination ancestors that symlink outside the skill', () => {
  const f = fixture()
  symlinkSync(f.outer, path.join(f.skill, 'escape'), 'dir')
  f.manifest('skill-scripts/example', 'escape/child')
  expect(() => planSync(f.repo)).toThrow()
  expect(readFileSync(path.join(f.outer, 'sentinel'), 'utf8')).toBe('outside')
})

it('rejects overlapping source and destination directories', () => {
  const f = fixture()
  f.manifest('skills/example/scripts', 'scripts/example')
  expect(() => planSync(f.repo)).toThrow(/overlap/)
  expect(readFileSync(path.join(f.dest, 'sentinel'), 'utf8')).toBe('keep')
})

it('rejects allowlist traversal and source symlinks before deletion', () => {
  const f = fixture()
  writeFileSync(
    path.join(f.source, 'package.json'),
    JSON.stringify({ files: ['nested/../../../'] })
  )
  expect(() => planSync(f.repo)).toThrow()
  writeFileSync(path.join(f.source, 'package.json'), JSON.stringify({ files: ['escape'] }))
  symlinkSync(f.outer, path.join(f.source, 'escape'), 'dir')
  expect(() => planSync(f.repo)).toThrow()
  expect(readFileSync(path.join(f.dest, 'sentinel'), 'utf8')).toBe('keep')
})

it('rechecks symlink containment when applying a previously valid plan', () => {
  const f = fixture()
  const report = planSync(f.repo)[0]
  if (!report) throw new Error('Fixture did not produce a sync report')
  rmSync(f.dest, { recursive: true })
  symlinkSync(f.outer, f.dest, 'dir')
  expect(() => applySync(report)).toThrow()
  expect(readFileSync(path.join(f.outer, 'sentinel'), 'utf8')).toBe('outside')
})

it('copies a valid source after all safety checks pass', () => {
  const f = fixture()
  const report = planSync(f.repo)[0]
  if (!report) throw new Error('Fixture did not produce a sync report')
  applySync(report)
  expect(readFileSync(path.join(f.dest, 'safe.mjs'), 'utf8')).toBe('export const value = 1\n')
  expect(readFileSync(path.join(f.outer, 'sentinel'), 'utf8')).toBe('outside')
})
