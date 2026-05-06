# skills/

Each subdirectory is a single agent skill. The minimum required file is `SKILL.md` with frontmatter describing the skill. Skills are agent-agnostic — they target the [skills.sh](https://skills.sh) `SKILL.md` format and work with any agent that loads it.

```
skills/
├── my-skill/
│   ├── SKILL.md
│   ├── LICENSE        # optional — required if the skill is forked from a third party
│   └── ...            # any supporting templates, scripts, or assets
└── README.md          # ← this file
```

See the root [`README.md`](../README.md) for the `SKILL.md` format and the [skills.sh](https://skills.sh) spec for the full reference.
