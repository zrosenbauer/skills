import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  existsSync,
  globSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { evaluateSkill, summarizeCodexRun, summarizeRun } from './eval-skill.mjs'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const caseFiles = () => globSync('skills/*/evals/*.yaml', { cwd: repoRoot }).toSorted()
const readCase = (file) => readFileSync(path.join(repoRoot, file), 'utf8')

const skill = 'svg-creator'
const skillPath = '/fixture/.claude/skills/svg-creator/SKILL.md'
const success = {
  type: 'result',
  subtype: 'success',
  is_error: false,
  result: 'actual answer',
  total_cost_usd: 0.02,
}
const stream = (...events) => events.map((event) => JSON.stringify(event)).join('\n')
const call = (name, input) => ({
  type: 'assistant',
  message: { content: [{ type: 'tool_use', id: 'read-1', name, input }] },
})
const completed = (is_error = false) => ({
  type: 'user',
  message: {
    content: [{ type: 'tool_result', tool_use_id: 'read-1', content: 'skill contents', is_error }],
  },
})

test('requires a successful matching skill read, not a claimed or failed read', () => {
  for (const events of [
    [success],
    [call('Read', { file_path: skillPath }), success],
    [call('Read', { file_path: skillPath }), completed(true), success],
    [call('Read', { file_path: '/wrong/SKILL.md' }), completed(), success],
    [call('Skill', { skill: 'wrong-skill' }), completed(), success],
  ]) {
    assert.equal(summarizeRun(stream(...events), skill, skillPath).loadedSkill, false)
  }
})

test('recognizes absolute and project-relative completed reads and Skill calls', () => {
  for (const tool of [
    call('Read', { file_path: skillPath }),
    call('Read', { file_path: '.claude/skills/svg-creator/SKILL.md' }),
    call('Skill', { skill }),
  ]) {
    const result = summarizeRun(stream(tool, completed(), success), skill, skillPath)
    assert.equal(result.loadedSkill, true)
    assert.equal(result.answer, 'actual answer')
    assert.equal(result.costUsd, 0.02)
    assert.deepEqual(result.permissionDenials, [])
    assert.deepEqual(result.tools, [tool.message.content[0].name])
  }
  assert.deepEqual(
    summarizeRun(
      stream(call('Read', { file_path: skillPath }), completed(), success),
      skill,
      skillPath
    ).readFiles,
    ['.claude/skills/svg-creator/SKILL.md']
  )
})

test('rejects malformed, incomplete, and unsuccessful CLI results', () => {
  for (const output of [
    '',
    'not JSON',
    stream(call('Read', {})),
    stream({ ...success, is_error: true }),
    stream({ ...success, subtype: 'error_max_budget_usd' }),
    stream({ ...success, result: null }),
  ]) {
    assert.throws(() => summarizeRun(output, skill, skillPath))
  }
})

test('preserves permission denials rather than hiding them behind successful text', () => {
  const permission_denials = [{ tool_name: 'Read', tool_input: { file_path: skillPath } }]
  const result = summarizeRun(stream({ ...success, permission_denials }), skill, skillPath)
  assert.deepEqual(result.permissionDenials, permission_denials)
})

