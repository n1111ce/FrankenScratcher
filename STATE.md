# FrankenScratcher — Live Project State (`STATE.md`)

> **References**:
> - [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) — Rules, Elements Checklist Tree, Designer Mode (`hx`), Grading & Testing.
> - [`GAME_DESIGN.md`](./GAME_DESIGN.md) — 3-Example Research, Lab $\leftrightarrow$ Night Village Loop, Boss Phobias, Lab Tech Tree, and Portrait Auto-Tucking Card Hand.

---

## Current Status
- **Current Iteration**: `Iteration 1` (Portrait Full-Screen App, 4-State Auto-Tucking Card Hand, Code-Rigged Monster Puppets, Tech Tree, Prestige Mob Raid, Designer Mode `hx`, and Elements Checklist)
- **Fresh Reviewer Grade**: `9.2 / 10` *(Self-Adjusted Conservative Grade: **`6.5 / 10` — Playtest Applicable & Functional**, holding `8+` until Portrait Village house-window alignment and top backlog items are perfected)*
- **Last Fresh Reviewer ID**: [Iteration 1 Fresh Reviewer](conversation://975bee55-ec9a-4ce0-9693-a9d527b5ebd7)
- **Live Server**: Running at `http://localhost:8090` (accessible on Desktop & Mobile LAN)

---

## Fixed Review States Scoreboard (Iteration 1)
| Fixed State ID | Description | Status | Reviewer Score | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `STATE_0_BOOT` | Elements Checklist (`☑️`) + Lab View + Boss Phobia (`⚓🏠 😱 👉 🐙 x3`) | Verified | `9.5 / 10` | Clean icon-first UI, `Simple Only` & `All ON` checklist verified, `hx` slider log verified |
| `STATE_1_TECH_TREE` | Visual Icon Tech Tree & Expanded `🔥` Prestige Nodes | Verified | `9.0 / 10` | 8 base nodes + 4 `🔥` Prestige nodes working with max-3-word icon labels |
| `STATE_2_NIGHT_FIRST_SCRATCH` | Portrait Night Village + 4-Zone Silver Foil Scratch Card | Verified | `9.5 / 10` | `TUCKED` $\rightarrow$ `RAISED` $\rightarrow$ `FOCUSED_SCRATCH` flow works smoothly |
| `STATE_3_MID_RAID_ACTION` | Stitched Monsters popping from under bushes & wiggling + `Lights ON` | Verified | `9.5 / 10` | Kraken/Franken puppets pop up, wiggle hands by ears, turn windows yellow (`💡`) |
| `STATE_4_PRESTIGE_STRESS` | High `🔥` Torches, Villager Mob Raid (`🧑‍🌾🔥🔱`), Defenses & Designer `hx` | Verified | `9.0 / 10` | Solid ~60 FPS, zero runtime/NaN errors, `Txt: OK` |

---

## Top 10 Biggest Problems / Defects Backlog (For Iteration 2)
1. **[P1 - HIGH] Portrait Village Background Aspect Ratio & Window Alignment**: `village_night.jpg` was generated in landscape (`16:9`), so `background-size: cover` crops the outer cottages on a `9:16` portrait phone screen. Need a true `9:16` vertical portrait village & lab background (or fitted layout) so every `.house-node` window aligns 1:1 with a painted cottage window.
2. **[P2 - MEDIUM] Modal Cleanup on Fixed State Switch**: In Dev Tools (`🤖`), switching from `S1:Tech` to `S2:Scratch` should also auto-close `#designer-panel` unless switching to `S4`.
3. **[P3 - MEDIUM] Scratch Foil Continuous Stroke Interpolation**: Fast finger/mouse swipes across the 4 foil zones should draw a continuous `lineTo` stroke between pointer events (not just `arc` dots) so a single fast swipe clears foil effortlessly on mobile.
4. **[P4 - MEDIUM] Draggable / Collapsible Designer Mode (`hx`) & Click-to-Select on Stage**: Allow tapping any element directly on the screen while Designer Mode (`🛠️`) is open to select it in the dropdown and drag/reposition it easily.
5. **[P5 - MEDIUM] Touch Swipe-Up / Swipe-Down Gesture on Bottom Card Hand**: In addition to tapping `#card-hand-handle`, support vertical swipe-up to raise the cards and swipe-down to tuck them on mobile.
6. **[P6 - MEDIUM] End-of-Night Dawn Summary Toast (`6:00 AM`)**: Show a quick 1.5s visual icon summary (`🏠💡` count + `👻` earned) when the Night Timer reaches `0s` or all houses are lit before transitioning back to the Lab.
7. **[P7 - LOW] Chain Scare Visual Lightning Beam (`Tech D3`)**: Draw a brief visual shockwave/beam jumping from a newly lit house to neighboring dark houses when `Chain Scare` triggers.
8. **[P8 - LOW] Boss House Phobia Hit Feedback**: Flash the `🐙 x3` badge on the Central Boss House whenever a Kraken monster wiggles at its window so the min-max payoff is extra juicy.
9. **[P9 - LOW] Angry Villager Torch Warning Bar in Village**: Show a small visual meter or villager torch icon as quests complete so the player anticipates unlocking the Villager Mob Raid.
10. **[P10 - LOW] Empty Card Hand Visual State**: When all cards for the night are scratched (`🃏 0`), keep the bottom dock extra compact (`translateY(78%)`) so 95% of the village screen is clear while watching the monsters finish scaring the village.

---

## Iteration History Log
- **Iteration 0 (2026-11-15)**: Created [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) and [`STATE.md`](./STATE.md).
- **Iteration 0.5 (2026-11-15)**: Created [`GAME_DESIGN.md`](./GAME_DESIGN.md) with 3-example research comparisons, Lab Tech Tree, Prestige Mob Raid (`🧑‍🌾🔥🔱`), and Minimal Text rule.
- **Iteration 1 (2026-11-15)**: Built playable mobile-first web app (`index.html`, `styles.css`, `app.js`) with Gemini art (`assets/`), sliced 10 monster part PNG frames (`assets/parts/`), 4-state auto-tucking bottom card hand, code-animated monster puppets popping from under windows & wiggling hands near ears, Designer Mode (`hx`), Elements Checklist (`☑️`), and Playtester AI (`🤖`). Reviewed by fresh subagent ([Iteration 1 Fresh Reviewer](conversation://975bee55-ec9a-4ce0-9693-a9d527b5ebd7)).
