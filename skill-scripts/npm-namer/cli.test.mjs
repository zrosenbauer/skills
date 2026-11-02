import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

test('ships a standalone CLI with an honest dry-run limitation', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'npm-namer-consumer-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const script = join(root, 'check.mjs')
  copyFileSync(new URL('./dist/check.mjs', import.meta.url), script)
  const result = spawnSync(process.execPath, [script, '--help'], { cwd: root, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /Treat every available verdict as provisional/)
  assert.match(result.stdout, /dry-run does NOT exercise/)
  assert.match(result.stdout, /Never publish just to test availability/)
})
