import assert from 'node:assert/strict'
import { test } from 'node:test'

import { checkScripts } from './check-scripts.mjs'

test('reports obvious active markup with a line number without changing the source', () => {
  const svg =
    '<svg>\n<script>alert(1)</script><g onLoad="run()"/><a href="javascript:run()"/><foreignObject/></svg>'
  assert.deepEqual(checkScripts(svg), [
    { kind: 'script element', line: 2 },
    { kind: 'event handler', line: 2 },
    { kind: 'JavaScript URL', line: 2 },
    { kind: 'embedded HTML', line: 2 },
  ])
  assert.ok(svg.includes('<script>'))
})

test('does not flag ordinary static SVG markup', () => {
  assert.deepEqual(checkScripts('<svg><rect fill="#fff" width="10" height="10"/></svg>'), [])
})
