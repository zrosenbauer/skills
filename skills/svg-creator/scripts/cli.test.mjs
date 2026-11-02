import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'svg-consumer-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const project = join(root, 'project')
  mkdirSync(project)
  const scripts = join(root, 'skill', 'scripts')
  cpSync(import.meta.dirname, scripts, { recursive: true })
  const run = (script, args = []) =>
    spawnSync(process.execPath, [join(scripts, script), ...args], {
      cwd: project,
      encoding: 'utf8',
      env: { ...process.env, HOME: root, NODE_PATH: '' },
      timeout: 10_000,
    })
  return { project, run }
}

test('allows dependency-free SVG work but requires sharp for raster output', (t) => {
  const { run } = fixture(t)
  const svg = run('preflight.mjs')
  assert.equal(svg.status, 0, svg.stderr)
  assert.match(svg.stdout, /all required deps present/)
  const raster = run('preflight.mjs', ['--raster'])
  assert.equal(raster.status, 1)
  assert.match(raster.stdout, /sharp.*REQUIRED/)
})

test('rejects accidental install invocations and unknown preflight arguments', (t) => {
  const { run } = fixture(t)
  for (const args of [['--install'], ['--yes'], ['--rastre']]) {
    assert.equal(run('preflight.mjs', args).status, 2)
  }
  assert.equal(run('preflight.mjs', ['--help']).status, 0)
})

test('rejects non-SVG numeric syntax and non-finite or non-positive viewBoxes', (t) => {
  const { run, project } = fixture(t)
  for (const viewBox of [
    '0 0 Infinity 20',
    '0 0 1e999 20',
    '0 0 NaN 20',
    '0 0 0x10 20',
    '0 0 0 20',
    '0 0 -1 20',
    '1 0 10 20',
    '0,,0,10,20',
    ',0 0 10 20',
    '0 0 10 20,',
  ]) {
    writeFileSync(join(project, 'asset.svg'), `<svg viewBox="${viewBox}"></svg>`)
    const result = run('lint-viewbox.mjs', ['asset.svg'])
    assert.equal(result.status, 1, viewBox)
  }
})

test('accepts finite SVG numbers and discloses that geometry was not measured', (t) => {
  const { run, project } = fixture(t)
  for (const viewBox of ['0 0 100 100', '0,0,1e2,2E1', '0 0 .5 20.']) {
    writeFileSync(
      join(project, 'asset.svg'),
      `<svg viewBox="${viewBox}"><rect x="1" y="1" width="2" height="2"/></svg>`
    )
    const result = run('lint-viewbox.mjs', ['asset.svg'])
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /Attribute checks only/)
  }
})

test('rejects malformed conversion options before looking up sharp', (t) => {
  const { run } = fixture(t)
  for (const args of [
    ['--width'],
    ['--width', 'NaN'],
    ['--width', '0'],
    ['--height', '-2'],
    ['--height', '1.5'],
    ['--density', 'Infinity'],
    ['--quality', '101'],
    ['--format', '--out'],
  ]) {
    const result = run('convert.mjs', ['asset.svg', ...args])
    assert.equal(result.status, 2, `${args.join(' ')}: ${result.stderr}`)
    assert.doesNotMatch(result.stderr, /sharp is not installed/)
  }
})

test('runs the copied active-content CLI through canonicalized installation paths', (t) => {
  const { run, project } = fixture(t)
  writeFileSync(join(project, 'asset.svg'), '<svg><script>fixture()</script></svg>')
  const result = run('check-scripts.mjs', ['asset.svg'])
  assert.equal(result.status, 1)
  assert.equal(JSON.parse(result.stdout).findings[0].kind, 'script element')
})

test('does not recurse through directory symlink cycles', (t) => {
  if (process.platform === 'win32')
    return t.skip('directory symlinks require privileges on Windows')
  const { run, project } = fixture(t)
  writeFileSync(join(project, 'asset.svg'), '<svg viewBox="0 0 10 10"/>')
  symlinkSync(project, join(project, 'cycle'), 'dir')
  const result = run('lint-viewbox.mjs', ['.'])
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /1\/1 passed/)
})
