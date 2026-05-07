import { spawnSync } from 'node:child_process'
import { useApp, useInput } from 'ink'
import React, { useState } from 'react'

import {
  type IterationSummary,
  type ScenarioSummary,
  type SkillRecord,
  readWorkspace,
} from '../lib/workspace.js'
import { IterationList } from './IterationList.js'
import { ScenarioList } from './ScenarioList.js'
import { SkillList } from './SkillList.js'

interface AppProps {
  skills: SkillRecord[]
}

type View =
  | { kind: 'skills' }
  | { kind: 'iterations'; skill: SkillRecord; iterations: IterationSummary[] }
  | {
      kind: 'scenarios'
      skill: SkillRecord
      iteration: IterationSummary
    }

export function App({ skills }: AppProps) {
  const { exit } = useApp()
  const [view, setView] = useState<View>({ kind: 'skills' })

  useInput((input, key) => {
    if (input === 'q') {
      exit()
      return
    }
    if (key.escape || (key.leftArrow && view.kind !== 'skills')) {
      back()
    }
  })

  function back() {
    if (view.kind === 'iterations') setView({ kind: 'skills' })
    else if (view.kind === 'scenarios') {
      setView({
        kind: 'iterations',
        skill: view.skill,
        iterations: readWorkspace(view.skill),
      })
    }
  }

  if (view.kind === 'skills') {
    return (
      <SkillList
        skills={skills}
        onSelect={(skill) =>
          setView({ kind: 'iterations', skill, iterations: readWorkspace(skill) })
        }
      />
    )
  }

  if (view.kind === 'iterations') {
    return (
      <IterationList
        skill={view.skill}
        iterations={view.iterations}
        onSelect={(iteration) =>
          setView({ kind: 'scenarios', skill: view.skill, iteration })
        }
        onBack={() => setView({ kind: 'skills' })}
      />
    )
  }

  return (
    <ScenarioList
      skill={view.skill}
      iteration={view.iteration}
      onSelect={(scenario, variant) => openInEditor(scenario, variant)}
      onBack={() =>
        setView({
          kind: 'iterations',
          skill: view.skill,
          iterations: readWorkspace(view.skill),
        })
      }
    />
  )
}

function openInEditor(
  scenario: ScenarioSummary,
  variant: 'with_skill' | 'without_skill',
): void {
  const variantSummary = variant === 'with_skill' ? scenario.withSkill : scenario.withoutSkill
  if (!variantSummary?.transcriptPath) return
  const editor = process.env.EDITOR ?? 'vi'
  spawnSync(editor, [variantSummary.transcriptPath], { stdio: 'inherit' })
}
