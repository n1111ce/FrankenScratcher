# FrankenScratcher — Development Rules & Production Framework

> **Core Reference Files**:
> - [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) — Engineering, modular checklist, Designer Mode (`hx`), testing, and grading rules.
> - [`GAME_DESIGN.md`](./GAME_DESIGN.md) — Core gameplay loop (Lab $\leftrightarrow$ Night Village Raid), 3-example research comparisons, and Lab Tech Tree spec.
> - [`STATE.md`](./STATE.md) — Live iteration tracker, Fixed State scoreboard, and Top 10 Defects Backlog.

---

## 1. RESEARCH & UX PHILOSOPHY
- **3-Example Benchmark Rule**: Before implementing core systems, research at least **3 working games** (e.g., *Scratch Inc.*, *Booster Pack Heroes*, *Haunt the House*, *Ghost Master*, *Nodebuster*), compare them in [`GAME_DESIGN.md`](./GAME_DESIGN.md), and pick the best approach.
- **Minimal Text / Icon-First UX Rule**:
  - **NEVER overwhelm the player with walls of text.**
  - Everything on screen must be **immediately intuitive through visuals, icons, silhouettes, and animations** (at most **2–4 words** per label/node).
  - *Examples*:
    - **Sleeping vs. Scared House**: Dark windows + `Zzz` $\rightarrow$ Bright yellow lit windows + shaking roof + `😱`.
    - **Boss House Phobia**: Visual thought bubble (`⚓ 😱 👉 🐙 x3`) instead of a paragraph of text.
    - **4-Zone Scratch Card**: Anatomical silhouettes (`Head`, `Torso`, `Hands`, `Legs`) etched directly onto the silver foil.

---

## 2. ELEMENTS CHECKLIST (Modular Feature Tree)
Every element in FrankenScratcher is built as an **isolated, toggleable module** registered in a central Feature Registry. Any element can be enabled/disabled via an in-app **Elements Checklist Tree** before or during a session.

### Module Tree Structure
- [ ] **`/hud` (HUD & Screens)**
  - [ ] `hud.top_bar` — Icon counters (`🪙 Coins`, `👻 Scream Essence`, `🔥 Mob Torches`, `🃏 Cards`, `🌙 Timer`)
  - [ ] `hud.lab_screen` — Dr. Franken's Lab view (Scratch-Card Machine + Boss Phobia Preview Bubble)
  - [ ] `hud.quest_stamps` — 3 visual icon Quest Stamps (`🏠💡x10`, `👑💡`, `🐙x3`) that reward `🔥 Mob Torches`
  - [ ] `hud.tech_tree_modal` — Visual icon Tech Tree + **Expanded `🔥` Prestige Outer Ring** (post-Mob Raid)
  - [ ] `hud.village_map` — Nighttime village cluster with Outer Houses + Central Boss House
  - [ ] `hud.card_scratch_dock` — Bottom thumb-zone dock holding the active 4-zone Scratch Card
  - [ ] `hud.module_tree_modal` — Pre-start / runtime Elements Checklist toggle tree UI
  - [ ] `hud.designer_panel` — Designer Mode overlay (size sliders & persistent `hx` log)
- [ ] **`/buttons` (Interactive Controls)**
  - [ ] `buttons.buy_card` — `[+1 Card 🪙]` button on the Lab Machine
  - [ ] `buttons.open_tech_tree` — `[⚡ Tech Tree]` button in the Lab
  - [ ] `buttons.phobia_dial` — Icon toggle to bias printed parts toward a Phobia (`🐙` / `🕷️` / `👁️`)
  - [ ] `buttons.trigger_mob_prestige` — `[🔥 Villager Raid!]` Prestige button unlocked by completing quests
  - [ ] `buttons.start_night` — `[🌙 Launch Night Raid ▶]` button to enter the village
  - [ ] `buttons.preset_state_loader` — Quick-load Fixed Review States (`STATE_0`–`STATE_4`)
- [ ] **`/characters` (Monsters, Parts, Houses & Villager Mob)**
  - [ ] `characters.card_4zones` — 4-spot Scratch Card (`Head`, `Torso`, `Legs`, `Hands`) + upgradable `5th/6th Slot`
  - [ ] `characters.stitched_monster` — Assembled monster that pops out of a finished card onto the village
  - [ ] `characters.outer_houses` — Sleeping village homes (Lights OFF $\rightarrow$ Lights ON when scared)
  - [ ] `characters.boss_house` — Central Boss House with Phobia Thought Bubble (`😱 🐙 x3`) & high Courage bar
  - [ ] `characters.house_defenses` — Toggleable defenses near houses (porch lights, guard dogs, ward totems)
  - [ ] `characters.angry_villager_mob` — Cartoon villagers with torches & pitchforks (`🧑‍🌾🔥🔱`) that smash the Lab on Prestige
