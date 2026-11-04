# OpenCode slash commands

Every skill in this collection has a matching OpenCode command. Commands load
the skill by ID and forward your arguments. They do not duplicate its
instructions or pin an agent/model.

In this checkout, commands and skill discovery are already configured:

```text
/code-reviewer staged changes
/svg-creator a banner for this project
/persona klingon intensity=3
```

## Install in other projects

Install the skills using the [README instructions](../README.md#install), then
run the helper from this checkout to install the wrappers globally:

```bash
node /path/to/skills/skill-scripts/opencode-commands.mjs --global
```

Run it from a project's root without `--global` for project-local commands.
Use `--source /path/to/installed/skills` to generate commands for a different
skill collection.

The helper needs only Node and preserves custom commands. It does not install
skills. Installing skills alone does not install these wrappers.

## Maintain the wrappers

From the repository root:

```bash
# Regenerate the committed wrappers
pnpm commands:opencode

# Detect drift without writing
pnpm commands:opencode --check
```

The commit hook regenerates and stages the wrappers automatically.
