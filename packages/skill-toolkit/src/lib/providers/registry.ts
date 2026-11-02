import type { Provider } from './types.js'

/**
 * Canonical registry of agent-skill providers — the source of truth
 * for "where does <provider> store skills / agents, what frontmatter
 * does it require".
 *
 * Duplicated from `skills/skill-portability/scripts/providers.mjs`
 * because skill-portability ships its registry as a runtime artifact
 * inside the skill, and skill-toolkit lives in a different package.
 * Keep the two in sync when adding providers — the portability skill
 * authors the snapshots; the lint code consumes the discovery
 * metadata.
 *
 * The shape here is intentionally narrower than the portability
 * registry's — only fields the lint code needs (search paths,
 * required frontmatter). Add more as we wire more rules.
 */
export const PROVIDERS: Provider[] = [
  {
    id: 'claude-code',
    name: 'Claude Code (Anthropic)',
    skills: {
      supported: true,
      fileFormat: '<name>/SKILL.md',
      fileLocation:
        '.claude/skills/<name>/SKILL.md (project) or ~/.claude/skills/<name>/SKILL.md (personal)',
      searchPaths: ['skills', '.agents/skills'],
      requiredFrontmatter: [],
      optionalFrontmatter: [
        'argument-hint',
        'user-invocable',
        'disable-model-invocation',
        'allowed-tools',
        'name',
        'description',
        'metadata',
        'license',
        'compatibility',
        'paths',
      ],
    },
    agents: {
      supported: true,
      fileFormat: '<name>.md',
      fileLocation: '.claude/agents/<name>.md (project) or ~/.claude/agents/<name>.md (global)',
      searchPaths: ['.claude/agents'],
      requiredFrontmatter: ['name', 'description'],
      optionalFrontmatter: ['tools', 'model'],
    },
    notes:
      'Reference implementation. Sub-agents are single .md files with frontmatter, NOT directories. Frontmatter `name` must match the file basename (sans `.md`).',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    skills: {
      supported: true,
      fileFormat: '<name>/SKILL.md',
      fileLocation: '.cursor/skills/<name>/SKILL.md or .agents/skills/<name>/SKILL.md',
      searchPaths: ['.cursor/skills', '.agents/skills'],
      requiredFrontmatter: ['name', 'description'],
      optionalFrontmatter: [
        'paths',
        'globs',
        'disable-model-invocation',
        'icon',
        'color',
        'metadata',
      ],
    },
    agents: {
      supported: false,
    },
    notes:
      'Cursor Agent Skills support companion resources. Rules .mdc files are separate. Agent discovery is not implemented by this toolkit.',
  },
  {
    id: 'openai-codex-cli',
    name: 'OpenAI Codex CLI',
    skills: {
      supported: true,
      fileFormat: '<name>/SKILL.md',
      fileLocation:
        '.agents/skills/<name>/SKILL.md (repository) or ~/.agents/skills/<name>/SKILL.md (user)',
      searchPaths: ['.agents/skills'],
      requiredFrontmatter: ['name', 'description'],
      optionalFrontmatter: ['metadata'],
    },
    agents: {
      supported: false,
    },
    notes:
      'Codex natively loads SKILL.md; AGENTS.md is separate repository guidance. Optional agents/openai.yaml configures skill policy. Agent discovery is not implemented by this toolkit.',
  },
  {
    id: 'agents-skills-baseline',
    name: 'Agents-Skills Baseline (Gemini CLI / OpenCode / Pi)',
    skills: {
      supported: true,
      fileFormat: '<name>/SKILL.md',
      fileLocation:
        '.agents/skills/<name>/SKILL.md (project); per-agent global paths vary (~/.gemini/skills/, ~/.config/opencode/skills/, ~/.pi/agent/skills/)',
      searchPaths: ['.agents/skills'],
      requiredFrontmatter: ['name', 'description'],
      optionalFrontmatter: ['license', 'compatibility', 'metadata', 'allowed-tools'],
    },
    agents: {
      supported: false,
    },
    notes:
      'Baseline spec covers skills only. Agent discovery outside Claude Code is not implemented by this toolkit; supported=false is not a claim that the provider lacks agents.',
  },
]

/**
 * Look up a provider by its kebab-case id. Returns `undefined` when
 * no provider matches.
 */
export function getProvider({ id }: { id: string }): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id)
}

/**
 * Every provider whose `agents.supported` is true, in registration
 * order. Used by `findAgents()` to enumerate where to scan.
 */
export function listAgentProviders(): Provider[] {
  return PROVIDERS.filter((p) => p.agents.supported)
}

/**
 * Every provider whose `skills.supported` is true. Kept for symmetry
 * with `listAgentProviders` — current discovery code uses hard-coded
 * paths but may migrate to this later.
 */
export function listSkillProviders(): Provider[] {
  return PROVIDERS.filter((p) => p.skills.supported)
}
