# skill-toolkit — code review

Goal: simplify `packages/skill-toolkit/` and remove what isn't load-bearing. This file records the analysis and decisions. **No code changes yet** — captures only.

## Snapshot

- **Source LOC:** ~1880 non-test, ~2070 with tests, ~3954 with `.turbo/` logs included.
- **Runtime deps:** `@inkjs/ui`, `@kidd-cli/core`, `es-toolkit`, `ink`, `react`, `ts-pattern`, `zod`.
- **Commands:** 6 — `view`, `lint`, `sync-scripts`, `refresh-provider-docs`, `benchmark`, `eval`.
- **Lib modules:** `workspace.ts`, `schemas.ts`, `sync-scripts.ts`, `lint/` (5 files), `grading.ts`, `result.ts`.
- **TUI:** `App.tsx`, `SkillList.tsx`, `IterationList.tsx`, `ScenarioList.tsx`, `editor.ts`.

## Load-bearing entry points

These are wired into automation and can't be silently dropped without rewriting the callers:

| Entry                   | Caller                                         | Notes                                                                                              |
| ----------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `sync-scripts`          | Lefthook pre-commit (job 1)                    | Vendors `skill-scripts/<name>/` into each consuming skill                                          |
| `sync-scripts --check`  | Lefthook pre-commit (job 5)                    | Fails commit on vendored drift                                                                     |
| `lint --severity error` | Lefthook pre-commit (job 4)                    | Blocks bad skills from landing                                                                     |
| `lint`                  | `/skill-creator` step 6 (self-lint)            | Authoring loop                                                                                     |
| `eval`                  | `/skill-eval` step 4                           | Grades transcripts                                                                                 |
| `benchmark`             | `/skill-eval` step 5                           | Aggregates per-iteration grading                                                                   |
| `view`                  | `/skill-creator` step 3 + `/skill-eval` step 6 | Optional — both reference `pnpm skill-toolkit view`, but as a "suggest to user" call, not enforced |
| `refresh-provider-docs` | `skill-portability` skill docs                 | Manual cadence (quarterly per its own description)                                                 |

The Lefthook hooks are the hard constraint. Everything else is "skill workflows mention it" — losing it just means updating those docs.

---

## Concerns

Each concern: what it is → why it exists → cost → recommendation. Mark a box to decide.

### C1. The Ink/React TUI (`view` command + `tui/` directory)

- **What:** `pnpm skill-toolkit view [skill]` opens an Ink TUI that lists skills → iterations → scenarios, then shells out to `$EDITOR` on the selected transcript.
- **Files:** `commands/view.tsx` (26) + `tui/App.tsx` (133) + `tui/SkillList.tsx` (52) + `tui/IterationList.tsx` (72) + `tui/ScenarioList.tsx` (99) + `tui/editor.ts` (66) + tests. **~448 LOC.**
- **Deps it pulls in:** `react`, `ink`, `@inkjs/ui` — three runtime deps that exist only for this command.
- **Cost vs. value:** the TUI navigates filesystem trees (3 levels deep) and shells out. A shell function (`fd transcript.md skills/*/.workspace | fzf | xargs $EDITOR`) covers the same job in ~5 lines. The "score column" formatting in `ScenarioList` is the only non-trivial render — easy to reproduce as a `find` + `awk` one-liner.
- **Honest question:** when did you last open the TUI vs. just `cd`-ing into `.workspace/iteration-N/`?

**Recommendation: DELETE.**

- [ ] Delete `commands/view.tsx` + entire `tui/` dir
- [ ] Drop `react`, `ink`, `@inkjs/ui` from `dependencies`
- [ ] Drop `@types/react` from `devDependencies`
- [ ] Replace the docs references in `skill-creator` / `skill-eval` with the `fd | fzf | $EDITOR` one-liner
- [ ] (Optional) ship a 10-line `bin/view.mjs` if you still want `pnpm skill-toolkit view` as a command

**Saves: ~448 LOC + 3 runtime deps + the React build path through kidd.**

---

### C2. `refresh-provider-docs` command

- **What:** HTTP-fetches `docUrls` listed in `skills/skill-portability/scripts/providers.mjs`, strips HTML, writes a snapshot per provider into `skills/skill-portability/references/providers/<id>.md`.
- **File:** `commands/refresh-provider-docs.ts` (206 LOC).
- **Used by:** one skill (skill-portability), one cadence (quarterly), one invocation pattern (manual).
- **Cost vs. value:** this is a CLI-shaped script masquerading as a skill-toolkit command. It imports `findRepoRoot` from sync-scripts, but otherwise has zero dependency on the rest of skill-toolkit. The HTML-strip logic is bespoke regex chains.
- **Where it belongs:** alongside `providers.mjs` itself, since they share the schema. `skills/skill-portability/scripts/refresh.mjs` would be self-contained.

