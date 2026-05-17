import assert from 'node:assert/strict'
import { test } from 'node:test'

import { checkMany, checkOne, pool } from './registry.mjs'

const stubFetch = (statusByName) => async (url) => {
  const decoded = decodeURIComponent(url.split('/').pop())
  const status = statusByName[decoded] ?? 404
  if (status === 'throw') throw new Error('network down')
  return { status }
}

test('checkOne: 200 → taken', async () => {
  const r = await checkOne('react', { fetchImpl: stubFetch({ react: 200 }) })
  assert.equal(r.kind, 'taken')
  assert.equal(r.status, 200)
  assert.equal(r.name, 'react')
})

test('checkOne: 404 → free', async () => {
  const r = await checkOne('totally-novel-xyz-123', { fetchImpl: stubFetch({}) })
  assert.equal(r.kind, 'free')
  assert.equal(r.status, 404)
})

test('checkOne: other status → unknown', async () => {
  const r = await checkOne('rate-limited', { fetchImpl: stubFetch({ 'rate-limited': 429 }) })
  assert.equal(r.kind, 'unknown')
  assert.equal(r.status, 429)
})

test('checkOne: network error → unknown with error message', async () => {
  const r = await checkOne('whatever', { fetchImpl: stubFetch({ whatever: 'throw' }) })
  assert.equal(r.kind, 'unknown')
  assert.equal(r.status, 0)
  assert.match(r.error, /network down/)
})

test('checkOne: malformed Response (no numeric status) → unknown with explanatory error (regression W16a)', async () => {
  // A custom fetchImpl returning a non-Response shape used to surface as
  // {kind: 'unknown', status: undefined}, violating the typedef.
  for (const malformed of [{}, null, undefined, { status: 'not-a-number' }, { status: NaN }]) {
    const result = await checkOne('candidate', { fetchImpl: async () => malformed })
    assert.equal(result.kind, 'unknown')
    assert.equal(result.status, 0)
    assert.match(result.error, /fetch returned response without numeric status/)
  }
})

test('checkOne: handles scoped names via URL encoding', async () => {
  let observedUrl = ''
  const f = async (url) => {
    observedUrl = url
    return { status: 200 }
  }
  const r = await checkOne('@scope/pkg', { fetchImpl: f })
  assert.match(observedUrl, /%40scope%2Fpkg/)
  assert.equal(r.kind, 'taken')
})

test('pool: throws on negative concurrency (regression iter-7 W35)', async () => {
  await assert.rejects(() => pool([async () => 1], -1), /non-negative integer/)
})

test('pool: throws on non-integer concurrency', async () => {
  await assert.rejects(() => pool([async () => 1], 1.5), /non-negative integer/)
})

test('pool: concurrency=0 falls back to default and runs all tasks', async () => {
  let counter = 0
  const result = await pool([async () => ++counter], 0)
  assert.deepEqual(result, [1])
  assert.equal(counter, 1)
})

test('pool: respects concurrency limit', async () => {
  let inFlight = 0
  let maxInFlight = 0
  const tasks = Array.from({ length: 20 }, () => async () => {
    inFlight++
    if (inFlight > maxInFlight) maxInFlight = inFlight
    await new Promise((r) => setTimeout(r, 5))
    inFlight--
    return 'done'
  })
  await pool(tasks, 4)
  assert.ok(maxInFlight <= 4, `expected ≤4 concurrent, saw ${maxInFlight}`)
})

test('pool: preserves input order in results', async () => {
  const tasks = [1, 2, 3, 4, 5].map((n) => async () => {
    await new Promise((r) => setTimeout(r, Math.random() * 10))
    return n
  })
  const r = await pool(tasks, 3)
  assert.deepEqual(r, [1, 2, 3, 4, 5])
})

test('checkMany: batch returns one result per input', async () => {
  const stub = stubFetch({ react: 200, vue: 200, 'novel-xyz': 404 })
  const r = await checkMany(['react', 'vue', 'novel-xyz'], { fetchImpl: stub, concurrency: 2 })
  assert.equal(r.length, 3)
  assert.deepEqual(
    r.map((x) => [x.name, x.kind]),
    [
      ['react', 'taken'],
      ['vue', 'taken'],
      ['novel-xyz', 'free'],
    ]
  )
})
