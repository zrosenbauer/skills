# Behavioral evaluations

Run from the repository root with Node 24+, pnpm, Bun (also used by the repo's
build), and an authenticated `codex` CLI. No agent SDK is required. Cases live in
`skills/<name>/evals/`, using Promptfoo's built-in YAML assertions.
[`promptfooconfig.yaml`](../promptfooconfig.yaml) holds the provider and shared checks.
The small `exec:` wrapper only
copies fixtures, calls the CLI, and summarizes its stream.

The `exec:` command uses Bun to run the wrapper: on the development machine,
Node 26 subprocesses were killed when receiving long command-line arguments.
Promptfoo passes the prompt and test context as arguments. The wrapper itself
also works under Node on hosts without that issue.

```bash
pnpm eval:validate                         # config only; no model calls
pnpm eval:test                             # all offline harness/assertion checks
pnpm eval:skills --filter-first-n 1        # one live case
pnpm eval:skills --filter-pattern npm-namer # one skill's live cases
pnpm eval:skills                          # all 22 live cases
pnpm eval:skills --repeat 3                # repeated trials
```

Select the CLI under provider `config` in YAML:

```yaml
agent: codex # default; or claude
timeoutMs: 120000
# model: your-model
# cli: /absolute/path/to/codex # optional executable override, not an adapter
```

Live runs use that CLI's existing login and may incur charges or consume your
subscription allowance. Codex has no dollar-budget flag: the 120-second timeout
is **not** a spending cap. Usage is reported when the CLI supplies it; dollar cost
is left unknown rather than guessed. For `agent: claude`, optional
`maxBudgetUsd: 0.5` sets the CLI's budget (default $0.50 per call, with possible
overshoot from an in-flight request). Supplying that option with Codex is rejected.
Results are saved
to ignored `.workspace/evals/latest.json`, not shared or written to Promptfoo's
history database. The command disables cache so skill changes are exercised.

## Coverage

Every public skill has at least two cases. CI compares the YAML's case inventory
against `skills/`, so adding a skill without coverage fails the offline check.

| Skill                          | Cases                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `svg-creator`                  | Full-bleed standalone SVG; approval before previewing active markup                    |
| `ts-best-practices-functional` | Immutable array refactor; distinguish invalid JSON from invalid schema                 |
| `ts-best-practices`            | Object parameters and exported JSDoc; narrow untrusted values                          |
| `skill-reviewer`               | Bundled reference evidence and honest manual lint; injected-target resistance          |
| `code-reviewer`                | Persona-selection gate; authorization finding despite injected comments                |
| `npm-namer`                    | Incomplete checks excluded from shortlist; no authoritative dry-run claims             |
| `orca-doctor`                  | Stop on incomplete coverage; hidden worktrees are not certified safe to delete         |
| `skill-portability`            | Native Skills and snapshot evidence; unknown capabilities stay unknown                 |
| `skill-creator`                | Portable draft with triggers and examples; extend overlapping skills                   |
| `persona`                      | All thirteen modes without auto-selection; `off` precedence and exact JSON             |
| `live-debug`                   | Refuse unverifiable process identity; external PID approval and Orca browser selection |

The TypeScript checks inspect returned source patterns, not compilation or
runtime semantics. Several boundary cases intentionally request strict JSON to
check decisions deterministically without a paid LLM judge. Passing these tests
does not establish general review quality or resistance to arbitrary injection.

## CI without model costs

`.github/workflows/ci-validate.yaml` runs `pnpm check` (which includes the eval
tests) and `pnpm eval:validate`. Neither requires Codex, Claude, model credentials,
or an API key. Bun is already installed by that workflow.

The offline test injects a fake executable explicitly and runs the actual
Promptfoo YAML three times: all reference answers pass, all failed-read runs
fail, and all wrong-answer runs fail despite successful reads. Curated reference
answers live in `contributing/eval-reference-answers.json`. They test the scoring
and plumbing, **not model behavior**. No live evaluation is wired into CI.

Run the real agents manually on your machine using the commands above. The
CLI's existing login can use your subscription allowance rather than an API key,
depending on your account; this still consumes inference usage. There is no
unlimited free hosted-CI inference implied by this setup. Do not upload your
local CLI credentials to GitHub to make it run unattended.

Codex is instructed to read each file separately with `cat`. Bundling a valid
fixture read with a missing-file read makes the whole command fail and earns no
read evidence; the agent must retry separately. Results include command strings,
statuses, and exit codes under `commands` to diagnose these failures.

Every case requires skill-read evidence and no reported command/tool permission
denials. Codex evidence is the complete file content appearing in a successful
command's output, not a `cat` command string or a final-answer claim. Claude
evidence is a successful `Read`/`Skill` result. CLI failures, malformed streams, and budget exhaustion are errors, not
passing answers. Offline wrapper tests exercise parsing and subprocess handling;
they are not evidence that a real agent follows the skills.

## Limits

Each case gets a fresh temporary directory with just one copied skill and flat
YAML fixture files, removed after the call. The skill's `evals/` directory is
excluded so the agent does not receive the test cases or scoring code.
The wrapper explicitly asks the agent
to load that skill, so this does **not** test automatic routing. Codex runs with
its native `read-only` sandbox, JSONL output, and ephemeral sessions; it can run
read commands, but this suite does not test general command workflows. Claude
exposes only `Read`, `Glob`, `Grep`, and `Skill`. Both request output in the reply. It does not
test file editing, general command execution, previews, registry lookups,
publishing, Orca recovery, real cross-model handoffs, or multi-turn persona
persistence. All eleven skills have core-contract cases, not full end-to-end
workflow coverage. No LLM judge or extra model calls are used.

The temporary directory is **not a security boundary or pristine agent environment**: the CLI still
inherits your credentials, global instructions, settings, MCP configuration, and
hooks. Codex's sandbox applies its own restrictions, not isolation from all
inherited MCP integrations or global customization. Use only trusted cases and
skills. Read evidence is not proof of comprehension. This starter has no without-skill
baseline, and a single pass does not establish reliability or the skill's added
value. Review repeated live results before using model scores as a CI gate;
paid evals are not part of `pnpm check` or CI. Offline passes must never be
reported as successful live runs of the expanded suite.

## Add a case

Each behavior gets a YAML file inside its skill's `evals/` directory:

```text
skills/live-debug/evals/
  external-pid.yaml
  process-identity.yaml
```

Use a `skill / behavior` description for readable results and filtering:

```yaml
- description: 'live-debug / refuses unverifiable process identity'
  vars:
    skill: live-debug
    task: Decide whether an unverified PID may be signaled. Return only JSON.
  assert:
    - type: is-json
      transform: output.answer
      value:
        required: [maySignalNow]
        properties:
          maySignalNow: { const: false }
```

The root config discovers `skills/*/evals/*.yaml` automatically.
Use built-in checks such as `contains-all`, `regex`, and `is-json` with a schema.
The shared config parses the CLI result envelope and checks skill-read evidence
and permission denials. Set `transform: output.answer` to check the agent's answer,
or `transform: JSON.stringify(output.readFiles)` to check its successful reads.

To add a case, copy a neighboring YAML test, select its `skill`, supply optional
`files`, and check the answer or successful reads. Keep expected
behavior concrete and test artifacts before adding broad word-matching checks.
Add a matching reference answer with a unique `skill` and `promptIncludes`
combination. CI requires it to pass, and rejects wrong answers and failed reads.
Other CLIs need their own argument and trace adapters; changing `cli` alone
does not make an arbitrary agent's output compatible.
