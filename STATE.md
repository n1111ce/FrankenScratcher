# FrankenScratcher — Live Project State (`STATE.md`)

> **References**:
> - [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) — Rules, Elements Checklist Tree, Designer Mode (`hx`), Grading & Testing.
> - [`GAME_DESIGN.md`](./GAME_DESIGN.md) — *Booster Pack Heroes* 16-bit Pixel Style, Customizable 3-Machine Lab, Monster Pack Album, and Guided Tutorial.

---

## Current Status
- **Current Iteration**: `Iteration 3` (Pixel Lab Room with Single Machine Pre-Prestige & Prestige-Point Machine Unlocks, 3-Panel Visual Story Intro in Tutorial, 15 Standalone Pixel Houses, Natural Hand-Held Card Fan with Imperfect Variations, and True Randomized Monster Parts across 5 Sets)
- **Fresh Reviewer Grade**: `10.0 / 10` *(Self-Adjusted Conservative Grade: **`8.8 / 10` — Production Grade App**, ready for mobile user playtest)*
- **Last Fresh Reviewer ID**: [Iteration 3 Fresh Reviewer](conversation://49e52f70-f8a3-443c-b2e0-acbffde62b31)
- **Live Mobile URL**: https://n1111ce.github.io/FrankenScratcher/

---

## Fixed Review States Scoreboard (Iteration 3)
| Fixed State ID | Description | Status | Reviewer Score | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `STATE_0_BOOT` | Title Screen + 3-Panel Dr. Franken Story Intro (`#story-modal`) + Pre-Prestige Single-Machine Lab | Verified | `10.0 / 10` | Only `Monster Card Press` is visible on the central Lab pedestal when `prestigeCount === 0` |
| `STATE_1_FIRST_SCRATCH` | Pre-Prestige Lab Printing & Monster Pack Album (`📖🧟` 5 Sets: `Franken`, `Kraken`, `Pumpkin`, `Vampire`, `Skeleton`) | Verified | `10.0 / 10` | Guided `👆` Tutorial walks through printing & launching Night Raid |
| `STATE_2_MID_RAID` | 15 Standalone Pixel Houses (`0/15`) + Natural Hand-Held Card Fan (`--fan-rot`, `--fan-y`) + True Random Scratch Parts | Verified | `10.0 / 10` | Arched hand-held fan with slight random variations; tilted scratch spots reveal mixed `🧟`/`🐙`/`🎃` parts |
| `STATE_3_BOSS_ENC` | Central Sailor Boss House (`⚓😱👉🐙x3`) & Stitched Hybrid Monsters Popping Under Windows | Verified | `10.0 / 10` | Houses light up (`cottage_off` $\rightarrow$ `cottage_on`, `boss_off` $\rightarrow$ `boss_on`) when scared |
| `STATE_4_PRESTIGE_STRESS` | Villager Mob Raid (`🧑‍🌾🔥🔱`) + Post-Prestige Side Pedestal Machines Bought with `🔥` Prestige Points | Verified | `10.0 / 10` | After 1st Prestige, `Atmosphere Press` (`2🔥`) and `Spooky Prop Press` (`3🔥`) appear and unlock with `🔥` |

---

## Top 10 Biggest Problems / Defects Backlog (For Iteration 4+)
1. **[P1 - MEDIUM] Multi-Level / Biome Progression Map**: Add stage progression from *Suburban Kids' Cottages* $\rightarrow$ *Harbor Sailor Village* $\rightarrow$ *Gated Manors* $\rightarrow$ *High-Security Prison (Hardened Criminals)*.
2. **[P2 - MEDIUM] House Defense Varieties**: Expand `characters.house_defenses` with distinct pixel sprites (guard dogs, porch motion-lights, prison searchlights) that require specific Monster or Atmosphere counters.
3. **[P3 - LOW] Late-Game "Auto-Scratch All" Toggle**: Add a toggleable button in the card dock once `P2 (Auto-Laser)` is unlocked so players with `10+` cards can auto-scratch their whole hand.
4. **[P4 - LOW] Visual Weather Particles in Village**: Add falling pixel rain drops during `🌧️ Storm`, drifting pixel mist during `🌫️ Fog`, and a red tint during `🌕 Blood Moon`.
5. **[P5 - LOW] Boss House Dossier Intro Card**: Show a 1.5s visual Boss Preview card when entering a new Village level for the first time.
6. **[P6 - LOW] Designer Panel (`hx`) Mutual Exclusion with Dev Panel**: Opening `#designer-panel` should auto-hide `#dev-panel` and vice versa so floating panels never overlap on small screens.
7. **[P7 - LOW] Persistent Auto-Save on Every Action**: Automatically save state to `localStorage` whenever a Night ends or an upgrade is bought (in addition to manual Export/Import).
8. **[P8 - LOW] Custom Scrollbars on Pixel Modals**: Style `.scroll-list` and `.tech-grid` scrollbars with thin dark pixel tracks so they match the 16-bit aesthetic on desktop.
9. **[P9 - LOW] Audio Mute Shortcut on Top Bar**: Add a quick `🔊/🔇` toggle icon or sync directly with the Options modal.
10. **[P10 - LOW] Unique Sound Signatures per Monster Family**: Give `Kraken` a bubbly splash sound, `Pumpkin` a spooky cackle, and `Vampire` a bat flutter when popping out at a window.

---

## Iteration History Log
- **Iteration 0 (2026-11-15)**: Created [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) and [`STATE.md`](./STATE.md).
- **Iteration 0.5 (2026-11-15)**: Created [`GAME_DESIGN.md`](./GAME_DESIGN.md) with 3-example research comparisons, Lab Tech Tree, and Prestige Mob Raid.
- **Iteration 1 (2026-11-15)**: Initial playable build and GitHub Pages setup (`6.5 / 10` self-grade).
- **Iteration 2 (2026-11-15)**: Rebuilt in *Booster Pack Heroes* 16-bit pixel art style with Starting Title Screen, guided `👆` tutorial, Customizable 3-Machine Lab, Monster Pack Collection Album, and Dark-Green Pixel Village. Reviewed by [Iteration 2 Fresh Reviewer](conversation://8dc42153-e837-49d8-9924-638fd5fec6a3) (`8.2 / 10` self-grade).
- **Iteration 3 (2026-11-15)**: Added dedicated 16-bit gothic Pixel Lab room (`assets/pixel_lab_bg.jpg`) where only 1 machine (`Monster Card Press`) is visible before the 1st Prestige and side machines (`Atmosphere Press` `2🔥`, `Spooky Prop Press` `3🔥`) unlock after Prestige with `🔥` Prestige Points; added 3-panel Dr. Franken Story Intro inside Tutorial Mode; expanded Village to 15 standalone pixel houses; restyled cards into an arched, imperfectly aligned hand-held card fan with tilted scratch zones; and fixed monster part randomization so starter cards roll across `Franken`, `Kraken`, and `Pumpkin` parts from the very first scratch. Reviewed by [Iteration 3 Fresh Reviewer](conversation://49e52f70-f8a3-443c-b2e0-acbffde62b31) at `10.0 / 10` (`8.8 / 10` self-grade).
