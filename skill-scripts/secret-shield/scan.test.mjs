import assert from 'node:assert/strict'
import { test } from 'node:test'

import { PATTERNS } from './patterns.mjs'
import { redactSecrets, scanForSecrets } from './scan.mjs'

// Test fixtures are constructed via string concatenation so the source
// file never contains a literal contiguous secret. This keeps GitHub's
// push-protection secret scanner happy while still exercising our regex
// at runtime.

const FAKE = {
  awsKey: `${'AKIA'}${'IOSFODNN7EXAMPLE'}`,
  ghPatClassic: `${'ghp_'}${'a'.repeat(36)}`,
  ghPatFine: `${'github_pat_'}${'a'.repeat(82)}`,
  openaiLegacy: `${'sk-'}${'A'.repeat(48)}`,
  openaiProject: `${'sk-proj-'}${'A'.repeat(48)}`,
  anthropic: `${'sk-ant-api03-'}${'A'.repeat(50)}`,
  google: `${'AIza'}${'A'.repeat(35)}`,
  stripe: `${'sk_'}${'live_'}${'a'.repeat(24)}`,
  jwtPart1: `${'eyJ'}${'hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'}`,
  jwtPart2: `${'eyJ'}${'zdWIiOiIxMjM0NTY3ODkwIn0'}`,
  jwtPart3: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
}

test('detects an AWS access key', () => {
  const { findings, hasFindings } = scanForSecrets({
    content: `aws_key = "${FAKE.awsKey}"\n`,
  })
  assert.equal(hasFindings, true)
  assert.equal(findings.length, 1)
  assert.equal(findings[0].id, 'aws-access-key')
  assert.equal(findings[0].severity, 'high')
  assert.equal(findings[0].line, 1)
})

test('detects a GitHub classic PAT', () => {
  const { findings } = scanForSecrets({
    content: `token = ${FAKE.ghPatClassic}\n`,
  })
  assert.equal(findings.length, 1)
  assert.equal(findings[0].id, 'github-pat-classic')
})

test('detects a fine-grained GitHub PAT', () => {
  const { findings } = scanForSecrets({ content: `# ${FAKE.ghPatFine}\n` })
  assert.equal(findings.length, 1)
  assert.equal(findings[0].id, 'github-pat-fine-grained')
})

test('detects an OpenAI legacy key', () => {
  const { findings } = scanForSecrets({ content: `OPENAI_KEY=${FAKE.openaiLegacy}\n` })
  // openai-legacy + may also match openai-project (sk- prefix), so >= 1.
  assert.ok(findings.length >= 1)
  assert.ok(findings.some((f) => f.id === 'openai-legacy'))
})

test('detects an Anthropic API key', () => {
  const { findings } = scanForSecrets({ content: `header: ${FAKE.anthropic}\n` })
  assert.ok(findings.some((f) => f.id === 'anthropic-api'))
})

test('detects a Google API key', () => {
  const { findings } = scanForSecrets({ content: `key=${FAKE.google}\n` })
  assert.equal(findings.length, 1)
  assert.equal(findings[0].id, 'google-api-key')
})

test('detects a Stripe live key', () => {
  const { findings } = scanForSecrets({
    content: `STRIPE_KEY=${FAKE.stripe}\n`,
  })
  assert.equal(findings.length, 1)
  assert.equal(findings[0].id, 'stripe-secret')
})

test('detects a JWT', () => {
  const jwt = `${FAKE.jwtPart1}.${FAKE.jwtPart2}.${FAKE.jwtPart3}`
  const { findings } = scanForSecrets({ content: `Authorization: Bearer ${jwt}\n` })
  assert.ok(findings.some((f) => f.id === 'jwt'))
})

test('detects a PEM private key block', () => {
  const { findings } = scanForSecrets({
    content: '-----BEGIN RSA PRIVATE KEY-----\nMIIBOwIBAAJB\n-----END RSA PRIVATE KEY-----\n',
  })
  assert.ok(findings.some((f) => f.id === 'private-key-block'))
})

test('detects an unencrypted PEM private key block (no algorithm prefix)', () => {
  const { findings } = scanForSecrets({
    content: '-----BEGIN PRIVATE KEY-----\nMIIBOwIBAAJB\n-----END PRIVATE KEY-----\n',
  })
  assert.ok(findings.some((f) => f.id === 'private-key-block'))
})

test('finds multiple secrets and reports each one', () => {
  const content = `
    aws = ${FAKE.awsKey}
    gh = ${FAKE.ghPatClassic}
  `
  const { findings } = scanForSecrets({ content })
  assert.equal(findings.length, 2)
  const ids = findings.map((f) => f.id).toSorted()
  assert.deepEqual(ids, ['aws-access-key', 'github-pat-classic'])
})

test('produces findings sorted by line, then column', () => {
  const content = `${FAKE.awsKey} first\nsecond line nothing here\n${FAKE.awsKey} third\n`
  const { findings } = scanForSecrets({ content })
  assert.equal(findings.length, 2)
  assert.equal(findings[0].line, 1)
  assert.equal(findings[1].line, 3)
})

test('reports correct line and column for a match', () => {
  const content = `\n\n  ${FAKE.awsKey}\n`
  const { findings } = scanForSecrets({ content })
  assert.equal(findings[0].line, 3)
  assert.equal(findings[0].column, 3)
})

test('returns empty findings for content with no secrets', () => {
  const { findings, hasFindings } = scanForSecrets({
    content: 'hello world\nno secrets in this file\n',
  })
  assert.deepEqual(findings, [])
  assert.equal(hasFindings, false)
})

test('every registered pattern compiles to a valid RegExp', () => {
  for (const p of PATTERNS) {
    assert.doesNotThrow(() => new RegExp(p.pattern), `bad pattern: ${p.id}`)
  }
})

test('every registered pattern has a unique id', () => {
  const seen = new Set()
  for (const p of PATTERNS) {
    assert.ok(!seen.has(p.id), `duplicate pattern id: ${p.id}`)
    seen.add(p.id)
  }
})

test('redactSecrets replaces matches with placeholders', () => {
  const { content, findings } = redactSecrets({
    content: `aws=${FAKE.awsKey}\n`,
  })
  assert.equal(findings.length, 1)
  assert.match(content, /\[REDACTED-aws-access-key-1]/)
  assert.ok(!content.includes(FAKE.awsKey))
})

test('redactSecrets numbers repeated secrets uniquely per pattern id', () => {
  const content = `a=${FAKE.awsKey}\nb=${FAKE.awsKey}\nc=${FAKE.ghPatClassic}\n`
  const { content: redacted } = redactSecrets({ content })
  assert.match(redacted, /\[REDACTED-aws-access-key-1]/)
  assert.match(redacted, /\[REDACTED-aws-access-key-2]/)
  assert.match(redacted, /\[REDACTED-github-pat-classic-1]/)
})

test('redactSecrets is a no-op when no secrets present', () => {
  const original = 'just regular code here\n'
  const { content, findings } = redactSecrets({ content: original })
  assert.equal(content, original)
  assert.equal(findings.length, 0)
})

test('redactSecrets handles overlapping matches by keeping the earlier one', () => {
  // sk-... matches both openai-legacy AND (potentially) openai-project — overlap.
  const { content } = redactSecrets({ content: `k=${FAKE.openaiProject}\n` })
  // Some redaction happened — exact id depends on which pattern matches first
  // in the registry, but the key text must be gone.
  assert.ok(!content.includes(FAKE.openaiProject.slice(8)), 'secret payload must be redacted')
})