**Recommendation: MOVE OUT.**

- [ ] Move logic to `skills/skill-portability/scripts/refresh-providers.mjs` (standalone Node ESM)
- [ ] Delete `commands/refresh-provider-docs.ts`
- [ ] Update skill-portability docs to invoke `node skills/skill-portability/scripts/refresh-providers.mjs`
- [ ] Update CONTRIBUTING.md references

**Saves: 206 LOC from skill-toolkit.** (Code total unchanged, but skill-toolkit shrinks and the script lives with its config.)

---

### C3. `result.ts` — duplicate Result type

- **What:** bespoke `Result<T,E>` + `attempt` / `attemptAsync` helpers (75 LOC + 78 LOC tests = 153 LOC).
- **Why it exists:** mirrors the convention from `skills/functional-ts-best-practices` (per its own header comment).
- **Cost:** `massaman` already ships `Result`, `ok`, `err`, `attempt`, `attemptAsync`, `isOk`, `isErr` — and we already use it elsewhere in the repo (npm-namer). Maintaining two parallel implementations is drift waiting to happen.
- **Call sites in skill-toolkit:** `workspace.ts:93,102,221,255` (4 `attempt` calls).

**Recommendation: DELETE, import from `massaman` instead.**

- [ ] Add `massaman` to `packages/skill-toolkit/package.json` deps
- [ ] Replace `import { attempt } from './result.js'` with `import { attempt } from 'massaman'` in workspace.ts
- [ ] Delete `lib/result.ts` + `lib/result.test.ts`

**Saves: 153 LOC. Adds 1 dep (which is already in the lockfile for npm-namer).**

---

### C4. `schemas.ts` — zod for write-only data

- **What:** 7 zod schemas (185 LOC) for SKILL frontmatter, evals.json, scripts.json, grading.json, benchmark.json, timing.json.
- **Why it exists:** runtime validation on parse.
- **The honest split:**
  - **Load-bearing (validates external input):** `evalCaseSchema`, `evalsFileSchema`, `assertionSchema`, `scriptsManifestSchema`, `skillFrontmatterSchema`. These validate user-authored JSON / YAML.
  - **Ceremony (validates our own writes):** `gradingFileSchema`, `gradingResultSchema`, `benchmarkFileSchema`, `timingFileSchema`. These are parsed against output we ourselves produced moments earlier — the round-trip catches no real-world bug.
- **Cost:** zod stays (load-bearing for evals.json), but we'd shed ~80-100 LOC of write-side schemas and the `.parse()` calls in `benchmark.ts:155-161` and `eval.ts:70-78`.

**Recommendation: TRIM — keep input schemas, drop write-validation schemas.**

- [ ] Replace `gradingFileSchema` / `gradingResultSchema` / `benchmarkFileSchema` / `timingFileSchema` with plain TS interfaces
- [ ] Remove the `.parse()` round-trips on write paths in `benchmark.ts` and `eval.ts`
- [ ] Keep `evalCaseSchema`, `evalsFileSchema`, `assertionSchema`, `scriptsManifestSchema`, `skillFrontmatterSchema` (these guard user input)

**Saves: ~80 LOC.**

---

### C5. `workspace.ts` — bespoke YAML parser

- **What:** 278 LOC, mainly: skill discovery (read `skills/` + `.agents/skills/`), frontmatter extract, `.workspace/iteration-N/` reader.
- **The bespoke YAML:** `parseFrontmatter` + `extractScalar` + `extractFolded` + `parseYamlBool` + `escapeRegExp` (~75 LOC) hand-parses YAML 1.1 truthy-set + folded scalars. Only to pull out `name`, `description`, three Claude Code booleans, and optional `metadata.internal`.
- **Cost:** every time we touch a new frontmatter field, we touch the parser. And it doesn't actually handle all YAML edge cases (nested objects, lists, etc.) — it just handles the ones we use.
- **Alternative:** `yaml` (well-maintained, ~1MB) or `js-yaml` — `yaml.parse(fmText)` becomes a single line. Tradeoff: +1 dep, -75 LOC.
- **Other concerns in this file:**
  - `readWorkspace` / `readIteration` / `readVariant` (~90 LOC) only used by `view` (C1) and `benchmark` (C7). If C1 dies, this can move into benchmark.
  - `findRepoRoot` is re-exported through `sync-scripts.ts` — slightly weird; lives in workspace.ts but everyone imports from sync-scripts.

