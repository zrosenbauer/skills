---
name: live-debug
description: >-
  This skill should be used when the user wants to run a dev server (or any
  long-running local server or job) and drive or debug the live page in the
  browser via Chrome DevTools — starting, tracking, and safely stopping it
  while interacting with the running site. Common triggers include "run the
  dev server and check X", "start the app and open it", "debug this in
  devtools", "open it in chrome and click around", "take a screenshot of the
  page", "why is the console erroring", "what's running", "restart the
  server", and "kill the dev server". Bundles a zero-dependency Node job
  manager (scripts/procs.mjs) that only ever kills what it started —
  fingerprinted by OS start-time so a recycled pid is never signalled by
  mistake, and never via a `lsof -ti:PORT | kill` port-blast that nukes an
  unrelated job. Skip when the user only wants to run unit tests (use the
  test runner), a one-shot build (run the build directly), or production
  service supervision with auto-restart (use pm2 or systemd).

# --- Claude Code extensions (ignored by other agents) ---
argument-hint: '[start|list|stop|<what to debug>]'
user-invocable: true
model-invocable: true
---

# live-debug

Run a long-running dev process and drive the live page in Chrome without ever losing the process or killing the wrong thing. Two parts:

1. **`scripts/procs.mjs`** — a zero-dependency background-process manager. It tracks every process it starts (pid, process-group, command, port, OS start-time) and only ever kills those. It never maps a port back to a pid — so it can't blast an unrelated process that happens to hold the port.
2. **`chrome-devtools` MCP** — navigate, click, fill, screenshot, read console/network, and record performance traces against the running server.

## When to use

Verbatim trigger phrases:

- "run the dev server and check X"
- "start the app and open it"
- "debug this in devtools"
- "open it in chrome and click around"
- "take a screenshot of the page"
- "why is the console erroring"
- "what's running"
- "restart the server"
- "kill the dev server"

## Hard rules

- **Never** `lsof -ti:PORT | xargs kill`, `kill -9 $(lsof ...)`, `pkill -f node`, or any port/name-pattern blast. That is how the wrong process dies. Kill only through `procs stop <label>`.
- **Never** start a long-runner with a bare `&`. It detaches from tracking and becomes an orphan. Start it with `procs start`.
- One `<label>` per long-runner. Reuse the label — `procs start` refuses to double-start a live label.
- Many dev-server TUIs need a real TTY. If the process errors on raw-mode when detached, use its headless / non-interactive flag.

## The tool

Invoke from the project root (alias it if you like: `alias procs='node <skill-dir>/scripts/procs.mjs'`):

```bash
node scripts/procs.mjs <command>
```

| Command                                            | Does                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `start <label> [--port N] [--cwd DIR] -- <cmd...>` | Spawn detached + track it. Logs to `.scratchpad/procs/<label>.log`.                                           |
| `list`                                             | Table of tracked procs: alive?, resolved listening port, command.                                             |
| `logs <label> [-n N]`                              | Last N log lines (default 60). Or read the log file directly.                                                 |
| `info <label>`                                     | Full record + live-resolved ports.                                                                            |
| `stop <label> [--force]`                           | SIGTERM→SIGKILL the group. Refuses if the pid's start-time changed (reuse guard); `--force` overrides.        |
| `stop-all [--force]`                               | Stop every tracked proc.                                                                                      |
| `adopt <label> --pid N [--port M]`                 | Register an already-running pid (a found orphan, or a process started elsewhere) so it can be stopped safely. |
| `gc`                                               | Drop registry entries whose pid is already dead.                                                              |

Registry + logs live in `.scratchpad/procs/` under the cwd (override with `PROCS_DIR`). Records persist across turns and sessions — `procs list` in a fresh session shows what a prior session left running.

## Procedure

**1. Start the dev server (tracked).** Pass `--port` matching whatever the server binds so `list` can flag drift:

```bash
node scripts/procs.mjs start dev --port 3000 -- <your dev command>
```

**2. Wait for ready**, then confirm it's up and on the expected port:

```bash
node scripts/procs.mjs logs dev -n 40
node scripts/procs.mjs list
```

**3. Drive it in the browser** via `chrome-devtools` MCP tools against the server URL:

- `navigate_page` → the URL
- `take_snapshot` → structured a11y tree with element `uid`s (prefer over screenshots for locating elements)
- `click` / `fill` / `hover` / `press_key` → interact by `uid`
- `take_screenshot` → visual capture (per step; a screenshot sequence is the closest thing to a "recording")
- `list_console_messages` / `list_network_requests` → diagnose errors and failed requests
- `performance_start_trace` / `performance_stop_trace` → a real timeline recording for load/interaction perf

**4. Stop cleanly when done** — by label, never by port:

```bash
node scripts/procs.mjs stop dev
```

## Found an orphan (something already on the port)?

Don't blast it. Identify it, adopt it, then stop it under the guard:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN          # find the PID that owns the port (read-only)
node scripts/procs.mjs adopt dev --pid <PID> --port 3000
node scripts/procs.mjs stop dev
```

## Why the reuse guard matters

`stop` fingerprints each pid by its OS start-time (`ps -o lstart=`). If a pid gets recycled between `start` and `stop`, the fingerprint no longer matches and `stop` **refuses** rather than risk killing a stranger. That refusal is the whole point — investigate with `ps -p <pid> -o pid,lstart,command`, don't `--force` reflexively. Port resolution is scoped to the tracked process group (`lsof -g`), so it only ever reports what _our_ process listens on; it never scans a port to find a victim.

## Example

<example>
<input>User: "run the dev server and check if the pricing page still renders after my change"</input>
<output>
Start it tracked, confirm it's up, then drive it in Chrome:

```bash
node scripts/procs.mjs start dev --port 3000 -- npm run dev
node scripts/procs.mjs logs dev -n 30      # wait for the ready line
node scripts/procs.mjs list                # dev · up · 3000
```

Then via `chrome-devtools` MCP: `navigate_page` → `http://localhost:3000/pricing`, `take_snapshot` to read the DOM, `take_screenshot` for a visual, `list_console_messages` to catch errors. Report findings, then:

```bash
node scripts/procs.mjs stop dev            # by label — never by port
```

If `:3000` is already held by an orphan from a prior session, adopt and stop it first rather than blasting the port:

```bash
lsof -nP -iTCP:3000 -sTCP:LISTEN           # get the PID
node scripts/procs.mjs adopt dev --pid <PID> --port 3000
node scripts/procs.mjs stop dev
```

</output>
</example>

## References

- [`scripts/procs.mjs`](scripts/procs.mjs) — the process manager source (zero dependencies)
- [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) — the Chrome DevTools MCP server this skill drives
