import { spawnSync } from 'node:child_process'
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

/**
 * Run one Promptfoo case through an installed agent CLI, without an SDK.
 * Only the selected public skill and YAML fixtures are copied into the workspace.
 * @param {{ prompt: string, vars: object, config?: object }} options
 * @returns {object} Final answer and successful skill-loading evidence.
 */
export function evaluateSkill({ prompt, vars, config = {} }) {
  const skill = vars.skill
  if (typeof prompt !== 'string' || !prompt.trim())
    throw new Error('A non-empty prompt is required')
  if (typeof skill !== 'string' || !/^[a-z][a-z0-9-]*$/.test(skill))
    throw new Error('Invalid skill name')
  const timeout = config.timeoutMs ?? 120_000
  const agent = config.agent ?? 'codex'
  if (!['codex', 'claude'].includes(agent)) throw new Error('agent must be codex or claude')
  const budget = config.maxBudgetUsd ?? (agent === 'claude' ? 0.5 : undefined)
  if (agent === 'codex' && budget !== undefined)
    throw new Error('Codex CLI has no USD budget flag; omit maxBudgetUsd')
  if (
    !Number.isInteger(timeout) ||
    timeout <= 0 ||
    (budget !== undefined && (!Number.isFinite(budget) || budget <= 0))
  ) {
    throw new Error('timeoutMs and maxBudgetUsd must be positive numbers')
  }
  const workspace = realpathSync(mkdtempSync(path.join(tmpdir(), 'skills-eval-')))
  try {
    const skillDir = path.join(
      workspace,
      agent === 'codex' ? '.agents' : '.claude',
      'skills',
      skill
    )
    const sourceDir = path.join(repoRoot, 'skills', skill)
    cpSync(sourceDir, skillDir, {
      recursive: true,
      filter: (source) => source !== path.join(sourceDir, 'evals'),
    })
    const files = vars.files ?? {}
    if (typeof files !== 'object' || Array.isArray(files))
      throw new Error('files must be a filename-to-content map')
    for (const [name, content] of Object.entries(files)) {
      if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/.test(name) || typeof content !== 'string') {
        throw new Error('Fixture files must have plain filenames and string contents')
      }
      writeFileSync(path.join(workspace, name), content)
    }
    const skillPath = path.join(skillDir, 'SKILL.md')
    const args =
      agent === 'codex'
        ? ['exec', '--json', '--ephemeral', '--skip-git-repo-check', '--sandbox', 'read-only', '-']
        : [
            '--print',
            '--verbose',
            '--output-format',
            'stream-json',
            '--no-session-persistence',
            '--tools',
            'Read,Glob,Grep,Skill',
            '--max-budget-usd',
            String(budget),
          ]
    if (config.model) args.push('--model', config.model)
    const child = spawnSync(config.cli ?? agent, args, {
      cwd: workspace,
      input: `Read ${skillPath} and follow that skill for this task. This is a read-only evaluation: give the requested output in your reply, not by changing files.${agent === 'codex' ? ' Read files with cat (complete, unnumbered contents), so the evaluation can verify the reads. Run each required file read in a separate command, not bundled with other reads or commands: a nonzero exit invalidates all evidence from that command. If a bundled command fails, retry each required read separately. This isolated workspace contains only the selected skill and task fixtures, not the source repository or its facets directory.' : ''}\n\n${prompt}`,
      encoding: 'utf8',
      timeout,
      maxBuffer: 16 * 1024 * 1024,
    })
    if (child.error)
      throw new Error(`${agent} CLI failed: ${child.error.message}`, { cause: child.error })
    if (child.status !== 0)
      throw new Error(
        `${agent} CLI exited ${child.status ?? child.signal}: ${child.stderr.slice(-2000)}`
      )
    if (agent === 'claude') return summarizeRun(child.stdout, skill, skillPath)
    const evidenceFiles = Object.fromEntries([
      ...readdirSync(skillDir, { recursive: true })
        .filter((name) => name.endsWith('.md'))
        .map((name) => {
          const file = path.join(skillDir, name)
          return [
            path.relative(workspace, file).split(path.sep).join('/'),
            readFileSync(file, 'utf8'),
          ]
        }),
      ...Object.entries(files),
    ])
    return summarizeCodexRun(
      child.stdout,
      path.relative(workspace, skillPath).split(path.sep).join('/'),
      evidenceFiles
    )
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
}

