import { command } from '@kidd-cli/core'
import { render } from 'ink'
import React from 'react'
import { z } from 'zod'

import { discoverSkills, findRepoRoot, type SkillRecord } from '../lib/workspace.js'
import { App } from '../tui/App.js'

const positionals = z.object({
  skill: z.string().optional().describe('Filter the TUI to one skill by name'),
})

export default command({
  positionals,
  description: 'Open the TUI to browse skills, iterations, and transcripts',
  handler: async (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const allSkills = discoverSkills(repoRoot)
    const skills = ctx.args.skill
      ? allSkills.filter((s: SkillRecord) => s.location.name === ctx.args.skill)
      : allSkills

    const { waitUntilExit } = render(<App skills={skills} />)
    await waitUntilExit()
  },
})
