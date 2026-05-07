import { describe, expect, it } from 'vitest'

import { attempt, attemptAsync, err, isErr, isOk, ok } from './result.js'

describe('ok / err / type guards', () => {
  it('ok wraps a value', () => {
    const r = ok(42)
    expect(r.ok).toBe(true)
    expect(r.value).toBe(42)
    expect(isOk(r)).toBe(true)
    expect(isErr(r)).toBe(false)
  })

  it('err wraps an error', () => {
    const r = err(new Error('boom'))
    expect(r.ok).toBe(false)
    expect(r.error.message).toBe('boom')
    expect(isOk(r)).toBe(false)
    expect(isErr(r)).toBe(true)
  })

  it('discriminates via the tag', () => {
    const r = Math.random() < 0 ? ok(1) : err(new Error('x'))
    if (r.ok) {
      expect(r.value).toBeDefined()
    } else {
      expect(r.error).toBeInstanceOf(Error)
    }
  })
})

describe('attempt', () => {
  it('returns Ok when fn succeeds', () => {
    const r = attempt(() => 7)
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value).toBe(7)
  })

  it('returns Err when fn throws an Error', () => {
    const r = attempt(() => {
      throw new Error('boom')
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error.message).toBe('boom')
  })

  it('coerces a thrown non-Error into Error', () => {
    const r = attempt(() => {
      throw 'oops'
    })
    expect(r.ok).toBe(false)
    if (!r.ok) {
      expect(r.error).toBeInstanceOf(Error)
      expect(r.error.message).toBe('oops')
    }
  })

  it('wraps JSON.parse style errors', () => {
    const r = attempt(() => JSON.parse('not json'))
    expect(r.ok).toBe(false)
  })
})

describe('attemptAsync', () => {
  it('returns Ok when async fn resolves', async () => {
    const r = await attemptAsync(async () => 'value')
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.value).toBe('value')
  })

  it('returns Err when async fn rejects', async () => {
    const r = await attemptAsync(async () => {
      throw new Error('async fail')
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.error.message).toBe('async fail')
  })
})
