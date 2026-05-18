import { z } from 'zod'

/**
 * Agent frontmatter schema — what a sub-agent loader reads. Modeled
 * on Claude Code's `.claude/agents/<name>.md` format since that's the
 * only provider with a documented sub-agent file shape today. Other
 * providers will extend or override these fields as they're added.
 */
export const AgentSchema = z
  .object({
    name: z.string().min(1).describe('kebab-case identifier; must match the agent file basename'),
    description: z
      .string()
      .min(1)
      .describe(
        'One paragraph describing when to spawn this agent — includes trigger phrases for the Task tool'
      ),
    tools: z
      .union([z.string(), z.array(z.string())])
      .optional()
      .describe(
        "Optional whitelist of tool names this agent may call. Comma-separated string or array depending on provider. Omit to inherit the parent agent's tool set"
      ),
    model: z
      .enum(['sonnet', 'opus', 'haiku', 'inherit'])
      .optional()
      .describe('Optional model selection: sonnet/opus/haiku/inherit (Claude Code)'),
  })
  .describe('Validated shape of the YAML frontmatter at the top of a sub-agent .md file')

/**
 * TypeScript shape of a parsed agent frontmatter block, inferred from
 * `AgentSchema` so the two cannot drift.
 */
export type AgentFrontmatter = z.infer<typeof AgentSchema>

/**
 * Matches the YAML frontmatter fence at the start of an agent .md
 * file, with capture group 1 being the YAML body. Same shape as
 * SKILL.md — kept separate so future format divergence doesn't
 * couple them.
 */
export const AGENT_FRONTMATTER_RE = /^---\n([\s\S]+?)\n---\n/
