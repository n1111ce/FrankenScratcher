// FrankenScratcher — Iteration 3: Better Lab, Story Tutorial, 15 Houses, Hand-Held Cards & True Random Parts
(() => {
  'use strict';

  // =========================================================================
  // 1. ELEMENTS CHECKLIST TREE REGISTRY
  // =========================================================================
  const MODULE_TREE = [
    { id: 'hud.start_screen', label: '/hud/start_screen', enabled: true, simple: true },
    { id: 'hud.tutorial_overlay', label: '/hud/tutorial_overlay', enabled: true, simple: true },
    { id: 'hud.top_bar', label: '/hud/top_bar', enabled: true, simple: true },
    { id: 'hud.lab_screen', label: '/hud/lab_screen', enabled: true, simple: true },
    { id: 'hud.monster_album', label: '/hud/monster_album', enabled: true, simple: false },
    { id: 'hud.quest_stamps', label: '/hud/quest_stamps', enabled: true, simple: false },
    { id: 'hud.tech_tree_modal', label: '/hud/tech_tree_modal', enabled: true, simple: false },
    { id: 'hud.village_map', label: '/hud/village_map', enabled: true, simple: true },
    { id: 'hud.card_scratch_dock', label: '/hud/card_scratch_dock', enabled: true, simple: true },
    { id: 'hud.options_credits_modals', label: '/hud/options_credits_modals', enabled: true, simple: false },
    { id: 'hud.module_tree_modal', label: '/hud/module_tree_modal', enabled: true, simple: true },
    { id: 'hud.designer_panel', label: '/hud/designer_panel', enabled: true, simple: true },
    { id: 'buttons.buy_card', label: '/buttons/buy_card', enabled: true, simple: true },
    { id: 'buttons.open_monster_album', label: '/buttons/open_monster_album', enabled: true, simple: false },
    { id: 'buttons.open_tech_tree', label: '/buttons/open_tech_tree', enabled: true, simple: false },
    { id: 'buttons.phobia_dial', label: '/buttons/phobia_dial', enabled: true, simple: false },
    { id: 'buttons.trigger_mob_prestige', label: '/buttons/trigger_mob_prestige', enabled: true, simple: false },
    { id: 'buttons.start_night', label: '/buttons/start_night', enabled: true, simple: true },
    { id: 'buttons.preset_state_loader', label: '/buttons/preset_state_loader', enabled: true, simple: true },
    { id: 'characters.card_4zones', label: '/characters/card_4zones', enabled: true, simple: true },
    { id: 'characters.atmosphere_cards', label: '/characters/atmosphere_cards', enabled: true, simple: false },
    { id: 'characters.prop_cards', label: '/characters/prop_cards', enabled: true, simple: false },
    { id: 'characters.stitched_monster', label: '/characters/stitched_monster', enabled: true, simple: true },
    { id: 'characters.outer_houses', label: '/characters/outer_houses', enabled: true, simple: true },
    { id: 'characters.boss_house', label: '/characters/boss_house', enabled: true, simple: true },
    { id: 'characters.house_defenses', label: '/characters/house_defenses', enabled: false, simple: false },
    { id: 'characters.angry_villager_mob', label: '/characters/angry_villager_mob', enabled: true, simple: false },
    { id: 'actions.foil_scratch', label: '/actions/foil_scratch', enabled: true, simple: true },
    { id: 'actions.monster_stitch_spawn', label: '/actions/monster_stitch_spawn', enabled: true, simple: true },
    { id: 'actions.monster_pop_scare', label: '/actions/monster_pop_scare', enabled: true, simple: true },
    { id: 'actions.house_lights_on', label: '/actions/house_lights_on', enabled: true, simple: true },
    { id: 'actions.night_timer_cycle', label: '/actions/night_timer_cycle', enabled: true, simple: false },
    { id: 'actions.villager_mob_raid', label: '/actions/villager_mob_raid', enabled: true, simple: false },
    { id: 'sounds.scratch_foil', label: '/sounds/scratch_foil', enabled: true, simple: false },
    { id: 'sounds.stitch_zap', label: '/sounds/stitch_zap', enabled: true, simple: false },
    { id: 'sounds.window_scare_pop', label: '/sounds/window_scare_pop', enabled: true, simple: false },
    { id: 'sounds.boss_scare_fanfare', label: '/sounds/boss_scare_fanfare', enabled: true, simple: false },
    { id: 'sounds.mob_raid_fire', label: '/sounds/mob_raid_fire', enabled: true, simple: false },
    { id: 'sounds.haptics', label: '/sounds/haptics', enabled: true, simple: false },
    { id: 'functionalities.save_manager', label: '/functionalities/save_manager', enabled: true, simple: false },
    { id: 'functionalities.tech_tree_engine', label: '/functionalities/tech_tree_engine', enabled: true, simple: false },
    { id: 'functionalities.prestige_engine', label: '/functionalities/prestige_engine', enabled: true, simple: false },
    { id: 'functionalities.fixed_state_snapshots', label: '/functionalities/fixed_state_snapshots', enabled: true, simple: true },
    { id: 'functionalities.designer_mode', label: '/functionalities/designer_mode', enabled: true, simple: true },
    { id: 'functionalities.playtester_ai', label: '/functionalities/playtester_ai', enabled: true, simple: false },
    { id: 'functionalities.audit_profiler', label: '/functionalities/audit_profiler', enabled: true, simple: true }
  ];

  const isModOn = (id) => {
    const m = MODULE_TREE.find((x) => x.id === id);
    return m ? m.enabled : true;
  };

  // =========================================================================
  // 2. 5 MONSTER SETS (3 Active at Start for True Randomized Cards + 2 Unlockable!)
  // =========================================================================
  const MONSTER_SETS = [
    {
      id: 'franken',
      name: '🧟 Franken Golem',
      icon: '🧟',
      unlockCost: 0,
      baseMult: 1.0,
      desc: 'Starter Pool'
    },
    {
      id: 'kraken',
      name: '🐙 Deep Kraken',
      icon: '🐙',
      unlockCost: 0,
      baseMult: 1.25,
      desc: '3x vs Sailor Boss!'
    },
    {
      id: 'pumpkin',
      name: '🎃 Pumpkin Fiend',
      icon: '🎃',
      unlockCost: 0,
      baseMult: 1.35,
      desc: 'Starter Pool'
    },
    {
      id: 'vampire',
      name: '🧛 Night Vampyr',
      icon: '🧛',
      unlockCost: 15,
      baseMult: 1.75,
      desc: 'Unlockable Pack'
    },
    {
      id: 'skeleton',
      name: '💀 Bone Reaper',
      icon: '💀',
      unlockCost: 25,
      baseMult: 2.1,
      desc: 'Unlockable Pack'
    }
  ];

  const ATMOSPHERE_TYPES = [
    { id: 'storm', icon: '🌧️', label: '🌧️ Storm (+50%💥)', mult: 1.5, bonusTime: 0, essenceMult: 1 },
    { id: 'fog', icon: '🌫️', label: '🌫️ Fog (+15s🌙)', mult: 1.15, bonusTime: 15, essenceMult: 1 },
    { id: 'bloodmoon', icon: '🌕', label: '🌕 Moon (2x👻)', mult: 1.2, bonusTime: 0, essenceMult: 2 }
  ];

  // Story Intro Panels (Part of Tutorial!)
  const STORY_SLIDES = [
    {
      badge: '📖 STORY 1/3',
      visualHtml: `
        <img src="assets/sprites/dr_franken.png" class="story-sprite" alt="Dr Franken" />
        <span style="font-size:2rem;">⚡👈😡</span>
        <img src="assets/sprites/angry_villager.png" class="story-sprite" alt="Villager" />
      `,
      caption: 'The villagers laughed at Dr. Franken and chased him out of town!'
    },
    {
      badge: '📖 STORY 2/3',
      visualHtml: `
        <img src="assets/sprites/machine_monster.png" class="story-sprite" alt="Press" />
        <span style="font-size:1.8rem;">👉🃏👉</span>
        <img src="assets/parts/kraken_head.png" class="story-sprite" style="width:58px;" alt="Kraken" />
        <img src="assets/parts/pumpkin_torso.png" class="story-sprite" style="width:58px;" alt="Pumpkin" />
      `,
      caption: 'So he built the MONSTER SCRATCH PRESS! Every card hides 4 randomized monster body parts!'
    },
    {
      badge: '📖 STORY 3/3',
      visualHtml: `
        <img src="assets/sprites/cottage_on.png" class="story-sprite" alt="House On" />
        <span style="font-size:1.8rem;">😱💡</span>
        <img src="assets/sprites/boss_off.png" class="story-sprite" alt="Boss House" />
      `,
      caption: 'Scratch cards at night to stitch monsters & turn house LIGHTS ON (💡)! Hint: The Sailor Boss House fears KRAKENS (🐙x3)!'
    }
  ];

  // =========================================================================
  // 3. TECH TREE & 15-HOUSE VILLAGE CLUSTER COORDINATES
  // =========================================================================
  const TECH_NODES = [
    { id: 'A1', icon: '🃏+1', title: 'Card Hopper', max: 5, baseCost: 5, currency: 'essence' },
    { id: 'B1', icon: '🪙🔍', title: 'Big Scratch', max: 5, baseCost: 5, currency: 'essence' },
    { id: 'B2', icon: '⚡〰️', title: 'Quick Foil', max: 3, baseCost: 8, currency: 'essence' },
    { id: 'B4', icon: '✨🃏', title: 'Holo Parts', max: 5, baseCost: 10, currency: 'essence' },
    { id: 'C5', icon: '🎯🧬', title: 'Bias Dial', max: 3, baseCost: 8, currency: 'essence' },
    { id: 'D1', icon: '🌙⏱️', title: 'Longer Night', max: 5, baseCost: 6, currency: 'essence' },
    { id: 'D3', icon: '💡💥', title: 'Chain Scare', max: 3, baseCost: 10, currency: 'essence' },
    // Prestige upgrades (Bought with 🔥 Prestige Points!)
    { id: 'M2', icon: '🌩️⚙️', title: 'Atmo Machine', max: 1, baseCost: 2, currency: 'torches', prestigeOnly: true },
    { id: 'M3', icon: '🎃⚙️', title: 'Prop Machine', max: 1, baseCost: 3, currency: 'torches', prestigeOnly: true },
    { id: 'P1', icon: '🔥🏦', title: '2x👻 & +2🃏', max: 3, baseCost: 1, currency: 'torches', prestigeOnly: true },
    { id: 'P2', icon: '🤖〰️', title: 'Auto-Laser', max: 1, baseCost: 2, currency: 'torches', prestigeOnly: true },
    { id: 'P3', icon: '👯🧟', title: 'Twin Spawn', max: 2, baseCost: 2, currency: 'torches', prestigeOnly: true }
  ];

  // 15 Standalone Pixel Houses clustered in the dark-green clearing!
  const VILLAGE_LAYOUT = [
    // 1 Central Sailor Boss House
    { id: 'boss_0', isBoss: true, x: 50, y: 40, maxCourage: 210, phobia: 'kraken' },
    // Top Row Cottages (3)
    { id: 'house_1', isBoss: false, x: 26, y: 20, maxCourage: 30 },
    { id: 'house_2', isBoss: false, x: 50, y: 18, maxCourage: 30 },
    { id: 'house_3', isBoss: false, x: 74, y: 20, maxCourage: 30 },
    // Upper-Mid Ring Cottages (4)
    { id: 'house_4', isBoss: false, x: 20, y: 34, maxCourage: 35 },
    { id: 'house_5', isBoss: false, x: 80, y: 34, maxCourage: 35 },
    { id: 'house_6', isBoss: false, x: 21, y: 48, maxCourage: 40 },
    { id: 'house_7', isBoss: false, x: 79, y: 48, maxCourage: 40 },
    // Lower-Mid Ring Cottages (4)
    { id: 'house_8', isBoss: false, x: 24, y: 61, maxCourage: 45 },
    { id: 'house_9', isBoss: false, x: 42, y: 58, maxCourage: 45 },
    { id: 'house_10', isBoss: false, x: 59, y: 58, maxCourage: 45 },
    { id: 'house_11', isBoss: false, x: 76, y: 61, maxCourage: 45 },
    // Bottom Row Cottages (3)
    { id: 'house_12', isBoss: false, x: 28, y: 74, maxCourage: 50 },
    { id: 'house_13', isBoss: false, x: 50, y: 72, maxCourage: 50 },
    { id: 'house_14', isBoss: false, x: 72, y: 74, maxCourage: 50 }
  ];

  // =========================================================================
  // 4. GAME STATE
  // =========================================================================
  const state = {
    phase: 'START',
    storySlideIndex: 0,
    tutorialActive: false,
    tutorialStep: 0,
    sfxOn: true,
    hapticsOn: true,
    coins: 40,
    essence: 0,
    torches: 0,
    prestigeCount: 0,
    monsterCardsCount: 3,
    atmoCardsCount: 0,
    propCardsCount: 0,
    cardCost: 10,
    // 'mix' ensures varied randomized parts across sets by default; player can also bias toward a set!
    selectedSetBias: 'mix',
    selectedAtmoIdx: 0,
    machinesUnlocked: {
      monster: true,
      atmosphere: false,
      prop: false
    },
    // Starter pool has Franken, Kraken, AND Pumpkin unlocked from the start so cards are truly randomized!
    unlockedSets: {
      franken: true,
      kraken: true,
      pumpkin: true,
      vampire: false,
      skeleton: false
    },
    albumParts: {
      franken: { head: false, torso: false, hands: false, legs: false },
      kraken: { head: false, torso: false, hands: false, legs: false },
      pumpkin: { head: false, torso: false, hands: false, legs: false },
      vampire: { head: false, torso: false, hands: false, legs: false },
      skeleton: { head: false, torso: false, hands: false, legs: false }
    },
    techLevels: {},
    quests: {
      housesLit: 0,
      housesLitClaimed: false,
      krakensSpawned: 0,
      krakensClaimed: false,
      bossLit: 0,
      bossClaimed: false
    },
    // Runtime Night Raid State
    nightTimeLeft: 45,
    activeAtmosphere: null,
    handState: 'TUCKED',
    cardsInHand: [],
    activeCardIndex: -1,
    houses: [],
    monsters: [],
    props: [],
    nightEssenceEarned: 0,
    errorsCount: 0
  };

  TECH_NODES.forEach((n) => {
    state.techLevels[n.id] = 0;
  });

  const getTechLvl = (id) => (isModOn('functionalities.tech_tree_engine') ? (state.techLevels[id] || 0) : 0);

  function isSetMastered(setId) {
    const p = state.albumParts[setId];
    return Boolean(p && p.head && p.torso && p.hands && p.legs);
  }

  function getMasteredSetsCount() {
    return MONSTER_SETS.filter((s) => isSetMastered(s.id)).length;
  }

  // =========================================================================
  // 5. PROCEDURAL WEBAUDIO SFX
  // =========================================================================
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx && typeof window !== 'undefined') {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  }

  function playSfx(type) {
    if (!state.sfxOn || !isModOn(`sounds.${type}`)) return;
    try {
      ensureAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'scratch_foil') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(480 + Math.random() * 260, now);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'stitch_zap') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.18);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        if (state.hapticsOn && isModOn('sounds.haptics') && navigator.vibrate) navigator.vibrate(25);
      } else if (type === 'window_scare_pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(960, now + 0.16);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'boss_scare_fanfare') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(1046.5, now + 0.2);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      } else if (type === 'mob_raid_fire') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(85, now + 0.4);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      }
    } catch (_) {}
  }

  // =========================================================================
  // 6. STORY INTRO COMIC & GUIDED TUTORIAL
  // =========================================================================
  function openStoryIntro() {
    state.storySlideIndex = 0;
    renderStorySlide();
    document.getElementById('story-modal').classList.remove('hidden');
  }

  function renderStorySlide() {
    const slide = STORY_SLIDES[state.storySlideIndex];
    if (!slide) return;
    document.getElementById('story-step-badge').textContent = slide.badge;
    document.getElementById('story-visual-box').innerHTML = slide.visualHtml;
    document.getElementById('story-caption').textContent = slide.caption;
    document.getElementById('btn-next-story').textContent =
      state.storySlideIndex < STORY_SLIDES.length - 1 ? 'NEXT ▶' : 'START TUTORIAL ▶';
  }

  function updateTutorialUI() {
    const banner = document.getElementById('tutorial-banner');
    const txt = document.getElementById('tutorial-text');

    document.querySelectorAll('.tut-highlight').forEach((el) => el.classList.remove('tut-highlight'));

    if (!state.tutorialActive || !isModOn('hud.tutorial_overlay') || state.phase === 'START') {
      banner.classList.add('hidden');
      return;
    }

    banner.classList.remove('hidden');

    if (state.tutorialStep === 1) {
      txt.textContent = '1. Tap PRINT CARD!';
      document.getElementById('btn-buy-card')?.classList.add('tut-highlight');
    } else if (state.tutorialStep === 2) {
      txt.textContent = '2. Tap 🌙 RAID!';
      document.getElementById('btn-start-night')?.classList.add('tut-highlight');
    } else if (state.tutorialStep === 3) {
      txt.textContent = '3. Pick a Card 👆!';
      document.getElementById('card-hand-handle')?.classList.add('tut-highlight');
    } else if (state.tutorialStep === 4) {
      txt.textContent = '4. Scratch 4 Spots!';
      document.getElementById('focused-card-modal')?.classList.add('tut-highlight');
    } else if (state.tutorialStep === 5) {
      txt.textContent = 'Lights ON = Scared! 💡';
      setTimeout(() => {
        if (state.tutorialStep === 5) {
          state.tutorialActive = false;
          updateTutorialUI();
        }
      }, 3200);
    }
  }

  // =========================================================================
  // 7. FOCUSED LAB SCREEN: ONLY 1 MACHINE BEFORE FIRST PRESTIGE!
  //    Extra Machines Unlocked After Prestige with 🔥 Prestige Points!
  // =========================================================================
  function renderLabMachines() {
    const stage = document.getElementById('lab-pedestals-stage');
    const postPrestigeRow = document.getElementById('post-prestige-machines');

    // Sync Tech Tree M2 / M3 unlocks with state.machinesUnlocked
    if (getTechLvl('M2') > 0) state.machinesUnlocked.atmosphere = true;
    if (getTechLvl('M3') > 0) state.machinesUnlocked.prop = true;

    // Rule: Before the first prestige, ONLY ONE MACHINE is available in the Lab!
    const showPostPrestigeMachines =
      state.prestigeCount > 0 || state.machinesUnlocked.atmosphere || state.machinesUnlocked.prop;

    if (!showPostPrestigeMachines) {
      postPrestigeRow.classList.add('hidden');
      stage.classList.remove('has-prestige-machines');
      return;
    }

    postPrestigeRow.classList.remove('hidden');
    stage.classList.add('has-prestige-machines');

    // Machine 2: Atmosphere Press (Bought with 2 🔥 Prestige Points!)
    const m2Slot = document.getElementById('slot-machine-2');
    const m2Actions = document.getElementById('machine-2-actions');
    const atmoType = ATMOSPHERE_TYPES[state.selectedAtmoIdx];

    if (m2Actions) {
      m2Slot.classList.toggle('unlocked', state.machinesUnlocked.atmosphere);
      if (!state.machinesUnlocked.atmosphere) {
        m2Actions.innerHTML = `
          <button id="btn-unlock-m2" class="pixel-btn fire-px" style="font-size:0.75rem;padding:6px;">
            🔓 BUY (🔥2)
          </button>
        `;
        document.getElementById('btn-unlock-m2')?.addEventListener('click', () => {
          if (state.torches >= 2) {
            state.torches -= 2;
            state.machinesUnlocked.atmosphere = true;
            state.techLevels['M2'] = 1;
            state.atmoCardsCount = 1;
            playSfx('boss_scare_fanfare');
            renderLabMachines();
            updateTopHud();
          }
        });
      } else {
        m2Actions.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;">
            <span>🌩️ <b>${state.atmoCardsCount}</b></span>
            <button id="btn-cycle-atmo" class="tiny-btn">${atmoType.icon}🔄</button>
          </div>
          <button id="btn-buy-atmo" class="pixel-btn blue-px" style="font-size:0.75rem;padding:6px;">
            +1 🌩️ (🪙15)
          </button>
        `;
        document.getElementById('btn-cycle-atmo')?.addEventListener('click', () => {
          state.selectedAtmoIdx = (state.selectedAtmoIdx + 1) % ATMOSPHERE_TYPES.length;
          playSfx('scratch_foil');
          renderLabMachines();
        });
        document.getElementById('btn-buy-atmo')?.addEventListener('click', () => {
          if (state.coins >= 15) {
            state.coins -= 15;
            state.atmoCardsCount++;
            playSfx('scratch_foil');
            renderLabMachines();
            updateTopHud();
          }
        });
      }
    }

    // Machine 3: Spooky Prop Press (Bought with 3 🔥 Prestige Points!)
    const m3Slot = document.getElementById('slot-machine-3');
    const m3Actions = document.getElementById('machine-3-actions');
    if (m3Actions) {
      m3Slot.classList.toggle('unlocked', state.machinesUnlocked.prop);
      if (!state.machinesUnlocked.prop) {
        m3Actions.innerHTML = `
          <button id="btn-unlock-m3" class="pixel-btn fire-px" style="font-size:0.75rem;padding:6px;">
            🔓 BUY (🔥3)
          </button>
        `;
        document.getElementById('btn-unlock-m3')?.addEventListener('click', () => {
          if (state.torches >= 3) {
            state.torches -= 3;
            state.machinesUnlocked.prop = true;
            state.techLevels['M3'] = 1;
            state.propCardsCount = 1;
            playSfx('boss_scare_fanfare');
            renderLabMachines();
            updateTopHud();
          }
        });
      } else {
        m3Actions.innerHTML = `
          <div style="font-size:0.75rem;text-align:center;">🎃 <b>${state.propCardsCount}</b></div>
          <button id="btn-buy-prop" class="pixel-btn gold-px" style="font-size:0.75rem;padding:6px;">
            +1 🎃 (🪙15)
          </button>
        `;
        document.getElementById('btn-buy-prop')?.addEventListener('click', () => {
          if (state.coins >= 15) {
            state.coins -= 15;
            state.propCardsCount++;
            playSfx('scratch_foil');
            renderLabMachines();
            updateTopHud();
          }
        });
      }
    }
  }

  function renderMonsterAlbumModal() {
    document.getElementById('album-essence').textContent = String(Math.floor(state.essence));
    const list = document.getElementById('monster-album-list');
    if (!list) return;
    list.innerHTML = '';

    MONSTER_SETS.forEach((mset) => {
      const unlocked = state.unlockedSets[mset.id];
      const parts = state.albumParts[mset.id];
      const count = ['head', 'torso', 'hands', 'legs'].filter((k) => parts[k]).length;
      const mastered = count === 4;

      const card = document.createElement('div');
      card.className = 'album-pack-card' + (mastered ? ' mastered' : '');

      let actionHtml = '';
      if (!unlocked) {
        actionHtml = `<button class="tiny-btn" data-unlock-set="${mset.id}">🔓 👻${mset.unlockCost}</button>`;
      } else if (mastered) {
        actionHtml = `<span style="color:#ffd43b;">⭐ FULL PACK (+50%💥)</span>`;
      } else {
        actionHtml = `<span>${count}/4 Parts</span>`;
      }

      card.innerHTML = `
        <div class="album-pack-header">
          <span>${mset.name} <small style="opacity:0.75;">(${mset.desc})</small></span>
          ${actionHtml}
        </div>
        <div class="album-parts-row">
          ${['head', 'torso', 'hands', 'legs']
            .map((slot) => {
              const hasIt = parts[slot];
              const imgFile = slot === 'hands' ? `${mset.id}_hand_l.png` : `${mset.id}_${slot}.png`;
              return `
                <div class="album-part-box ${hasIt ? 'collected' : 'locked'}">
                  <img src="assets/parts/${imgFile}" alt="${slot}" />
                </div>
              `;
            })
            .join('')}
        </div>
      `;

      const unlockBtn = card.querySelector('[data-unlock-set]');
      if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
          if (state.essence >= mset.unlockCost) {
            state.essence -= mset.unlockCost;
            state.unlockedSets[mset.id] = true;
            playSfx('boss_scare_fanfare');
            renderMonsterAlbumModal();
            updateTopHud();
          }
        });
      }

      list.appendChild(card);
    });
  }

  // =========================================================================
  // 8. TRUE RANDOMIZED SCRATCHABLE CARDS & NATURAL HAND-HELD CARD FAN
  // =========================================================================
  function getUnlockedSetIds() {
    const ids = MONSTER_SETS.filter((s) => state.unlockedSets[s.id]).map((s) => s.id);
    return ids.length > 0 ? ids : ['franken', 'kraken', 'pumpkin'];
  }

  function pickRandomizedFamiliesForCard(slotCount) {
    const pool = getUnlockedSetIds();
    const families = [];

    for (let i = 0; i < slotCount; i++) {
      if (state.selectedSetBias !== 'mix' && pool.includes(state.selectedSetBias)) {
        const biasChance = 0.55 + getTechLvl('C5') * 0.12;
        if (Math.random() < biasChance) {
          families.push(state.selectedSetBias);
          continue;
        }
      }
      const pick = pool[Math.floor(Math.random() * pool.length)];
      families.push(pick);
    }

    // When in default 'mix' mode, guarantee that cards don't accidentally roll 4x Franken!
    if (state.selectedSetBias === 'mix' && pool.length > 1 && families.every((f) => f === 'franken')) {
      const otherPool = pool.filter((id) => id !== 'franken');
      const replaceIdx = Math.floor(Math.random() * families.length);
      const secondIdx = (replaceIdx + 1) % families.length;
      families[replaceIdx] = otherPool[Math.floor(Math.random() * otherPool.length)];
      families[secondIdx] = otherPool[Math.floor(Math.random() * otherPool.length)];
    }

    return families;
  }

  function createMonsterCardObject(idx) {
    const has5th = getTechLvl('P4') > 0;
    const holoChance = getTechLvl('B4') * 0.08;
    const slots = ['head', 'torso', 'hands', 'legs'];
    if (has5th) slots.push('aura');

    const chosenFamilies = pickRandomizedFamiliesForCard(slots.length);

    const zones = slots.map((slotType, i) => ({
      slotType,
      family: chosenFamilies[i],
      isHolo: Math.random() < holoChance,
      scratchedPct: 0,
      revealed: false,
      // Slight organic variations per scratchable zone so they never look rigidly aligned!
      slotRot: ((Math.random() - 0.5) * 5.2).toFixed(2),
      slotDx: Math.round((Math.random() - 0.5) * 6),
      slotDy: Math.round((Math.random() - 0.5) * 6)
    }));

    return {
      id: `mcard_${Date.now()}_${idx}`,
      cardType: 'monster',
      zones,
      completed: false,
      // Per-card hand-held organic jitter
      jitterRot: (Math.random() - 0.5) * 4.5,
      jitterX: Math.round((Math.random() - 0.5) * 6),
      jitterY: Math.round((Math.random() - 0.5) * 7),
      focusedTilt: ((Math.random() - 0.5) * 3.4).toFixed(2)
    };
  }

  function createAtmosphereCardObject(idx) {
    const atmo = ATMOSPHERE_TYPES[state.selectedAtmoIdx];
    const zones = [0, 1].map((i) => ({
      slotType: i === 0 ? 'sky' : 'boost',
      atmo,
      scratchedPct: 0,
      revealed: false,
      slotRot: ((Math.random() - 0.5) * 4.5).toFixed(2),
      slotDx: Math.round((Math.random() - 0.5) * 5),
      slotDy: Math.round((Math.random() - 0.5) * 5)
    }));
    return {
      id: `acard_${Date.now()}_${idx}`,
      cardType: 'atmosphere',
      atmo,
      zones,
      completed: false,
      jitterRot: (Math.random() - 0.5) * 4.5,
      jitterX: Math.round((Math.random() - 0.5) * 6),
      jitterY: Math.round((Math.random() - 0.5) * 7),
      focusedTilt: ((Math.random() - 0.5) * 3.0).toFixed(2)
    };
  }

  function createPropCardObject(idx) {
    const zones = [0, 1].map((i) => ({
      slotType: i === 0 ? 'prop_head' : 'prop_base',
      scratchedPct: 0,
      revealed: false,
      slotRot: ((Math.random() - 0.5) * 4.5).toFixed(2),
      slotDx: Math.round((Math.random() - 0.5) * 5),
      slotDy: Math.round((Math.random() - 0.5) * 5)
    }));
    return {
      id: `pcard_${Date.now()}_${idx}`,
      cardType: 'prop',
      zones,
      completed: false,
      jitterRot: (Math.random() - 0.5) * 4.5,
      jitterX: Math.round((Math.random() - 0.5) * 6),
      jitterY: Math.round((Math.random() - 0.5) * 7),
      focusedTilt: ((Math.random() - 0.5) * 3.0).toFixed(2)
    };
  }

  function setHandState(newState) {
    state.handState = newState;
    const dock = document.getElementById('card-hand-dock');
    const fan = document.getElementById('card-fan-container');
    const focused = document.getElementById('focused-card-modal');
    const promptIcon = document.getElementById('hand-prompt-icon');

    dock.classList.remove('hand-state-tucked', 'hand-state-raised', 'hand-state-focused');

    if (newState === 'TUCKED') {
      dock.classList.add('hand-state-tucked');
      fan.classList.remove('hidden');
      focused.classList.add('hidden');
      promptIcon.textContent = '👆 HAND';
    } else if (newState === 'RAISED') {
      dock.classList.add('hand-state-raised');
      fan.classList.remove('hidden');
      focused.classList.add('hidden');
      promptIcon.textContent = '👇 HIDE';
    } else if (newState === 'FOCUSED_SCRATCH') {
      dock.classList.add('hand-state-focused');
      fan.classList.add('hidden');
      focused.classList.remove('hidden');
      promptIcon.textContent = '🪙 SCRATCH';
    }
  }

  // Render cards in a natural, arched hand-held fan with slight organic variations!
  function renderCardFan() {
    const fan = document.getElementById('card-fan-container');
    const leftBadge = document.getElementById('hand-cards-left');
    const remainingEntries = [];
    state.cardsInHand.forEach((card, idx) => {
      if (!card.completed) remainingEntries.push({ card, idx });
    });

    leftBadge.textContent = String(remainingEntries.length);
    fan.innerHTML = '';

    const count = remainingEntries.length;
    const mid = (count - 1) / 2;

    remainingEntries.forEach(({ card, idx }, fanPos) => {
      const el = document.createElement('div');
      el.className =
        'mini-scratch-card' +
        (card.cardType === 'atmosphere' ? ' card-type-atmo' : '') +
        (card.cardType === 'prop' ? ' card-type-prop' : '');

      // Compute natural hand-held fan rotation & vertical curve + slight organic jitter
      const offsetFromMid = fanPos - mid;
      const baseAngle = offsetFromMid * 8.5 + (card.jitterRot || 0);
      const archY = Math.abs(offsetFromMid) * 6.5 + (card.jitterY || 0);
      const shiftX = card.jitterX || 0;

      el.style.setProperty('--fan-rot', `${baseAngle.toFixed(2)}deg`);
      el.style.setProperty('--fan-y', `${archY.toFixed(1)}px`);
      el.style.setProperty('--fan-x', `${shiftX}px`);
      el.style.zIndex = String(10 + fanPos);

      if (card.cardType === 'monster') {
        el.innerHTML = `
          <div class="mini-card-grid">
            <div class="mini-foil-dot">🙂</div>
            <div class="mini-foil-dot">👕</div>
            <div class="mini-foil-dot">🖐️</div>
            <div class="mini-foil-dot">🦵</div>
          </div>
          <span style="font-size:0.68rem;font-weight:900;">🃏 #${idx + 1}</span>
        `;
      } else if (card.cardType === 'atmosphere') {
        el.innerHTML = `
          <div style="font-size:1.5rem;">${card.atmo.icon}</div>
          <span style="font-size:0.66rem;font-weight:900;">WEATHER</span>
        `;
      } else {
        el.innerHTML = `
          <div style="font-size:1.5rem;">🎃</div>
          <span style="font-size:0.66rem;font-weight:900;">PROP</span>
        `;
      }

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.handState === 'TUCKED') {
          setHandState('RAISED');
        } else {
          openCardForScratching(idx);
        }
      });
      fan.appendChild(el);
    });
  }

  function getZonePartAsset(zone) {
    const fam = zone.family || 'franken';
    if (zone.slotType === 'head') return `assets/parts/${fam}_head.png`;
    if (zone.slotType === 'torso') return `assets/parts/${fam}_torso.png`;
    if (zone.slotType === 'hands') return `assets/parts/${fam}_hand_l.png`;
    if (zone.slotType === 'legs') return `assets/parts/${fam}_legs.png`;
    return `assets/parts/${fam}_head.png`;
  }

  function getZoneSilhouetteIcon(slotType) {
    if (slotType === 'head') return '🙂';
    if (slotType === 'torso') return '👕';
    if (slotType === 'hands') return '🖐️';
    if (slotType === 'legs') return '🦵';
    if (slotType === 'sky' || slotType === 'boost') return '🌩️';
    if (slotType === 'prop_head' || slotType === 'prop_base') return '🎃';
    return '⭐';
  }

  function openCardForScratching(cardIdx) {
    if (!isModOn('characters.card_4zones')) return;
    state.activeCardIndex = cardIdx;
    setHandState('FOCUSED_SCRATCH');

    if (state.tutorialActive && state.tutorialStep === 3) {
      state.tutorialStep = 4;
      updateTutorialUI();
    }

    const card = state.cardsInHand[cardIdx];
    const modal = document.getElementById('focused-card-modal');
    modal.style.setProperty('--card-tilt', `${card.focusedTilt || -1.2}deg`);

    const grid = document.getElementById('scratch-zones-grid');
    grid.innerHTML = '';

    const revealThreshold = Math.max(25, 52 - getTechLvl('B2') * 10);
    const brushRadius = 25 + getTechLvl('B1') * 6;

    card.zones.forEach((zone) => {
      const slot = document.createElement('div');
      slot.className = 'scratch-slot' + (zone.isHolo ? ' foil-holo' : '') + (zone.revealed ? ' scratched-done' : '');

      // Apply organic imperfect alignment to each scratchable spot!
      slot.style.setProperty('--slot-rot', `${zone.slotRot || 0}deg`);
      slot.style.setProperty('--slot-dx', `${zone.slotDx || 0}px`);
      slot.style.setProperty('--slot-dy', `${zone.slotDy || 0}px`);

      if (card.cardType === 'monster') {
        const img = document.createElement('img');
        img.className = 'revealed-part-img';
        img.src = getZonePartAsset(zone);
        img.alt = zone.slotType;
        slot.appendChild(img);

        const setObj = MONSTER_SETS.find((s) => s.id === zone.family);
        const badge = document.createElement('span');
        badge.className = 'part-phobia-badge';
        badge.textContent = (setObj ? setObj.icon : '🧟') + (zone.isHolo ? '✨' : '');
        slot.appendChild(badge);
      } else if (card.cardType === 'atmosphere') {
        const iconEl = document.createElement('div');
        iconEl.style.fontSize = '2.4rem';
        iconEl.textContent = card.atmo.icon;
        slot.appendChild(iconEl);
      } else {
        const iconEl = document.createElement('div');
        iconEl.style.fontSize = '2.4rem';
        iconEl.textContent = '🎃🕯️';
        slot.appendChild(iconEl);
      }

      if (!zone.revealed) {
        const canvas = document.createElement('canvas');
        canvas.className = 'scratch-foil-canvas';
        canvas.width = 150;
        canvas.height = 102;
        slot.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#adb5bd';
        ctx.fillRect(0, 0, 150, 102);

        // Organic foil sheen stripes with slight random offset
        ctx.fillStyle = '#dee2e6';
        const stripeOffset = Math.floor(Math.random() * 14);
        for (let i = stripeOffset; i < 150; i += 24) {
          ctx.fillRect(i, 0, 8, 102);
        }
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, 146, 98);

        ctx.font = '32px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#212529';
        ctx.fillText(getZoneSilhouetteIcon(zone.slotType), 75, 51);

        let lastPt = null;
        const scratchAt = (clientX, clientY) => {
          if (!isModOn('actions.foil_scratch') || zone.revealed) return;
          const rect = canvas.getBoundingClientRect();
          const x = ((clientX - rect.left) / rect.width) * canvas.width;
          const y = ((clientY - rect.top) / rect.height) * canvas.height;
          if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

          ctx.globalCompositeOperation = 'destination-out';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = brushRadius * 2;
          ctx.beginPath();
          if (lastPt) {
            ctx.moveTo(lastPt.x, lastPt.y);
            ctx.lineTo(x, y);
            ctx.stroke();
          } else {
            ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
            ctx.fill();
          }
          lastPt = { x, y };

          zone.scratchedPct = Math.min(100, zone.scratchedPct + 12 + getTechLvl('B1') * 3);
          playSfx('scratch_foil');

          if (zone.scratchedPct >= revealThreshold) {
            revealZoneNow(card, zone, canvas, slot);
          }
        };

        canvas.addEventListener('pointerdown', (e) => {
          canvas.setPointerCapture(e.pointerId);
          lastPt = null;
          scratchAt(e.clientX, e.clientY);
        });
        canvas.addEventListener('pointermove', (e) => {
          if (e.buttons > 0 || e.pointerType === 'touch') {
            scratchAt(e.clientX, e.clientY);
          }
        });
        canvas.addEventListener('pointerup', () => {
          lastPt = null;
        });
      }

      grid.appendChild(slot);
    });
  }

  function revealZoneNow(card, zone, canvas, slot) {
    if (zone.revealed) return;
    zone.revealed = true;
    if (canvas) canvas.remove();
    if (slot) slot.classList.add('scratched-done');

    if (card.cardType === 'monster' && zone.family && state.albumParts[zone.family]) {
      const wasMastered = isSetMastered(zone.family);
      if (['head', 'torso', 'hands', 'legs'].includes(zone.slotType)) {
        state.albumParts[zone.family][zone.slotType] = true;
      }
      if (!wasMastered && isSetMastered(zone.family)) {
        const setObj = MONSTER_SETS.find((s) => s.id === zone.family);
        spawnFloatingVfx(50, 50, `⭐ ${setObj ? setObj.name : zone.family} PACK COMPLETE! (+50%💥)`);
        playSfx('boss_scare_fanfare');
      }
    }

    checkCardCompletion(card);
  }

  function checkCardCompletion(card) {
    if (card.completed) return;
    if (card.zones.every((z) => z.revealed)) {
      card.completed = true;
      playSfx('stitch_zap');

      if (state.tutorialActive && state.tutorialStep === 4) {
        state.tutorialStep = 5;
        updateTutorialUI();
      }

      setTimeout(() => {
        setHandState('TUCKED');
        renderCardFan();
        updateTopHud();

        if (card.cardType === 'monster' && isModOn('actions.monster_stitch_spawn')) {
          spawnStitchedMonsterFromCard(card);
          const twinLvl = getTechLvl('P3');
          if (twinLvl > 0 && Math.random() < twinLvl * 0.5) {
            setTimeout(() => spawnStitchedMonsterFromCard(card), 240);
          }
        } else if (card.cardType === 'atmosphere' && isModOn('characters.atmosphere_cards')) {
          activateAtmosphereEffect(card.atmo);
        } else if (card.cardType === 'prop' && isModOn('characters.prop_cards')) {
          deploySpookyProp();
        }
      }, 250);
    }
  }

  function activateAtmosphereEffect(atmo) {
    state.activeAtmosphere = atmo;
    if (atmo.bonusTime > 0) {
      state.nightTimeLeft += atmo.bonusTime;
    }
    const banner = document.getElementById('active-atmosphere-banner');
    const txt = document.getElementById('active-atmo-text');
    if (banner && txt) {
      txt.textContent = atmo.label;
      banner.classList.remove('hidden');
    }
    spawnFloatingVfx(50, 45, `${atmo.label}!`);
    updateTopHud();
  }

  function deploySpookyProp() {
    const layer = document.getElementById('village-monsters-layer');
    const propEl = document.createElement('div');
    propEl.className = 'deployed-prop';
    const x = 32 + Math.random() * 36;
    const y = 35 + Math.random() * 32;
    propEl.style.left = `${x}%`;
    propEl.style.top = `${y}%`;
    propEl.textContent = '🎃🕯️';
    layer.appendChild(propEl);
    state.props.push({ el: propEl, x, y, scareDps: 12 });
    spawnFloatingVfx(x, y - 5, '🎃 PROP ACTIVE!');
  }

  // =========================================================================
  // 9. STITCHED MONSTER SPAWN & "POP FROM UNDER + WIGGLE" ON 15 HOUSES
  // =========================================================================
  function spawnStitchedMonsterFromCard(card) {
    if (!isModOn('characters.stitched_monster')) return;

    const headZone = card.zones.find((z) => z.slotType === 'head') || card.zones[0];
    const torsoZone = card.zones.find((z) => z.slotType === 'torso') || card.zones[1];
    const handsZone = card.zones.find((z) => z.slotType === 'hands') || card.zones[2];
    const legsZone = card.zones.find((z) => z.slotType === 'legs') || card.zones[3];

    const krakenPartsCount = card.zones.filter((z) => z.family === 'kraken').length;
    const holoCount = card.zones.filter((z) => z.isHolo).length;

    if (headZone.family === 'kraken' || krakenPartsCount >= 2) {
      state.quests.krakensSpawned++;
      checkQuestsProgress();
    }

    const setInfo = MONSTER_SETS.find((s) => s.id === headZone.family) || MONSTER_SETS[0];
    const allSame = card.zones.every((z) => z.family === headZone.family);
    const masteredBonus = isSetMastered(headZone.family) ? 1.5 : 1.0;
    const fullSetSuperScary = allSame ? 1.8 : 1.0;
    const holoMult = 1 + holoCount * 0.5;

    const baseScareDmg = Math.round(16 * setInfo.baseMult * masteredBonus * fullSetSuperScary * holoMult);

    const slotEl = document.createElement('div');
    slotEl.className = 'monster-pop-slot' + (allSame || isSetMastered(headZone.family) ? ' super-scary' : '');

    slotEl.innerHTML = `
      <div class="monster-puppet">
        <img class="puppet-legs" src="assets/parts/${legsZone.family}_legs.png" alt="legs" />
        <img class="puppet-torso" src="assets/parts/${torsoZone.family}_torso.png" alt="torso" />
        <img class="puppet-head" src="assets/parts/${headZone.family}_head.png" alt="head" />
        <img class="puppet-hand-l" src="assets/parts/${handsZone.family}_hand_l.png" alt="handL" />
        <img class="puppet-hand-r" src="assets/parts/${handsZone.family}_hand_r.png" alt="handR" />
      </div>
      <div class="window-bush-lip"></div>
    `;

    document.getElementById('village-monsters-layer').appendChild(slotEl);

    const monster = {
      id: `mon_${Date.now()}_${Math.random()}`,
      el: slotEl,
      headFamily: headZone.family,
      krakenPartsCount,
      scarePower: baseScareDmg,
      targetHouseId: null
    };

    state.monsters.push(monster);
    assignMonsterToNextHouse(monster);
  }

  function assignMonsterToNextHouse(monster) {
    const unscaredOuter = state.houses.filter((h) => !h.isBoss && !h.lightsOn);
    const bossHouse = state.houses.find((h) => h.isBoss && !h.lightsOn);
    let target = null;

    if (unscaredOuter.length > 0) {
      target = unscaredOuter[Math.floor(Math.random() * unscaredOuter.length)];
    } else if (bossHouse) {
      target = bossHouse;
    } else if (state.houses.length > 0) {
      target = state.houses[Math.floor(Math.random() * state.houses.length)];
    }

    if (!target) return;
    monster.targetHouseId = target.id;

    const offsetX = (Math.random() - 0.5) * 14;
    monster.el.style.left = `${target.x + offsetX * 0.25}%`;
    monster.el.style.top = `${target.y + (target.isBoss ? 6 : 4)}%`;

    const puppet = monster.el.querySelector('.monster-puppet');
    if (puppet) {
      puppet.style.animation = 'none';
      void puppet.offsetWidth;
      puppet.style.animation = 'popFromUnder 0.38s cubic-bezier(0.22, 1.35, 0.5, 1) forwards';
    }
  }

  function spawnFloatingVfx(xPct, yPct, text) {
    const layer = document.getElementById('village-vfx-layer');
    if (!layer) return;
    const pop = document.createElement('div');
    pop.className = 'vfx-pop';
    pop.style.left = `${xPct}%`;
    pop.style.top = `${yPct}%`;
    pop.textContent = text;
    layer.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }

  function scareHouseTick(monster, dtSec) {
    if (!isModOn('actions.monster_pop_scare')) return;
    const house = state.houses.find((h) => h.id === monster.targetHouseId);
    if (!house || house.lightsOn) {
      assignMonsterToNextHouse(monster);
      return;
    }

    house.el.classList.add('being-scared');

    let mult = 1.0;
    if (house.isBoss) {
      if (monster.headFamily === 'kraken' || monster.krakenPartsCount >= 1) {
        mult = 1.5 + monster.krakenPartsCount * 0.75; // Up to 4.5x for full Kraken!
      } else {
        mult = 0.65;
      }
    }

    if (state.activeAtmosphere) {
      mult *= state.activeAtmosphere.mult;
    }

    const dmg = monster.scarePower * mult * dtSec;
    house.courage = Math.max(0, house.courage - dmg);
    updateHouseVisual(house);

    if (house.courage <= 0 && !house.lightsOn) {
      turnHouseLightsOn(house);
      assignMonsterToNextHouse(monster);
    }
  }

  function turnHouseLightsOn(house) {
    if (!isModOn('actions.house_lights_on') || house.lightsOn) return;
    house.lightsOn = true;
    house.el.classList.remove('being-scared');
    house.el.classList.add('lights-on');

    const spriteImg = house.el.querySelector('.house-sprite-img');
    if (spriteImg) {
      spriteImg.src = house.isBoss ? 'assets/sprites/boss_on.png' : 'assets/sprites/cottage_on.png';
    }

    const atmoEssMult = state.activeAtmosphere ? state.activeAtmosphere.essenceMult : 1;
    const albumMult = 1 + getMasteredSetsCount() * 0.25;
    const essenceMult = (1 + getTechLvl('P1')) * atmoEssMult * albumMult;

    if (house.isBoss) {
      playSfx('boss_scare_fanfare');
      const coinGain = 55;
      const essGain = Math.round(18 * essenceMult);
      state.coins += coinGain;
      state.essence += essGain;
      state.nightEssenceEarned += essGain;
      state.quests.bossLit = 1;
      spawnFloatingVfx(house.x, house.y - 6, `😱💡 +${essGain}👻 +${coinGain}🪙`);
    } else {
      playSfx('window_scare_pop');
      const coinGain = 10;
      const essGain = Math.round(3 * essenceMult);
      state.coins += coinGain;
      state.essence += essGain;
      state.nightEssenceEarned += essGain;
      state.quests.housesLit++;
      spawnFloatingVfx(house.x, house.y - 4, `💡 +${essGain}👻`);

      const chainLvl = getTechLvl('D3');
      if (chainLvl > 0) {
        state.houses.forEach((other) => {
          if (!other.lightsOn && other.id !== house.id) {
            other.courage = Math.max(0, other.courage - other.maxCourage * (0.14 * chainLvl));
            updateHouseVisual(other);
          }
        });
      }
    }

    updateHouseVisual(house);
    updateVillageScareCounter();
    checkQuestsProgress();
    updateTopHud();
  }

  function updateVillageScareCounter() {
    const lit = state.houses.filter((h) => h.lightsOn).length;
    const el = document.getElementById('val-houses-scared');
    if (el) el.textContent = `${lit}/${state.houses.length}`;
  }

  // =========================================================================
  // 10. 15 STANDALONE PIXEL HOUSES BUILDER
  // =========================================================================
  function buildVillageHouses() {
    const layer = document.getElementById('village-houses-layer');
    layer.innerHTML = '';
    state.houses = [];

    VILLAGE_LAYOUT.forEach((cfg) => {
      if (cfg.isBoss && !isModOn('characters.boss_house')) return;
      if (!cfg.isBoss && !isModOn('characters.outer_houses')) return;

      const el = document.createElement('div');
      el.className = 'house-node' + (cfg.isBoss ? ' boss-house' : '');
      el.style.left = `${cfg.x}%`;
      el.style.top = `${cfg.y}%`;
      el.setAttribute('data-design-id', cfg.id);

      const spriteSrc = cfg.isBoss ? 'assets/sprites/boss_off.png' : 'assets/sprites/cottage_off.png';

      el.innerHTML = `
        ${cfg.isBoss ? `<div class="boss-phobia-pill">⚓😱👉🐙x3</div>` : ''}
        <div class="house-status-badge">💤</div>
        <img class="house-sprite-img" src="${spriteSrc}" alt="House" />
        <div class="courage-bar-wrap">
          <div class="courage-bar-fill"></div>
        </div>
      `;

      layer.appendChild(el);
      state.houses.push({
        id: cfg.id,
        isBoss: cfg.isBoss,
        x: cfg.x,
        y: cfg.y,
        maxCourage: cfg.maxCourage,
        courage: cfg.maxCourage,
        lightsOn: false,
        el
      });
    });

    updateVillageScareCounter();
    applyAllSavedDesignerTransforms();
  }

  function updateHouseVisual(house) {
    const fill = house.el.querySelector('.courage-bar-fill');
    const badge = house.el.querySelector('.house-status-badge');
    if (fill) {
      const pct = Math.max(0, Math.min(100, (house.courage / house.maxCourage) * 100));
      fill.style.width = `${pct}%`;
    }
    if (badge) {
      if (house.lightsOn) {
        badge.textContent = '😱💡';
      } else if (house.courage < house.maxCourage * 0.5) {
        badge.textContent = '😨❗';
      } else {
        badge.textContent = '💤';
      }
    }
  }

  // =========================================================================
  // 11. SCREEN NAVIGATION (START <-> STORY <-> LAB <-> NIGHT VILLAGE)
  // =========================================================================
  function enterGameFromStart(withTutorial) {
    state.tutorialActive = withTutorial;
    state.tutorialStep = withTutorial ? 1 : 0;
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('top-bar').classList.remove('hidden');
    returnToLab();
    if (withTutorial) {
      openStoryIntro();
    }
  }

  function showStartScreen() {
    state.phase = 'START';
    document.getElementById('start-screen').classList.add('active');
    document.getElementById('lab-screen').classList.remove('active');
    document.getElementById('village-screen').classList.remove('active');
    document.getElementById('top-bar').classList.add('hidden');
    document.getElementById('tutorial-banner').classList.add('hidden');
    document.getElementById('story-modal').classList.add('hidden');
  }

  function startNightRaid() {
    state.phase = 'VILLAGE';
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('lab-screen').classList.remove('active');
    document.getElementById('village-screen').classList.add('active');
    document.getElementById('top-bar').classList.remove('hidden');
    document.getElementById('night-timer-pill').classList.remove('hidden');
    document.getElementById('active-atmosphere-banner').classList.add('hidden');
    document.getElementById('dawn-summary-toast').classList.add('hidden');

    state.nightTimeLeft = 45 + getTechLvl('D1') * 8;
    state.activeAtmosphere = null;
    state.monsters = [];
    state.props = [];
    state.nightEssenceEarned = 0;

    document.getElementById('village-monsters-layer').innerHTML = '';
    document.getElementById('village-vfx-layer').innerHTML = '';

    buildVillageHouses();

    state.cardsInHand = [];
    for (let i = 0; i < Math.max(1, state.monsterCardsCount); i++) {
      state.cardsInHand.push(createMonsterCardObject(i));
    }
    if (state.machinesUnlocked.atmosphere) {
      for (let i = 0; i < state.atmoCardsCount; i++) {
        state.cardsInHand.push(createAtmosphereCardObject(i));
      }
    }
    if (state.machinesUnlocked.prop) {
      for (let i = 0; i < state.propCardsCount; i++) {
        state.cardsInHand.push(createPropCardObject(i));
      }
    }

    if (state.tutorialActive && state.tutorialStep === 2) {
      state.tutorialStep = 3;
    }

    setHandState('TUCKED');
    renderCardFan();
    updateTopHud();
    updateTutorialUI();
  }

  function finishNightWithSummary() {
    const litCount = state.houses.filter((h) => h.lightsOn).length;
    const toast = document.getElementById('dawn-summary-toast');
    const stats = document.getElementById('dawn-stats');
    if (toast && stats) {
      stats.textContent = `🏠💡 ${litCount}/${state.houses.length} | +${state.nightEssenceEarned} 👻`;
      toast.classList.remove('hidden');
    }
    setTimeout(() => {
      if (toast) toast.classList.add('hidden');
      returnToLab();
    }, 1100);
  }

  function returnToLab() {
    state.phase = 'LAB';
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('village-screen').classList.remove('active');
    document.getElementById('lab-screen').classList.add('active');
    document.getElementById('top-bar').classList.remove('hidden');
    document.getElementById('night-timer-pill').classList.add('hidden');

    const baseCards = 3 + getTechLvl('A1') + getTechLvl('P1') * 2;
    if (state.monsterCardsCount < baseCards) {
      state.monsterCardsCount = baseCards;
    }
    if (state.machinesUnlocked.atmosphere && state.atmoCardsCount < 1) {
      state.atmoCardsCount = 1;
    }
    if (state.machinesUnlocked.prop && state.propCardsCount < 1) {
      state.propCardsCount = 1;
    }

    renderLabMachines();
    updateTopHud();
    updateTutorialUI();
  }

  // =========================================================================
  // 12. QUESTS, TECH TREE & ANGRY VILLAGER MOB PRESTIGE
  // =========================================================================
  function checkQuestsProgress() {
    if (!isModOn('functionalities.prestige_engine')) return;

    if (state.quests.housesLit >= 8 && !state.quests.housesLitClaimed) {
      state.quests.housesLitClaimed = true;
      state.torches += 1;
    }
    if (state.quests.krakensSpawned >= 2 && !state.quests.krakensClaimed) {
      state.quests.krakensClaimed = true;
      state.torches += 1;
    }
    if (state.quests.bossLit >= 1 && !state.quests.bossClaimed) {
      state.quests.bossClaimed = true;
      state.torches += 3;
    }

    const q1 = document.getElementById('q1-prog');
    const q2 = document.getElementById('q2-prog');
    const q3 = document.getElementById('q3-prog');
    if (q1) q1.textContent = `${Math.min(8, state.quests.housesLit)}/8`;
    if (q2) q2.textContent = `${Math.min(2, state.quests.krakensSpawned)}/2`;
    if (q3) q3.textContent = `${Math.min(1, state.quests.bossLit)}/1`;

    document.getElementById('quest-1')?.classList.toggle('done', state.quests.housesLitClaimed);
    document.getElementById('quest-2')?.classList.toggle('done', state.quests.krakensClaimed);
    document.getElementById('quest-3')?.classList.toggle('done', state.quests.bossClaimed);

    const mobBtn = document.getElementById('btn-mob-prestige');
    if (mobBtn && isModOn('buttons.trigger_mob_prestige')) {
      mobBtn.classList.toggle('hidden', state.torches < 1 && state.prestigeCount === 0);
    }
  }

  function triggerVillagerMobPrestige() {
    if (!isModOn('actions.villager_mob_raid')) return;
    playSfx('mob_raid_fire');

    const overlay = document.getElementById('mob-raid-overlay');
    overlay.classList.remove('hidden');

    setTimeout(() => {
      overlay.classList.add('hidden');
      state.prestigeCount++;
      state.coins = 40;
      state.essence = 0;

      TECH_NODES.forEach((n) => {
        if (!n.prestigeOnly) state.techLevels[n.id] = 0;
      });

      state.quests.housesLit = 0;
      state.quests.housesLitClaimed = false;
      state.quests.krakensSpawned = 0;
      state.quests.krakensClaimed = false;
      state.quests.bossLit = 0;
      state.quests.bossClaimed = false;

      state.monsterCardsCount = 3 + getTechLvl('P1') * 2;
      returnToLab();
      openTechTreeModal();
    }, 1700);
  }

  function getTechNodeCost(node) {
    const lvl = state.techLevels[node.id] || 0;
    return Math.round(node.baseCost * Math.pow(1.5, lvl));
  }

  function openTechTreeModal() {
    if (!isModOn('hud.tech_tree_modal')) return;
    document.getElementById('tech-tree-modal').classList.remove('hidden');
    renderTechTreeNodes();
  }

  function renderTechTreeNodes() {
    document.getElementById('tech-essence').textContent = String(Math.floor(state.essence));
    document.getElementById('tech-torches').textContent = String(Math.floor(state.torches));

    const container = document.getElementById('tech-nodes-container');
    container.innerHTML = '';

    TECH_NODES.forEach((node) => {
      if (node.prestigeOnly && state.prestigeCount === 0 && state.torches === 0) return;

      const lvl = state.techLevels[node.id] || 0;
      const isMax = lvl >= node.max;
      const cost = getTechNodeCost(node);
      const currIcon = node.currency === 'torches' ? '🔥' : '👻';

      const card = document.createElement('div');
      card.className = 'tech-node-card' + (node.prestigeOnly ? ' prestige-node' : '') + (isMax ? ' maxed' : '');
      card.innerHTML = `
        <div class="tech-icon">${node.icon}</div>
        <div class="tech-title">${node.title}</div>
        <div class="tech-meta">
          <span>L${lvl}/${node.max}</span>
          <b>${isMax ? 'MAX' : `${currIcon}${cost}`}</b>
        </div>
      `;

      card.addEventListener('click', () => {
        if (isMax) return;
        if (node.currency === 'essence' && state.essence >= cost) {
          state.essence -= cost;
          state.techLevels[node.id] = lvl + 1;
          playSfx('stitch_zap');
        } else if (node.currency === 'torches' && state.torches >= cost) {
          state.torches -= cost;
          state.techLevels[node.id] = lvl + 1;
          if (node.id === 'M2') {
            state.machinesUnlocked.atmosphere = true;
            state.atmoCardsCount = 1;
          }
          if (node.id === 'M3') {
            state.machinesUnlocked.prop = true;
            state.propCardsCount = 1;
          }
          playSfx('boss_scare_fanfare');
        }
        renderLabMachines();
        renderTechTreeNodes();
        updateTopHud();
      });

      container.appendChild(card);
    });
  }

  // =========================================================================
  // 13. DESIGNER MODE (`hx`) WITH STAGE CLICK-TO-SELECT
  // =========================================================================
  const HX_STORAGE_KEY = 'frankenscratcher_designer_hx_v3';
  let designerState = {
    transforms: {},
    hxStack: [],
    redoStack: []
  };

  function loadDesignerHx() {
    try {
      const raw = localStorage.getItem(HX_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        designerState.transforms = parsed.transforms || {};
        designerState.hxStack = parsed.hxStack || [];
      }
    } catch (_) {}
  }

  function saveDesignerHx() {
    try {
      localStorage.setItem(
        HX_STORAGE_KEY,
        JSON.stringify({
          transforms: designerState.transforms,
          hxStack: designerState.hxStack.slice(-40)
        })
      );
    } catch (_) {}
  }

  function applyTransformToElement(designId) {
    const el = document.querySelector(`[data-design-id="${designId}"]`);
    if (!el) return;
    const t = designerState.transforms[designId] || { scale: 1, x: 0, y: 0 };
    if (el.classList.contains('house-node') || designId === 'boss_clue_card') {
      el.style.transform = `translate(calc(-50% + ${t.x}px), calc(-50% + ${t.y}px)) scale(${t.scale})`;
    } else {
      el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.scale})`;
    }
  }

  function applyAllSavedDesignerTransforms() {
    if (!isModOn('functionalities.designer_mode')) return;
    Object.keys(designerState.transforms).forEach(applyTransformToElement);
  }

  function refreshDesignerDropdown() {
    const sel = document.getElementById('designer-target-select');
    if (!sel) return;
    const currentVal = sel.value;
    sel.innerHTML = '';
    document.querySelectorAll('[data-design-id]').forEach((el) => {
      const id = el.getAttribute('data-design-id');
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = id;
      sel.appendChild(opt);
    });
    if (currentVal && [...sel.options].some((o) => o.value === currentVal)) {
      sel.value = currentVal;
    }
    syncSlidersToSelectedTarget();
    renderHxLog();
  }

  function syncSlidersToSelectedTarget() {
    const sel = document.getElementById('designer-target-select');
    if (!sel || !sel.value) return;
    const t = designerState.transforms[sel.value] || { scale: 1, x: 0, y: 0 };
    document.getElementById('slider-scale').value = t.scale;
    document.getElementById('lbl-scale').textContent = Number(t.scale).toFixed(2);
    document.getElementById('slider-x').value = t.x;
    document.getElementById('lbl-x').textContent = String(t.x);
    document.getElementById('slider-y').value = t.y;
    document.getElementById('lbl-y').textContent = String(t.y);
  }

  function recordDesignerChange(id, nextTransform) {
    const prev = designerState.transforms[id] ? { ...designerState.transforms[id] } : { scale: 1, x: 0, y: 0 };
    designerState.transforms[id] = { ...nextTransform };
    designerState.hxStack.push({
      ts: new Date().toLocaleTimeString([], { hour12: false }),
      id,
      prev,
      next: { ...nextTransform }
    });
    designerState.redoStack = [];
    applyTransformToElement(id);
    saveDesignerHx();
    renderHxLog();
  }

  function renderHxLog() {
    const box = document.getElementById('hx-log-list');
    if (!box) return;
    if (designerState.hxStack.length === 0) {
      box.textContent = 'hx: empty';
      return;
    }
    box.innerHTML = designerState.hxStack
      .slice(-8)
      .reverse()
      .map((item) => `<div>[${item.ts}] ${item.id}: s=${item.next.scale} (${item.next.x},${item.next.y})</div>`)
      .join('');
  }

  // =========================================================================
  // 14. FIXED REVIEW STATES (`STATE_0` to `STATE_4`)
  // =========================================================================
  function closeAllModals() {
    document.getElementById('tech-tree-modal')?.classList.add('hidden');
    document.getElementById('monster-album-modal')?.classList.add('hidden');
    document.getElementById('checklist-modal')?.classList.add('hidden');
    document.getElementById('options-modal')?.classList.add('hidden');
    document.getElementById('credits-modal')?.classList.add('hidden');
    document.getElementById('story-modal')?.classList.add('hidden');
    document.getElementById('designer-panel')?.classList.add('hidden');
  }

  function loadFixedReviewState(stateName) {
    if (!isModOn('functionalities.fixed_state_snapshots')) return;
    stopPlaytesterAI();
    closeAllModals();

    if (stateName === 'STATE_0_BOOT') {
      // Pre-prestige Lab: ONLY 1 Machine available on the central brass pedestal!
      state.prestigeCount = 0;
      state.machinesUnlocked.atmosphere = false;
      state.machinesUnlocked.prop = false;
      state.techLevels['M2'] = 0;
      state.techLevels['M3'] = 0;
      state.coins = 40;
      state.essence = 10;
      state.torches = 0;
      state.monsterCardsCount = 4;
      state.selectedSetBias = 'mix';
      state.tutorialActive = true;
      state.tutorialStep = 1;
      returnToLab();
    } else if (stateName === 'STATE_1_TECH_TREE') {
      state.coins = 60;
      state.essence = 50;
      state.torches = 4;
      state.prestigeCount = 1;
      state.albumParts.franken = { head: true, torso: true, hands: true, legs: true };
      state.albumParts.kraken = { head: true, torso: true, hands: true, legs: true };
      returnToLab();
      document.getElementById('monster-album-modal').classList.remove('hidden');
      renderMonsterAlbumModal();
    } else if (stateName === 'STATE_2_NIGHT_FIRST_SCRATCH') {
      state.tutorialActive = false;
      state.monsterCardsCount = 5;
      state.selectedSetBias = 'mix';
      startNightRaid();
      setHandState('RAISED');
    } else if (stateName === 'STATE_3_MID_RAID_ACTION') {
      state.tutorialActive = false;
      state.monsterCardsCount = 5;
      state.selectedSetBias = 'mix';
      state.unlockedSets.vampire = true;
      state.unlockedSets.skeleton = true;
      state.machinesUnlocked.atmosphere = true;
      state.atmoCardsCount = 1;
      startNightRaid();
      activateAtmosphereEffect(ATMOSPHERE_TYPES[0]);
      // Light up 5 of the 15 houses and spawn 4 mixed hybrid monsters
      [1, 3, 5, 8, 12].forEach((idx) => {
        if (state.houses[idx]) turnHouseLightsOn(state.houses[idx]);
      });
      for (let i = 0; i < 4; i++) {
        spawnStitchedMonsterFromCard(createMonsterCardObject(90 + i));
      }
      setHandState('TUCKED');
    } else if (stateName === 'STATE_4_PRESTIGE_STRESS') {
      // Post-prestige Lab with extra machines unlocked via 🔥 Prestige Points!
      state.tutorialActive = false;
      state.prestigeCount = 2;
      state.torches = 6;
      state.essence = 80;
      state.machinesUnlocked.atmosphere = true;
      state.machinesUnlocked.prop = true;
      state.techLevels['M2'] = 1;
      state.techLevels['M3'] = 1;
      returnToLab();
    }
    updateTopHud();
  }

  // =========================================================================
  // 15. PLAYTESTER AI & AUDITOR LOOP
  // =========================================================================
  let aiInterval = null;
  function startPlaytesterAI(mode) {
    if (!isModOn('functionalities.playtester_ai')) return;
    stopPlaytesterAI();
    if (state.phase === 'START') enterGameFromStart(false);
    document.getElementById('story-modal')?.classList.add('hidden');

    aiInterval = setInterval(() => {
      if (state.phase === 'LAB') {
        if (mode === 'minmax') {
          state.selectedSetBias = 'kraken';
        }
        while (state.coins >= state.cardCost) {
          state.coins -= state.cardCost;
          state.monsterCardsCount++;
        }
        startNightRaid();
      } else if (state.phase === 'VILLAGE') {
        const nextIdx = state.cardsInHand.findIndex((c) => !c.completed);
        if (nextIdx !== -1) {
          if (state.handState !== 'FOCUSED_SCRATCH' || state.activeCardIndex !== nextIdx) {
            openCardForScratching(nextIdx);
          } else {
            const card = state.cardsInHand[nextIdx];
            card.zones.forEach((z) => revealZoneNow(card, z, null, null));
          }
        } else if (state.houses.every((h) => h.lightsOn)) {
          returnToLab();
        }
      }
      updateTopHud();
    }, 420);
  }

  function stopPlaytesterAI() {
    if (aiInterval) {
      clearInterval(aiInterval);
      aiInterval = null;
    }
  }

  let lastFrameTs = performance.now();
  let frameCount = 0;
  let fpsTimer = 0;
  let nightSubTimer = 0;

  function mainLoop(now) {
    const dt = Math.min(0.1, (now - lastFrameTs) / 1000);
    lastFrameTs = now;
    frameCount++;
    fpsTimer += dt;

    if (state.phase === 'VILLAGE') {
      state.monsters.forEach((m) => scareHouseTick(m, dt));

      if (state.props.length > 0) {
        const unscared = state.houses.filter((h) => !h.lightsOn);
        if (unscared.length > 0) {
          const target = unscared[0];
          target.courage = Math.max(0, target.courage - state.props.length * 10 * dt);
          updateHouseVisual(target);
          if (target.courage <= 0) turnHouseLightsOn(target);
        }
      }

      if (getTechLvl('P2') > 0 && state.handState === 'FOCUSED_SCRATCH') {
        const activeCard = state.cardsInHand[state.activeCardIndex];
        if (activeCard && !activeCard.completed) {
          activeCard.zones.forEach((z) => {
            z.scratchedPct += 45 * dt;
            if (z.scratchedPct >= 50) revealZoneNow(activeCard, z, null, null);
          });
        }
      }

      if (isModOn('actions.night_timer_cycle')) {
        nightSubTimer += dt;
        if (nightSubTimer >= 1.0) {
          nightSubTimer = 0;
          state.nightTimeLeft = Math.max(0, state.nightTimeLeft - 1);
          updateTopHud();
          if (state.nightTimeLeft <= 0) {
            finishNightWithSummary();
          }
        }
      }
    }

    if (fpsTimer >= 1.0) {
      const fps = Math.round(frameCount / fpsTimer);
      frameCount = 0;
      fpsTimer = 0;

      if (isModOn('functionalities.audit_profiler')) {
        const fpsEl = document.getElementById('audit-fps');
        const errEl = document.getElementById('audit-err');
        const txtEl = document.getElementById('audit-txt');
        if (fpsEl) fpsEl.textContent = String(fps);
        if (errEl) errEl.textContent = String(state.errorsCount);

        let bloated = 0;
        document.querySelectorAll('.game-btn, .quest-chip, .tech-title, .boss-phobia-pill').forEach((el) => {
          const words = (el.textContent || '').trim().split(/\s+/).filter(Boolean);
          if (words.length > 4) bloated++;
        });
        if (txtEl) txtEl.textContent = bloated === 0 ? 'OK' : `WARN(${bloated})`;
      }
    }

    requestAnimationFrame(mainLoop);
  }

  // =========================================================================
  // 16. UI BINDINGS & SAVE MANAGER
  // =========================================================================
  function syncModulesVisibility() {
    MODULE_TREE.forEach((mod) => {
      document.querySelectorAll(`[data-module="${mod.id}"]`).forEach((el) => {
        el.style.display = mod.enabled ? '' : 'none';
      });
    });
  }

  function renderChecklistModal() {
    const list = document.getElementById('module-tree-list');
    if (!list) return;
    list.innerHTML = '';
    MODULE_TREE.forEach((mod) => {
      const row = document.createElement('label');
      row.className = 'mod-item';
      row.innerHTML = `
        <input type="checkbox" ${mod.enabled ? 'checked' : ''} />
        <span>${mod.label}</span>
      `;
      const cb = row.querySelector('input');
      cb.addEventListener('change', () => {
        mod.enabled = cb.checked;
        syncModulesVisibility();
      });
      list.appendChild(row);
    });
  }

  function updateTopHud() {
    document.getElementById('val-coins').textContent = String(Math.floor(state.coins));
    document.getElementById('val-essence').textContent = String(Math.floor(state.essence));
    document.getElementById('val-torches').textContent = String(Math.floor(state.torches));
    document.getElementById('val-timer').textContent = `${state.nightTimeLeft}s`;
    document.getElementById('val-monster-cards').textContent = String(state.monsterCardsCount);
    document.getElementById('val-card-cost').textContent = String(state.cardCost);

    const extraAtmo = state.machinesUnlocked.atmosphere ? state.atmoCardsCount : 0;
    const extraProp = state.machinesUnlocked.prop ? state.propCardsCount : 0;
    const totalNightCards = state.monsterCardsCount + extraAtmo + extraProp;
    document.getElementById('start-cards-tag').textContent = `🃏 ${totalNightCards}`;
    document.getElementById('album-prog-tag').textContent = `${getMasteredSetsCount()}/${MONSTER_SETS.length} ⭐`;

    const dialIcon = document.getElementById('dial-icon');
    if (dialIcon) {
      if (state.selectedSetBias === 'mix') {
        dialIcon.textContent = 'Mix All';
      } else {
        const mset = MONSTER_SETS.find((s) => s.id === state.selectedSetBias) || MONSTER_SETS[0];
        dialIcon.textContent = mset.name;
      }
    }
    checkQuestsProgress();
  }

  function initEvents() {
    // Starting Title Screen Buttons
    document.getElementById('btn-play-tutorial').addEventListener('click', () => enterGameFromStart(true));
    document.getElementById('btn-play-notut').addEventListener('click', () => enterGameFromStart(false));
    document.getElementById('btn-home-menu').addEventListener('click', showStartScreen);
    document.getElementById('btn-skip-tut').addEventListener('click', () => {
      state.tutorialActive = false;
      updateTutorialUI();
    });

    // Story Intro Controls
    document.getElementById('btn-next-story').addEventListener('click', () => {
      playSfx('scratch_foil');
      if (state.storySlideIndex < STORY_SLIDES.length - 1) {
        state.storySlideIndex++;
        renderStorySlide();
      } else {
        document.getElementById('story-modal').classList.add('hidden');
        updateTutorialUI();
      }
    });
    document.getElementById('btn-skip-story').addEventListener('click', () => {
      document.getElementById('story-modal').classList.add('hidden');
      updateTutorialUI();
    });
    document.getElementById('btn-replay-story').addEventListener('click', () => {
      document.getElementById('options-modal').classList.add('hidden');
      openStoryIntro();
    });

    // Options & Credits Modals
    document.getElementById('btn-open-options').addEventListener('click', () => {
      document.getElementById('options-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-options').addEventListener('click', () => {
      document.getElementById('options-modal').classList.add('hidden');
    });
    document.getElementById('btn-open-credits').addEventListener('click', () => {
      document.getElementById('credits-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-credits').addEventListener('click', () => {
      document.getElementById('credits-modal').classList.add('hidden');
    });

    document.getElementById('opt-sfx').addEventListener('change', (e) => {
      state.sfxOn = e.target.checked;
    });
    document.getElementById('opt-haptics').addEventListener('change', (e) => {
      state.hapticsOn = e.target.checked;
    });

    document.getElementById('btn-export-save').addEventListener('click', () => {
      const box = document.getElementById('save-io-box');
      const payload = btoa(
        JSON.stringify({
          coins: state.coins,
          essence: state.essence,
          torches: state.torches,
          prestigeCount: state.prestigeCount,
          machinesUnlocked: state.machinesUnlocked,
          unlockedSets: state.unlockedSets,
          albumParts: state.albumParts,
          techLevels: state.techLevels
        })
      );
      box.value = payload;
      box.select();
    });

    document.getElementById('btn-import-save').addEventListener('click', () => {
      try {
        const raw = atob(document.getElementById('save-io-box').value.trim());
        const data = JSON.parse(raw);
        Object.assign(state, data);
        renderLabMachines();
        updateTopHud();
      } catch (_) {}
    });

    document.getElementById('btn-hard-reset').addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });

    // Lab Machine 1 Controls
    document.getElementById('btn-buy-card').addEventListener('click', () => {
      if (state.coins >= state.cardCost) {
        state.coins -= state.cardCost;
        state.monsterCardsCount++;
        playSfx('scratch_foil');
        if (state.tutorialActive && state.tutorialStep === 1) {
          state.tutorialStep = 2;
        }
        updateTopHud();
        updateTutorialUI();
      }
    });

    document.getElementById('btn-phobia-dial').addEventListener('click', () => {
      const unlocked = ['mix', ...getUnlockedSetIds()];
      const next = unlocked[(unlocked.indexOf(state.selectedSetBias) + 1) % unlocked.length];
      state.selectedSetBias = next;
      playSfx('scratch_foil');
      updateTopHud();
    });

    // Monster Pack Album Modal
    document.getElementById('btn-open-album').addEventListener('click', () => {
      renderMonsterAlbumModal();
      document.getElementById('monster-album-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-album').addEventListener('click', () => {
      document.getElementById('monster-album-modal').classList.add('hidden');
    });

    // Tech Tree Modal
    document.getElementById('btn-open-tech').addEventListener('click', openTechTreeModal);
    document.getElementById('btn-close-tech').addEventListener('click', () => {
      document.getElementById('tech-tree-modal').classList.add('hidden');
    });

    document.getElementById('btn-mob-prestige').addEventListener('click', triggerVillagerMobPrestige);
    document.getElementById('btn-start-night').addEventListener('click', startNightRaid);
    document.getElementById('btn-retreat-lab').addEventListener('click', returnToLab);

    // 4-State Bottom Card Hand Interactions
    document.getElementById('card-hand-handle').addEventListener('click', () => {
      if (state.handState === 'TUCKED') {
        setHandState('RAISED');
      } else {
        setHandState('TUCKED');
      }
    });

    document.getElementById('btn-tuck-card').addEventListener('click', () => {
      setHandState('TUCKED');
    });

    // Elements Checklist Modal
    document.getElementById('btn-checklist').addEventListener('click', () => {
      renderChecklistModal();
      document.getElementById('checklist-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-checklist').addEventListener('click', () => {
      document.getElementById('checklist-modal').classList.add('hidden');
    });
    document.getElementById('btn-enable-all-mods').addEventListener('click', () => {
      MODULE_TREE.forEach((m) => (m.enabled = true));
      renderChecklistModal();
      syncModulesVisibility();
    });
    document.getElementById('btn-simple-mods').addEventListener('click', () => {
      MODULE_TREE.forEach((m) => (m.enabled = m.simple));
      renderChecklistModal();
      syncModulesVisibility();
    });

    // Designer Mode (hx)
    document.getElementById('btn-designer').addEventListener('click', () => {
      document.getElementById('dev-panel').classList.add('hidden');
      const p = document.getElementById('designer-panel');
      p.classList.toggle('hidden');
      if (!p.classList.contains('hidden')) refreshDesignerDropdown();
    });
    document.getElementById('btn-close-designer').addEventListener('click', () => {
      document.getElementById('designer-panel').classList.add('hidden');
    });

    document.getElementById('app-shell').addEventListener(
      'click',
      (e) => {
        const panel = document.getElementById('designer-panel');
        if (panel.classList.contains('hidden')) return;
        if (panel.contains(e.target) || document.getElementById('top-bar').contains(e.target)) return;
        const targetEl = e.target.closest('[data-design-id]');
        if (targetEl) {
          const id = targetEl.getAttribute('data-design-id');
          const sel = document.getElementById('designer-target-select');
          refreshDesignerDropdown();
          sel.value = id;
          syncSlidersToSelectedTarget();
        }
      },
      true
    );

    const targetSelect = document.getElementById('designer-target-select');
    targetSelect.addEventListener('change', syncSlidersToSelectedTarget);

    const onSliderInput = () => {
      const id = targetSelect.value;
      if (!id) return;
      const next = {
        scale: parseFloat(document.getElementById('slider-scale').value),
        x: parseInt(document.getElementById('slider-x').value, 10),
        y: parseInt(document.getElementById('slider-y').value, 10)
      };
      document.getElementById('lbl-scale').textContent = next.scale.toFixed(2);
      document.getElementById('lbl-x').textContent = String(next.x);
      document.getElementById('lbl-y').textContent = String(next.y);
      recordDesignerChange(id, next);
    };

    document.getElementById('slider-scale').addEventListener('input', onSliderInput);
    document.getElementById('slider-x').addEventListener('input', onSliderInput);
    document.getElementById('slider-y').addEventListener('input', onSliderInput);

    document.getElementById('btn-hx-undo').addEventListener('click', () => {
      const last = designerState.hxStack.pop();
      if (!last) return;
      designerState.redoStack.push(last);
      designerState.transforms[last.id] = { ...last.prev };
      applyTransformToElement(last.id);
      saveDesignerHx();
      syncSlidersToSelectedTarget();
      renderHxLog();
    });

    document.getElementById('btn-hx-redo').addEventListener('click', () => {
      const next = designerState.redoStack.pop();
      if (!next) return;
      designerState.hxStack.push(next);
      designerState.transforms[next.id] = { ...next.next };
      applyTransformToElement(next.id);
      saveDesignerHx();
      syncSlidersToSelectedTarget();
      renderHxLog();
    });

    document.getElementById('btn-hx-reset-one').addEventListener('click', () => {
      const id = targetSelect.value;
      if (!id) return;
      recordDesignerChange(id, { scale: 1, x: 0, y: 0 });
      syncSlidersToSelectedTarget();
    });

    document.getElementById('btn-hx-reset-all').addEventListener('click', () => {
      Object.keys(designerState.transforms).forEach((id) => {
        designerState.transforms[id] = { scale: 1, x: 0, y: 0 };
        applyTransformToElement(id);
      });
      designerState.hxStack = [];
      designerState.redoStack = [];
      saveDesignerHx();
      syncSlidersToSelectedTarget();
      renderHxLog();
    });

    // Dev & Fixed States Panel
    document.getElementById('btn-dev-tools').addEventListener('click', () => {
      document.getElementById('designer-panel').classList.add('hidden');
      document.getElementById('dev-panel').classList.toggle('hidden');
    });
    document.getElementById('btn-close-dev').addEventListener('click', () => {
      document.getElementById('dev-panel').classList.add('hidden');
    });

    document.querySelectorAll('[data-state]').forEach((btn) => {
      btn.addEventListener('click', () => {
        loadFixedReviewState(btn.getAttribute('data-state'));
      });
    });

    document.getElementById('btn-ai-scratcher').addEventListener('click', () => startPlaytesterAI('scratcher'));
    document.getElementById('btn-ai-minmax').addEventListener('click', () => startPlaytesterAI('minmax'));
    document.getElementById('btn-ai-stop').addEventListener('click', stopPlaytesterAI);
  }

  window.FrankenScratcher = {
    state,
    MODULE_TREE,
    MONSTER_SETS,
    loadFixedReviewState,
    startPlaytesterAI,
    stopPlaytesterAI,
    enterGameFromStart,
    openCardForScratching,
    setHandState
  };

  loadDesignerHx();
  initEvents();
  syncModulesVisibility();
  renderLabMachines();
  applyAllSavedDesignerTransforms();
  updateTopHud();
  requestAnimationFrame(mainLoop);
})();
