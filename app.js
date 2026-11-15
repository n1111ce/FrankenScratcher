// FrankenScratcher — Core Modular Engine (Iteration 1)
(() => {
  'use strict';

  // =========================================================================
  // 1. ELEMENTS CHECKLIST TREE REGISTRY
  // =========================================================================
  const MODULE_TREE = [
    { id: 'hud.top_bar', label: '/hud/top_bar', enabled: true, simple: true },
    { id: 'hud.lab_screen', label: '/hud/lab_screen', enabled: true, simple: true },
    { id: 'hud.quest_stamps', label: '/hud/quest_stamps', enabled: true, simple: false },
    { id: 'hud.tech_tree_modal', label: '/hud/tech_tree_modal', enabled: true, simple: false },
    { id: 'hud.village_map', label: '/hud/village_map', enabled: true, simple: true },
    { id: 'hud.card_scratch_dock', label: '/hud/card_scratch_dock', enabled: true, simple: true },
    { id: 'hud.module_tree_modal', label: '/hud/module_tree_modal', enabled: true, simple: true },
    { id: 'hud.designer_panel', label: '/hud/designer_panel', enabled: true, simple: true },
    { id: 'buttons.buy_card', label: '/buttons/buy_card', enabled: true, simple: true },
    { id: 'buttons.open_tech_tree', label: '/buttons/open_tech_tree', enabled: true, simple: false },
    { id: 'buttons.phobia_dial', label: '/buttons/phobia_dial', enabled: true, simple: false },
    { id: 'buttons.trigger_mob_prestige', label: '/buttons/trigger_mob_prestige', enabled: true, simple: false },
    { id: 'buttons.start_night', label: '/buttons/start_night', enabled: true, simple: true },
    { id: 'buttons.preset_state_loader', label: '/buttons/preset_state_loader', enabled: true, simple: true },
    { id: 'characters.card_4zones', label: '/characters/card_4zones', enabled: true, simple: true },
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
  // 2. PROCEDURAL WEBAUDIO SYNTHESIZER (Zero External Audio Dependencies)
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
    if (!isModOn(`sounds.${type}`)) return;
    try {
      ensureAudio();
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'scratch_foil') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520 + Math.random() * 280, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'stitch_zap') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        if (isModOn('sounds.haptics') && navigator.vibrate) navigator.vibrate(25);
      } else if (type === 'window_scare_pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.16);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'boss_scare_fanfare') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(1046.5, now + 0.2);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'mob_raid_fire') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      }
    } catch (_) {}
  }

  // =========================================================================
  // 3. TECH TREE & PRESTIGE DEFINITIONS (Minimal Text — Max 3 Words!)
  // =========================================================================
  const TECH_NODES = [
    // Normal Lab Tech Tree (Costs Scream Essence 👻)
    { id: 'A1', icon: '🃏+1', title: 'Card Hopper', branch: 'A', max: 5, baseCost: 5, currency: 'essence' },
    { id: 'B1', icon: '🪙🔍', title: 'Big Scratch', branch: 'B', max: 5, baseCost: 5, currency: 'essence' },
    { id: 'B2', icon: '⚡〰️', title: 'Quick Foil', branch: 'B', max: 3, baseCost: 8, currency: 'essence' },
    { id: 'B4', icon: '✨🃏', title: 'Holo Parts', branch: 'B', max: 5, baseCost: 10, currency: 'essence' },
    { id: 'C2', icon: '🐙🧪', title: 'Kraken Vat', branch: 'C', max: 3, baseCost: 6, currency: 'essence' },
    { id: 'C5', icon: '🧬🎯', title: 'Phobia Dial', branch: 'C', max: 3, baseCost: 8, currency: 'essence' },
    { id: 'D1', icon: '🌙⏱️', title: 'Longer Night', branch: 'D', max: 5, baseCost: 6, currency: 'essence' },
    { id: 'D3', icon: '💡💥', title: 'Chain Scare', branch: 'D', max: 3, baseCost: 12, currency: 'essence' },

    // Expanded Prestige Tech Tree (Unlocked after Angry Mob Raid! Costs 🔥 Torches)
    { id: 'P1', icon: '🔥🏦', title: '2x👻 & +3🃏', branch: 'P', max: 3, baseCost: 1, currency: 'torches', prestigeOnly: true },
    { id: 'P2', icon: '🤖〰️', title: 'Auto-Laser', branch: 'P', max: 1, baseCost: 2, currency: 'torches', prestigeOnly: true },
    { id: 'P3', icon: '👯🧟', title: 'Twin Spawn', branch: 'P', max: 2, baseCost: 2, currency: 'torches', prestigeOnly: true },
    { id: 'P4', icon: '⭐🃏', title: '5th Slot', branch: 'P', max: 1, baseCost: 3, currency: 'torches', prestigeOnly: true }
  ];

  // Village Houses Layout matching `assets/village_night.jpg` coordinates (% of stage)
  const VILLAGE_LAYOUT = [
    // Central Sailor Boss House
    { id: 'boss_0', isBoss: true, x: 50, y: 31, maxCourage: 240, phobia: 'kraken' },
    // 6 Outer Sleeping Cottages
    { id: 'house_1', isBoss: false, x: 24, y: 42, maxCourage: 45 },
    { id: 'house_2', isBoss: false, x: 77, y: 42, maxCourage: 45 },
    { id: 'house_3', isBoss: false, x: 14, y: 58, maxCourage: 55 },
    { id: 'house_4', isBoss: false, x: 86, y: 58, maxCourage: 55 },
    { id: 'house_5', isBoss: false, x: 37, y: 65, maxCourage: 65 },
    { id: 'house_6', isBoss: false, x: 64, y: 65, maxCourage: 65 }
  ];

  // =========================================================================
  // 4. GAME STATE
  // =========================================================================
  const state = {
    phase: 'LAB', // 'LAB' | 'VILLAGE'
    coins: 30,
    essence: 0,
    torches: 0,
    prestigeCount: 0,
    deckCount: 3,
    cardCost: 10,
    phobiaBias: 'balanced', // 'balanced' | 'kraken' | 'franken'
    techLevels: {},
    quests: {
      housesLit: 0,
      housesLitClaimed: false,
      krakensSpawned: 0,
      krakensClaimed: false,
      bossLit: 0,
      bossClaimed: false
    },
    // Night Raid runtime state
    nightTimeLeft: 45,
    handState: 'TUCKED', // 'TUCKED' | 'RAISED' | 'FOCUSED_SCRATCH'
    cardsInHand: [],
    activeCardIndex: -1,
    houses: [],
    monsters: [],
    errorsCount: 0
  };

  TECH_NODES.forEach((n) => {
    state.techLevels[n.id] = 0;
  });

  const getTechLvl = (id) => (isModOn('functionalities.tech_tree_engine') ? (state.techLevels[id] || 0) : 0);

  // =========================================================================
  // 5. CARD DECK & 4-ZONE SCRATCH SYSTEM
  // =========================================================================
  function generatePartFamily() {
    let krakenChance = 0.35 + getTechLvl('C2') * 0.12;
    if (state.phobiaBias === 'kraken') {
      krakenChance += 0.25 + getTechLvl('C5') * 0.12;
    } else if (state.phobiaBias === 'franken') {
      krakenChance = 0.15;
    }
    return Math.random() < Math.min(0.9, krakenChance) ? 'kraken' : 'franken';
  }

  function createCardObject(idx) {
    const has5th = getTechLvl('P4') > 0;
    const holoChance = getTechLvl('B4') * 0.08;
    const slots = ['head', 'torso', 'hands', 'legs'];
    if (has5th) slots.push('aura');

    const zones = slots.map((slotType) => {
      const family = generatePartFamily();
      const isHolo = Math.random() < holoChance;
      return {
        slotType,
        family, // 'kraken' | 'franken'
        isHolo,
        scratchedPct: 0,
        revealed: false
      };
    });

    return { id: `card_${Date.now()}_${idx}`, zones, completed: false };
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
      promptIcon.textContent = '👆 🃏';
    } else if (newState === 'RAISED') {
      dock.classList.add('hand-state-raised');
      fan.classList.remove('hidden');
      focused.classList.add('hidden');
      promptIcon.textContent = '👇 🃏';
    } else if (newState === 'FOCUSED_SCRATCH') {
      dock.classList.add('hand-state-focused');
      fan.classList.add('hidden');
      focused.classList.remove('hidden');
      promptIcon.textContent = '🪙 〰️';
    }
  }

  function renderCardFan() {
    const fan = document.getElementById('card-fan-container');
    const leftBadge = document.getElementById('hand-cards-left');
    const remaining = state.cardsInHand.filter((c) => !c.completed);
    leftBadge.textContent = String(remaining.length);
    fan.innerHTML = '';

    if (remaining.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.style.opacity = '0.7';
      emptyMsg.style.fontWeight = '900';
      emptyMsg.textContent = '🃏 0';
      fan.appendChild(emptyMsg);
      return;
    }

    state.cardsInHand.forEach((card, idx) => {
      if (card.completed) return;
      const el = document.createElement('div');
      el.className = 'mini-scratch-card';
      el.innerHTML = `
        <div class="mini-card-grid">
          <div class="mini-foil-dot">🙂</div>
          <div class="mini-foil-dot">👕</div>
          <div class="mini-foil-dot">🖐️</div>
          <div class="mini-foil-dot">🦵</div>
        </div>
        <span style="font-size:0.75rem;font-weight:900;">#${idx + 1}</span>
      `;
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
    const fam = zone.family;
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
    return '⭐';
  }

  function openCardForScratching(cardIdx) {
    if (!isModOn('characters.card_4zones')) return;
    state.activeCardIndex = cardIdx;
    setHandState('FOCUSED_SCRATCH');

    const card = state.cardsInHand[cardIdx];
    const grid = document.getElementById('scratch-zones-grid');
    grid.innerHTML = '';

    const revealThreshold = Math.max(25, 58 - getTechLvl('B2') * 10);
    const brushRadius = 22 + getTechLvl('B1') * 6;

    card.zones.forEach((zone) => {
      const slot = document.createElement('div');
      slot.className = 'scratch-slot' + (zone.isHolo ? ' foil-holo' : '') + (zone.revealed ? ' scratched-done' : '');

      const img = document.createElement('img');
      img.className = 'revealed-part-img';
      img.src = getZonePartAsset(zone);
      img.alt = zone.slotType;

      const badge = document.createElement('span');
      badge.className = 'part-phobia-badge';
      badge.textContent = (zone.family === 'kraken' ? '🐙' : '🧟') + (zone.isHolo ? '✨' : '');

      slot.appendChild(img);
      slot.appendChild(badge);

      if (!zone.revealed) {
        const canvas = document.createElement('canvas');
        canvas.className = 'scratch-foil-canvas';
        canvas.width = 150;
        canvas.height = 104;
        slot.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        // Draw tactile metallic silver foil with anatomical silhouette
        const grad = ctx.createLinearGradient(0, 0, 150, 104);
        grad.addColorStop(0, '#dee2e6');
        grad.addColorStop(0.5, '#adb5bd');
        grad.addColorStop(1, '#868e96');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 150, 104);

        // Diagonal metallic sheen stripes
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = 6;
        for (let i = -100; i < 220; i += 28) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + 60, 104);
          ctx.stroke();
        }

        // Silhouette icon etched in center of foil
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(30,35,55,0.65)';
        ctx.fillText(getZoneSilhouetteIcon(zone.slotType), 75, 52);

        const scratchAt = (clientX, clientY) => {
          if (!isModOn('actions.foil_scratch') || zone.revealed) return;
          const rect = canvas.getBoundingClientRect();
          const x = ((clientX - rect.left) / rect.width) * canvas.width;
          const y = ((clientY - rect.top) / rect.height) * canvas.height;
          if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;

          ctx.globalCompositeOperation = 'destination-out';
          ctx.beginPath();
          ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
          ctx.fill();

          zone.scratchedPct = Math.min(100, zone.scratchedPct + 9 + getTechLvl('B1') * 2.5);
          playSfx('scratch_foil');

          if (zone.scratchedPct >= revealThreshold) {
            zone.revealed = true;
            canvas.remove();
            slot.classList.add('scratched-done');
            checkCardCompletion(card);
          }
        };

        canvas.addEventListener('pointerdown', (e) => {
          canvas.setPointerCapture(e.pointerId);
          scratchAt(e.clientX, e.clientY);
        });
        canvas.addEventListener('pointermove', (e) => {
          if (e.buttons > 0 || e.pointerType === 'touch') {
            scratchAt(e.clientX, e.clientY);
          }
        });
      }

      grid.appendChild(slot);
    });
  }

  function checkCardCompletion(card) {
    if (card.completed) return;
    if (card.zones.every((z) => z.revealed)) {
      card.completed = true;
      playSfx('stitch_zap');

      // Brief delay so player sees the 4 revealed parts, then auto-tuck & spawn monster!
      setTimeout(() => {
        setHandState('TUCKED');
        renderCardFan();
        if (isModOn('actions.monster_stitch_spawn')) {
          spawnStitchedMonsterFromCard(card);
          // Prestige P3: Twin-Monster Press chance!
          const twinLvl = getTechLvl('P3');
          if (twinLvl > 0 && Math.random() < twinLvl * 0.5) {
            setTimeout(() => spawnStitchedMonsterFromCard(card), 260);
          }
        }
      }, 280);
    }
  }

  // =========================================================================
  // 6. STITCHED MONSTER SPAWN & "POP FROM UNDER + WIGGLE" HOUSE SCARING
  // =========================================================================
  function spawnStitchedMonsterFromCard(card) {
    if (!isModOn('characters.stitched_monster')) return;

    const headZone = card.zones.find((z) => z.slotType === 'head') || card.zones[0];
    const torsoZone = card.zones.find((z) => z.slotType === 'torso') || card.zones[1];
    const handsZone = card.zones.find((z) => z.slotType === 'hands') || card.zones[2];
    const legsZone = card.zones.find((z) => z.slotType === 'legs') || card.zones[3];

    const krakenPartsCount = card.zones.filter((z) => z.family === 'kraken').length;
    const holoCount = card.zones.filter((z) => z.isHolo).length;

    // Quest 2 tracker: Kraken-head monsters spawned
    if (headZone.family === 'kraken') {
      state.quests.krakensSpawned++;
      checkQuestsProgress();
    }

    // Full-set synergy bonus
    const allSame = card.zones.every((z) => z.family === headZone.family);
    const synergyMult = allSame ? 1.6 : 1.0;
    const holoMult = 1 + holoCount * 0.5;
    const baseScareDmg = Math.round(14 * synergyMult * holoMult * (1 + getTechLvl('C2') * 0.2));

    const slotEl = document.createElement('div');
    slotEl.className = 'monster-pop-slot';

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
      targetHouseId: null,
      hopCooldown: 0
    };

    state.monsters.push(monster);
    assignMonsterToNextHouse(monster);
  }

  function assignMonsterToNextHouse(monster) {
    // Prefer unscared outer houses first, then Central Boss House
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

    // Position the monster right under the target house's window ledge!
    const offsetX = (Math.random() - 0.5) * 26;
    monster.el.style.left = `${target.x + offsetX * 0.25}%`;
    monster.el.style.top = `${target.y + (target.isBoss ? 8 : 6)}%`;

    // Re-trigger pop-up from under animation!
    const puppet = monster.el.querySelector('.monster-puppet');
    if (puppet) {
      puppet.style.animation = 'none';
      void puppet.offsetWidth;
      puppet.style.animation = 'popFromUnder 0.42s cubic-bezier(0.22, 1.35, 0.5, 1) forwards';
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

    // Boss Phobia Multiplier: Sailor Boss House takes 3x from Kraken parts!
    let mult = 1.0;
    if (house.isBoss) {
      if (monster.headFamily === 'kraken' || monster.krakenPartsCount >= 2) {
        mult = 3.0;
      } else {
        mult = 0.5;
      }
    }

    // House defenses reduction if enabled
    if (isModOn('characters.house_defenses') && house.hasDefense) {
      mult *= 0.65;
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

    const essenceMult = 1 + getTechLvl('P1');
    if (house.isBoss) {
      playSfx('boss_scare_fanfare');
      const coinGain = 45;
      const essGain = 15 * essenceMult;
      state.coins += coinGain;
      state.essence += essGain;
      state.quests.bossLit = 1;
      spawnFloatingVfx(house.x, house.y - 6, `😱💡 +${essGain}👻 +${coinGain}🪙`);
    } else {
      playSfx('window_scare_pop');
      const coinGain = 12;
      const essGain = 4 * essenceMult;
      state.coins += coinGain;
      state.essence += essGain;
      state.quests.housesLit++;
      spawnFloatingVfx(house.x, house.y - 4, `💡 +${essGain}👻`);

      // Tech D3: Chain Panic shockwave to neighbor houses!
      const chainLvl = getTechLvl('D3');
      if (chainLvl > 0) {
        state.houses.forEach((other) => {
          if (!other.lightsOn && other.id !== house.id) {
            other.courage = Math.max(0, other.courage - other.maxCourage * (0.12 * chainLvl));
            updateHouseVisual(other);
          }
        });
      }
    }

    updateHouseVisual(house);
    checkQuestsProgress();
    updateTopHud();
  }

  // =========================================================================
  // 7. VILLAGE SETUP & RENDERING
  // =========================================================================
  function buildVillageHouses() {
    const layer = document.getElementById('village-houses-layer');
    layer.innerHTML = '';
    state.houses = [];

    VILLAGE_LAYOUT.forEach((cfg, idx) => {
      if (cfg.isBoss && !isModOn('characters.boss_house')) return;
      if (!cfg.isBoss && !isModOn('characters.outer_houses')) return;

      const el = document.createElement('div');
      el.className = 'house-node' + (cfg.isBoss ? ' boss-house' : '');
      el.style.left = `${cfg.x}%`;
      el.style.top = `${cfg.y}%`;
      el.setAttribute('data-design-id', cfg.id);

      const hasDefense = isModOn('characters.house_defenses') && idx % 2 === 1;

      el.innerHTML = `
        ${cfg.isBoss ? `<div class="boss-phobia-pill">⚓😱👉🐙x3</div>` : ''}
        <div class="house-status-badge">💤</div>
        <div class="house-windows">
          <div class="win-pane"></div>
          <div class="win-pane"></div>
          ${cfg.isBoss ? '<div class="win-pane"></div>' : ''}
        </div>
        ${hasDefense ? '<div class="house-defense-badge">🐕🏮</div>' : ''}
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
        hasDefense,
        el
      });
    });

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
  // 8. PHASE TRANSITIONS (LAB <-> NIGHT VILLAGE)
  // =========================================================================
  function startNightRaid() {
    state.phase = 'VILLAGE';
    document.getElementById('lab-screen').classList.remove('active');
    document.getElementById('village-screen').classList.add('active');
    document.getElementById('night-timer-pill').classList.remove('hidden');

    state.nightTimeLeft = 45 + getTechLvl('D1') * 8;
    state.monsters = [];
    document.getElementById('village-monsters-layer').innerHTML = '';
    document.getElementById('village-vfx-layer').innerHTML = '';

    buildVillageHouses();

    // Generate Scratch Cards for the Night
    const totalCards = Math.max(1, state.deckCount);
    state.cardsInHand = [];
    for (let i = 0; i < totalCards; i++) {
      state.cardsInHand.push(createCardObject(i));
    }

    setHandState('TUCKED');
    renderCardFan();
    updateTopHud();
  }

  function returnToLab() {
    state.phase = 'LAB';
    document.getElementById('village-screen').classList.remove('active');
    document.getElementById('lab-screen').classList.add('active');
    document.getElementById('night-timer-pill').classList.add('hidden');

    // Replenish base nightly cards
    const baseCards = 3 + getTechLvl('A1') + getTechLvl('P1') * 3;
    if (state.deckCount < baseCards) {
      state.deckCount = baseCards;
    }
    updateTopHud();
  }

  // =========================================================================
  // 9. QUESTS, TECH TREE & ANGRY VILLAGER MOB PRESTIGE
  // =========================================================================
  function checkQuestsProgress() {
    if (!isModOn('functionalities.prestige_engine')) return;

    if (state.quests.housesLit >= 6 && !state.quests.housesLitClaimed) {
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
    if (q1) q1.textContent = `${Math.min(6, state.quests.housesLit)}/6`;
    if (q2) q2.textContent = `${Math.min(2, state.quests.krakensSpawned)}/2`;
    if (q3) q3.textContent = `${Math.min(1, state.quests.bossLit)}/1`;

    document.getElementById('quest-1')?.classList.toggle('done', state.quests.housesLitClaimed);
    document.getElementById('quest-2')?.classList.toggle('done', state.quests.krakensClaimed);
    document.getElementById('quest-3')?.classList.toggle('done', state.quests.bossClaimed);

    // Show Angry Villager Mob Raid Prestige Button when player has >= 1 Torch!
    const mobBtn = document.getElementById('btn-mob-prestige');
    if (mobBtn && isModOn('buttons.trigger_mob_prestige')) {
      mobBtn.classList.toggle('hidden', state.torches < 1);
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
      state.coins = 30;
      state.essence = 0;

      // Reset standard tech nodes, keep Prestige P-nodes
      TECH_NODES.forEach((n) => {
        if (!n.prestigeOnly) state.techLevels[n.id] = 0;
      });

      // Reset repeatable quest counters so player can earn more Torches
      state.quests.housesLit = 0;
      state.quests.housesLitClaimed = false;
      state.quests.krakensSpawned = 0;
      state.quests.krakensClaimed = false;
      state.quests.bossLit = 0;
      state.quests.bossClaimed = false;

      state.deckCount = 3 + getTechLvl('P1') * 3;
      returnToLab();
      openTechTreeModal();
    }, 1800);
  }

  function getTechNodeCost(node) {
    const lvl = state.techLevels[node.id] || 0;
    return Math.round(node.baseCost * Math.pow(1.5, lvl));
  }

  function openTechTreeModal() {
    if (!isModOn('hud.tech_tree_modal')) return;
    const modal = document.getElementById('tech-tree-modal');
    modal.classList.remove('hidden');
    renderTechTreeNodes();
  }

  function renderTechTreeNodes() {
    document.getElementById('tech-essence').textContent = String(state.essence);
    document.getElementById('tech-torches').textContent = String(state.torches);

    const container = document.getElementById('tech-nodes-container');
    container.innerHTML = '';

    TECH_NODES.forEach((node) => {
      // Prestige nodes appear after first Villager Mob Raid or when player has Torches
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
          playSfx('boss_scare_fanfare');
        }
        renderTechTreeNodes();
        updateTopHud();
      });

      container.appendChild(card);
    });
  }

  // =========================================================================
  // 10. DESIGNER MODE WITH PERSISTENT HISTORY (`hx`)
  // =========================================================================
  const HX_STORAGE_KEY = 'frankenscratcher_designer_hx_v1';
  let designerState = {
    transforms: {}, // { [designId]: { scale: 1, x: 0, y: 0 } }
    hxStack: [], // Array of { ts, id, prev, next }
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
    el.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.scale})`;
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
  // 11. FIXED REVIEW STATES (`STATE_0` to `STATE_4`)
  // =========================================================================
  function loadFixedReviewState(stateName) {
    if (!isModOn('functionalities.fixed_state_snapshots')) return;
    stopPlaytesterAI();
    document.getElementById('tech-tree-modal').classList.add('hidden');
    document.getElementById('checklist-modal').classList.add('hidden');

    if (stateName === 'STATE_0_BOOT') {
      state.coins = 30;
      state.essence = 0;
      state.torches = 0;
      state.deckCount = 3;
      state.phobiaBias = 'balanced';
      returnToLab();
    } else if (stateName === 'STATE_1_TECH_TREE') {
      state.coins = 50;
      state.essence = 45;
      state.torches = 2;
      state.prestigeCount = 1;
      state.phobiaBias = 'kraken';
      returnToLab();
      openTechTreeModal();
    } else if (stateName === 'STATE_2_NIGHT_FIRST_SCRATCH') {
      state.deckCount = 3;
      state.phobiaBias = 'kraken';
      startNightRaid();
      openCardForScratching(0);
    } else if (stateName === 'STATE_3_MID_RAID_ACTION') {
      state.deckCount = 4;
      state.phobiaBias = 'kraken';
      state.techLevels['C2'] = 2;
      startNightRaid();
      // Pre-scare 2 outer houses and spawn 3 active monsters
      if (state.houses[1]) turnHouseLightsOn(state.houses[1]);
      if (state.houses[2]) turnHouseLightsOn(state.houses[2]);
      spawnStitchedMonsterFromCard(createCardObject(90));
      spawnStitchedMonsterFromCard(createCardObject(91));
      spawnStitchedMonsterFromCard(createCardObject(92));
      setHandState('TUCKED');
    } else if (stateName === 'STATE_4_PRESTIGE_STRESS') {
      state.torches = 6;
      state.essence = 80;
      state.prestigeCount = 2;
      state.techLevels['P1'] = 2;
      state.techLevels['P2'] = 1;
      state.techLevels['P3'] = 1;
      state.techLevels['P4'] = 1;
      const defMod = MODULE_TREE.find((m) => m.id === 'characters.house_defenses');
      if (defMod) defMod.enabled = true;
      startNightRaid();
      for (let i = 0; i < 4; i++) {
        spawnStitchedMonsterFromCard(createCardObject(100 + i));
      }
      document.getElementById('designer-panel').classList.remove('hidden');
      refreshDesignerDropdown();
    }
    updateTopHud();
  }

  // =========================================================================
  // 12. PLAYTESTER AI & RUNTIME AUDITOR
  // =========================================================================
  let aiInterval = null;
  function startPlaytesterAI(mode) {
    if (!isModOn('functionalities.playtester_ai')) return;
    stopPlaytesterAI();
    aiInterval = setInterval(() => {
      if (state.phase === 'LAB') {
        if (mode === 'minmax') {
          state.phobiaBias = 'kraken';
          // Auto-upgrade Kraken Vat C2 if affordable
          const c2 = TECH_NODES.find((n) => n.id === 'C2');
          if (c2 && state.essence >= getTechNodeCost(c2) && state.techLevels['C2'] < c2.max) {
            state.essence -= getTechNodeCost(c2);
            state.techLevels['C2']++;
          }
        }
        while (state.coins >= state.cardCost) {
          state.coins -= state.cardCost;
          state.deckCount++;
        }
        startNightRaid();
      } else if (state.phase === 'VILLAGE') {
        const nextIdx = state.cardsInHand.findIndex((c) => !c.completed);
        if (nextIdx !== -1) {
          if (state.handState !== 'FOCUSED_SCRATCH' || state.activeCardIndex !== nextIdx) {
            openCardForScratching(nextIdx);
          } else {
            const card = state.cardsInHand[nextIdx];
            card.zones.forEach((z) => {
              z.revealed = true;
            });
            checkCardCompletion(card);
          }
        } else if (state.houses.every((h) => h.lightsOn)) {
          returnToLab();
        }
      }
      updateTopHud();
    }, 450);
  }

  function stopPlaytesterAI() {
    if (aiInterval) {
      clearInterval(aiInterval);
      aiInterval = null;
    }
  }

  // Main Game Loop + FPS & Text-Bloat Auditor
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
      // Monster scare ticks
      state.monsters.forEach((m) => scareHouseTick(m, dt));

      // Prestige P2: Auto-Scratch Laser in battle
      if (getTechLvl('P2') > 0 && state.handState === 'FOCUSED_SCRATCH') {
        const activeCard = state.cardsInHand[state.activeCardIndex];
        if (activeCard && !activeCard.completed) {
          activeCard.zones.forEach((z) => {
            z.scratchedPct += 35 * dt;
            if (z.scratchedPct >= 55) z.revealed = true;
          });
          checkCardCompletion(activeCard);
        }
      }

      // Night Timer Countdown
      if (isModOn('actions.night_timer_cycle')) {
        nightSubTimer += dt;
        if (nightSubTimer >= 1.0) {
          nightSubTimer = 0;
          state.nightTimeLeft = Math.max(0, state.nightTimeLeft - 1);
          updateTopHud();
          if (state.nightTimeLeft <= 0) {
            returnToLab();
          }
        }
      }
    }

    // 1-second Auditor Check
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

        // NaN Guard
        if (Number.isNaN(state.coins) || Number.isNaN(state.essence)) {
          state.errorsCount++;
          state.coins = 30;
          state.essence = 0;
        }

        // Minimal Text Auditor: check that no gameplay button/badge has > 4 words
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
  // 13. UI BINDINGS & MODULE CHECKLIST SYNC
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
    document.getElementById('val-deck-count').textContent = String(state.deckCount);
    document.getElementById('val-card-cost').textContent = String(state.cardCost);
    document.getElementById('start-cards-tag').textContent = `🃏${state.deckCount}`;

    const dialIcon = document.getElementById('dial-icon');
    if (dialIcon) {
      dialIcon.textContent =
        state.phobiaBias === 'kraken' ? '🐙 Kraken' : state.phobiaBias === 'franken' ? '🧟 Franken' : '🧟/🐙 Mix';
    }
    checkQuestsProgress();
  }

  function initEvents() {
    // Lab Controls
    document.getElementById('btn-buy-card').addEventListener('click', () => {
      if (state.coins >= state.cardCost) {
        state.coins -= state.cardCost;
        state.deckCount++;
        playSfx('scratch_foil');
        updateTopHud();
      }
    });

    document.getElementById('btn-phobia-dial').addEventListener('click', () => {
      const order = ['balanced', 'kraken', 'franken'];
      const next = order[(order.indexOf(state.phobiaBias) + 1) % order.length];
      state.phobiaBias = next;
      playSfx('scratch_foil');
      updateTopHud();
    });

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
      const p = document.getElementById('designer-panel');
      p.classList.toggle('hidden');
      if (!p.classList.contains('hidden')) refreshDesignerDropdown();
    });
    document.getElementById('btn-close-designer').addEventListener('click', () => {
      document.getElementById('designer-panel').classList.add('hidden');
    });

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

    document.getElementById('slider-scale').addEventListener('change', onSliderInput);
    document.getElementById('slider-x').addEventListener('change', onSliderInput);
    document.getElementById('slider-y').addEventListener('change', onSliderInput);

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

  // Expose testing API on window for automated test scripts & Reviewer Subagents
  window.FrankenScratcher = {
    state,
    MODULE_TREE,
    loadFixedReviewState,
    startPlaytesterAI,
    stopPlaytesterAI,
    triggerVillagerMobPrestige,
    openCardForScratching,
    setHandState
  };

  // Boot
  loadDesignerHx();
  initEvents();
  syncModulesVisibility();
  applyAllSavedDesignerTransforms();
  updateTopHud();
  requestAnimationFrame(mainLoop);
})();
