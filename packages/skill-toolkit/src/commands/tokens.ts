import { readFileSync } from 'node:fs'

import { command } from '@kidd-cli/core'
import { match } from 'massaman'
import { stringify as stringifyYaml } from 'yaml'
import { z } from 'zod'

import { type AgentRecord, findAgents } from '../lib/agents/index.js'
import { FRONTMATTER_RE } from '../lib/frontmatter/index.js'
import { findRepoRoot, findSkills, type SkillRecord } from '../lib/skills/index.js'

const options = z.object({
  target: z
    .enum(['skills', 'agents', 'all'])
    .default('all')
    .describe('What to count: skills, agents, or both (default).'),
  format: z
    .enum(['pretty', 'json', 'yaml'])
    .default('pretty')
    .describe('Output format: pretty (table), json, or yaml.'),
})

const positionals = z.object({
  name: z
    .string()
    .optional()
    .describe('Count tokens for one specific skill or agent by name; omit to count everything.'),
})

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const CYAN = '\x1b[36m'

interface TokenReport {
  kind: 'skill' | 'agent'
  name: string
  /**
   * `public` / `private` for skills, provider id for agents.
   */
  source: string
  descChars: number
  descTokens: number
  bodyChars: number
  bodyTokens: number
  totalTokens: number
}

export default command({
  options,
  positionals,
  description:
    'Count approximate tokens (chars/4) for the description and body of each skill and/or agent.',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const reports: TokenReport[] = []

    if (ctx.args.target !== 'agents') {
      for (const skill of findSkills(repoRoot)) {
        if (ctx.args.name && skill.location.name !== ctx.args.name) continue
        reports.push(buildSkillReport(skill))
      }
    }
    if (ctx.args.target !== 'skills') {
      for (const agent of findAgents(repoRoot)) {
        if (ctx.args.name && agent.location.name !== ctx.args.name) continue
        reports.push(buildAgentReport(agent))
      }
    }

    if (reports.length === 0) {
      const detail = ctx.args.name ? ` matching "${ctx.args.name}"` : ''
      const scope = ctx.args.target === 'all' ? 'skills or agents' : ctx.args.target
      ctx.log.error(`No ${scope} found${detail}`)
      process.exit(1)
    }

    process.stdout.write(
      match(ctx.args.format)
        .with('pretty', () => renderPretty(reports))
        .with('json', () => JSON.stringify(buildEnvelope(reports), null, 2) + '\n')
        .with('yaml', () => stringifyYaml(buildEnvelope(reports)))
        .exhaustive()
    )
  },
})

/**
 * Approximate token count. Common rough estimate: 1 token ≈ 4 chars.
 * Math.ceil so we err on the side of "more tokens" for budget
 * planning.
 */
function tokensOf(text: string): number {
  return Math.ceil(text.length / 4)
}

function buildSkillReport(skill: SkillRecord): TokenReport {
  const md = readFileSync(`${skill.location.dir}/SKILL.md`, 'utf8')
  const body = md.replace(FRONTMATTER_RE, '')
  const description = skill.frontmatter.description
  const descTokens = tokensOf(description)
  const bodyTokens = tokensOf(body)
  return {
    kind: 'skill',
    name: skill.location.name,
    source: skill.location.source,
    descChars: description.length,
    descTokens,
    bodyChars: body.length,
    bodyTokens,
    totalTokens: descTokens + bodyTokens,
  }
}

function buildAgentReport(agent: AgentRecord): TokenReport {
  const md = readFileSync(agent.location.file, 'utf8')
  const body = md.replace(FRONTMATTER_RE, '')
  const description = agent.frontmatter.description
  const descTokens = tokensOf(description)
  const bodyTokens = tokensOf(body)
  return {
    kind: 'agent',
    name: agent.location.name,
    source: agent.location.provider,
    descChars: description.length,
    descTokens,
    bodyChars: body.length,
    bodyTokens,
    totalTokens: descTokens + bodyTokens,
  }
}

/**
 * Machine-readable envelope for JSON / YAML output. Stable shape so
 * downstream pipelines don't care which format they read.
 */
function buildEnvelope(reports: TokenReport[]) {
  const summary = reports.reduce(
    (acc, r) => ({
      skills: acc.skills + (r.kind === 'skill' ? 1 : 0),
      agents: acc.agents + (r.kind === 'agent' ? 1 : 0),
      descTokens: acc.descTokens + r.descTokens,
      bodyTokens: acc.bodyTokens + r.bodyTokens,
      totalTokens: acc.totalTokens + r.totalTokens,
    }),
    { skills: 0, agents: 0, descTokens: 0, bodyTokens: 0, totalTokens: 0 }
  )
  return { summary, reports }
}

function renderPretty(reports: TokenReport[]): string {
  const lines = reports.map(renderRow)
  const env = buildEnvelope(reports)
  const summary = `\n${BOLD}Summary${RESET}: ${env.summary.skills} skills · ${env.summary.agents} agents · ${formatNum(env.summary.descTokens)} desc · ${formatNum(env.summary.bodyTokens)} body · ${formatNum(env.summary.totalTokens)} total tokens\n`
  return lines.join('\n') + '\n' + summary
}

function renderRow(r: TokenReport): string {
  const name = `${BOLD}${r.name}${RESET}`.padEnd(36 + BOLD.length + RESET.length)
  const tag =
    r.kind === 'skill'
      ? `${DIM}[${r.source}]${RESET}`.padEnd(14 + DIM.length + RESET.length)
      : `${DIM}[agent/${r.source}]${RESET}`.padEnd(14 + DIM.length + RESET.length)
  const desc = `${CYAN}${formatNum(r.descTokens).padStart(5)}${RESET}`
  const body = `${CYAN}${formatNum(r.bodyTokens).padStart(7)}${RESET}`
  const total = `${BOLD}${formatNum(r.totalTokens).padStart(7)}${RESET}`
  return `${name}  ${tag}  ${DIM}desc${RESET} ${desc}  ${DIM}body${RESET} ${body}  ${DIM}total${RESET} ${total}`
}

function formatNum(n: number): string {
  return n.toLocaleString('en-US')
}
