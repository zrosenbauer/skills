# orca-doctor

Audits Orca worktree visibility and activity through a bundled read-only script.
Recovery uses Orca's native CLI after confirmation.

```text
/orca-doctor
/orca-doctor <repo-selector>
```

Requires Node 24+ and a running Orca runtime. No dependencies to install.

## Scripts

From this repository's root:

```bash
node skills/orca-doctor/scripts/doctor.mjs
node skills/orca-doctor/scripts/doctor.mjs "name:my-repo"
node skills/orca-doctor/scripts/orca.mjs skills get orca-cli
node --test 'skills/orca-doctor/scripts/*.test.mjs'
```

The bootstrap selects the correct Orca executable, reads repository settings,
protects the invoking checkout, and compares inventory with runtime activity.
It emits JSON and never mutates worktrees. Exit 1 means an incomplete audit or
runtime error; inspect the JSON before continuing.

Orca's listings do not expose dirty-tree or merge-safety checks. The report
does not label worktrees safe to delete or claim an independent Git orphan scan.
Native removal retains its own checks. Remote and missing paths are inspection-only.

## Quick Command

In Orca's **Settings → Quick Commands**, save an agent-prompt preset:

> Use the orca-doctor skill to audit this repository's worktrees. Explain the
> findings and ask before changing anything.

Install the skill for the selected agent before using this launcher. Keep the
procedure here so the GUI preset does not become a second copy to maintain.

See [`SKILL.md`](SKILL.md) for the workflow and
[`references/orca-cli.md`](references/orca-cli.md) for the verified API contract.

## License

MIT - see [LICENSE](LICENSE).