- [ ] **`/actions` (Core Mechanics & Interactions)**
  - [ ] `actions.foil_scratch` — Touch/swipe silver foil removal across the 4 card zones
  - [ ] `actions.monster_stitch_spawn` — Lightning stitch animation combining revealed `Head + Torso + Legs + Hands`
  - [ ] `actions.monster_pop_scare` — Monster hopping to dark houses and rattling windows to drain Courage
  - [ ] `actions.house_lights_on` — Window light-up burst, roof shake, and `👻 Scream` coin drop when scared
  - [ ] `actions.night_timer_cycle` — Countdown clock from Midnight to Dawn (`6:00 AM` end-of-night summary)
  - [ ] `actions.villager_mob_raid` — Prestige cutscene where villagers burn/smash the Lab & reveal the Expanded `🔥` Tech Tree
- [ ] **`/sounds` (Audio & Haptics Module)**
  - [ ] `sounds.scratch_foil` — Synthesized metallic coin-scratch SFX
  - [ ] `sounds.stitch_zap` — Tesla coil zap when 4 parts combine into a monster
  - [ ] `sounds.window_scare_pop` — Cartoon scream / shutter rattle when house Lights Turn ON
  - [ ] `sounds.boss_scare_fanfare` — Big chime when the Central Boss House lights up
  - [ ] `sounds.mob_raid_fire` — Cartoon crowd rumble & fire crackle during Prestige raid
  - [ ] `sounds.haptics` — Mobile `navigator.vibrate` micro-pulses
- [ ] **`/functionalities` (Core Systems)**
  - [ ] `functionalities.save_manager` — Auto-save, export/import JSON, hard reset
  - [ ] `functionalities.tech_tree_engine` — Node upgrades, phobia gene weighting, card zone scaling
  - [ ] `functionalities.prestige_engine` — Visual quest tracker, `🔥` Torch currency, Lab reset & Expanded Tree unlock
  - [ ] `functionalities.fixed_state_snapshots` — Deterministic state injection for reviews (`STATE_0`–`STATE_4`)
  - [ ] `functionalities.designer_mode` — Object size/scale adjuster with sliders & persistent history (`hx`)
  - [ ] `functionalities.playtester_ai` — Autonomous bot player & telemetry collector
  - [ ] `functionalities.audit_profiler` — Frame-time spike detector, console error trap, text-length auditor, NaN guard

---

## 3. DESIGNER MODE (`hx`)
- **On-Screen Size & Layout Changer**:
  - When `functionalities.designer_mode` is active, tapping any screen object (Lab Machine, Scratch Card, Scratch Zones, Outer Houses, Boss House, Tech Nodes, HUD buttons) selects it.
  - Provides **sliders** for `scale`, `width`, `height`, `x` offset, `y` offset, and `font/icon scale`.
- **Persistent History (`hx`)**:
  - Every slider tweak is saved in a persistent history stack (`localStorage` + exportable JSON) with element ID, old/new size, and timestamp.
  - Supports **Undo / Redo**, **Reset Element**, **Inspect History (`hx`)**, and **Lock/Persist Layout** across reloads.

---

## 4. REITERATE & GRADING PROTOCOL
We iterate rapidly, test after every change, update [`STATE.md`](./STATE.md), and grade every iteration objectively.

### Grading Scale (`0–10`)
| Grade | Milestone Definition | Criteria |
| :--- | :--- | :--- |
| **`0–2`** | **Broken / Pre-Concept** | Fails to boot, blocking errors, or missing core premise. |
| **`3`** | **Concept Followed** | Core Lab $\rightarrow$ 4-Zone Card Scratch $\rightarrow$ Village Lights-On loop & modular architecture exist. |
| **`4`** | **Early Prototype** | Interactive on mobile/desktop, basic modules toggleable, minimal text, rough edges. |
| **`5`** | **Playtest Applicable** | Full Lab + Tech Tree + Night Raid + Boss Phobia loop playable end-to-end; ready for mobile playtest. |
| **`6–7`** | **Polished Beta** | Responsive touch scratching, clear visual phobia cues, Designer Mode (`hx`) tuned. |
| **`8`** | **Production Grade** | Production-quality app with bugs squashed, smooth 60fps on mobile, intuitive zero-clutter UI. |
| **`9`** | **Exceptional** | Juicy lights-on feedback, satisfying stitched monsters, tight Tech Tree min-maxing. |
| **`10`** | **Overwhelmingly Positive** | Masterpiece polish, addictive tactile feel, flawless mobile & desktop ergonomics, zero defects. |

