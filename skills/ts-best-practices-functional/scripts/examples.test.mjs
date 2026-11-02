import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import { test } from 'node:test'

const skill = readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8')
const resultTypes = skill.slice(
  skill.indexOf('interface Ok<T>'),
  skill.indexOf('```', skill.indexOf('interface Ok<T>'))
)
const parseExample = skill.slice(
  skill.indexOf('interface Config {'),
  skill.indexOf('const result = parseConfig(input)')
)
const asyncExample = skill.slice(
  skill.indexOf('async function attemptAsync<T>'),
  skill.indexOf('const result = await attemptAsync')
)
const source = stripTypeScriptTypes(`${resultTypes}\n${parseExample}\n${asyncExample}`)
const { parseConfig, attemptAsync } = await import(
  `data:text/javascript,${encodeURIComponent(`${source}\nexport { parseConfig, attemptAsync }`)}`
)

test('rejects syntactically invalid JSON separately from invalid configurations', () => {
  assert.equal(parseConfig('{').error.type, 'invalid_json')
  for (const input of [
    'null',
    '42',
    '[]',
    '{}',
    '{"port":"80"}',
    '{"port":0}',
    '{"port":65536}',
    '{"port":1.5}',
  ]) {
    assert.equal(parseConfig(input).error.type, 'schema_mismatch', input)
  }
  assert.deepEqual(parseConfig('{"port":8080}'), { ok: true, value: { port: 8080 } })
})

test('preserves arbitrary rejection values without claiming a domain error type', async () => {
  assert.deepEqual(await attemptAsync(() => Promise.resolve(42)), { ok: true, value: 42 })
  assert.deepEqual(await attemptAsync(() => Promise.reject('arbitrary rejection')), {
    ok: false,
    error: 'arbitrary rejection',
  })
  assert.match(asyncExample, /Promise<Result<T, unknown>>/)
  assert.doesNotMatch(asyncExample, /\bas E\b/)
})
