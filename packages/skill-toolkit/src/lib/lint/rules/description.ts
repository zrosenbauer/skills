import { match } from 'massaman'

import { checkDescriptionForbids, checkDescriptionMatches, fail } from '../helpers.js'
import { defineRule, defineRuleset, pass } from '../rule.js'

const ANTI_SHORTCUT_RE = /\b(then|next|step\s+1|process|first)\b/i
const QUOTED_PHRASE_RE = /"[^"]+"/g

export const descriptionRules = defineRuleset({
  name: 'description',
  rules: [
    defineRule({
      id: 'desc-too-short',
      severity: 'warn',
      description: 'description should be at least 80 characters',
      check: ({ frontmatter }) =>
        match(frontmatter.description.length)
          .when(
            (len) => len >= 80,
            () => pass
          )
          .otherwise((len) =>
            fail({
              message: `description is ${len} chars (target ≥ 80)`,
              fix: 'Add trigger phrases or disambiguation context',
            })
          ),
    }),
    defineRule({
      id: 'desc-too-long',
      severity: 'warn',
      description: 'description should be at most 1024 characters',
      check: ({ frontmatter }) =>
        match(frontmatter.description.length)
          .when(
            (len) => len <= 1024,
            () => pass
          )
          .otherwise((len) => fail({ message: `description is ${len} chars (target ≤ 1024)` })),
    }),
    defineRule({
      id: 'desc-no-trigger',
      severity: 'warn',
      description: 'description should contain "Use when" or "should be used when"',
      check: checkDescriptionMatches({
        pattern: /use when|should be used when/i,
        message: 'description lacks "Use when" / "should be used when" anchor',
        fix: 'Lead with "This skill should be used when ..."',
      }),
    }),
    defineRule({
      id: 'desc-few-triggers',
      severity: 'warn',
      description: 'description should list ≥ 3 verbatim trigger phrases in quotes',
      check: ({ frontmatter }) =>
        match((frontmatter.description.match(QUOTED_PHRASE_RE) ?? []).length)
          .when(
            (count) => count >= 3,
            () => pass
          )
          .otherwise((count) =>
            fail({
              message: `description has ${count} quoted trigger phrases (target ≥ 3)`,
              fix: 'List verbatim user prompts in double quotes',
            })
          ),
    }),
    defineRule({
      id: 'desc-anti-shortcut',
      severity: 'error',
      description: 'description must not contain then/next/step 1/process/first',
      check: checkDescriptionForbids({
        pattern: ANTI_SHORTCUT_RE,
        message: (m) => `description contains anti-shortcut word "${m}"`,
        fix: 'Reword the description; procedural verbs cause the agent to follow it as instructions',
      }),
    }),
    defineRule({
      id: 'desc-no-skip',
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