**Recommendation: SIMPLIFY (pending C1, C7 decisions).**

- [ ] Replace bespoke YAML with `yaml` dep (or keep bespoke; explicit decision)
- [ ] If C1 (view) deleted: move `readWorkspace`/`readIteration`/`readVariant` into `commands/benchmark.ts`
- [ ] Move `findRepoRoot` source out of workspace.ts into its own `lib/repo-root.ts` (3 lines), or to wherever it's most-used

**Saves: ~75-150 LOC depending on choices.**

---

### C6. `lint/` — 5 files, 600 LOC for 25 rules

- **What:** lint engine + 25 rules checking SKILL.md against the three-tier (error/warn/info) rule set.
- **Files:** `index.ts` (11), `linter.ts` (45), `types.ts` (32), `helpers.ts` (101), `rules.ts` (277) + `commands/lint.ts` (134) = ~600 LOC.
- **The ceremony:**
  - `helpers.ts` — five mini-checker factories (`checkFieldNonEmpty`, `checkFieldPresent`, `checkDescriptionMatches`, `checkDescriptionForbids`, `checkBodyMatches`). Each is used by 1-3 rules. Inlining each rule's logic is ~3-5 LOC; the factory abstraction barely saves anything.
  - `index.ts` re-exports 8 symbols from 3 files. Pure indirection.
  - `types.ts` defines `pass` as `null` and `CheckResult` as `{ ... } | null`. Then `helpers.ts:fail` builds the non-null branch. This pattern exists to avoid spreading optional `fix` under `exactOptionalPropertyTypes` — defensible but a lot of types.
  - `lintRules` re-export at `linter.ts:43` (rule metadata for external consumers) — **not used anywhere outside the package.**
  - `summarize` (linter.ts:27) — called once in `commands/lint.ts` to count severities. Could be a 4-line reduce in the command.
- **es-toolkit usage:** `groupBy` in commands/lint.ts:99 (1 call site, 3-line replacement). `isEmpty` in lint/helpers.ts:1 (1 call site, replaceable with `!val`).
- **The 25 rules themselves:** legitimate. They're what blocks the Lefthook hook from passing bad SKILL.md. Not a candidate for cuts.

**Recommendation: TRIM — keep the rules, drop the ceremony.**

- [ ] Collapse `lint/` into a single `lib/lint.ts` (~250 LOC: types at top, helpers inline, RULES array, lintSkill function)
- [ ] Delete unused `lintRules` re-export
- [ ] Inline `summarize` into the render loop in `commands/lint.ts`
- [ ] Replace `es-toolkit`'s `groupBy` + `isEmpty` with native code
- [ ] Drop `es-toolkit` from dependencies (no other usage)

**Saves: ~200 LOC + 1 runtime dep.**

---

### C7. `eval` / `benchmark` / `grading` triangle

- **What:** the eval grading pipeline.
  - `commands/eval.ts` (86) — runs assertions against one transcript, writes `grading.json`.
  - `commands/benchmark.ts` (198) — aggregates `grading.json` files across an iteration → `benchmark.json` + `benchmark.md`.
  - `lib/grading.ts` (81) — the three assertion runners (regex, contains, file_exists).
- **Honest question:** how often do you actually run `/skill-eval`? It's documented but I haven't seen evidence of regular runs in the repo. If you don't actively run evals, this whole path is aspirational infrastructure.
- **Two failure modes:**
  - **You run evals weekly** → keep all three, consider tightening (drop write-side schema validation per C4).
  - **You ran evals once during skill-creator and haven't since** → strong cut candidate. The TDD-for-skills pattern can survive without an automated grader (manual review of transcripts is what you'd do anyway).
- **If kept:** `grading.ts` is fine as-is. `benchmark.ts` has a slightly elaborate aggregate-with-missing-tracking shape that could fold to ~80 LOC if you drop `incomplete_evals` accounting.

**Recommendation: NEEDS YOUR ANSWER — do you run evals?**

