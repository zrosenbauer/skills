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
  includeInstalled: z
    .boolean()
    .default(false)
    .describe(
      'Also count the installed .agents/skills/ mirrors. They duplicate the public source by definition, so they are hidden by default to avoid double-counting.'
    ),
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
      const skills = findSkills(repoRoot).filter(
        (s) => ctx.args.includeInstalled || s.location.source === 'public'
      )
      for (const skill of skills) {
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
        .with('pretty', () => renderTable(reports))
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

interface Totals {
  count: number
  descTokens: number
  bodyTokens: number
  totalTokens: number
}

function sumReports(reports: TokenReport[]): Totals {
  return reports.reduce<Totals>(
    (acc, r) => ({
      count: acc.count + 1,
      descTokens: acc.descTokens + r.descTokens,
      bodyTokens: acc.bodyTokens + r.bodyTokens,
      totalTokens: acc.totalTokens + r.totalTokens,
    }),
    { count: 0, descTokens: 0, bodyTokens: 0, totalTokens: 0 }
  )
}

/**
 * Machine-readable envelope for JSON / YAML output. Stable shape so
 * downstream pipelines don't care which format they read.
 */
function buildEnvelope(reports: TokenReport[]) {
  const totals = sumReports(reports)
  return {
    summary: {
      skills: reports.filter((r) => r.kind === 'skill').length,
      agents: reports.filter((r) => r.kind === 'agent').length,
      descTokens: totals.descTokens,
      bodyTokens: totals.bodyTokens,
      totalTokens: totals.totalTokens,
    },
    reports,
  }
}

// ── Pretty table renderer ────────────────────────────────────────

type Align = 'left' | 'right'
interface Column {
  label: string
  align: Align
  get: (row: Row) => string
}

interface Row {
  name: string
  kind: string
  source: string
  desc: string
  body: string
  total: string
  /**
   * When true, the row gets bold rendering (header / total row).
   */
  emphasized?: boolean
}

function renderTable(reports: TokenReport[]): string {
  const cols: Column[] = [
    { label: 'NAME', align: 'left', get: (r) => r.name },
    { label: 'KIND', align: 'left', get: (r) => r.kind },
    { label: 'SOURCE', align: 'left', get: (r) => r.source },
    { label: 'DESC', align: 'right', get: (r) => r.desc },
    { label: 'BODY', align: 'right', get: (r) => r.body },
    { label: 'TOTAL', align: 'right', get: (r) => r.total },
  ]

  const dataRows: Row[] = reports.map((r) => ({
    name: r.name,
    kind: r.kind,
    source: r.source,
    desc: formatNum(r.descTokens),
    body: formatNum(r.bodyTokens),
    total: formatNum(r.totalTokens),
  }))

  const totals = sumReports(reports)
  const skillCount = reports.filter((r) => r.kind === 'skill').length
  const agentCount = reports.filter((r) => r.kind === 'agent').length
  const countLabel = [
    skillCount > 0 ? `${skillCount} skill${skillCount === 1 ? '' : 's'}` : null,
    agentCount > 0 ? `${agentCount} agent${agentCount === 1 ? '' : 's'}` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const totalRow: Row = {
    name: 'TOTAL',
    kind: '',
    source: countLabel,
    desc: formatNum(totals.descTokens),
    body: formatNum(totals.bodyTokens),
    total: formatNum(totals.totalTokens),
    emphasized: true,
  }

  const widths = cols.map((c) =>
    Math.max(c.label.length, ...dataRows.map((r) => c.get(r).length), c.get(totalRow).length)
  )

  const renderRow = (row: Row): string => {
    const cells = cols.map((c, i) => {
      const w = widths[i] ?? 0
      const text = c.get(row)
      return c.align === 'right' ? text.padStart(w) : text.padEnd(w)
    })
    const joined = cells.join('  ')
    return row.emphasized ? `${BOLD}${joined}${RESET}` : joined
  }

  const headerRow: Row = {
    name: 'NAME',
    kind: 'KIND',
    source: 'SOURCE',
    desc: 'DESC',
    body: 'BODY',
    total: 'TOTAL',
    emphasized: true,
  }
  const sepRow: Row = {
    name: '─'.repeat(widths[0] ?? 0),
    kind: '─'.repeat(widths[1] ?? 0),
    source: '─'.repeat(widths[2] ?? 0),
    desc: '─'.repeat(widths[3] ?? 0),
    body: '─'.repeat(widths[4] ?? 0),
    total: '─'.repeat(widths[5] ?? 0),
  }

  const sepLine = `${DIM}${renderRow(sepRow)}${RESET}`

  return (
    [renderRow(headerRow), sepLine, ...dataRows.map(renderRow), sepLine, renderRow(totalRow)].join(
      '\n'
    ) + '\n'
  )
}

function formatNum(n: number): string {
  return n.toLocaleString('en-US')
}
