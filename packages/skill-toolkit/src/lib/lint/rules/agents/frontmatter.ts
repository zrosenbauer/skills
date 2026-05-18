import { isEmpty, match, P } from 'massaman'

import type { AgentRecord } from '../../../agents/types.js'
import { defineRule, defineRuleset, fail, pass } from '../../rule.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

/**
 * Frontmatter rules for sub-agents (`.claude/agents/<name>.md`).
 * Parallel to the skill frontmatter ruleset but operates on
 * `AgentRecord` shape — file basename instead of directory basename,
 * tools/model fields instead of Claude Code skill extensions.
 *
 * Rule ids prefix with `agent-` so they don't collide with skill rule
 * ids when both pools are listed together.
 */
export const agentFrontmatterRules = defineRuleset<AgentRecord>({
  name: 'agent-frontmatter',
  rules: [
    defineRule<AgentRecord>({
      id: 'agent-file-name',
      severity: 'error',
      description: 'Agent file basename must be kebab-case (^[a-z][a-z0-9-]+[a-z0-9]$)',
      check: ({ location }) =>
        match(location.name)
          .when(
            (n) => NAMING_RE.test(n),
            () => pass()
          )
          .otherwise((name) =>
            fail({
              message: `Agent file "${name}.md" is not kebab-case`,
              fix: 'Rename the file to match ^[a-z][a-z0-9-]+[a-z0-9]$',
            })
          ),
    }),
    defineRule<AgentRecord>({
      id: 'agent-fm-parse-failed',
      severity: 'error',
      description: 'agent frontmatter must parse against the schema',
      check: ({ frontmatterParseError }) =>
        match(frontmatterParseError)
          .with(P.nullish, () => pass())
          .otherwise((err) => fail({ message: `frontmatter failed schema validation: ${err}` })),
    }),
    defineRule<AgentRecord>({
      id: 'agent-fm-missing-name',
      severity: 'error',
      description: 'agent frontmatter must include `name`',
      check: ({ frontmatter }) =>
        match(frontmatter.name)
          .when(isEmpty, () => fail({ message: 'Frontmatter is missing `name`' }))
          .otherwise(() => pass()),
    }),
    defineRule<AgentRecord>({
      id: 'agent-fm-name-mismatch',
      severity: 'error',
      description: 'agent frontmatter `name` must match the file basename',
      check: ({ frontmatter, location }) =>
        match(frontmatter.name)
          .when(
            (name) => name === location.name,
            () => pass()
          )
          .otherwise((name) =>
            fail({
              message: `name="${name}" does not match file "${location.name}.md"`,
              fix: `Set frontmatter \`name: ${location.name}\``,
            })
          ),
    }),
    defineRule<AgentRecord>({
      id: 'agent-fm-missing-description',
      severity: 'error',
      description: 'agent frontmatter must include `description`',
      check: ({ frontmatter }) =>
        match(frontmatter.description)
          .when(isEmpty, () => fail({ message: 'Frontmatter is missing `description`' }))
          .otherwise(() => pass()),
    }),
  ],
})
