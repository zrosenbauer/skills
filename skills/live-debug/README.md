# live-debug

Agent skill for running a dev server (or any long-running local process) and driving the live page in Chrome DevTools, without losing the process or killing the wrong thing.

The core is a zero-dependency Node process manager that tracks every process it starts and only ever kills those — fingerprinted by OS start-time so a recycled pid is never signalled by mistake, and never via a `lsof -ti:PORT | kill` port-blast.

## Triggers

The skill activates when the user wants to:

- run a dev server and check or debug something on the page
- open the app in Chrome and click around / screenshot it
- inspect console errors or network requests on a running site
- see what long-running processes are tracked
- restart or safely kill a dev server

See [`SKILL.md`](SKILL.md) for the verbatim trigger phrases.

## What ships

```
skills/live-debug/
├── SKILL.md              # the skill body
├── README.md             # this file
├── LICENSE               # MIT
└── scripts/
    └── procs.mjs         # BUNDLED CLI (self-contained, zero dependencies)
```

## The process manager

`node scripts/procs.mjs <command>`:

| Command                                | Does                                                           |
| -------------------------------------- | -------------------------------------------------------------- |
| `start <label> [--port N] -- <cmd...>` | Spawn detached + track (pid, group, port, start-time)          |
| `list`                                 | Tracked procs: alive?, resolved port, command                  |
| `logs <label> [-n N]`                  | Tail the captured log                                          |
| `stop <label> [--force]`               | SIGTERM→SIGKILL the group; refuses on start-time mismatch      |
| `stop-all` / `gc` / `info` / `adopt`   | Stop all · drop dead records · inspect · reclaim a foreign pid |

Registry + logs persist in `.scratchpad/procs/` (override with `PROCS_DIR`), so a fresh session can see and safely stop what a prior one left running.

## Safety model

- **pid→port, never port→pid.** Ports are resolved from the tracked process group for display only. The tool never scans a port to find something to kill.
- **Start-time reuse guard.** `stop` re-checks the pid's OS start-time; a recycled pid fails the check and `stop` refuses rather than kill a stranger.
- **No bare `&`.** Processes are spawned detached but tracked, so they never become untracked orphans.

## Browser half

Pairs with [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) for navigate / snapshot / click / fill / screenshot / console / network / performance-trace against the running server.
