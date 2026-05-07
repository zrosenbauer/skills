import { Select } from '@inkjs/ui'
import { Box, Text } from 'ink'
import React from 'react'

import type {
  IterationSummary,
  ScenarioSummary,
  SkillRecord,
  VariantSummary,
} from '../lib/workspace.js'

interface ScenarioListProps {
  skill: SkillRecord
  iteration: IterationSummary
  onSelect: (scenario: ScenarioSummary, variant: 'with_skill' | 'without_skill') => void
  onBack: () => void
}

interface RowOption {
  label: string
  value: string
  scenario: ScenarioSummary
  variant: 'with_skill' | 'without_skill'
}

export function ScenarioList({
  skill,
  iteration,
  onSelect,
  onBack: _onBack,
}: ScenarioListProps) {
  const rows: RowOption[] = []
  for (const scenario of iteration.evals) {
    if (scenario.withSkill?.hasTranscript) {
      rows.push({
        label: formatLabel(scenario, scenario.withSkill, 'with'),
        value: `${scenario.evalId}-with`,
        scenario,
        variant: 'with_skill',
      })
    }
    if (scenario.withoutSkill?.hasTranscript) {
      rows.push({
        label: formatLabel(scenario, scenario.withoutSkill, 'without'),
        value: `${scenario.evalId}-without`,
        scenario,
        variant: 'without_skill',
      })
    }
  }

  if (rows.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>
          <Text bold>{skill.location.name}</Text> ›{' '}
          <Text dimColor>iteration-{iteration.iteration}</Text>
        </Text>
        <Box marginTop={1}>
          <Text color="yellow">No transcripts in this iteration.</Text>
        </Box>
      </Box>
    )
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text>
        <Text bold>{skill.location.name}</Text> ›{' '}
        <Text dimColor>iteration-{iteration.iteration} › scenarios</Text>
      </Text>
      <Box marginTop={1}>
        <Select
          options={rows.map((r) => ({ label: r.label, value: r.value }))}
          onChange={(value) => {
            const row = rows.find((r) => r.value === value)
            if (row) onSelect(row.scenario, row.variant)
          }}
        />
      </Box>
      <Box marginTop={1}>
        <Text dimColor>Enter opens transcript in $EDITOR · ← Esc back · q quit</Text>
      </Box>
    </Box>
  )
}

function formatLabel(
  scenario: ScenarioSummary,
  variant: VariantSummary,
  label: 'with' | 'without',
): string {
  const grading = variant.grading
  const score = grading ? `${grading.passed_count}/${grading.total_count}` : '?/?'
  const glyph = grading
    ? grading.passed_count === grading.total_count
      ? '✓'
      : '✗'
    : '·'
  const variantTag = label === 'with' ? '[w/  skill]' : '[w/o skill]'
  return `${glyph} eval-${scenario.evalId}-${scenario.evalName.padEnd(28)} ${variantTag}  ${score}`
}