### Fixed Review States (Deterministic Comparison Checkpoints)
1. **`STATE_0_BOOT` (Elements Checklist & Lab Entry)**: Pre-start Elements Checklist Tree + clean Lab view with Scratch-Card Machine and Boss Phobia bubble (`😱 🐙 x3`).
2. **`STATE_1_TECH_TREE` (Lab Tech Tree & Gene Tuning)**: Lab Tech Tree open with Scream Essence ready to spend and Phobia Gene Dial ready to test min-maxing.
3. **`STATE_2_NIGHT_FIRST_SCRATCH` (Sleeping Village + 1 Card Ready)**: Nighttime village with all house lights OFF, Night Timer at `45s`, and 1 4-zone Scratch Card ready to swipe.
4. **`STATE_3_MID_RAID_ACTION` (Monsters Active + Lights Turning ON)**: 3 stitched monsters hopping between houses, half the outer houses lit up (`Lights ON`), Boss House taking Kraken phobia damage.
5. **`STATE_4_STRESS_ENDGAME` (Upgraded 5-Zone Foil Cards + Defenses + Designer Mode)**: High-tier village/prison with house defenses active, rapid scratching, and Designer Mode (`hx`) overlay open for mobile FPS & layout auditing.

### Uncontaminated Review Loops
- Every review batch uses a **fresh Reviewer Subagent** with zero prior context contamination.
- The Reviewer checks `STATE_0`–`STATE_4`, audits for **text bloat** (rejecting any screen with wordy labels > 4 words), checks mobile touch ergonomics, and outputs a strict `0–10` grade + defects for [`STATE.md`](./STATE.md).

---

## 5. TESTING STRATEGY
1. **Simple First, Complex Second**:
   - **Phase A (Single Element)**: Test individual modules in isolation (e.g., *only* `characters.card_4zones` + `actions.foil_scratch`, or *only* `characters.outer_houses` + `actions.house_lights_on`).
   - **Phase B (Pairwise Integration)**: Test `Scratch Card` $\rightarrow$ `Stitched Monster Spawn` $\rightarrow$ `House Lights Turn ON`.
   - **Phase C (Full Loop + Stress)**: Test `Lab Tech Tree & Phobia Dial` $\rightarrow$ `Buy Cards` $\rightarrow$ `Night Raid` $\rightarrow$ `Boss House Scared`.
2. **Auditing & Tester Tools**:
   - **UX Text-Bloat Auditor**: Automatically flags any UI element whose visible text exceeds 25 characters / 4 words!
   - **Runtime Invariants & NaN Auditor**: Checks currencies, timers, and house Courage bars for `NaN`/`Infinity` and viewport overflow.
   - **Performance Spike Detector**: Flags frame deltas > `33ms` during foil scratching.

---

## 6. PLAYTESTER AI
Autonomous bot module (`functionalities.playtester_ai`) with 3 archetypes:
1. **"Rapid Scratcher"**: Swipes all 4 card zones rapidly during Night Raid to stress-test monster spawning and touch performance.
2. **"Phobia Min-Maxer"**: Reads Boss House phobia in the Lab, upgrades matching Tech Tree vat (`🐙`/`🕷️`/`👁️`), buys cards, and measures time-to-scare Boss House.
3. **"Chaos Monkey"**: Randomly toggles Elements Checklist modules, adjusts Designer Mode (`hx`) sliders, and switches Fixed States mid-raid to catch bugs.

---

## 7. STATE FILE (`STATE.md`) & GITHUB PAGES DEPLOYMENT
- Tracked in [`STATE.md`](./STATE.md) and updated on every iteration with current grade, Fixed State matrix, and the **Top 10 Problems / Defects Backlog**.
- **GitHub Pages Live Mobile Hosting**:
  - Repository: `https://github.com/n1111ce/FrankenScratcher`
  - Live Mobile URL: `https://n1111ce.github.io/FrankenScratcher/`
  - All assets (`assets/*.jpg`, `assets/parts/*.png`) use relative paths and are committed & pushed to `main` after every iteration so the user can always test directly on their phone via GitHub Pages.

