import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { providers } from './providers.mjs'

test('describes native Skills rather than Rules or repository instructions', () => {
  assert.equal(new Set(providers.map((provider) => provider.id)).size, providers.length)
  for (const provider of providers) {
    assert.equal(provider.fileFormat, 'SKILL.md')
    const snapshot = readFileSync(new URL(`../${provider.localDocPath}`, import.meta.url), 'utf8')
    assert.match(snapshot, /Source:/)
    assert.match(snapshot, /Retrieved:/)
    assert.match(snapshot, /SKILL\.md/)
    assert.ok(snapshot.length > 1000, `${provider.id} needs substantive evidence`)
    assert.doesNotMatch(snapshot, /Skip to content|Navigation Menu|AUTO-GENERATED/)
    if (provider.id !== 'claude-code')
      assert.deepEqual(provider.requiredFrontmatter, ['name', 'description'])
  }
})

test('runs a copied standalone provider CLI without dependencies or network access', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'portability-consumer-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  cpSync(new URL('..', import.meta.url), root, { recursive: true })
  const result = spawnSync(process.execPath, [join(root, 'scripts/providers.mjs'), '--pretty'], {
    cwd: root,
    encoding: 'utf8',
    timeout: 10_000,
  })
  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(JSON.parse(result.stdout), providers)
})
