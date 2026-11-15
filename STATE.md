# FrankenScratcher — Live Project State (`STATE.md`)

> **References**:
> - [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) — Rules, Elements Checklist Tree, Designer Mode (`hx`), Grading & Testing.
> - [`GAME_DESIGN.md`](./GAME_DESIGN.md) — *Booster Pack Heroes* 16-bit Pixel Style, Customizable 3-Machine Lab, Monster Pack Album, and Guided Tutorial.

---

## Current Status
- **Current Iteration**: `Iteration 2` (*Booster Pack Heroes* 16-Bit Pixel Edition: Starting Title Screen, Step-by-Step Guided Tutorial, Customizable 3-Machine Lab with Atmosphere & Prop Printers, Unlockable Monster Pack Collection Album with Full-Pack Mastery, and Dark-Green Pixel Village Clearing with Standalone Pixel Houses)
- **Fresh Reviewer Grade**: `9.8 / 10` *(Self-Adjusted Conservative Grade: **`8.2 / 10` — Production Grade App**, ready for mobile user playtest & level progression planning)*
- **Last Fresh Reviewer ID**: [Iteration 2 Fresh Reviewer](conversation://8dc42153-e837-49d8-9924-638fd5fec6a3)
- **Live Mobile URL**: https://n1111ce.github.io/FrankenScratcher/

---

## Fixed Review States Scoreboard (Iteration 2)
| Fixed State ID | Description | Status | Reviewer Score | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `STATE_0_BOOT` | Title Screen (`Play + Tutorial`, `No Tutorial`, `Options`, `Credits`) + 3-Machine Lab | Verified | `10.0 / 10` | Guided `👆` Tutorial highlights `1. Tap +1 🃏!` $\rightarrow$ `2. Tap 🌙 RAID!` |
| `STATE_1_TECH_TREE` | Monster Pack Album (`📖🧟` `4/4 -> ⭐ FULL PACK +50%💥`) & Tech Tree | Verified | `10.0 / 10` | 3 Pixel Monster Sets (`Franken`, `Kraken`, `Pumpkin`) + `🔥` Prestige nodes |
| `STATE_2_NIGHT_FIRST_SCRATCH` | Pixel Village + Continuous Stroke 4-Zone Scratch Card | Verified | `9.5 / 10` | Smooth `lineTo` foil scratching & auto-tucking card dock |
| `STATE_3_MID_RAID_ACTION` | Dark-Green Pixel Clearing + Standalone Pixel Houses (`cottage_off` $\rightarrow$ `cottage_on`) + Weather | Verified | `10.0 / 10` | Pixel monsters pop under windows & wiggle hands by ears; Atmosphere `🌧️ Storm` active |
| `STATE_4_PRESTIGE_STRESS` | Villager Mob Raid (`🧑‍🌾🔥🔱`), Spooky Props (`🎃`), & Tap-to-Select Designer `hx` | Verified | `9.5 / 10` | 60 FPS, zero runtime errors, `Txt: OK` |

---

## Top 10 Biggest Problems / Defects Backlog (For Iteration 3+)
1. **[P1 - MEDIUM] Multi-Level / Biome Progression Map**: Once the user is happy with the look and basic functionality, add stage progression from *Suburban Kids' Cottages* $\rightarrow$ *Harbor Sailor Village* $\rightarrow$ *Gated Manors* $\rightarrow$ *High-Security Prison (Hardened Criminals)*.
2. **[P2 - MEDIUM] House Defense Varieties**: Expand `characters.house_defenses` with distinct pixel sprites (guard dogs, porch motion-lights, prison searchlights) that require specific Monster or Atmosphere counters.
3. **[P3 - LOW] More Unlockable Monster Sets**: Add 4th & 5th pixel monster sets (`🧛 Night Vampyr`, `💀 Cyber-Skeleton`) to the Monster Pack Album.
4. **[P4 - LOW] Late-Game "Auto-Scratch All" Toggle**: Add a toggleable button in the card dock once `P2 (Auto-Laser)` is unlocked so players with `10+` cards can auto-scratch their whole hand.
5. **[P5 - LOW] Designer Panel (`hx`) Mutual Exclusion with Dev Panel**: Opening `#designer-panel` should auto-hide `#dev-panel` and vice versa so floating panels never overlap on small screens.
6. **[P6 - LOW] Visual Weather Particles in Village**: Add falling pixel rain drops during `🌧️ Storm`, drifting pixel mist during `🌫️ Fog`, and a red tint during `🌕 Blood Moon`.
7. **[P7 - LOW] Boss House Dossier Intro Card**: Show a 1.5s visual Boss Preview card when entering a new Village level for the first time.
8. **[P8 - LOW] Persistent Auto-Save on Every Action**: Automatically save state to `localStorage` whenever a Night ends or an upgrade is bought (in addition to manual Export/Import).
9. **[P9 - LOW] Custom Scrollbars on Pixel Modals**: Style `.scroll-list` and `.tech-grid` scrollbars with thin dark pixel tracks so they match the 16-bit aesthetic on desktop.
10. **[P10 - LOW] Audio Mute Shortcut on Top Bar**: Add a quick `🔊/🔇` toggle icon or sync directly with the Options modal.

---

## Iteration History Log
- **Iteration 0 (2026-11-15)**: Created [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) and [`STATE.md`](./STATE.md).
- **Iteration 0.5 (2026-11-15)**: Created [`GAME_DESIGN.md`](./GAME_DESIGN.md) with 3-example research comparisons, Lab Tech Tree, and Prestige Mob Raid.
- **Iteration 1 (2026-11-15)**: Initial playable build and GitHub Pages setup (`6.5 / 10` self-grade).
- **Iteration 2 (2026-11-15)**: Rebuilt in *Booster Pack Heroes* 16-bit pixel art style with Starting Title Screen (`Tutorial`, `No Tutorial`, `Options`, `Credits`), guided `👆` tutorial, Customizable 3-Machine Lab (`Monster Press`, `Atmosphere Press`, `Spooky Prop Press`), Unlockable Monster Pack Collection Album (`4/4` Full-Pack Mastery bonus), and Dark-Green Pixel Village with standalone pixel houses (`cottage_off`/`cottage_on`, `boss_off`/`boss_on`). Reviewed by fresh subagent ([Iteration 2 Fresh Reviewer](conversation://8dc42153-e837-49d8-9924-638fd5fec6a3)) at `9.8 / 10` (`8.2 / 10` self-grade).