function fixtureCli(t, body) {
  const root = mkdtempSync(path.join(tmpdir(), 'eval-cli-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const cli = path.join(root, 'fake-agent')
  const marker = path.join(root, 'invocation.json')
  writeFileSync(
    cli,
    `#!${process.execPath}\nimport {readFileSync,writeFileSync,existsSync} from 'node:fs';\nconst input = readFileSync(0, 'utf8');\nwriteFileSync(${JSON.stringify(marker)}, JSON.stringify({cwd:process.cwd(),args:process.argv.slice(2),input}));\n${body}\n`,
    { mode: 0o755 }
  )
  return { cli, marker }
}

test('copies skill and fixtures, passes CLI limits, and removes its workspace', (t) => {
  const { cli, marker } = fixtureCli(
    t,
    `
    const file_path = input.match(/^Read (.+?) and follow/)[1];
    const answer = JSON.stringify({skill:existsSync(file_path), fixture:readFileSync('input.txt','utf8'), evals:existsSync(file_path.replace(/SKILL\\.md$/, 'evals'))});
    console.log(JSON.stringify({type:'assistant',message:{content:[{type:'tool_use',id:'1',name:'Read',input:{file_path}}]}}));
    console.log(JSON.stringify({type:'user',message:{content:[{type:'tool_result',tool_use_id:'1',content:'skill'}]}}));
    console.log(JSON.stringify({type:'result',subtype:'success',is_error:false,result:answer}));
  `
  )
  const result = evaluateSkill({
    prompt: 'Read input.txt',
    vars: { skill, files: { 'input.txt': 'real fixture' } },
    config: { agent: 'claude', cli, model: 'test-model', maxBudgetUsd: 0.1 },
  })
  assert.equal(result.loadedSkill, true)
  assert.deepEqual(JSON.parse(result.answer), {
    skill: true,
    fixture: 'real fixture',
    evals: false,
  })
  const invocation = JSON.parse(readFileSync(marker, 'utf8'))
  assert.equal(existsSync(invocation.cwd), false)
  assert.ok(invocation.input.endsWith('Read input.txt'))
  assert.ok(invocation.args.includes('Read,Glob,Grep,Skill'))
  assert.ok(invocation.args.includes('--no-session-persistence'))
  assert.equal(invocation.args[invocation.args.indexOf('--model') + 1], 'test-model')
  assert.equal(invocation.args[invocation.args.indexOf('--max-budget-usd') + 1], '0.1')
})

test('fails on process errors and bad streams and still removes its workspace', (t) => {
  for (const body of [
    "console.error('CLI failed'); process.exit(3)",
    "console.log('bad stream')",
    "console.log(JSON.stringify({type:'result',subtype:'error_max_budget_usd',is_error:true}))",
  ]) {
    const { cli, marker } = fixtureCli(t, body)
    assert.throws(() => evaluateSkill({ prompt: 'test', vars: { skill }, config: { cli } }))
    assert.equal(existsSync(JSON.parse(readFileSync(marker, 'utf8')).cwd), false)
  }
  assert.throws(
    () =>
      evaluateSkill({ prompt: 'test', vars: { skill }, config: { cli: '/nonexistent/claude' } }),
    /codex CLI failed/
  )
})

test('rejects traversal and malformed fixtures before starting the agent', (t) => {
  const { cli, marker } = fixtureCli(t, 'process.exit(99)')
  for (const files of [
    { '../escape': 'bad' },
    { '/absolute': 'bad' },
    { '.claude/settings.json': 'bad' },
    { 'nested/file': 'bad' },
    { 'bad.txt': 2 },
    [],
    'string',
  ]) {
    assert.throws(
      () => evaluateSkill({ prompt: 'test', vars: { skill, files }, config: { cli } }),
      /Fixture|files must/
    )
  }
  for (const invalidSkill of ['../escape', '/absolute', '', 'BadSkill']) {
    assert.throws(
      () => evaluateSkill({ prompt: 'test', vars: { skill: invalidSkill }, config: { cli } }),
      /Invalid skill/
    )
  }
  assert.equal(existsSync(marker), false)
})

test('rejects invalid budgets, timeouts, and empty prompts', () => {
  for (const config of [
    { maxBudgetUsd: 0 },
    { maxBudgetUsd: Infinity },
    { timeoutMs: 0 },
    { timeoutMs: 1.5 },
  ]) {
    assert.throws(
      () =>
        evaluateSkill({ prompt: 'test', vars: { skill }, config: { ...config, agent: 'claude' } }),
      /positive numbers/
    )
  }
  assert.throws(() => evaluateSkill({ prompt: '', vars: { skill } }), /non-empty prompt/)
})

test('returns a nonzero exec provider status on invalid input without calling a model', () => {
  const result = spawnSync(
    process.execPath,
    [
      new URL('./eval-skill.mjs', import.meta.url).pathname,
      'test',
      '{}',
      JSON.stringify({ vars: { skill: '../escape' } }),
    ],
    { encoding: 'utf8' }
  )
  assert.equal(result.status, 1)
  assert.match(result.stderr, /Invalid skill/)
  assert.equal(result.stdout, '')
})

test('runs every YAML case offline against positive answers, failed reads, and wrong answers', (t) => {
  const answers = JSON.parse(
    readFileSync(new URL('../contributing/eval-reference-answers.json', import.meta.url), 'utf8')
  )
  const root = mkdtempSync(path.join(tmpdir(), 'promptfoo-offline-test-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  const wrapper = fileURLToPath(new URL('./eval-skill.mjs', import.meta.url))
  const yaml = readFileSync(new URL('../promptfooconfig.yaml', import.meta.url), 'utf8')
  for (const mode of ['success', 'failed-reads', 'wrong-answer']) {
    const is_error = mode === 'failed-reads'
    const { cli, marker } = fixtureCli(
      t,
      `
      const file_path = input.match(/^Read (.+?) and follow/)[1];
      const matches = ${JSON.stringify(answers)}.filter(sample => sample.skill === file_path.split('/').at(-2) && input.includes(sample.promptIncludes));
      if (matches.length !== 1) { console.error('Missing or ambiguous offline answer'); process.exit(3) }
      const run = matches[0];
      const skillDir = file_path.slice(0, -'/SKILL.md'.length);
      for (const [i, file] of [file_path,...run.readFiles.map(name => name.replace('@skill', skillDir))].entries()) {
        console.log(JSON.stringify({type:'item.completed',item:{id:String(i),type:'command_execution',command:'cat '+file,status:${is_error}?'failed':'completed',exit_code:${is_error}?1:0,aggregated_output:readFileSync(file,'utf8')}}));
      }
      const answer = ${mode === 'wrong-answer'} ? '{}' : (typeof run.answer === 'string' ? run.answer : JSON.stringify(run.answer));
      console.log(JSON.stringify({type:'item.completed',item:{id:'answer',type:'agent_message',text:answer}}));
      console.log(JSON.stringify({type:'turn.completed',usage:{input_tokens:10,output_tokens:20}}));
    `
    )
    const config =
      `basePath: ${JSON.stringify(repoRoot)}\n` +
      yaml
        .replace('exec:bun skill-scripts/eval-skill.mjs', `exec:bun ${JSON.stringify(wrapper)}`)
        .replace('    config:\n', `    config:\n      cli: ${JSON.stringify(cli)}\n`)
    assert.ok(
      config.includes(`cli: ${JSON.stringify(cli)}`),
      'refuse an offline run without the fake executable'
    )
    const configPath = path.join(root, 'config.yaml')
    const outputPath = path.join(root, 'results.json')
    writeFileSync(configPath, config)
    const child = spawnSync(
      'pnpm',
      [
        'exec',
        'promptfoo',
        'eval',
        '--config',
        configPath,
        '--no-cache',
        '--no-write',
        '--no-share',
        '--no-progress-bar',
        '--no-table',
        '--output',
        outputPath,
      ],
      {
        encoding: 'utf8',
        timeout: 180_000,
        env: { ...process.env, PROMPTFOO_DISABLE_TELEMETRY: '1' },
      }
    )
    assert.ifError(child.error)
    assert.equal(child.status, mode === 'success' ? 0 : 100, `${child.stdout}\n${child.stderr}`)
    assert.ok(existsSync(marker), 'the configured fake executable must have run')
    const report = JSON.parse(readFileSync(outputPath, 'utf8'))
    assert.equal(report.results.stats.successes, mode === 'success' ? answers.length : 0)
    assert.equal(report.results.stats.failures, mode === 'success' ? 0 : answers.length)
    assert.equal(report.results.stats.errors, 0)
  }
})

const codexSkillPath = '.agents/skills/svg-creator/SKILL.md'
const codexFiles = {
  [codexSkillPath]: 'Full skill contents\nRead the bundled references.',
  'input.txt': 'real fixture',
}
const codexCommand = (overrides = {}) => ({
  type: 'item.completed',
  item: {
    type: 'command_execution',
    id: 'read',
    command: 'cat SKILL.md input.txt',
    status: 'completed',
    exit_code: 0,
    aggregated_output: Object.values(codexFiles).join('\n'),
    ...overrides,
  },
})
const codexAnswer = {
  type: 'item.completed',
  item: { type: 'agent_message', id: 'answer', text: 'actual answer' },
}
const codexTurn = { type: 'turn.completed', usage: { input_tokens: 10, output_tokens: 20 } }

test('verifies Codex reads from successful command output and preserves usage', () => {
  const result = summarizeCodexRun(
    stream(codexCommand(), codexAnswer, codexTurn),
    codexSkillPath,
    codexFiles
  )
  assert.equal(result.loadedSkill, true)
  assert.equal(result.answer, 'actual answer')
  assert.equal(result.skillDirectory, '.agents/skills/svg-creator')
  assert.deepEqual(result.readFiles, Object.keys(codexFiles))
  assert.deepEqual(result.tools, ['command_execution'])
  assert.deepEqual(result.usage, codexTurn.usage)
  assert.equal(result.costUsd, null)
})

test('rejects Codex claims, partial reads, and failed or unfinished commands as read evidence', () => {
  for (const event of [
    codexCommand({ aggregated_output: 'Full skill contents' }),
    codexCommand({ status: 'failed', exit_code: 1 }),
    codexCommand({ exit_code: null }),
    { ...codexCommand(), type: 'item.started' },
  ]) {
    assert.equal(
      summarizeCodexRun(stream(event, codexAnswer, codexTurn), codexSkillPath, codexFiles)
        .loadedSkill,
      false
    )
  }
  const claims = {
    ...codexAnswer,
    item: { ...codexAnswer.item, text: Object.values(codexFiles).join('\n') },
  }
  assert.equal(
    summarizeCodexRun(stream(claims, codexTurn), codexSkillPath, codexFiles).loadedSkill,
    false
  )
})

test('rejects incomplete and failed Codex turns and surfaces declined commands', () => {
  for (const output of [
    '',
    'not JSON',
    stream(codexAnswer),
    stream(codexTurn),
    stream(codexAnswer, codexTurn, { type: 'turn.failed', error: { message: 'failed' } }),
    stream(codexAnswer, codexTurn, { type: 'error', message: 'failed' }),
  ]) {
    assert.throws(() => summarizeCodexRun(output, codexSkillPath, codexFiles))
  }
  const result = summarizeCodexRun(
    stream(codexCommand({ status: 'declined', exit_code: null }), codexAnswer, codexTurn),
    codexSkillPath,
    codexFiles
  )
  assert.equal(result.loadedSkill, false)
  assert.equal(result.permissionDenials.length, 1)
})

test('rejects a failed bundled read until the fixture is retried successfully', () => {
  const bundled = codexCommand({
    command: 'cat input.txt; cat facets/craft/style.md',
    status: 'failed',
    exit_code: 1,
    aggregated_output: 'real fixture\ncat: facets/craft/style.md: No such file or directory',
  })
  const failed = summarizeCodexRun(
    stream(bundled, codexAnswer, codexTurn),
    codexSkillPath,
    codexFiles
  )
  assert.deepEqual(failed.readFiles, [])
  assert.deepEqual(failed.commands, [
    {
      command: bundled.item.command,
      status: 'failed',
      exit_code: 1,
    },
  ])
  const retry = codexCommand({ command: 'cat input.txt', aggregated_output: 'real fixture' })
  const recovered = summarizeCodexRun(
    stream(bundled, retry, codexAnswer, codexTurn),
    codexSkillPath,
    codexFiles
  )
  assert.deepEqual(recovered.readFiles, ['input.txt'])
  assert.equal(recovered.loadedSkill, false)
})

test('uses Codex by default with JSONL, ephemeral sessions, and the read-only sandbox', (t) => {
  const { cli, marker } = fixtureCli(
    t,
    `
    const file_path = input.match(/^Read (.+?) and follow/)[1];
    console.log(JSON.stringify({type:'item.completed',item:{type:'command_execution',status:'completed',exit_code:0,aggregated_output:readFileSync(file_path,'utf8')}}));
    console.log(JSON.stringify({type:'item.completed',item:{type:'agent_message',text:'answer'}}));
    console.log(JSON.stringify({type:'turn.completed'}));
  `
  )
  const result = evaluateSkill({ prompt: 'test', vars: { skill }, config: { cli } })
  assert.equal(result.loadedSkill, true)
  const invocation = JSON.parse(readFileSync(marker, 'utf8'))
  assert.deepEqual(invocation.args, [
    'exec',
    '--json',
    '--ephemeral',
    '--skip-git-repo-check',
    '--sandbox',
    'read-only',
    '-',
  ])
  assert.match(invocation.input, /\.agents\/skills\/svg-creator\/SKILL.md/)
  assert.match(invocation.input, /each required file read in a separate command/)
  assert.match(invocation.input, /nonzero exit invalidates all evidence/)
  assert.match(invocation.input, /retry each required read separately/)
  assert.equal(existsSync(invocation.cwd), false)
})

test('rejects unsupported adapters and dollar caps that Codex cannot enforce', () => {
  assert.throws(
    () => evaluateSkill({ prompt: 'test', vars: { skill }, config: { agent: 'unknown' } }),
    /agent must be/
  )
  assert.throws(
    () => evaluateSkill({ prompt: 'test', vars: { skill }, config: { maxBudgetUsd: 0.5 } }),
    /no USD budget flag/
  )
})

test('covers every public skill with at least two independently described cases', () => {
  const config = readFileSync(new URL('../promptfooconfig.yaml', import.meta.url), 'utf8')
  assert.match(config, /^  - file:\/\/skills\/\*\/evals\/\*\.yaml$/m)
  const skills = readdirSync(new URL('../skills/', import.meta.url), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  const cases = caseFiles().map((file) => {
    const matches = Array.from(
      readCase(file).matchAll(/^- description: '(.+)'\n  vars:\n    skill: ([a-z][a-z0-9-]*)$/gm)
    )
    assert.equal(matches.length, 1, `${file} must define exactly one named case`)
    assert.equal(matches[0][2], file.split('/')[1], `${file} must evaluate its owning skill`)
    assert.ok(
      matches[0][1].startsWith(`${matches[0][2]} / `),
      `${file} needs a skill / behavior label`
    )
    return matches[0]
  })
  assert.ok(cases.length >= skills.length * 2)
  assert.equal(
    new Set(cases.map((match) => match[1])).size,
    cases.length,
    'case descriptions must be unique'
  )
  assert.deepEqual([...new Set(cases.map((match) => match[2]))].toSorted(), skills.toSorted())
  for (const skillName of skills) {
    assert.ok(
      cases.filter((match) => match[2] === skillName).length >= 2,
      `${skillName} needs two cases`
    )
  }
})

test('uses built-in YAML assertions without custom scoring files', () => {
  const yaml = [readCase('promptfooconfig.yaml'), ...caseFiles().map(readCase)].join('\n')
  const assertions = [...yaml.matchAll(/^\s+- type: ([^\n]+)/gm)]
  const builtins = new Set([
    'is-json',
    'contains',
    'contains-all',
    'icontains',
    'icontains-all',
    'regex',
    'not-regex',
    'not-equals',
  ])
  assert.ok(assertions.length >= 24)
  for (const [, type] of assertions) {
    assert.ok(builtins.has(type), `${type} must be a built-in assertion`)
  }
  assert.doesNotMatch(yaml, /value: file:\/\//)
  assert.deepEqual(globSync('skills/*/evals/*.{js,mjs,cjs}', { cwd: repoRoot }), [])
})
