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
})

describe('evalCaseSchema', () => {
  it('accepts a kebab-case eval_name', () => {
    const parsed = evalCaseSchema.parse({
      id: 0,
      eval_name: 'parse-config',
      prompt: 'parse this config file please',
      expected_output: 'a parsed config',
      assertions: [],
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
      })
    ).toThrow()
  })

  it('defaults files and assertions to empty arrays', () => {
    const parsed = evalCaseSchema.parse({
      id: 0,
      eval_name: 'parse-config',
      prompt: 'parse this config',
      expected_output: 'parsed config',
    })
    expect(parsed.files).toEqual([])
    expect(parsed.assertions).toEqual([])
  })

  it('rejects too-short prompts', () => {
    expect(() =>
      evalCaseSchema.parse({
        id: 0,
        eval_name: 'short',
        prompt: 'short',
        expected_output: 'output',
      })
    ).toThrow()
  })
})

describe('evalsFileSchema', () => {
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
          },
        ],
      })
    ).toThrow()
  })

  it('accepts 3 evals', () => {
    const parsed = evalsFileSchema.parse({
      skill_name: 'my-skill',
      evals: [
        { id: 0, eval_name: 'one', prompt: 'do thing one', expected_output: 'r' },
        { id: 1, eval_name: 'two', prompt: 'do thing two', expected_output: 'r' },
        { id: 2, eval_name: 'three', prompt: 'do thing three', expected_output: 'r' },
      ],
    })
    expect(parsed.evals).toHaveLength(3)
  })
})
