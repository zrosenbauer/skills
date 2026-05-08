import { spawnSync } from 'node:child_process'

import { useApp, useInput } from 'ink'
import React, { useState } from 'react'
import { match } from 'ts-pattern'

import {
  type IterationSummary,
  type ScenarioSummary,
  type SkillRecord,
  readWorkspace,
} from '../lib/workspace.js'
import { parseEditorEnv } from './editor.js'
import { IterationList } from './IterationList.js'
import { ScenarioList } from './ScenarioList.js'
import { SkillList } from './SkillList.js'

interface AppProps {
  skills: SkillRecord[]
}

type View =
  | { kind: 'skills' }
  | { kind: 'iterations'; skill: SkillRecord; iterations: IterationSummary[] }
  | { kind: 'scenarios'; skill: SkillRecord; iteration: IterationSummary }

/**
 * Top-level TUI shell.
 *
 * Owns the navigation state machine (skills → iterations → scenarios) and
 * dispatches keystroke events. Children are pure-render components that
 * receive `onSelect` / `onBack` callbacks.
 *
 * @example
 * ```tsx
 * const { waitUntilExit } = render(<App skills={discoveredSkills} />)
 * await waitUntilExit()
 * ```
 */
export function App({ skills }: AppProps) {
  const { exit } = useApp()
  const [view, setView] = useState<View>({ kind: 'skills' })

  useInput((input, key) => {
    if (input === 'q') {
      exit()
      return
    }
    if (key.escape || (key.leftArrow && view.kind !== 'skills')) {
      goBack()
    }
  })

  function goBack(): void {
    match(view)
      .with({ kind: 'iterations' }, () => setView({ kind: 'skills' }))
      .with({ kind: 'scenarios' }, (v) =>
        setView({
          kind: 'iterations',
          skill: v.skill,
          iterations: readWorkspace(v.skill),
        })
      )
      .otherwise(() => {
        // already at the top of the stack
      })
  }

  return match(view)
    .with({ kind: 'skills' }, () => (
      <SkillList
        skills={skills}
        onSelect={(skill) =>
          setView({ kind: 'iterations', skill, iterations: readWorkspace(skill) })
        }
      />
    ))
    .with({ kind: 'iterations' }, (v) => (
      <IterationList
        skill={v.skill}
        iterations={v.iterations}
        onSelect={(iteration) => setView({ kind: 'scenarios', skill: v.skill, iteration })}
        onBack={() => setView({ kind: 'skills' })}
      />
    ))
    .with({ kind: 'scenarios' }, (v) => (
      <ScenarioList
        skill={v.skill}
        iteration={v.iteration}
        onSelect={(scenario, variant) => openInEditor({ scenario, variant })}
        onBack={() =>
          setView({
            kind: 'iterations',
            skill: v.skill,
            iterations: readWorkspace(v.skill),
          })
        }
      />
    ))
    .exhaustive()
}

interface OpenInEditorParams {
  scenario: ScenarioSummary
  variant: 'with_skill' | 'without_skill'
}

/**
 * Open the selected variant's transcript in the user's `$EDITOR`. Falls back
 * to `vi` when `EDITOR` is unset. Read-only browsing — we don't try to write
 * back from the editor.
 *
 * @private
 */
function openInEditor({ scenario, variant }: OpenInEditorParams): void {
  const variantSummary = match(variant)
    .with('with_skill', () => scenario.withSkill)
    .with('without_skill', () => scenario.withoutSkill)
    .exhaustive()
  if (!variantSummary?.transcriptPath) return
  const editorRaw = process.env.EDITOR ?? 'vi'
  const parsed = parseEditorEnv(editorRaw)
  if (!parsed) return
  const result = spawnSync(parsed.cmd, [...parsed.args, variantSummary.transcriptPath], {
    stdio: 'inherit',
  })
  if (result.error) {
    // process.stderr is more reliable than console here since Ink takes over stdout
    process.stderr.write(
      `\nopenInEditor: failed to spawn "${editorRaw}": ${result.error.message}\n`,
    )
  }
}
