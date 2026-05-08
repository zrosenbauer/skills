import { describe, expect, it } from 'vitest'

import { assertionSchema, evalCaseSchema, evalsFileSchema } from './schemas.js'

describe('assertionSchema', () => {
  it('parses a regex assertion', () => {
    const parsed = assertionSchema.parse({
      text: 'has @param',
      type: 'regex',
      pattern: '@param',
    })
    expect(parsed.type).toBe('regex')
  })

  it('parses a contains assertion', () => {
    const parsed = assertionSchema.parse({
      text: 'imports zod',
      type: 'contains',
      substring: "from 'zod'",
    })
    expect(parsed.type).toBe('contains')
  })

  it('parses a file_exists assertion', () => {
    const parsed = assertionSchema.parse({
      text: 'wrote output',
      type: 'file_exists',
      path: 'config.json',
    })
    expect(parsed.type).toBe('file_exists')
  })

  it('rejects an unknown type', () => {
    expect(() =>
      assertionSchema.parse({
        text: 'bad',
        type: 'llm-judge',
        prompt: 'is it good?',
      })
    ).toThrow()
  })

  it('rejects a regex assertion missing pattern', () => {
    expect(() =>
      assertionSchema.parse({
        text: 'broken',
        type: 'regex',
      })
    ).toThrow()
  })

  it('rejects a contains assertion with empty substring', () => {
    const result = assertionSchema.safeParse({
      text: 'always passes',
      type: 'contains',
      substring: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => /non-empty/.test(i.message))).toBe(true)
    }
  })

  it('rejects a file_exists assertion with a `..` segment', () => {
    const result = assertionSchema.safeParse({
      text: 'escapes',
      type: 'file_exists',
      path: '../../etc/passwd',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a file_exists assertion with an absolute path', () => {
    const result = assertionSchema.safeParse({
      text: 'absolute',
      type: 'file_exists',
      path: '/etc/passwd',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a file_exists assertion with a Windows drive-letter absolute path', () => {
    const result = assertionSchema.safeParse({
      text: 'windows-absolute',
      type: 'file_exists',
      path: 'C:\\Users\\foo\\file.txt',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a file_exists assertion with a UNC-style backslash path', () => {
    const result = assertionSchema.safeParse({
      text: 'unc',
      type: 'file_exists',
      path: '\\\\server\\share\\file',
    })
    expect(result.success).toBe(false)
  })
})

describe('evalCaseSchema', () => {
  const minimalAssertion = {
    text: 'has output',
    type: 'contains' as const,
    substring: 'output',
  }

  it('accepts a kebab-case eval_name', () => {
    const parsed = evalCaseSchema.parse({
      id: 0,
      eval_name: 'parse-config',
      prompt: 'parse this config file please',
      expected_output: 'a parsed config',
      assertions: [minimalAssertion],
    })
    expect(parsed.eval_name).toBe('parse-config')
  })

  it('rejects camelCase eval_name', () => {
    expect(() =>
      evalCaseSchema.parse({
        id: 0,
        eval_name: 'parseConfig',
        prompt: 'parse this config',
        expected_output: 'a parsed config',
        assertions: [minimalAssertion],
      })
    ).toThrow()
  })

  it('defaults files to empty array', () => {
    const parsed = evalCaseSchema.parse({
      id: 0,
      eval_name: 'parse-config',
      prompt: 'parse this config',
      expected_output: 'parsed config',
      assertions: [minimalAssertion],
    })
    expect(parsed.files).toEqual([])
  })

  it('rejects too-short prompts', () => {
    expect(() =>
      evalCaseSchema.parse({
        id: 0,
        eval_name: 'short',
        prompt: 'short',
        expected_output: 'output',
        assertions: [minimalAssertion],
      })
    ).toThrow()
  })

  it('rejects evals with zero assertions', () => {
    const result = evalCaseSchema.safeParse({
      id: 0,
      eval_name: 'parse-config',
      prompt: 'parse this config file please',
      expected_output: 'a parsed config',
      assertions: [],
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => /at least one assertion/.test(i.message))).toBe(
        true
      )
    }
  })

  it('rejects evals with assertions field omitted', () => {
    const result = evalCaseSchema.safeParse({
      id: 0,
      eval_name: 'parse-config',
      prompt: 'parse this config file please',
      expected_output: 'a parsed config',
    })
    expect(result.success).toBe(false)
  })
})

describe('evalsFileSchema', () => {
  const oneAssertion = [
    { text: 'has r', type: 'contains' as const, substring: 'r' },
  ]

  it('requires at least 3 evals', () => {
    expect(() =>
      evalsFileSchema.parse({
        skill_name: 'my-skill',
        evals: [
          {
            id: 0,
            eval_name: 'one',
            prompt: 'do something concrete',
            expected_output: 'a result',
            assertions: oneAssertion,
          },
        ],
      })
    ).toThrow()
  })

  it('accepts 3 evals', () => {
    const parsed = evalsFileSchema.parse({
      skill_name: 'my-skill',
      evals: [
        {
          id: 0,
          eval_name: 'one',
          prompt: 'do thing one',
          expected_output: 'r',
          assertions: oneAssertion,
        },
        {
          id: 1,
          eval_name: 'two',
          prompt: 'do thing two',
          expected_output: 'r',
          assertions: oneAssertion,
        },
        {
          id: 2,
          eval_name: 'three',
          prompt: 'do thing three',
          expected_output: 'r',
          assertions: oneAssertion,
        },
      ],
    })
    expect(parsed.evals).toHaveLength(3)
  })
})