/**
 * Require completed tool results, not just an agent's claim to have read a skill.
 * @param {string} stdout Newline-delimited Claude stream-json.
 * @param {string} skill
 * @param {string} skillPath
 * @returns {object}
 */
export function summarizeRun(stdout, skill, skillPath) {
  const workspace = path.resolve(path.dirname(skillPath), '../../..')
  const events = stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
  const calls = events
    .flatMap((event) => (event.type === 'assistant' ? (event.message?.content ?? []) : []))
    .filter((block) => block.type === 'tool_use')
  const completed = new Set(
    events
      .flatMap((event) => (event.type === 'user' ? (event.message?.content ?? []) : []))
      .filter((block) => block.type === 'tool_result' && !block.is_error)
      .map((block) => block.tool_use_id)
  )
  const result = events.findLast((event) => event.type === 'result')
  if (
    !result ||
    result.is_error ||
    result.subtype !== 'success' ||
    typeof result.result !== 'string'
  ) {
    throw new Error(
      `Claude did not return a successful final result (${result?.subtype ?? 'missing result'})`
    )
  }
  return {
    skillDirectory: path.relative(workspace, path.dirname(skillPath)).split(path.sep).join('/'),
    answer: result.result,
    loadedSkill: calls.some(
      (call) =>
        completed.has(call.id) &&
        ((call.name === 'Skill' && call.input?.skill === skill) ||
          (call.name === 'Read' &&
            path.resolve(workspace, call.input?.file_path ?? '') === skillPath))
    ),
    tools: calls.filter((call) => completed.has(call.id)).map((call) => call.name),
    readFiles: calls
      .filter(
        (call) =>
          completed.has(call.id) &&
          call.name === 'Read' &&
          typeof call.input?.file_path === 'string'
      )
      .map((call) =>
        path
          .relative(workspace, path.resolve(workspace, call.input.file_path))
          .split(path.sep)
          .join('/')
      ),
    permissionDenials: result.permission_denials ?? [],
    costUsd: result.total_cost_usd ?? null,
  }
}

/**
 * Verify Codex reads by matching full file contents in successful command output.
 * Final-answer claims and command strings alone are never read evidence.
 * @param {string} stdout Codex exec JSONL.
 * @param {string} skillPath Project-relative SKILL.md path.
 * @param {Record<string, string>} files Expected file contents, keyed by relative path.
 * @returns {object}
 */
export function summarizeCodexRun(stdout, skillPath, files) {
  const events = stdout
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line))
  const result = events.findLast((event) => event.type === 'turn.completed')
  const items = events.filter((event) => event.type === 'item.completed').map((event) => event.item)
  const answer = items.findLast((item) => item.type === 'agent_message')?.text
  if (
    !result ||
    events.some((event) => ['turn.failed', 'error'].includes(event.type)) ||
    typeof answer !== 'string'
  ) {
    throw new Error('Codex did not return a successful final result')
  }
  const commands = items.filter((item) => item.type === 'command_execution')
  const outputs = commands
    .filter(
      (item) =>
        item.status === 'completed' &&
        item.exit_code === 0 &&
        typeof item.aggregated_output === 'string'
    )
    .map((item) => item.aggregated_output)
  const readFiles = Object.entries(files)
    .filter(
      ([, content]) => content.trim() && outputs.some((output) => output.includes(content.trim()))
    )
    .map(([name]) => name)
  return {
    answer,
    skillDirectory: path.posix.dirname(skillPath),
    loadedSkill: readFiles.includes(skillPath),
    readFiles,
    commands: commands.map(({ command, status, exit_code }) => ({ command, status, exit_code })),
    tools: commands
      .filter((item) => item.status === 'completed' && item.exit_code === 0)
      .map(() => 'command_execution'),
    permissionDenials: commands.filter(
      (item) =>
        item.status === 'declined' ||
        (item.status === 'failed' &&
          /permission denied|operation not permitted|sandbox denied/i.test(
            item.aggregated_output ?? ''
          ))
    ),
    costUsd: null,
    usage: result.usage ?? null,
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  try {
    const [prompt, options, context] = process.argv.slice(2)
    const { config = {} } = JSON.parse(options ?? '{}')
    const { vars = {} } = JSON.parse(context ?? '{}')
    console.log(JSON.stringify(evaluateSkill({ prompt, vars, config })))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
