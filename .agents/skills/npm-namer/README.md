# npm-namer

Agent skill for finding available npm package names. Runs four layers against each candidate: syntactic validation (port of `validate-npm-package-name`), parallel registry availability checks, npm's moniker (similar-name) collision rule, and a Damerau-Levenshtein typosquat warning against the top ~15,000 most-downloaded packages.

The moniker check is the rule the registry enforces server-side at publish time but ships no CLI for — this skill pre-flights it locally.

## Triggers

The skill activates when the user wants to:

- find a free npm package name
- check whether one or more names are taken
- brainstorm names from a concept
- pre-flight a name against the moniker rule before `npm publish`
- catch a typosquat-shape clash with a popular package

See [`SKILL.md`](SKILL.md) for the verbatim trigger phrases.

## What ships

```
skills/npm-namer/
├── SKILL.md                              # the skill body
├── scripts.json                          # declares { "scripts": ["npm-namer"] }
├── README.md                             # this file
├── LICENSE                               # MIT
├── references/
│   └── moniker-rules.md                  # authoritative rule set + tooling survey
└── scripts/npm-namer/                    # VENDORED — synced from skill-scripts/npm-namer/
    ├── check.mjs                         # BUNDLED CLI (self-contained, no install needed)
    ├── popular-names.json                # top ~15K popular names corpus
    └── refresh-popular-names.mjs         # regenerate popular-names.json
```

**Authoring** lives at `skill-scripts/npm-namer/` — a workspace package with:

- `src/` — unbundled source + tests (uses `validate-npm-package-name` and `damerau-levenshtein` as deps)
- `dist/check.mjs` — bundled CLI produced by `tsdown` (committed)
- `popular-names.json` — top ~15K popular packages corpus
- `refresh-popular-names.mjs` — corpus-refresh helper
- `package.json` — declares deps + the `files` allowlist (`["dist", "popular-names.json", "refresh-popular-names.mjs"]`) that `skill-toolkit sync` honors

The shipped bundle is self-contained: the consumer runs `node dist/check.mjs` with zero install. Production dependencies are bundled in; only `popular-names.json` is loaded at runtime from a sibling path.

## Usage

```bash
# permute + check
node scripts/npm-namer/dist/check.mjs tiny log fast --limit 50

# batch check (no permutation)
node scripts/npm-namer/dist/check.mjs --check picolog microlog jslog

# verify it catches typosquat shapes
node scripts/npm-namer/dist/check.mjs --check extoolkit typescirpt

# JSON output for piping
node scripts/npm-namer/dist/check.mjs tiny log --json

# scoped variants (bypass the moniker rule)
node scripts/npm-namer/dist/check.mjs --scope @me logger fast

# disable layers individually
node scripts/npm-namer/dist/check.mjs --check foo --no-moniker --no-near-match
```

Run `node scripts/npm-namer/dist/check.mjs --help` for the full flag list.

## Refreshing the popular-names corpus

The corpus is a snapshot — refresh periodically as popular packages churn:

```bash
node skill-scripts/npm-namer/refresh-popular-names.mjs              # defaults to --top 15000
pnpm skill-toolkit sync                                       # re-vendor
git add skill-scripts/npm-namer/popular-names.json skills/npm-namer/scripts/npm-namer/popular-names.json
git commit -m "chore(npm-namer): refresh popular-names corpus"
```

Expect 30–90s for the install step (`download-counts` is a 95 MB tarball).

## Rebuilding the bundle

After editing any file under `skill-scripts/npm-namer/src/`:

```bash
pnpm --filter @zrosenbauer/npm-namer-build build
pnpm skill-toolkit sync
```

## Tests

```bash
pnpm --filter @zrosenbauer/npm-namer-build test
# or via the repo aggregator
pnpm test:scripts
```

62 unit tests covering syntax validation (via `validate-npm-package-name`), moniker normalization + variant enumeration (with regression coverage for the canonical `js-on-stream` ↔ `jsonstream` case and `FooBar` ↔ `foobar`), near-match (via `damerau-levenshtein`), permutation, scoring, and the concurrency pool. Registry tests use a stub `fetch` — no live network calls in CI.

## Why this exists

Every existing npm-naming tool covers exactly one slice — syntax, availability, moniker, or random generation. None composes all four into one pipeline, and none layers a typosquat-shape warning on top of the official moniker rule. See [`references/moniker-rules.md#alternative-tooling-considered`](references/moniker-rules.md#alternative-tooling-considered) for the full survey of ~19 alternatives and what each lacks.

## License

MIT — see [LICENSE](LICENSE).
