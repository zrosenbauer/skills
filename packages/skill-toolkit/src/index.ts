import { cli } from '@kidd-cli/core'

await cli({
  commands: `${import.meta.dirname}/commands`,
  description: 'Authoring, linting, and evaluation tools for the skills monorepo',
  help: {
    header: 'skill-toolkit - work with the agent skills in this repo',
    order: ['lint', 'sync'],
  },
  name: 'skill-toolkit',
  version: '0.0.0',
})
