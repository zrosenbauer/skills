import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { lintSkill, summarize } from './lint.js'
import type { SkillRecord } from './workspace.js'

interface BuildSkillOptions {
  name?: string
  source?: 'public' | 'private'
  description?: string
  argumentHint?: string
  body?: string
  hasReadme?: boolean
  hasLicense?: boolean
  hasEvalsJson?: boolean
  internal?: boolean
}

let tmpRoot: string

beforeEach(() => {
  tmpRoot = mkdtempSync(path.join(tmpdir(), 'lint-test-'))
})

afterEach(() => {
  rmSync(tmpRoot, { recursive: true, force: true })
})

function buildSkill(opts: BuildSkillOptions = {}): SkillRecord {
  const name = opts.name ?? 'sample-skill'
  const description =
    opts.description ??
    'This skill should be used when the user wants to do thing X. Common triggers include "do thing", "make thing", and "build thing". Bakes in pattern Y. Skip when working with Z.'
  const argumentHint = opts.argumentHint ?? '[<arg>]'
  const body =
    opts.body ??
    [
      '## When to use',
      '',
      '- "do thing"',
      '',
      '## When NOT to use',
      '',
      '- not Z',
      '',
      '## Workflow',
      '',
      '1. Step',
      '',
      '## Examples',
      '',
      '<example>',
      '<input>do thing</input>',
      '<output>did thing</output>',
      '</example>',
      '',
    ].join('\n')

  const dir = path.join(tmpRoot, name)
  mkdirSync(dir, { recursive: true })
  const skillMd = `---
name: ${name}
description: >-
  ${description}
argument-hint: '${argumentHint}'
user-invocable: true
model-invocable: true
${opts.internal ? 'metadata:\n  internal: true\n' : ''}---

# ${name}

${body}
`
  writeFileSync(path.join(dir, 'SKILL.md'), skillMd)

  return {
    location: { name, dir, source: opts.source ?? 'public' },
    frontmatter: {
      name,
      description,
      'argument-hint': argumentHint,
      'user-invocable': true,
      'model-invocable': true,
      metadata: opts.internal ? { internal: true } : undefined,
    },
    bodyLineCount: body.split('\n').length,
    hasReadme: opts.hasReadme ?? true,
    hasLicense: opts.hasLicense ?? true,
    hasEvalsJson: opts.hasEvalsJson ?? true,
    evalsFile: null,
    evalsParseError: null,
  }
}

describe('lintSkill', () => {
  describe('naming', () => {
    it('errors on non-kebab-case directory name', () => {
      const skill = buildSkill({ name: 'BadName' })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'DIR_NAME')).toMatchObject({ severity: 'error' })
    })

    it('passes on valid kebab-case', () => {
      const skill = buildSkill({ name: 'good-name' })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'DIR_NAME')).toBeUndefined()
    })
  })

  describe('frontmatter', () => {
    it('errors on FM_NAME_MISMATCH', () => {
      const skill = buildSkill({ name: 'real-name' })
      // simulate name mismatch by mutating the frontmatter post-build
      skill.frontmatter.name = 'wrong-name'
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'FM_NAME_MISMATCH')).toMatchObject({
        severity: 'error',
      })
    })
  })

  describe('description', () => {
    it('errors on anti-shortcut words', () => {
      const skill = buildSkill({
        description:
          'This skill should be used when X. First, do A. Then do B. The process involves several steps. Common triggers include "a", "b", and "c". Skip when not needed.',
      })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'DESC_ANTI_SHORTCUT')).toMatchObject({
        severity: 'error',
      })
    })

    it('warns on missing trigger phrase anchor', () => {
      const skill = buildSkill({
        description:
          'This is a skill for refactoring code that does some thing and is generally pretty useful most of the time when you have something. Skip when not needed.',
      })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'DESC_NO_TRIGGER')).toMatchObject({
        severity: 'warn',
      })
    })

    it('warns on too few trigger phrases', () => {
      const skill = buildSkill({
        description:
          'This skill should be used when the user wants to do something. Common triggers include "only one phrase here". Bakes in stuff. Skip when not needed.',
      })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'DESC_FEW_TRIGGERS')).toMatchObject({
        severity: 'warn',
      })
    })

    it('infos on missing Skip when clause', () => {
      const skill = buildSkill({
        description:
          'This skill should be used when the user wants to do thing. Common triggers include "a", "b", and "c". Bakes in pattern Y.',
      })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'DESC_NO_SKIP')).toMatchObject({ severity: 'info' })
    })
  })

  describe('body', () => {
    it('errors on TODO placeholders', () => {
      const skill = buildSkill({ body: '## Workflow\n\nTODO: write this section\n' })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'BODY_TODO')).toMatchObject({ severity: 'error' })
    })

    it('does not flag TODO inside code blocks', () => {
      const skill = buildSkill({
        body: '## A\n## B\n## C\n\n```ts\n// TODO inside code\n```\n\n<example>x</example>',
      })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'BODY_TODO')).toBeUndefined()
    })

    it('warns on missing example', () => {
      const skill = buildSkill({
        body: '## When to use\n\n- a\n\n## When NOT to use\n\n- b\n\n## Workflow\n\n1. step\n',
      })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'BODY_NO_EXAMPLE')).toMatchObject({
        severity: 'warn',
      })
    })
  })

  describe('evals', () => {
    it('errors on missing evals.json for public skills', () => {
      const skill = buildSkill({ source: 'public', hasEvalsJson: false })
      const { findings } = lintSkill(skill)
      expect(findings.find((f) => f.code === 'EVALS_MISSING')).toMatchObject({
        severity: 'error',
      })
    })

    it('warns (not errors) on missing evals.json for internal skills', () => {
      const skill = buildSkill({
        source: 'private',
        hasEvalsJson: false,
        internal: true,
      })
      const { findings } = lintSkill(skill)
      const found = findings.find((f) => f.code === 'EVALS_MISSING')
      expect(found).toMatchObject({ severity: 'warn' })
    })
  })
})

describe('summarize', () => {
  it('counts severities across multiple results', () => {
    const skill = buildSkill({
      description: 'too short, no triggers, no Skip when',
      body: '## Workflow\n\nTODO: write me\n',
      hasEvalsJson: false,
    })
    const result = lintSkill(skill)
    const totals = summarize([result])
    expect(totals.errors).toBeGreaterThan(0)
    expect(totals.errors + totals.warns + totals.infos).toBe(result.findings.length)
  })
})
