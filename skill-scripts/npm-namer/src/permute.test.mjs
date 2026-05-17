import assert from 'node:assert/strict'
import { test } from 'node:test'

import { permute, score, DEFAULT_PREFIXES, DEFAULT_SUFFIXES } from './permute.mjs'

test('permute: empty seeds returns empty array', () => {
  assert.deepEqual(permute([]), [])
  assert.deepEqual(permute(null), [])
})

test('permute: single seed produces prefix and suffix variants', () => {
  const r = permute(['log'])
  assert.ok(r.includes('log'), 'includes bare seed')
  assert.ok(r.includes('tiny-log'), 'includes prefix-seed')
  assert.ok(r.includes('tinylog'), 'includes prefixseed (no sep)')
  assert.ok(r.includes('log-cli'), 'includes seed-suffix')
})

test('permute: two seeds combine in both directions', () => {
  const r = permute(['tiny', 'log'])
  assert.ok(r.includes('tinylog'))
  assert.ok(r.includes('tiny-log'))
  assert.ok(r.includes('logtiny'))
  assert.ok(r.includes('log-tiny'))
})

test('permute: deduplicates', () => {
  const r = permute(['log'])
  const set = new Set(r)
  assert.equal(set.size, r.length, 'should have no duplicates')
})

test('permute: rejects invalid seed chars', () => {
  // seeds with non-alphanumerics get dropped entirely
  const r = permute(['log!', 'good'])
  assert.ok(!r.some((n) => n.includes('!')))
  assert.ok(r.includes('good'))
})

test('permute: custom prefixes override defaults', () => {
  const r = permute(['log'], { prefixes: ['ultra'], suffixes: [] })
  assert.ok(r.includes('ultra-log'))
  assert.ok(!r.includes('tiny-log'), 'default tiny should not appear')
})

test('permute: scope option emits scoped names', () => {
  const r = permute(['log'], { scope: '@me' })
  assert.ok(
    r.every((n) => n.startsWith('@me/')),
    'all should be scoped'
  )
})

test('permute: shouldIncludeUnderscore adds underscore separator', () => {
  const result = permute(['log'], { shouldIncludeUnderscore: true })
  assert.ok(
    result.some((name) => name.includes('_')),
    'should produce some underscored variants'
  )
})

test('score: shorter names rank lower (better)', () => {
  assert.ok(score('log') < score('logger-pro'), 'shorter beats longer')
})

test('score: seed-containing names rank lower (better)', () => {
  assert.ok(score('logsmith', ['log']) < score('zorblax', ['log']), 'seed-containing wins')
})

test('score: hyphens beat concatenation when same length', () => {
  assert.ok(score('tiny-log') < score('tinylogg'), 'hyphenated more readable')
})

test('DEFAULT_PREFIXES and DEFAULT_SUFFIXES exported', () => {
  assert.ok(Array.isArray(DEFAULT_PREFIXES) && DEFAULT_PREFIXES.length > 0)
  assert.ok(Array.isArray(DEFAULT_SUFFIXES) && DEFAULT_SUFFIXES.length > 0)
})
