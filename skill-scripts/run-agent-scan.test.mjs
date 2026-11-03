import assert from 'node:assert/strict'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { isTransientAnalysisFailure, runAgentScan } from './run-agent-scan.mjs'

const clean = {
  scan_path_responses: [
    {
      path: 'skills',
      error: null,
      server_risks: [],
      skill_risks: [{ name: 'fixture', risk_indexes: {} }],
    },
  ],
}
const unavailable = (message = 'Could not reach analysis server: 503 - Service Unavailable') => ({
  scan_path_responses: [
    {
      path: 'skills',
      error: { category: 'analysis_error', message },
      server_risks: [],
      skill_risks: [],
    },
  ],
})

function fixture(t, responses) {
  const root = mkdtempSync(join(tmpdir(), 'scan-retry-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const skillsDirectory = join(root, 'skills')
  mkdirSync(join(skillsDirectory, 'fixture'), { recursive: true })
  const counter = join(root, 'counter')
  const cli = join(root, 'uvx')
  writeFileSync(
    cli,
    `#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
const counter = ${JSON.stringify(counter)};
const count = existsSync(counter) ? Number(readFileSync(counter, 'utf8')) : 0;
writeFileSync(counter, String(count + 1));
const responses = ${JSON.stringify(responses)};
const response = responses[Math.min(count, responses.length - 1)];
console.log(typeof response.report === 'string' ? response.report : JSON.stringify(response.report));
process.exitCode = response.status ?? 0;
`
  )
  chmodSync(cli, 0o755)
  return {
    cli,
    skillsDirectory,
    reportPath: join(root, 'audit.json'),
    retryDelays: [0, 0],
    counter,
  }
}

test('recognizes only explicit transient analysis errors', () => {
  for (const code of [429, 502, 503, 504]) {
    assert.equal(isTransientAnalysisFailure(unavailable(`HTTP ${code}`)), true)
  }
  for (const report of [
    null,
    {},
    clean,
    unavailable('401 Unauthorized'),
    unavailable('403 Forbidden'),
    unavailable('503 Unauthorized'),
    unavailable('Unrecognized failure'),
    { scan_path_responses: [null] },
    { scan_path_responses: [{ skill_risks: {}, server_risks: [] }] },
  ]) {
    assert.equal(isTransientAnalysisFailure(report), false)
  }
  const wrongCategory = unavailable()
  wrongCategory.scan_path_responses[0].error.category = 'parse_error'
  assert.equal(isTransientAnalysisFailure(wrongCategory), false)
})

test('recovers from a 503 reported with exit zero and preserves both attempts', async (t) => {
  const options = fixture(t, [{ report: unavailable() }, { report: clean }])
  assert.equal(await runAgentScan(options), 0)
  assert.equal(readFileSync(options.counter, 'utf8'), '2')
  assert.deepEqual(JSON.parse(readFileSync(options.reportPath, 'utf8')), clean)
  assert.deepEqual(
    JSON.parse(readFileSync(`${options.reportPath}.attempt-1.json`, 'utf8')),
    unavailable()
  )
  assert.deepEqual(JSON.parse(readFileSync(`${options.reportPath}.attempt-2.json`, 'utf8')), clean)
})

test('fails closed after three unavailable responses even when every scanner exit is zero', async (t) => {
  const options = fixture(t, [{ report: unavailable() }])
  assert.equal(await runAgentScan(options), 2)
  assert.equal(readFileSync(options.counter, 'utf8'), '3')
})

test('does not retry findings, authentication failures, incomplete analysis, or malformed reports', async (t) => {
  const risky = structuredClone(clean)
  risky.scan_path_responses[0].skill_risks[0].risk_indexes = {
    fixture: { score: 600, evidence: 'fixture finding' },
  }
  const riskyAndUnavailable = structuredClone(risky)
  riskyAndUnavailable.scan_path_responses[0].error = unavailable().scan_path_responses[0].error
  await Promise.all(
    [
      [risky, 0, 1],
      [riskyAndUnavailable, 0, 1],
      [unavailable('401 Unauthorized'), 0, 2],
      [unavailable('403 Forbidden'), 1, 2],
      [{ scan_path_responses: [] }, 0, 2],
      ['{', 0, 2],
      [clean, 1, 2],
    ].map(async ([report, status, expected]) => {
      const options = fixture(t, [{ report, status }, { report: clean }])
      assert.equal(await runAgentScan(options), expected)
      assert.equal(readFileSync(options.counter, 'utf8'), '1')
    })
  )
})
