#!/usr/bin/env node
import { resolveOrcaCommand, runOrca } from './orca-runtime.mjs'

const args = process.argv.slice(2)
if (args.length === 0 || args[0] === '--help') {
  console.log(
    'Usage: node orca.mjs <Orca command and arguments>\nResolves Orca once and forwards argv without a shell. No executable fallback.'
  )
} else {
  const result = runOrca(args, { inherit: true })
  if (result.error) console.error(`${resolveOrcaCommand()}: ${result.error.message}`)
  process.exitCode = result.status ?? 1
}
