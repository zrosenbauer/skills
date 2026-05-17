import { checkDescriptionForbids, checkDescriptionMatches, fail } from '../helpers.js'
import { defineRule, defineRuleset, pass } from '../rule.js'

const ANTI_SHORTCUT_RE = /\b(then|next|step\s+1|process|first)\b/i
const QUOTED_PHRASE_RE = /"[^"]+"/g

export const descriptionRules = defineRuleset({
  name: 'description',
  rules: [
    defineRule({
      id: 'DESC_TOO_SHORT',
      severity: 'warn',
      description: 'description should be at least 80 characters',
      check: ({ frontmatter }) =>
        frontmatter.description.length < 80
          ? fail({
              message: `description is ${frontmatter.description.length} chars (target ≥ 80)`,
              fix: 'Add trigger phrases or disambiguation context',
            })
          : pass,
    }),
    defineRule({
      id: 'DESC_TOO_LONG',
      severity: 'warn',
      description: 'description should be at most 1024 characters',
      check: ({ frontmatter }) =>
        frontmatter.description.length > 1024
          ? fail({
              message: `description is ${frontmatter.description.length} chars (target ≤ 1024)`,
            })
          : pass,
    }),
    defineRule({
      id: 'DESC_NO_TRIGGER',
      severity: 'warn',
      description: 'description should contain "Use when" or "should be used when"',
      check: checkDescriptionMatches({
        pattern: /use when|should be used when/i,
        message: 'description lacks "Use when" / "should be used when" anchor',
        fix: 'Lead with "This skill should be used when ..."',
      }),
    }),
    defineRule({
      id: 'DESC_FEW_TRIGGERS',
      severity: 'warn',
      description: 'description should list ≥ 3 verbatim trigger phrases in quotes',
      check: ({ frontmatter }) => {
        const matches = frontmatter.description.match(QUOTED_PHRASE_RE) ?? []
        return matches.length >= 3
          ? pass
          : fail({
              message: `description has ${matches.length} quoted trigger phrases (target ≥ 3)`,
              fix: 'List verbatim user prompts in double quotes',
            })
      },
    }),
    defineRule({
      id: 'DESC_ANTI_SHORTCUT',
      severity: 'error',
      description: 'description must not contain then/next/step 1/process/first',
      check: checkDescriptionForbids({
        pattern: ANTI_SHORTCUT_RE,
        message: (m) => `description contains anti-shortcut word "${m}"`,
        fix: 'Reword the description; procedural verbs cause the agent to follow it as instructions',
      }),
    }),
    defineRule({
      id: 'DESC_NO_SKIP',
      severity: 'info',
      description: 'description should include a "Skip when" clause',
      check: checkDescriptionMatches({
        pattern: /skip when|do not use when|avoid when/i,
        message: 'description lacks "Skip when" clause',
        fix: 'Add "Skip when [anti-trigger]" so the dispatcher knows what NOT to route',
      }),
    }),
  ],
})
