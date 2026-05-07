import { Select } from '@inkjs/ui'
import { Box, Text } from 'ink'
import React from 'react'

import type { IterationSummary, SkillRecord } from '../lib/workspace.js'

interface IterationListProps {
  skill: SkillRecord
  iterations: IterationSummary[]
  onSelect: (iteration: IterationSummary) => void
  onBack: () => void
}

export function IterationList({
  skill,
  iterations,
  onSelect,
  onBack: _onBack,
}: IterationListProps) {
  if (iterations.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>
          <Text bold>{skill.location.name}</Text> › <Text dimColor>iterations</Text>
        </Text>
        <Box marginTop={1}>
          <Text color="yellow">No workspace iterations yet.</Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>Run /skill-eval {skill.location.name} to populate.</Text>
        </Box>
        <Box marginTop={1}>
          <Text dimColor>← Esc to go back · q to quit</Text>
        </Box>
      </Box>
    )
  }

  const options = iterations.map((iter) => ({
    label: formatLabel(iter),
    value: String(iter.iteration),
  }))

  return (
    <Box flexDirection="column" padding={1}>
      <Text>
        <Text bold>{skill.location.name}</Text> ›{' '}
        <Text dimColor>iterations ({iterations.length})</Text>
      </Text>
      <Box marginTop={1}>
        <Select
          options={options}
          onChange={(value) => {
            const iter = iterations.find((i) => i.iteration === parseInt(value, 10))
            if (iter) onSelect(iter)
          }}
        />
      </Box>
      <Box marginTop={1}>
        <Text dimColor>↑/↓ navigate · Enter select · ← Esc back · q quit</Text>
      </Box>
    </Box>
  )
}

function formatLabel(iter: IterationSummary): string {
  const date = iter.generatedAt ? iter.generatedAt.slice(0, 10) : '----------'
  const totals = iter.benchmark
    ? `${iter.benchmark.totals.with_skill_passed}/${iter.benchmark.totals.with_skill_total}`
    : 'no bench'
  return `iteration-${String(iter.iteration).padEnd(3)}  ${date}  ${totals.padEnd(9)} (with skill)`
}
