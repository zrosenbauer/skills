import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { checkAgentScan } from './agent-scan.mjs'

function reportWith(risk_indexes = {}) {
  return {
    scan_path_responses: [
      {
        path: 'skills',
        server_risks: [],
        skill_risks: [
          { name: 'fixture', files: [{ name: 'SKILL.md', type: 'instruction' }], risk_indexes },
        ],
      },
    ],
  }
}

test('accepts analyzed clean skills in the documented current schema', () => {
  assert.deepEqual(checkAgentScan(reportWith(), ['fixture']), {
    errors: [],
    findings: [],
    skills: ['fixture'],
  })
})

test('retains the High/Critical gate at scores of 600 and above', () => {
  for (const score of [0, 100, 300, 599, 600, 1000]) {
    const result = checkAgentScan(
      reportWith({ fixture_risk: { score, evidence: 'fixture evidence' } }),
      ['fixture']
    )
    assert.deepEqual(result.errors, [])
    assert.equal(result.findings.length, score >= 600 ? 1 : 0)
  }
})

test('rejects operational errors even when the scanner exits successfully', () => {
  for (const error of [
    { message: 'Unauthorized', is_failure: true },
    { message: '503 Service Unavailable', is_failure: true },
  ]) {
    const report = reportWith()
    report.scan_path_responses[0].error = error
    assert.ok(checkAgentScan(report, ['fixture']).errors.length)
    assert.ok(
      checkAgentScan(report, ['fixture']).errors.some((message) => message.includes(error.message))
    )
    const componentReport = reportWith()
    componentReport.scan_path_responses[0].skill_risks[0].error = error
    assert.ok(checkAgentScan(componentReport, ['fixture']).errors.length)
  }
})

test('rejects unknown schemas and incomplete inventories instead of reporting zero findings', () => {
  for (const report of [
    null,
    [],
    {},
    { skills: { issues: [] } },
    { scan_path_responses: [] },
    { scan_path_responses: [null] },
    { scan_path_responses: [{ path: 'skills', skill_risks: [], server_risks: [] }] },
  ]) {
    assert.ok(checkAgentScan(report, ['fixture']).errors.length)
  }
  assert.ok(
    checkAgentScan(reportWith(), ['fixture', 'missing']).errors.some((error) =>
      error.startsWith('missing:')
    )
  )
  const duplicate = reportWith()
  duplicate.scan_path_responses.push(...reportWith().scan_path_responses)
  assert.ok(
    checkAgentScan(duplicate, ['fixture']).errors.includes(
      'Duplicate skill analysis results returned.'
    )
  )
})

test('rejects malformed risk indicators and missing analysis arrays', () => {
  for (const risk of [
    null,
    [],
    {},
    { score: '600', evidence: 'x' },
    { score: -1, evidence: 'x' },
    { score: 1001, evidence: 'x' },
    { score: 600 },
    { score: 1.5, evidence: 'x' },
  ]) {
    assert.ok(checkAgentScan(reportWith({ fixture_risk: risk }), ['fixture']).errors.length)
  }
  const report = reportWith()
  delete report.scan_path_responses[0].server_risks
  assert.ok(checkAgentScan(report, ['fixture']).errors.length)
  assert.ok(checkAgentScan(reportWith(null), ['fixture']).errors.length)
})

test('gates server risks as well as skill risks', () => {
  const report = reportWith()
  report.scan_path_responses[0].server_risks.push({
    name: 'fixture-server',
    risk_indexes: { fixture: { score: 1000, evidence: 'fixture' } },
  })
  assert.equal(checkAgentScan(report, ['fixture']).findings[0].component, 'fixture-server')
})

test('returns distinct CLI statuses for clean, risky, unverified, and malformed reports', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'agent-scan-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const skills = join(root, 'skills')
  mkdirSync(join(skills, 'fixture'), { recursive: true })
  const reportPath = join(root, 'audit.json')
  const script = new URL('./agent-scan.mjs', import.meta.url)
  for (const [report, status] of [
    [reportWith(), 0],
    [reportWith({ fixture: { score: 600, evidence: 'fixture' } }), 1],
    [{ scan_path_responses: [] }, 2],
  ]) {
    writeFileSync(reportPath, JSON.stringify(report))
    const result = spawnSync(process.execPath, [script.pathname, reportPath, skills], {
      encoding: 'utf8',
    })
    assert.equal(result.status, status, result.stderr)
  }
  writeFileSync(reportPath, '{')
  assert.equal(spawnSync(process.execPath, [script.pathname, reportPath, skills]).status, 2)
})
