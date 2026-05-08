import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { grade, gradeAll } from './grading.js'
import type { Assertion } from './schemas.js'

describe('grade', () => {
  describe('regex', () => {
    it('passes when pattern matches', () => {
      const assertion: Assertion = {
        text: 'has @param',
        type: 'regex',
        pattern: '@param',
      }
      const result = grade(assertion, {
        variantDir: '/tmp',
        transcript: '/** @param foo */',
      })
      expect(result.passed).toBe(true)
    })

    it('fails when pattern does not match', () => {
      const assertion: Assertion = {
        text: 'has @param',
        type: 'regex',
        pattern: '@param',
      }
      const result = grade(assertion, { variantDir: '/tmp', transcript: 'no jsdoc here' })
      expect(result.passed).toBe(false)
      expect(result.detail).toContain('did not match')
    })

    it('handles complex patterns', () => {
      const assertion: Assertion = {
        text: 'Result type',
        type: 'regex',
        pattern: 'Result<\\w+,\\s*\\w+>',
      }
      const result = grade(assertion, {
        variantDir: '/tmp',
        transcript: 'function f(): Result<Config, ParseError> {}',
      })
      expect(result.passed).toBe(true)
    })
  })

  describe('contains', () => {
    it('passes when substring is present', () => {
      const assertion: Assertion = {
        text: 'imports zod',
        type: 'contains',
        substring: "from 'zod'",
      }
      const result = grade(assertion, {
        variantDir: '/tmp',
        transcript: "import { z } from 'zod'",
      })
      expect(result.passed).toBe(true)
    })

    it('fails when substring is absent', () => {
      const assertion: Assertion = {
        text: 'imports zod',
        type: 'contains',
        substring: "from 'zod'",
      }
      const result = grade(assertion, { variantDir: '/tmp', transcript: 'no zod here' })
      expect(result.passed).toBe(false)
    })
  })

  describe('file_exists', () => {
    let tmpDir: string

    beforeEach(() => {
      tmpDir = mkdtempSync(path.join(tmpdir(), 'grading-test-'))
      mkdirSync(path.join(tmpDir, 'outputs'))
    })

    afterEach(() => {
      rmSync(tmpDir, { recursive: true, force: true })
    })

    it('passes when output file exists', () => {
      writeFileSync(path.join(tmpDir, 'outputs', 'config.json'), '{}')
      const assertion: Assertion = {
        text: 'wrote config',
        type: 'file_exists',
        path: 'config.json',
      }
      const result = grade(assertion, { variantDir: tmpDir, transcript: '' })
      expect(result.passed).toBe(true)
    })

    it('fails when output file is missing', () => {
      const assertion: Assertion = {
        text: 'wrote config',
        type: 'file_exists',
        path: 'missing.json',
      }
      const result = grade(assertion, { variantDir: tmpDir, transcript: '' })
      expect(result.passed).toBe(false)
      expect(result.detail).toContain('missing')
    })

    it('rejects paths that escape the outputs/ directory', () => {
      // Bypass schema validation deliberately to simulate an assertion that
      // slipped past an older lint — runtime should still refuse it.
      const assertion = {
        text: 'sneaky',
        type: 'file_exists',
        path: '../escape',
      } as unknown as Assertion
      const result = grade(assertion, { variantDir: tmpDir, transcript: '' })
      expect(result.passed).toBe(false)
      expect(result.detail).toContain('escapes outputs/ directory')
      expect(result.detail).toContain('../escape')
    })
  })
})

describe('gradeAll', () => {
  it('aggregates pass count across assertions', () => {
    const assertions: Assertion[] = [
      { text: 'a', type: 'contains', substring: 'foo' },
      { text: 'b', type: 'contains', substring: 'bar' },
      { text: 'c', type: 'contains', substring: 'baz' },
    ]
    const { results, passedCount } = gradeAll(assertions, {
      variantDir: '/tmp',
      transcript: 'this has foo and bar but not the third',
    })
    expect(results).toHaveLength(3)
    expect(passedCount).toBe(2)
  })

  it('returns 0 passed when all fail', () => {
    const assertions: Assertion[] = [
      { text: 'a', type: 'contains', substring: 'foo' },
      { text: 'b', type: 'contains', substring: 'bar' },
    ]
    const { passedCount } = gradeAll(assertions, {
      variantDir: '/tmp',
      transcript: 'nothing matches',
    })
    expect(passedCount).toBe(0)
  })

  it('returns total when all pass', () => {
    const assertions: Assertion[] = [
      { text: 'a', type: 'contains', substring: 'foo' },
      { text: 'b', type: 'contains', substring: 'bar' },
    ]
    const { passedCount } = gradeAll(assertions, {
      variantDir: '/tmp',
      transcript: 'foo and bar both present',
    })
    expect(passedCount).toBe(2)
  })
})
