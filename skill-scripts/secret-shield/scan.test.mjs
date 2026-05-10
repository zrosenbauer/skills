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
  // `token = …` also trips the heuristic generic-env-style pattern, hence the
  // `some()` assertion rather than a strict count.
  const { findings } = scanForSecrets({
    content: `token = ${FAKE.ghPatClassic}\n`,
  })
  assert.ok(findings.some((f) => f.id === 'github-pat-classic'))
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

test('redactSecrets returns findings whose offsets reflect kept matches only', () => {
  const content = `a=${FAKE.awsKey}\nb=${FAKE.awsKey}\n`
  const { findings } = redactSecrets({ content })
  assert.equal(findings.length, 2)
  assert.equal(findings[0].line, 1)
  assert.equal(findings[1].line, 2)
})

test('OpenAI legacy matcher captures the full key when longer than 48 chars', () => {
  // Real-world OpenAI legacy keys are often 51 characters (sk- + 48..51).
  const longKey = `${'sk-'}${'A'.repeat(51)}`
  const { content, findings } = redactSecrets({ content: `k=${longKey}\n` })
  assert.ok(findings.some((f) => f.id === 'openai-legacy'))
  assert.ok(!content.includes(longKey), 'full 51-char key must be redacted, no suffix leak')
  assert.ok(!content.includes('AAA'), 'no run of the original key bytes should remain')
})

test('AWS pattern enforces a leading identifier boundary', () => {
  // `XAKIA...` — the AKIA is preceded by `X` (an ident char), so no match.
  const { findings } = scanForSecrets({ content: `noise${FAKE.awsKey}\n` })
  assert.equal(findings.length, 0)
})

test('AWS pattern absorbs trailing alphanumerics so no suffix leaks after redaction', () => {
  // Greedy `{16,}` — extra trailing alnums become part of the match, so the
  // redactor replaces the entire run rather than leaving a tell-tale suffix.
  const long = `${FAKE.awsKey}EXTRA`
  const { content } = redactSecrets({ content: `k=${long}\n` })
  assert.ok(!content.includes('EXTRA'))
  assert.ok(!content.includes(FAKE.awsKey))
})

test('AWS pattern matches when followed by a non-word character', () => {
  const { findings } = scanForSecrets({ content: `key=${FAKE.awsKey}.\n` })
  assert.ok(findings.some((f) => f.id === 'aws-access-key'))
})

test('detects an Azure storage account key', () => {
  const azureKey = `AccountKey=${'A'.repeat(86)}==`
  const { findings } = scanForSecrets({ content: `conn=${azureKey};\n` })
  assert.ok(findings.some((f) => f.id === 'azure-storage-key'))
})

test('detects a GCP service account private key (JSON form)', () => {
  const json = '{"private_key": "-----BEGIN PRIVATE KEY-----\\nMIIE\\n-----END PRIVATE KEY-----"}'
  const { findings } = scanForSecrets({ content: json })
  assert.ok(findings.some((f) => f.id === 'gcp-service-account-private-key'))
})

test('detects an npm access token', () => {
  const token = `${'npm_'}${'a'.repeat(36)}`
  const { findings } = scanForSecrets({ content: `//registry.npmjs.org/:_authToken=${token}\n` })
  assert.ok(findings.some((f) => f.id === 'npm-token'))
})

test('npm token leading-boundary check rejects in-word prefix', () => {
  // Pattern is greedy on the tail (`{36,}`) but identifier-anchored on the
  // head — a non-word char must precede `npm_`.
  const token = `${'npm_'}${'a'.repeat(36)}`
  const { findings } = scanForSecrets({ content: `prefix${token}\n` })
  assert.ok(!findings.some((f) => f.id === 'npm-token'))
})

test('detects a Twilio account SID', () => {
  const sid = `${'AC'}${'a'.repeat(32)}`
  const { findings } = scanForSecrets({ content: `sid=${sid}\n` })
  assert.ok(findings.some((f) => f.id === 'twilio-account-sid'))
})

test('twilio account SID boundary check rejects embedded match', () => {
  const sid = `${'AC'}${'a'.repeat(32)}EXTRA`
  const { findings } = scanForSecrets({ content: `sid=${sid}\n` })
  assert.ok(!findings.some((f) => f.id === 'twilio-account-sid'))
})

test('detects a Twilio API key (uppercase SK prefix)', () => {
  const apiKey = `${'SK'}${'a'.repeat(32)}`
  const { findings } = scanForSecrets({ content: `key=${apiKey}\n` })
  assert.ok(findings.some((f) => f.id === 'twilio-api-key'))
})

test('detects a SendGrid API key', () => {
  const sg = `${'SG.'}${'A'.repeat(22)}.${'B'.repeat(43)}`
  const { findings } = scanForSecrets({ content: `SG_KEY=${sg}\n` })
  assert.ok(findings.some((f) => f.id === 'sendgrid-api-key'))
})

test('sendgrid boundary check rejects embedded match', () => {
  const sg = `${'SG.'}${'A'.repeat(22)}.${'B'.repeat(43)}EXTRA`
  const { findings } = scanForSecrets({ content: `k=${sg}\n` })
  assert.ok(!findings.some((f) => f.id === 'sendgrid-api-key'))
})

test('detects a DigitalOcean PAT', () => {
  const pat = `${'dop_v1_'}${'a'.repeat(64)}`
  const { findings } = scanForSecrets({ content: `DO_TOKEN=${pat}\n` })
  assert.ok(findings.some((f) => f.id === 'digitalocean-pat'))
})

test('detects a Hugging Face access token', () => {
  const tok = `${'hf_'}${'A'.repeat(34)}`
  const { findings } = scanForSecrets({ content: `HF=${tok}\n` })
  assert.ok(findings.some((f) => f.id === 'huggingface-token'))
})

test('huggingface leading-boundary check rejects in-word prefix', () => {
  const tok = `${'hf_'}${'A'.repeat(34)}`
  const { findings } = scanForSecrets({ content: `prefix${tok}\n` })
  assert.ok(!findings.some((f) => f.id === 'huggingface-token'))
})

test('generic env-style heuristic flags PASSWORD assignments (case-insensitive)', () => {
  const { findings } = scanForSecrets({
    content: `password = "hunter2hunter2hunter2"\n`,
  })
  assert.ok(findings.some((f) => f.id === 'generic-env-style'))
})

test('generic env-style heuristic does not flag short values', () => {
  const { findings } = scanForSecrets({ content: `API_KEY = "short"\n` })
  assert.ok(!findings.some((f) => f.id === 'generic-env-style'))
})
