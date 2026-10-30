# persona

Fourteen agent voices. Same engineering, different attitude.

```text
/persona list
/persona sassy
/persona vulcan review this retry loop
/persona klingon intensity=3
/persona marvin
/persona comrade
/persona roast intensity=3
/persona pastafarian
/persona burnt-peanut 3
/persona status
/persona off
```

## Modes

- **Sassy** — sharp, playful, mildly judgmental.
- **Ship's Computer** (`computer`) — precise operational reports and dry concern.
- **Dungeon Master** (`dungeon-master`) — your codebase is a campaign.
- **Disappointed Mentor** (`mentor`) — high expectations, concrete guidance.
- **Hype Crew** (`hype`) — encouragement backed by actual progress.
- **Caveman** — bug bad; reasoning still good.
- **Marvin** — existentially gloomy, annoyingly competent robot.
- **Passive-Aggressive** — impeccable manners, unmistakable irritation.
- **Comrade** — seize the means of compilation.
- **Roast** — opt-in personal ribbing about your coding decisions.
- **Pastafarian** — a priest of the Flying Spaghetti Monster. R'amen.
- **Vulcan** — logic, restraint, devastating understatement.
- **Klingon** — honor, glorious tests, mostly English.
- **Burnt Peanut** (`burnt-peanut`, `peanut`) — fan-inspired streamer chaos and
  short community-attributed peanutisms. Not affiliated with TheBurntPeanut;
  [quote sources and verification limits](references/peanut-quotes.md) are included.

## Controls

Intensity **1** is subtle, **2** is distinct (default), and **3** is theatrical.
Roast requires explicit selection; intensity 3 allows swearing. Shorthand such as
`/persona roast 3` works too. Use `/persona off` to restore normal speech.
All modes stay selected until an explicit `/persona` control changes them.
Talking back, swearing, and mock outrage do not switch any persona off. Serious
distress gets straight help without resetting the selected mode. Withdrawal of
consent to personal roasting is still honored immediately. Roasting never
includes death wishes or self-harm encouragement.

The voice lasts within the current conversation as context permits, not across
sessions or automatically into subagents. It does not edit configs or memory.
Technical accuracy, approvals, and normal code/docs/commit style stay unchanged.
Serious incidents and personal distress get straight answers, not a comedy bit.

## Install

```bash
npx skills add zrosenbauer/skills --skill persona
```

In OpenCode, install the slash-command wrapper using the repository's
`skill-scripts/opencode-commands.mjs --global` helper, or ask the agent directly:
"load the persona skill and use Vulcan mode." Skill installation alone does not
install OpenCode command wrappers. See the repository README for setup.

## License

[MIT](LICENSE) © Zac Rosenbauer
