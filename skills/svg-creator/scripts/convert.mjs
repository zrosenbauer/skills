#!/usr/bin/env node
// Convert an SVG to a raster format (PNG / JPEG / WebP / AVIF) via sharp.
//
// Sharp reads the SVG, renders it via librsvg, and outputs to the requested
// raster format. Output defaults to a sibling file beside the input, with the
// extension swapped. Custom output path via --out.
//
// Usage:
//   node convert.mjs <input.svg> [--format png|jpeg|webp|avif]
//                                [--out <path>]
//                                [--width <px>]
//                                [--height <px>]
//                                [--density <dpi>]   # default 144 — bumps font crispness
//                                [--quality <0-100>] # for jpeg/webp/avif
//
// Notes:
//   - sharp is a peer dep — install with `node preflight.mjs --install` or
//     your package manager (`pnpm add -D sharp` / `npm install -D sharp`).
//   - For pixel-perfect text, embed webfonts as base64 inside the SVG via
//     <style>@font-face{...}</style>. librsvg falls back to system fonts
//     otherwise, which can shift glyph metrics across machines.
//
// Exit codes: 0 = success, 1 = conversion failed, 2 = bad invocation.

import { statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve, basename, extname, join, dirname } from 'node:path'

const FORMATS = new Set(['png', 'jpeg', 'webp', 'avif'])

const args = parseArgs(process.argv.slice(2))
if (!args.input) {
  usage()
  process.exit(2)
}

const input = resolve(args.input)
try {
  const s = statSync(input)
  if (!s.isFile()) throw new Error('not a file')
} catch (err) {
  console.error(`✗ cannot read ${args.input}: ${err.message}`)
  process.exit(2)
}
if (extname(input).toLowerCase() !== '.svg') {
  console.error(`✗ expected an .svg input, got ${extname(input)}`)
  process.exit(2)
}

const format = args.format ?? 'png'
if (!FORMATS.has(format)) {
  console.error(`✗ unsupported format: ${format} (allowed: ${[...FORMATS].join(', ')})`)
  process.exit(2)
}

const outPath = args.out
  ? resolve(args.out)
  : join(dirname(input), basename(input, '.svg') + '.' + format)

const req = createRequire(resolve(process.cwd(), '_'))
let sharp
try {
  sharp = req('sharp')
} catch {
  console.error('✗ sharp is not installed. Run:')
  console.error('    node ' + join(import.meta.dirname ?? '.', 'preflight.mjs') + ' --install')
  console.error('  or install manually:')
  console.error('    pnpm add -D sharp   # or: npm install -D sharp')
  process.exit(1)
}

try {
  let pipe = sharp(input, { density: args.density ?? 144 })
  if (args.width || args.height) {
    pipe = pipe.resize({
      width: args.width,
      height: args.height,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
  }
  switch (format) {
    case 'png':
      pipe = pipe.png({ compressionLevel: 9 })
      break
    case 'jpeg':
      pipe = pipe.jpeg({ quality: args.quality ?? 90, mozjpeg: true })
      break
    case 'webp':
      pipe = pipe.webp({ quality: args.quality ?? 90 })
      break
    case 'avif':
      pipe = pipe.avif({ quality: args.quality ?? 60 })
      break
  }
  const info = await pipe.toFile(outPath)
  const sizeKb = (info.size / 1024).toFixed(1)
  console.log(`✓ ${input} → ${outPath}`)
  console.log(`  ${info.width}×${info.height} ${format}, ${sizeKb} KB`)
} catch (err) {
  console.error(`✗ conversion failed: ${err.message}`)
  process.exit(1)
}

// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const out = {
    input: null,
    format: null,
    out: null,
    width: null,
    height: null,
    density: null,
    quality: null,
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    const next = () => argv[++i]
    if (a === '--format' || a === '-f') out.format = next()
    else if (a === '--out' || a === '-o') out.out = next()
    else if (a === '--width' || a === '-w') out.width = Number(next())
    else if (a === '--height' || a === '-h') out.height = Number(next())
    else if (a === '--density') out.density = Number(next())
    else if (a === '--quality') out.quality = Number(next())
    else if (a === '--help') {
      usage()
      process.exit(0)
    } else if (a.startsWith('-')) {
      console.error(`✗ unknown flag: ${a}`)
      process.exit(2)
    } else if (!out.input) {
      out.input = a
    } else {
      console.error(`✗ unexpected positional arg: ${a}`)
      process.exit(2)
    }
  }
  return out
}

function usage() {
  console.error(
    'usage: convert.mjs <input.svg> [--format png|jpeg|webp|avif] [--out <path>] [--width <px>] [--height <px>] [--density <dpi>] [--quality <0-100>]'
  )
}
