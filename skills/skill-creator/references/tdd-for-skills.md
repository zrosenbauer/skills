# TDD for skills (RED → GREEN)

Borrowed from `zwbao/skill-creator-pro`. Front-load the verification: prove the skill is needed *before* writing it.

## Why

Skills exist to fix gaps in the agent's default behavior. If you can't articulate the gap, the skill probably isn't needed. If you can articulate it but can't reproduce it, you're guessing.

## RED phase

Define **3+ baseline scenarios** the skill should improve. For each:

1. **Verbatim user prompt** — what the user actually says, including casual/imperative tone
2. **Expected behavior with the skill** — one sentence describing the right outcome
3. **Actual behavior without the skill** — run the prompt mentally (or literally, in a fresh session) and capture failures verbatim

### Capture failures *verbatim*, not paraphrased

<bad>
Without the skill, the agent doesn't follow our error-handling pattern.
</bad>

<good>
Without the skill, agent writes:
```ts
function parseConfig(s: string) {
  const x = JSON.parse(s); // throws TypeError on bad input
  return x;
}
```
Should write:
```ts
function parseConfig(s: string): Result<Config, ParseError> {
  return attempt(() => JSON.parse(s)).mapErr(toParseError);
}
```
</good>

The verbatim form gives you a regression test. The paraphrase gives you nothing to test against.

## GREEN phase

After drafting the skill, re-run each RED scenario *as if* the skill were loaded. Each should pass cleanly. If any still fails:

- The skill body is missing instructions for that scenario
- Add them, re-lint, re-check

The acceptance bar: every RED scenario produces the expected behavior, no manual prompting needed beyond the original verbatim prompt.

## Where the scenarios live

Two options:

**Inline in SKILL.md** — for small skills (1–3 scenarios), put them in an `## Examples` section using `<example>` blocks.

**Companion file** — for larger skills, create `tests/baseline.md` with one section per scenario. Reference it from SKILL.md.

```
skills/my-skill/
├── SKILL.md
└── tests/
    └── baseline.md       # RED scenarios
```

## Iteration

Skills get worse if you let them. Re-run RED→GREEN whenever:

- You add a new behavior to the skill
- A real user trips on a case the skill didn't handle (add it to RED, re-iterate)
- You're about to publish or share the skill

This is cheap. A baseline.md with 5 scenarios takes 10 minutes to scan. Skipping it is how skills decay.
