import { cli } from '@kidd-cli/core'

await cli({
  commands: `${import.meta.dirname}/commands`,
  description: 'Authoring, linting, and evaluation tools for the skills monorepo',
  help: {
    header: 'skill-tools - work with the agent skills in this repo',
    order: ['view', 'lint', 'benchmark', 'eval'],
  },
  name: 'skill-tools',
  version: '0.0.0',
})
