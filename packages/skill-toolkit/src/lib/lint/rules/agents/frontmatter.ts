import { isEmpty, match, P } from 'massaman'

import type { AgentRecord } from '../../../agents/types.js'
import { buildFrontmatterFrame } from '../../../frontmatter/index.js'
import type { CheckFrame } from '../../rule.js'
import { defineRule, defineRuleset, fail, pass } from '../../rule.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

/**
 * Convenience for the most common pattern in this ruleset: render the
 * agent's frontmatter as a frame, optionally pointing at a specific
 * field. Returns `undefined` when no frontmatter is available — the
 * rule then emits a frameless finding.
 */
function frame(
  agent: AgentRecord,
  { field, message }: { field?: string; message: string }
): CheckFrame | undefined {
  if (agent.frontmatterRaw === null) return undefined
  return buildFrontmatterFrame({
    filePath: `${agent.location.name}.md`,
    raw: agent.frontmatterRaw,
    ...(field !== undefined && { field }),
    message,
  })
}

/**
 * Frontmatter rules for sub-agents (`.claude/agents/<name>.md`).
 * Parallel to the skill frontmatter ruleset but operates on
 * `AgentRecord` shape — file basename instead of directory basename,
 * tools/model fields instead of Claude Code skill extensions.
 *
 * Rule ids are unprefixed (`file-name`, `fm-parse-failed`, ...). The
 * ruleset's `scope: 'agent'` produces the public `@agent/<id>` form
 * for output and overrides.
 */
export default defineRuleset<AgentRecord>({
  name: 'frontmatter',
  scope: 'agent',
  rules: [
    defineRule<AgentRecord>({
      id: 'file-name',
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
      id: 'fm-parse-failed',
      severity: 'error',
      description: 'agent frontmatter must parse against the schema',
      check: (agent) =>
        match(agent.frontmatterParseError)
          .with(P.nullish, () => pass())
          .otherwise((err) => {
            const field = err.split(':')[0]?.trim() || undefined
            return fail({
              message: `frontmatter failed schema validation: ${err}`,
              ...(field !== undefined
                ? { frame: frame(agent, { field, message: err }) }
                : { frame: frame(agent, { message: err }) }),
            })
          }),
    }),
    defineRule<AgentRecord>({
      id: 'fm-missing-name',
      severity: 'error',
      description: 'agent frontmatter must include `name`',
      check: (agent) =>
        match(agent.frontmatter.name)
          .when(isEmpty, () =>
            fail({
              message: 'Frontmatter is missing `name`',
              frame: frame(agent, { message: 'add `name: <kebab-case-id>` here' }),
            })
          )
          .otherwise(() => pass()),
    }),
    defineRule<AgentRecord>({
      id: 'fm-name-mismatch',
      severity: 'error',
      description: 'agent frontmatter `name` must match the file basename',
      check: (agent) =>
        match(agent.frontmatter.name)
          .when(
            (name) => name === agent.location.name,
            () => pass()
          )
          .otherwise((name) =>
            fail({
              message: `name="${name}" does not match file "${agent.location.name}.md"`,
              fix: `Set frontmatter \`name: ${agent.location.name}\``,
              frame: frame(agent, {
                field: 'name',
                message: `should be "${agent.location.name}"`,
              }),
            })
          ),
    }),
    defineRule<AgentRecord>({
      id: 'fm-missing-description',
      severity: 'error',
      description: 'agent frontmatter must include `description`',
      check: (agent) =>
        match(agent.frontmatter.description)
          .when(isEmpty, () =>
            fail({
              message: 'Frontmatter is missing `description`',
              frame: frame(agent, { message: 'add `description: ...` here' }),
            })
          )
          .otherwise(() => pass()),
    }),
  ],
})