- [ ] **KEEP** (you actively run `/skill-eval`): no changes here, address C4's write-schema trim
- [ ] **DELETE** (you don't run evals in practice): remove `eval` + `benchmark` commands, `lib/grading.ts`, the write-schemas in C4. Update `/skill-eval` skill to a manual review workflow or delete the skill entirely.

**Saves if deleted: ~365 LOC + a workflow you're not using.**

---

### C8. `sync-scripts.ts` — keep, but inspect

- **What:** the vendoring engine. Reads `skills/<x>/scripts.json` → walks `skill-scripts/<name>/` (or its `package.json` `files` allowlist) → copies into `skills/<x>/scripts/<name>/`, hash-compares for drift.
- **File:** `lib/sync-scripts.ts` (277 LOC).
- **Used by:** Lefthook pre-commit (two jobs). Truly load-bearing.
- **Internal structure that could be tighter:**
  - `manifestVendorablePaths` (39 LOC) + `listVendorableFiles` (17 LOC) + `isVendorable` (9 LOC) are three paths for "what files to copy." Could probably be one walker with a single policy function, but it's not on fire.
  - `syncAll` export at bottom (271-275) is unused — `commands/sync-scripts.ts` calls `planSync` + `applySync` directly.
  - Re-exporting `findRepoRoot` from this module (277) is the odd convention noted in C5.

**Recommendation: KEEP, minor cleanups optional.**

- [ ] Delete unused `syncAll` export
- [ ] Remove the `findRepoRoot` re-export (callers should import from wherever it actually lives)
- [ ] (Optional) collapse the two walkers into one if you want — minor

**Saves: ~20 LOC. Mostly hygiene.**

---

### C9. `ts-pattern` — keep or drop?

- **What:** used in `commands/lint.ts` (1 site), `lib/grading.ts` (1 site, exhaustive), `tui/App.tsx` (5 sites, exhaustive), `tui/editor.ts` (no), `tui/App.tsx` (5 sites).
- **Real value:** exhaustiveness checks on discriminated unions (`assertionSchema` cases in grading, view state machine in App).
- **If TUI dies (C1):** ts-pattern's only remaining exhaustive use is grading's 3-case assertion dispatch — a `switch` with `assertUnreachable` does the job.
- **If TUI stays:** keep ts-pattern.

**Recommendation: DEFER until C1 decision.**

- [ ] If C1 deletes TUI: replace ts-pattern's 2 remaining uses with `switch`, drop the dep
- [ ] If C1 keeps TUI: keep ts-pattern

---

### C11. Replace `es-toolkit` with `massaman`

- **What:** `es-toolkit` is used in 2 places only:
  - `commands/lint.ts:2` — `groupBy` (one call site)
  - `lib/lint/helpers.ts:1` — `isEmpty` (one call site)
- **Why swap:** `massaman` exports the same functions (verified — its export list includes `groupBy`, `isEmpty`, plus ~250 other FP utilities). Massaman is already coming into skill-toolkit via C3 (replacing `result.ts`), so this consolidates onto a single FP lib. Bonus: massaman is Zac's own library — dogfooding.
- **Swap is mechanical:**
  - `import { groupBy } from 'es-toolkit'` → `import { groupBy } from 'massaman'`
  - `import { isEmpty } from 'es-toolkit/compat'` → `import { isEmpty } from 'massaman'`
- **Cost:** none. Drop `es-toolkit` from `package.json`, deps.

**Recommendation: SWAP.** Pairs naturally with C3.

- [ ] Swap `groupBy` import in `commands/lint.ts`
- [ ] Swap `isEmpty` import in `lib/lint/helpers.ts`
- [ ] Drop `es-toolkit` from `dependencies`

**Saves: 0 LOC (it's an import swap), -1 runtime dep.**

---

### C10. `commands/lint.ts` ANSI color escape codes

- **What:** Bare `\x1b[31m` / `\x1b[0m` strings instead of a tiny color helper.
- **Files:** lint.ts, sync-scripts command, refresh-provider-docs all do this.
- **Cost vs. value:** none — this is fine. Not worth adding a `chalk` dep or extracting a helper.

**Recommendation: LEAVE.**

---

## Actual impact (post-execution)

| Commit    | What landed                                                                                                  |    LOC delta |
| --------- | ------------------------------------------------------------------------------------------------------------ | -----------: |
| `b6a1d80` | C1 + C2 + C3 + C5 + C8 + C9 + C11 — TUI, provider-docs, result, workspace.ts, ts-pattern, es-toolkit cleanup | -1439 / +636 |
| `ba1a991` | Refresh installed `.agents/skills/` after above                                                              |    -37 / +27 |
| `1c53746` | Feature-dir restructure (lint/, evals/, lib/) + schema split                                                 |  -181 / +177 |
| `b31f63c` | C7 — full evals concept wipe (incl. C4 schemas)                                                              |  -4044 / +71 |
| `75faaab` | Refresh installs + drop skill-eval from lock                                                                 |   -429 / +28 |

**Total: ~-5130 / +939 lines across skill-toolkit, skills, and root docs.**

**Runtime deps dropped:** `react`, `ink`, `@inkjs/ui`, `@types/react`, `es-toolkit`, `ts-pattern` (6 total).
**Runtime deps added:** `massaman`, `yaml` (2 total).
**Net dep change: -4.**

**skill-toolkit src/ LOC (non-test):** ~1880 → ~620.

**Skills deleted:** `skill-eval` (entire skill).
**Skill-tools commands deleted:** `view`, `refresh-provider-docs`, `eval`, `benchmark` (4 of 6).
**Skill-tools commands remaining:** `lint`, `sync-scripts` (2).

---

## Decision log

Use this section to record the actual decisions as we make them. Format: `decision — date — rationale`.

- **DELETE** C1 (TUI) — 2026-05-17 — confirmed unused; one-liner replacement is fine. **Landed: `b6a1d80`.**
- **DELETE** C2 (refresh-provider-docs) — 2026-05-17 — over-engineered for quarterly cadence; ad-hoc curl + paste when refresh is needed. Snapshots themselves stay (load-bearing for skill-portability). **Landed: `b6a1d80`.**
- **DELETE** C3 (result.ts) — 2026-05-17 — fully covered by massaman. **Landed: `b6a1d80`.**
- **DELETE** C4 (schemas trim) — 2026-05-17 — died with C7. Write-side eval schemas removed wholesale; `skillFrontmatterSchema` inlined into `lib/skills.ts`, `scriptsManifestSchema` inlined into `lib/sync-scripts.ts`. **Landed: `b31f63c`** (as part of evals wipe).
- **DELETE** C5 (workspace.ts as shared module) — 2026-05-17 — split into `lib/skills.ts` (60 LOC) + `lib/repo-root.ts` (10 LOC) + `lib/iterations.ts` (90 LOC, later deleted with C7). **Landed: `b6a1d80`.** 278 LOC → ~70 LOC.
- **DEFER** C6 (lint flatten) — 2026-05-17 — large change; the only remaining structural item. Now scoped: `src/lint/` is 5 files (helpers, index, linter, rules, types) totaling ~600 LOC; could collapse to ~250 LOC in one file. Lower priority now that the package is much smaller.
- **DELETE** C7 (eval/benchmark) — 2026-05-17 — full wipe of the evals concept. ~365 LOC of grading/benchmark/iterations + the `/skill-eval` skill + 15 `evals.json` files + 3 reference docs + 4 lint rules + heavy rewrites of skill-creator and skill-reviewer. Inspired by `zwbao/skill-creator-pro` but used exactly once; viteval is the right tool if real eval grading is ever needed. **Landed: `b31f63c`** (source) + `75faaab` (install refresh).
- **TRIM** C8 (sync-scripts hygiene) — 2026-05-17 — `syncAll` + `findManifests` dead exports removed; `findRepoRoot` re-export migrated. **Landed: `b6a1d80`.**
- **SWAP** C9 (ts-pattern → massaman) — 2026-05-17 — replaced direct `ts-pattern` import with `massaman` (which re-exports it). Direct dep dropped. **Landed: `b6a1d80`.**
- **LEAVE** C10 (ANSI colors) — 2026-05-17 — fine as-is, not worth a `chalk` dep or extracted helper.
- **SWAP** C11 (es-toolkit → massaman) — 2026-05-17 — `groupBy` + `isEmpty` swapped to massaman; direct `es-toolkit` dep dropped. **Landed: `b6a1d80`.**

---

## Architectural notes (capture for later)

### SKILL schema should split into `BaseSkill` + `ClaudeSkill`

The repo's stated philosophy (AGENTS.md): `name` + `description` are universally required across agents; everything else (`argument-hint`, `user-invocable`, `model-invocable`) is a Claude Code extension that other agents ignore. The current `skillFrontmatterSchema` mixes both tiers into one zod object with the Claude fields marked `.optional()`. That conflates "field is absent" with "field is irrelevant to this provider."

Proposed split:

```ts
// Universal — what every agent loader reads
export const baseSkillSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  metadata: z
    .object({
      internal: z.boolean().optional(),
      author: z.string().optional(),
      version: z.string().optional(),
      tags: z.string().optional(),
    })
    .optional(),
})

// Claude Code extension layered on top
export const claudeSkillSchema = baseSkillSchema.extend({
  'argument-hint': z.string().optional(),
  'user-invocable': z.boolean().optional(),
  'model-invocable': z.boolean().optional(),
})
```

Why this matters:

- Future provider schemas (Cursor `.mdc`, Codex AGENTS.md, etc.) layer onto `BaseSkill` without needing to know about each other's extensions.
- Lint rules can scope cleanly: universal rules check `BaseSkill`; Claude-specific rules check the extension fields only when the skill is published for Claude.
- Makes the "which fields are universal vs platform-specific" question grep-able instead of buried in comments.

Tie-in with `skill-portability`: that skill already maintains a provider matrix in `providers.mjs` (`requiredFrontmatter` / `ignoredFrontmatter` / `forbiddenFrontmatter`). The schema split should align with that matrix — ideally the same source of truth produces both the zod schemas and the portability matrix.

**Status: still a valid future direction.** C4 resolved (write-side eval schemas are gone; `skillFrontmatterSchema` lives in `lib/skills.ts`). The split now applies to a single, simpler schema: 6 fields, 3 universal + 3 Claude extensions. Worth doing if/when a second provider's frontmatter shape lands in the lint (e.g. if a Cursor-flavored lint rule is added). Not urgent today.

---

## Final state (2026-05-17)

**10 of 11 concerns resolved.** Only C6 (lint flatten) remains open — lower priority now that the codebase is much smaller.

### Final layout

```
packages/skill-toolkit/src/
├── commands/              # 2 thin CLI dispatch files (lint, sync-scripts)
├── lint/                  # rules + helpers + runner + tests (6 files, ~600 LOC)
├── lib/                   # skills, repo-root, sync-scripts (~270 LOC)
├── index.ts
└── kidd.config.ts
```

### Validation at last commit

- typecheck clean
- 21/21 vitest pass
- `pnpm skill-toolkit lint` — 0 error / 0 warn / 0 info across 13 skills
- `pnpm skill-toolkit sync-scripts --check` — 0 drift
- Zero textual references to `evals.json` / `/skill-eval` / `RED→GREEN` / `pressure-scenarios` / `tdd-for-skills` anywhere in source paths

### Skills before/after

Public skills: 9 → 8 (deleted: `skill-eval`).
Each surviving skill: just `SKILL.md` + `README.md` + `LICENSE` (+ optional `references/`, `scripts/`, `scripts.json`). No more `evals.json` requirement.

### What's open

- **C6 (lint flatten):** consolidate `src/lint/` (5 files, ~600 LOC) → single `src/lint.ts` (~250 LOC). Mechanical, well-scoped, but the package is now small enough that the savings are modest.
- **BaseSkill / ClaudeSkill schema split:** see Architectural notes above. Defer until a second provider's frontmatter needs lint coverage.

---

## Resolution summary

| #   | Decision | Landed in | Notes                                                                      |
| --- | -------- | --------- | -------------------------------------------------------------------------- |
| C1  | DELETE   | `b6a1d80` | TUI + react/ink/@inkjs/ui deps                                             |
| C2  | DELETE   | `b6a1d80` | refresh-provider-docs; snapshots stay (load-bearing for skill-portability) |
| C3  | DELETE   | `b6a1d80` | result.ts → massaman                                                       |
| C4  | DELETE   | `b31f63c` | schemas trim — died with C7                                                |
| C5  | DELETE   | `b6a1d80` | workspace.ts split into `lib/skills.ts` + `lib/repo-root.ts`               |
| C6  | OPEN     | —         | lint flatten — lower priority now                                          |
| C7  | DELETE   | `b31f63c` | eval/benchmark wholesale wipe                                              |
| C8  | TRIM     | `b6a1d80` | dead exports `syncAll`, `findManifests`                                    |
| C9  | SWAP     | `b6a1d80` | ts-pattern direct dep → massaman re-export                                 |
| C10 | LEAVE    | —         | ANSI colors inline — fine as-is                                            |
| C11 | SWAP     | `b6a1d80` | es-toolkit → massaman                                                      |

**10 of 11 resolved.** Only C6 (lint flatten) remains and is no longer urgent.
