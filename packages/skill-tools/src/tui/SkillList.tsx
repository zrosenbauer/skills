import { Select } from '@inkjs/ui'
import { Box, Text } from 'ink'
import React from 'react'

import type { SkillRecord } from '../lib/workspace.js'

interface SkillListProps {
  skills: SkillRecord[]
  onSelect: (skill: SkillRecord) => void
}

export function SkillList({ skills, onSelect }: SkillListProps) {
  if (skills.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="yellow">No skills found.</Text>
        <Text dimColor>
          Skills live in `skills/` (public) or `.agents/skills/` (private).
        </Text>
      </Box>
    )
  }

  const options = skills.map((skill) => ({
    label: formatLabel(skill),
    value: skill.location.name,
  }))

  return (
    <Box flexDirection="column" padding={1}>
      <Text>
        <Text bold>Skills</Text> <Text dimColor>({skills.length})</Text>
      </Text>
      <Box marginTop={1}>
        <Select
          options={options}
          onChange={(value) => {
            const skill = skills.find((s) => s.location.name === value)
            if (skill) onSelect(skill)
          }}
        />
      </Box>
      <Box marginTop={1}>
        <Text dimColor>↑/↓ navigate · Enter select · q to quit</Text>
      </Box>
    </Box>
  )
}

function formatLabel(skill: SkillRecord): string {
  const tag = skill.location.source === 'public' ? '[pub]' : '[priv]'
  const evals = skill.hasEvalsJson ? `${skill.evalsFile?.evals.length ?? 0} evals` : 'no evals'
  return `${skill.location.name.padEnd(36)} ${tag.padEnd(7)} ${evals}`
}
