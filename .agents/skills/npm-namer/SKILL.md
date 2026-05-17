---
name: npm-namer
description: >-
  This skill should be used when the user wants to find an available npm
  package name, check whether one or more names are taken on the npm
  registry, brainstorm name ideas for a package, or pre-flight a name
  against the moniker (similar-name) collision rule before publishing.
  Common triggers include "find me an npm name for", "is <name> available
  on npm", "check if these package names are taken", "brainstorm a name
  for my package", "help me name this npm package", and "will <name> hit
  moniker collision". Bundles a Node script that permutes seeds,
  validates syntax (via the official validate-npm-package-name package),
  checks the registry in parallel, and reproduces npm's moniker
  normalization client-side. Skip when the user wants names for crates/gems/PyPI
  packages (npm only — the moniker rule and registry are npm-specific),
  or when they want to actually publish a package (use `npm publish`).

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[<seeds-or-names>]'
user-invocable: true
model-invocable: true
---

# npm-namer

Finds available npm package names. Bundles a Node script ([`scripts/npm-namer/dist/check.mjs`](scripts/npm-namer/dist/check.mjs)) that runs **four layers** of check:

1. **Syntactic validation** — thin wrapper over the official `validate-npm-package-name` package (uppercase, leading char, length, URL-safe, core-module shadow, etc.)
2. **Availability** — parallel HEAD requests to `registry.npmjs.org` for each candidate
3. **Moniker collision** — npm's publish-time rule (lowercase + strip `.-_`); catches `estoolkit` colliding with `es-toolkit`
4. **Near-match (typosquat) warning** — Damerau-Levenshtein distance against the top ~15,000 most-downloaded npm packages (TypoGard's published threshold, sourced from `nice-registry/download-counts`); catches `extoolkit` as suspiciously close to `es-toolkit` even though it would publish fine per the moniker rule

The full rule set the script encodes is in [`references/moniker-rules.md`](references/moniker-rules.md) — load that when the user asks _why_ a name fails.

## When to use

Verbatim trigger phrases:

- "find me an npm name for"
- "is `<name>` available on npm"
- "check if these package names are taken"
- "brainstorm a name for my package"
- "help me name this npm package"
- "will `<name>` hit moniker collision"
- "what npm names are available for"

## When NOT to use

- Naming for **other registries** (crates.io, RubyGems, PyPI, etc.) — the moniker rule is npm-specific. Tell the user we only do npm; future skills will cover other registries.
- **Actually publishing** a package → `npm publish` (or `npm publish --dry-run` for a server-side moniker confirmation).
- Renaming an **existing** package — npm doesn't support renames; the workflow is publish-new + deprecate-old, which this skill doesn't help with.
- General brand / domain name research — this skill is npm-registry-aware only.

## Inputs

`$ARGUMENTS` — one of:

- **Seeds + concept**: "i want a tiny logging lib. seeds: tinylog, microlog, jslog" → permute + check
- **Concept only**: "name a cli that queries bigquery in the terminal" → brainstorm seeds, then permute + check
- **Pre-checked list**: "are these taken? a, b, c, d" → batch check only, no brainstorming
- Empty → ask what kind of package needs naming

## Workflow

### 1. Classify the request

| Signal in the prompt                         | Mode                                                        |
| -------------------------------------------- | ----------------------------------------------------------- |
| User gave explicit seed words or candidates  | **find** (permute the given seeds)                          |
| User described a concept but listed no names | **brainstorm-then-find** (you generate seeds, then permute) |
| User listed names asking "which are taken?"  | **check** (batch check only, skip permutation)              |

If unclear, ask once with concrete options. Default to brainstorm-then-find when the user describes a package concept.

### 2. Brainstorm seeds (only in brainstorm-then-find mode)

Generate **10–20 candidate seed words** that capture the concept's essence. Mix:

- Direct nouns from the concept ("log", "bigquery", "query")
- Metaphors ("forge", "sage", "smith", "lens")
- Compact forms ("bq", "sql", "log")
- Verbs that describe what the tool does ("scout", "probe", "ping")

Print the seed list so the user can edit it before you run the script. Don't try to be the user's taste — give them range.

### 3. Run the script

The script lives at `skills/npm-namer/scripts/npm-namer/dist/check.mjs` in the skills authoring repo and at `.agents/skills/npm-namer/scripts/npm-namer/dist/check.mjs` in installed skills. Use whichever path resolves in the current project.

```bash
# find mode (permute seeds, check candidates)
node skills/npm-namer/scripts/npm-namer/dist/check.mjs <seed1> <seed2> ... --limit 50

# check mode (no permutation, just verdicts on given names)
node skills/npm-namer/scripts/npm-namer/dist/check.mjs --check <name1> <name2> ...

# from stdin or file
node skills/npm-namer/scripts/npm-namer/dist/check.mjs --stdin
node skills/npm-namer/scripts/npm-namer/dist/check.mjs --file ./candidates.txt
```

Pass `--limit` for how many candidates to check (default 50; raise for thorough searches). Use `--scope @user` to generate scoped variants. Use `--json` if you need machine-parseable output for downstream steps.

`--exhaustive` runs a slower 2-insertion moniker variant pass — turn it on when the user is about to publish and wants belt-and-suspenders coverage. `--no-near-match` disables the typosquat similarity warning if the user wants only the official npm rule. `--near-distance N` tunes the edit-distance threshold (default 2; 1 catches only the tightest typosquats, 3 widens to looser similarities).

### 4. Interpret the output

The script's text output has six status verdicts plus an optional near-match annotation:

| Verdict        | Meaning                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `✓ available`  | Free on registry AND no moniker collision found. May still carry a `near:` warning.                                                                          |
| `⚠ moniker`    | Free literally but normalizes to an existing package — publish will be rejected. The line includes `collides with: ...`                                      |
| `⚠ unverified` | Free literally but moniker check incomplete — some variant probes failed (rate limit / network). Do NOT treat as safe; rerun or use `npm publish --dry-run`. |
| `✗ taken`      | A package with that exact name is already published                                                                                                          |
| `✗ invalid`    | Fails syntactic rules (e.g., uppercase, leading dot, length > 214)                                                                                           |
| `? unknown`    | Registry returned non-200/404 for the literal name (rate limit, network) — surface to user                                                                   |

**Near-match annotation** appears alongside `✓ available` when the candidate is within 2 edits of a popular npm package. Format: `near: <pkg> (d=<distance>)`. This is publishable but typosquat-shaped — bring it to the user's attention.

Output groups results into three buckets at the bottom:

- **Available + moniker-clear + no typosquat shape** — safe picks.
- **Available but typosquat-shaped** — publishable but visually confusable with popular packages. Let the user decide.
- **Moniker check incomplete** — candidates with `unverified` status. Rerun or use `npm publish --dry-run` before publishing.

### Known limitation: 3+ morpheme moniker checks

The moniker check enumerates 1- and 2-separator variants. **3+ morpheme splits are not covered even with `--exhaustive`** — e.g., a candidate `eslintpluginreacthooks` would not surface `eslint-plugin-react-hooks` as a collision. The blog-rule normalization (`lowercase + strip [._-]`) catches this server-side, but client-side variant enumeration is combinatorially bounded. For multi-morpheme names (≥3 segments), recommend `npm publish --dry-run` against the live registry for authoritative pre-flight.

### 5. Present a shortlist

Don't just dump the script output. Pull the top 3–5 `available` candidates and present them ranked by:

1. Length (shorter wins)
2. Hyphenation (readable beats concatenated)
3. Containing a seed word (relevance to concept)

Quote the moniker collisions explicitly if any of the user's own suggestions were blocked — they'll want to know which existing package collides so they can decide if they care.

## Examples

<example>
<input>User: "i want to publish a logging lib thats tiny and fast. ideas: tinylog, microlog, jslog, picolog. find me something good and available"</input>
<output>
Mode: **find** (user gave seeds).

```bash
node skills/npm-namer/scripts/npm-namer/dist/check.mjs tinylog microlog jslog picolog --limit 50
```

Output (abbreviated):

```
seeds:    tinylog, microlog, jslog, picolog
considered: 287 candidates
checked:  50 candidates
moniker:  standard collision check
────────────────────────────────────────────────────────────────
✗ taken       tinylog
✗ taken       microlog
✗ taken       jslog
⚠ moniker     pico-log    collides with: picolog
✓ available   tinylog-forge
✓ available   pico-log-kit
✓ available   lean-microlog
...
```

Shortlist for the user:

1. `pico-log-kit` — tiny, descriptive, moniker-clear
2. `lean-microlog` — riffs on their existing taste
3. `tinylog-forge` — generative suffix; readable

All four of your originals are taken (`picolog` collides under the moniker rule too).
</output>
</example>

<example>
<input>User: "already brainstormed these: querysmith, bqterm, sqlsage, sqlforge — which are available?"</input>
<output>
Mode: **check** (user has a list, doesn't want brainstorming).

```bash
node skills/npm-namer/scripts/npm-namer/dist/check.mjs --check querysmith bqterm sqlsage sqlforge
```

Read the verdicts, present them inline. No permutation. If all four are taken, then offer to brainstorm alternates — but don't preempt.
</output>
</example>

<example>
<good>
The skill recognizes a concept-only prompt ("a cli that queries bigquery in the terminal"), brainstorms 12 seed words, prints them for the user to sanity-check, then runs the script and ranks the winners.
</good>

<bad>
The skill skips brainstorming and immediately asks the user "what seeds do you want?" — pushing work back onto the user when the concept is clear enough to seed from.
</bad>
</example>

## Script reference

The shipped CLI is a **single bundled file** (`check.mjs`) produced by `skill-scripts/npm-namer/`. The source uses installed npm packages (`validate-npm-package-name`, `damerau-levenshtein`) — tsdown bundles them into a self-contained file the consumer can run with zero install. **Never edit the bundled `check.mjs`** — edit `skill-scripts/npm-namer/src/` and run `pnpm --filter @zrosenbauer/skill-scripts-npm-namer build`.

- [`scripts/npm-namer/dist/check.mjs`](scripts/npm-namer/dist/check.mjs) — **bundled CLI** (auto-generated). Run with `--help`.
- [`scripts/npm-namer/popular-names.json`](scripts/npm-namer/popular-names.json) — top ~15,000 unscoped npm packages by monthly downloads, sourced from `nice-registry/download-counts`. Committed build artifact.
- [`scripts/npm-namer/refresh-popular-names.mjs`](scripts/npm-namer/refresh-popular-names.mjs) — regenerate `popular-names.json` from a fresh `download-counts` snapshot.

Source modules (at `skill-scripts/npm-namer/src/`):

- `check.mjs` — CLI entry (the build's input)
- `validate.mjs` — thin wrapper around `validate-npm-package-name`
- `moniker.mjs` — moniker normalization + variant enumeration
- `near-match.mjs` — Damerau-Levenshtein typosquat similarity (via `damerau-levenshtein`)
- `permute.mjs` — deterministic seed → candidate permutation engine
- `registry.mjs` — parallel HEAD requests to `registry.npmjs.org`

Build + test from source:

```bash
pnpm --filter @zrosenbauer/skill-scripts-npm-namer build      # tsdown → skill-scripts/npm-namer/dist/check.mjs
pnpm --filter @zrosenbauer/skill-scripts-npm-namer test       # node --test against unbundled source
pnpm skill-toolkit sync-scripts                          # vendor → skills/npm-namer/scripts/npm-namer/
```

## References

- [`references/moniker-rules.md`](references/moniker-rules.md) — authoritative rule set: syntactic rules with verbatim error strings, the moniker collision algorithm with source citations, scoped-package behavior, the near-match (typosquat) layer this skill adds on top, edge cases (security-holder packages, unpublish burn, legacy mixed-case names), and a survey of alternative tooling.
