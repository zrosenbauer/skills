import assert from 'node:assert/strict'
import { test } from 'node:test'

import { validateName } from './validate.mjs'

test('accepts a normal kebab-case name', () => {
  const result = validateName('tiny-log')
  assert.equal(result.isValid, true)
  assert.deepEqual(result.reasons, [])
  assert.equal(result.isScoped, false)
})

test('accepts a scoped name', () => {
  const result = validateName('@zrosenbauer/namer')
  assert.equal(result.isValid, true)
  assert.equal(result.isScoped, true)
})

test('rejects uppercase', () => {
  const result = validateName('TinyLog')
  assert.equal(result.isValid, false)
  assert.match(result.reasons.join(' '), /capital/)
})

test('rejects leading hyphen', () => {
  const result = validateName('-foo')
  assert.equal(result.isValid, false)
  assert.match(result.reasons.join(' '), /hyphen/)
})

test('rejects leading dot in unscoped name', () => {
  const result = validateName('.foo')
  assert.equal(result.isValid, false)
  assert.match(result.reasons.join(' '), /period/)
})

test('rejects leading dot in SCOPED name (regression E4)', () => {
  const result = validateName('@scope/.foo')
  assert.equal(result.isValid, false)
  assert.match(result.reasons.join(' '), /period/)
})

test('rejects excluded names', () => {
  assert.equal(validateName('node_modules').isValid, false)
  assert.equal(validateName('favicon.ico').isValid, false)
})

test('flags core module shadow as invalid for new publishes', () => {
  const result = validateName('http')
  assert.equal(result.isValid, false)
  assert.match(result.reasons.join(' '), /core/i)
})

test('rejects non-URL-safe characters', () => {
  assert.equal(validateName('foo bar').isValid, false)
  assert.equal(validateName('foo/bar').isValid, false)
  assert.equal(validateName('foo!bar').isValid, false)
})

test('rejects names over 214 chars', () => {
  const result = validateName('a'.repeat(215))
  assert.equal(result.isValid, false)
  assert.match(result.reasons.join(' '), /214/)
})

test('rejects empty / whitespace / wrong types', () => {
  assert.equal(validateName('').isValid, false)
  assert.equal(validateName(' foo').isValid, false)
  assert.equal(validateName(null).isValid, false)
  assert.equal(validateName(undefined).isValid, false)
  assert.equal(validateName(42).isValid, false)
})
