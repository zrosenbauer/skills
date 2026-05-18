import { cli } from '@kidd-cli/core'
import { report } from '@kidd-cli/core/report'

await cli({
  commands: `${import.meta.dirname}/commands`,
  description: 'Authoring, linting, and evaluation tools for the skills monorepo',
  help: {
    header: 'skill-toolkit - work with the agent skills in this repo',
    order: ['lint', 'sync', 'schema', 'tokens'],
  },
  middleware: [report({ output: process.stdout })],
  name: 'skill-toolkit',
  version: '0.0.0',
})
