#!/usr/bin/env node
// A warning heuristic, not a sanitizer or proof that an SVG is safe.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

/** Report obvious active markup without modifying the asset. */
export function checkScripts(source) {
  const patterns = [
    ['script element', /<\s*(?:[\w.-]+:)?script\b/i],
    ['event handler', /\bon[a-z]+\s*=/i],
    ['JavaScript URL', /\bjavascript\s*:/i],
    ['embedded HTML', /<\s*(?:[\w.-]+:)?foreignObject\b/i],
  ]
  return patterns.flatMap(([kind, pattern]) => {
    const match = pattern.exec(source)
    return match ? [{ kind, line: source.slice(0, match.index).split('\n').length }] : []
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [file] = process.argv.slice(2)
  if (!file) {
    console.error('usage: check-scripts.mjs <path-to-svg>')
    process.exit(2)
  }
  try {
    const findings = checkScripts(readFileSync(file, 'utf8'))
    console.log(
      JSON.stringify(
        { file, findings, note: 'Heuristic only; no findings does not prove safety.' },
        null,
        2
      )
    )
    process.exitCode = findings.length ? 1 : 0
  } catch (error) {
    console.error(error.message)
    process.exitCode = 2
  }
}
