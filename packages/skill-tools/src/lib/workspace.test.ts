import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { discoverSkills } from './workspace.js'

let tmpRoot: string

beforeEach(() => {
  tmpRoot = mkdtempSync(path.join(tmpdir(), 'workspace-test-'))
  // discoverSkills walks `<repoRoot>/skills` and `<repoRoot>/.agents/skills`.
  mkdirSync(path.join(tmpRoot, 'skills'), { recursive: true })
})

afterEach(() => {
  rmSync(tmpRoot, { recursive: true, force: true })
})

function writeSkill(name: string, frontmatter: string, body = '\n# body\n'): void {
  const dir = path.join(tmpRoot, 'skills', name)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'SKILL.md'), `---\n${frontmatter}\n---\n${body}`)
}

describe('discoverSkills frontmatter parsing', () => {
  describe('extractScalar — quoted vs unquoted', () => {
    it('preserves `#` inside double-quoted scalars (no comment-strip)', () => {
      writeSkill(
        'quoted-hash',
        [
          'name: quoted-hash',
          'description: needs to be long enough to satisfy the schema check',
          'argument-hint: "[file #1]"',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'quoted-hash')
      expect(skill?.frontmatterParseError).toBeNull()
      expect(skill?.frontmatter['argument-hint']).toBe('[file #1]')
    })

    it('preserves `#` inside single-quoted scalars', () => {
      writeSkill(
        'single-quoted-hash',
        [
          'name: single-quoted-hash',
          'description: needs to be long enough to satisfy the schema check',
          "argument-hint: '[file #2]'",
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'single-quoted-hash')
      expect(skill?.frontmatter['argument-hint']).toBe('[file #2]')
    })

    it('still strips inline comments on unquoted scalars', () => {
      writeSkill(
        'unquoted-comment',
        [
          'name: unquoted-comment  # legacy name',
          'description: needs to be long enough to satisfy the schema check',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'unquoted-comment')
      expect(skill?.frontmatter.name).toBe('unquoted-comment')
    })
  })

  describe('parseYamlBool — case-insensitive YAML 1.1 boolean set', () => {
    it('parses capitalized True as true', () => {
      writeSkill(
        'cap-true',
        [
          'name: cap-true',
          'description: needs to be long enough to satisfy the schema check',
          'user-invocable: True',
          'model-invocable: TRUE',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'cap-true')
      expect(skill?.frontmatter['user-invocable']).toBe(true)
      expect(skill?.frontmatter['model-invocable']).toBe(true)
    })

    it('parses yes/on as true and no/off as false', () => {
      writeSkill(
        'yes-no',
        [
          'name: yes-no',
          'description: needs to be long enough to satisfy the schema check',
          'user-invocable: yes',
          'model-invocable: off',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'yes-no')
      expect(skill?.frontmatter['user-invocable']).toBe(true)
      expect(skill?.frontmatter['model-invocable']).toBe(false)
    })

    it('parses False as false (regression: was silently coerced to false anyway, but for the right reason now)', () => {
      writeSkill(
        'cap-false',
        [
          'name: cap-false',
          'description: needs to be long enough to satisfy the schema check',
          'user-invocable: False',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'cap-false')
      expect(skill?.frontmatter['user-invocable']).toBe(false)
    })

    it('parses metadata.internal: True as true', () => {
      writeSkill(
        'internal-true',
        [
          'name: internal-true',
          'description: needs to be long enough to satisfy the schema check',
          'metadata:',
          '  internal: True',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'internal-true')
      expect(skill?.frontmatter.metadata?.internal).toBe(true)
    })

    it('skips unknown boolean values, leaving the optional field undefined', () => {
      writeSkill(
        'bogus-bool',
        [
          'name: bogus-bool',
          'description: needs to be long enough to satisfy the schema check',
          'user-invocable: maybe',
        ].join('\n')
      )
      const records = discoverSkills(tmpRoot)
      const skill = records.find((r) => r.location.name === 'bogus-bool')
      expect(skill?.frontmatterParseError).toBeNull()
      expect(skill?.frontmatter['user-invocable']).toBeUndefined()
    })
  })
})
