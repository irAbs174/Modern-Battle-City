/** Meta-progression: upgrade tracks, chassis and derived stat model. */

export type UpgradeTrackId = 'engine' | 'armor' | 'cannon' | 'targeting' | 'shield' | 'utility';

/** Additive/multiplicative modifiers applied on top of the chassis base stats. */
export interface StatMods {
  maxHp: number; // additive
  hpMul: number; // multiplicative bonus (0.05 = +5%)
  armor: number; // additive 0..1 damage reduction
  speed: number; // additive world units/s
  speedMul: number;
  accel: number; // additive
  damageMul: number;
  fireRateMul: number;
  projSpeedMul: number;
  crit: number; // additive chance
  critDmg: number; // additive multiplier
  shieldMax: number; // additive
  shieldRegen: number; // additive per second
  abilityCdMul: number; // 1 = normal, lower = faster
  repair: number; // hull regen per second
  luck: number; // power-up drop bonus
  magnet: number; // pickup radius bonus
  xpMul: number;
  coinMul: number;
  dashCharge: number; // extra ability charges
  turretSpeed: number; // additive rad/s
}

export const ZERO_MODS: StatMods = {
  maxHp: 0,
  hpMul: 0,
  armor: 0,
  speed: 0,
  speedMul: 0,
  accel: 0,
  damageMul: 0,
  fireRateMul: 0,
  projSpeedMul: 0,
  crit: 0,
  critDmg: 0,
  shieldMax: 0,
  shieldRegen: 0,
  abilityCdMul: 0,
  repair: 0,
  luck: 0,
  magnet: 0,
  xpMul: 0,
  coinMul: 0,
  dashCharge: 0,
  turretSpeed: 0,
};

export const addMods = (a: StatMods, b: Partial<StatMods>): StatMods => {
  const out: StatMods = { ...a };
  for (const key of Object.keys(b) as (keyof StatMods)[]) {
    out[key] = (out[key] ?? 0) + (b[key] ?? 0);
  }
  return out;
};

export interface UpgradeLevel {
  cost: number;
  label: string;
  effects: Partial<StatMods>;
}

export interface UpgradeTrack {
  id: UpgradeTrackId;
  name: string;
  icon: string;
  color: string;
  desc: string;
  levels: UpgradeLevel[];
}

export const UPGRADES: UpgradeTrack[] = [
  {
    id: 'engine',
    name: 'Engine',
    icon: '⚙',
    color: '#ffb547',
    desc: 'Top speed, acceleration and turret traverse.',
    levels: [
      { cost: 120, label: 'Tuned Injectors', effects: { speed: 12, accel: 60 } },
      { cost: 240, label: 'Sport Transmission', effects: { speed: 14, accel: 80, turretSpeed: 1.2 } },
      { cost: 420, label: 'Composite Treads', effects: { speed: 16, accel: 100 } },
      { cost: 680, label: 'Turbocharger', effects: { speedMul: 0.08, accel: 140, turretSpeed: 1.6 } },
      { cost: 1050, label: 'Fusion Drive', effects: { speedMul: 0.1, speed: 18, accel: 180 } },
      { cost: 1600, label: 'Overdrive Core', effects: { speedMul: 0.14, accel: 240, turretSpeed: 2.4 } },
    ],
  },
  {
    id: 'armor',
    name: 'Armor',
    icon: '⛨',
    color: '#7ce7ff',
    desc: 'Hull integrity, damage resistance and field repair.',
    levels: [
      { cost: 130, label: 'Reinforced Hull', effects: { maxHp: 25 } },
      { cost: 260, label: 'Ablative Plating', effects: { maxHp: 30, armor: 0.04 } },
      { cost: 460, label: 'Nano-Weave Mesh', effects: { maxHp: 40, repair: 1.2 } },
      { cost: 740, label: 'Reactive Armor', effects: { maxHp: 50, armor: 0.06, repair: 1.4 } },
      { cost: 1150, label: 'Titanium Lattice', effects: { hpMul: 0.12, armor: 0.07 } },
      { cost: 1750, label: 'Adamant Frame', effects: { hpMul: 0.18, armor: 0.09, repair: 2.6 } },
    ],
  },
  {
    id: 'cannon',
    name: 'Cannon',
    icon: '✹',
    color: '#ff7a5c',
    desc: 'Shell damage and rate of fire.',
    levels: [
      { cost: 140, label: 'Matched Shells', effects: { damageMul: 0.08 } },
      { cost: 280, label: 'Auto-Loader', effects: { fireRateMul: 0.09 } },
      { cost: 490, label: 'Rifled Barrel', effects: { damageMul: 0.1, fireRateMul: 0.05 } },
      { cost: 780, label: 'Twin Recoil Dampers', effects: { damageMul: 0.12, fireRateMul: 0.09 } },
      { cost: 1200, label: 'Depleted Cores', effects: { damageMul: 0.16, fireRateMul: 0.06 } },
      { cost: 1850, label: 'Siege Assembly', effects: { damageMul: 0.22, fireRateMul: 0.12 } },
    ],
  },
  {
    id: 'targeting',
    name: 'Targeting',
    icon: '◎',
    color: '#8dff9a',
    desc: 'Muzzle velocity, critical chance and critical damage.',
    levels: [
      { cost: 120, label: 'Stabilized Gyro', effects: { projSpeedMul: 0.1, crit: 0.03 } },
      { cost: 250, label: 'Laser Rangefinder', effects: { crit: 0.05, critDmg: 0.2 } },
      { cost: 440, label: 'Predictive Software', effects: { projSpeedMul: 0.12, crit: 0.04 } },
      { cost: 700, label: 'Thermal Overlay', effects: { crit: 0.07, critDmg: 0.35 } },
      { cost: 1100, label: 'AI Fire Control', effects: { crit: 0.08, critDmg: 0.3, projSpeedMul: 0.14 } },
      { cost: 1700, label: 'Quantum Ballistics', effects: { crit: 0.12, critDmg: 0.6, projSpeedMul: 0.2 } },
    ],
  },
  {
    id: 'shield',
    name: 'Shield',
    icon: '◈',
    color: '#64ffd0',
    desc: 'Energy shield capacity, recharge and ability cooldowns.',
    levels: [
      { cost: 150, label: 'Capacitor Bank', effects: { shieldMax: 30, shieldRegen: 3 } },
      { cost: 300, label: 'Field Harmonics', effects: { shieldMax: 40, abilityCdMul: -0.06 } },
      { cost: 520, label: 'Deflector Array', effects: { shieldMax: 55, shieldRegen: 5, abilityCdMul: -0.05 } },
      { cost: 840, label: 'Phase Emitters', effects: { shieldMax: 70, shieldRegen: 6, abilityCdMul: -0.08 } },
      { cost: 1300, label: 'Aegis Matrix', effects: { shieldMax: 95, shieldRegen: 9, abilityCdMul: -0.1 } },
      { cost: 1950, label: 'Singularity Ward', effects: { shieldMax: 130, shieldRegen: 13, abilityCdMul: -0.14 } },
    ],
  },
  {
    id: 'utility',
    name: 'Utility',
    icon: '✦',
    color: '#ffd66b',
    desc: 'Scavenging, luck, magnetism and reward multipliers.',
    levels: [
      { cost: 110, label: 'Scrap Magnets', effects: { magnet: 45, luck: 0.1 } },
      { cost: 230, label: 'Field Salvage', effects: { coinMul: 0.12, luck: 0.1 } },
      { cost: 420, label: 'Combat Recorder', effects: { xpMul: 0.14, magnet: 45 } },
      { cost: 690, label: 'Salvage Drone Bay', effects: { coinMul: 0.16, luck: 0.18, magnet: 60 } },
      { cost: 1080, label: 'Elite Clearance', effects: { xpMul: 0.2, coinMul: 0.2, luck: 0.15 } },
      { cost: 1680, label: 'Forge Link', effects: { xpMul: 0.28, coinMul: 0.28, luck: 0.25, dashCharge: 1 } },
    ],
  },
];

export const MAX_UPGRADE_LEVEL = UPGRADES[0].levels.length;

export type UpgradeLevels = Record<UpgradeTrackId, number>;

export const emptyUpgrades = (): UpgradeLevels => ({
  engine: 0,
  armor: 0,
  cannon: 0,
  targeting: 0,
  shield: 0,
  utility: 0,
});

export const totalUpgradeCost = (levels: UpgradeLevels): number => {
  let sum = 0;
  for (const track of UPGRADES) {
    for (let i = 0; i < levels[track.id]; i++) sum += track.levels[i].cost;
  }
  return sum;
};

export const nextUpgradeCost = (track: UpgradeTrack, level: number): number | null =>
  level < track.levels.length ? track.levels[level].cost : null;

/** Collapse purchased upgrade levels into a single StatMods object. */
export const modsFromUpgrades = (levels: UpgradeLevels): StatMods => {
  let mods: StatMods = { ...ZERO_MODS };
  for (const track of UPGRADES) {
    const lvl = levels[track.id] ?? 0;
    for (let i = 0; i < lvl; i++) mods = addMods(mods, track.levels[i].effects);
  }
  return mods;
};

/* ------------------------------------------------------------------ */
/* Chassis                                                             */
/* ------------------------------------------------------------------ */

export type ChassisId = 'ranger' | 'bulwark' | 'phantom' | 'tempest' | 'juggernaut' | 'archon';

export interface ChassisDef {
  id: ChassisId;
  name: string;
  role: string;
  desc: string;
  base: StatMods;
  hover: boolean;
  size: number;
  unlock: { stage: number; cost: number };
  color: { hull: string; hull2: string; tread: string; accent: string; glow: string };
  perk: string;
}

export const CHASSIS: Record<ChassisId, ChassisDef> = {
  ranger: {
    id: 'ranger',
    name: 'TF-1 Ranger',
    role: 'All-round',
    desc: 'Standard issue forge hull. No weaknesses, no surprises | the tank you learn on.',
    base: { ...ZERO_MODS, maxHp: 100, speed: 118, accel: 620, shieldMax: 0, shieldRegen: 0 },
    hover: false,
    size: 26,
    unlock: { stage: 0, cost: 0 },
    color: { hull: '#4fa8d8', hull2: '#2c6a90', tread: '#1d2a35', accent: '#a9e6ff', glow: '#37c9ff' },
    perk: 'Balanced stats · 3 ability charges',
  },
  bulwark: {
    id: 'bulwark',
    name: 'MK-IV Bulwark',
    role: 'Tank',
    desc: 'Heavy composite plating and an integrated barrier generator. Slow but nearly unkillable.',
    base: { ...ZERO_MODS, maxHp: 175, armor: 0.16, speed: 88, accel: 430, shieldMax: 60, shieldRegen: 5 },
    hover: false,
    size: 30,
    unlock: { stage: 3, cost: 900 },
    color: { hull: '#6f8f6a', hull2: '#456041', tread: '#22301f', accent: '#c4e8b0', glow: '#7ddc5a' },
    perk: '+75% hull · +16% damage resistance · built-in shield',
  },
  phantom: {
    id: 'phantom',
    name: 'X-9 Phantom',
    role: 'Skirmisher',
    desc: 'Hover chassis with razor acceleration and paper armor.',
    base: { ...ZERO_MODS, maxHp: 78, speed: 152, accel: 880, damageMul: 0.08, abilityCdMul: -0.15, turretSpeed: 3 },
    hover: true,
    size: 24,
    unlock: { stage: 5, cost: 1400 },
    color: { hull: '#9a6fd8', hull2: '#5f4194', tread: '#2b2140', accent: '#dcc6ff', glow: '#b07bff' },
    perk: 'Hover · +29% speed · -15% ability cooldown',
  },
  tempest: {
    id: 'tempest',
    name: 'VR-2 Tempest',
    role: 'Gunner',
    desc: 'Recoil-compensated gun platform built for sustained automatic fire.',
    base: { ...ZERO_MODS, maxHp: 96, speed: 112, accel: 560, fireRateMul: 0.24, damageMul: -0.06, projSpeedMul: 0.18, crit: 0.08 },
    hover: false,
    size: 26,
    unlock: { stage: 7, cost: 1900 },
    color: { hull: '#d8a03f', hull2: '#96682a', tread: '#33271a', accent: '#ffe0a3', glow: '#ffc247' },
    perk: '+24% fire rate · +18% muzzle velocity · +8% crit',
  },
  juggernaut: {
    id: 'juggernaut',
    name: 'GR-0 Juggernaut',
    role: 'Siege',
    desc: 'Experimental siege hull. Mounts the largest cannons the forge can print.',
    base: { ...ZERO_MODS, maxHp: 210, armor: 0.1, speed: 74, accel: 340, damageMul: 0.3, knockbackResist: 0 } as StatMods,
    hover: false,
    size: 32,
    unlock: { stage: 10, cost: 2600 },
    color: { hull: '#c25a45', hull2: '#7f3529', tread: '#331f1a', accent: '#ffb59a', glow: '#ff6b3d' },
    perk: '+30% shell damage · +110 hull · heavy and slow',
  },
  archon: {
    id: 'archon',
    name: 'Ω ARCHON',
    role: 'Endgame',
    desc: 'The forge masterpiece. Adaptive shielding, elite ballistics, devastating output.',
    base: { ...ZERO_MODS, maxHp: 160, armor: 0.12, speed: 132, accel: 720, damageMul: 0.18, fireRateMul: 0.12, crit: 0.1, critDmg: 0.4, shieldMax: 110, shieldRegen: 12, abilityCdMul: -0.2, luck: 0.2 },
    hover: true,
    size: 28,
    unlock: { stage: 14, cost: 5200 },
    color: { hull: '#e6e9f5', hull2: '#9aa3bd', tread: '#333a4d', accent: '#fff6c9', glow: '#ffd447' },
    perk: 'Hover · +18% damage · +110 shield · -20% cooldowns',
  },
};

export const CHASSIS_LIST: ChassisDef[] = Object.values(CHASSIS);

/* ------------------------------------------------------------------ */
/* Derived stats                                                       */
/* ------------------------------------------------------------------ */

export interface FinalStats {
  maxHp: number;
  armor: number;
  speed: number;
  accel: number;
  turretSpeed: number;
  damageMul: number;
  fireRateMul: number;
  projSpeedMul: number;
  crit: number;
  critDmg: number;
  shieldMax: number;
  shieldRegen: number;
  abilityCdMul: number;
  repair: number;
  luck: number;
  magnet: number;
  xpMul: number;
  coinMul: number;
  size: number;
  hover: boolean;
}

export const computeStats = (
  chassis: ChassisDef,
  levels: UpgradeLevels,
  extra?: Partial<StatMods>,
): FinalStats => {
  let m = addMods(chassis.base, modsFromUpgrades(levels));
  if (extra) m = addMods(m, extra);
  return {
    maxHp: Math.round(m.maxHp * (1 + m.hpMul)),
    armor: Math.min(0.78, Math.max(0, m.armor)),
    speed: Math.max(40, m.speed * (1 + m.speedMul)),
    accel: Math.max(120, m.accel),
    turretSpeed: 11 + m.turretSpeed,
    damageMul: Math.max(0.25, 1 + m.damageMul),
    fireRateMul: Math.max(0.25, 1 + m.fireRateMul),
    projSpeedMul: Math.max(0.4, 1 + m.projSpeedMul),
    crit: Math.min(0.85, Math.max(0, m.crit)),
    critDmg: 1.8 + m.critDmg,
    shieldMax: Math.max(0, m.shieldMax),
    shieldRegen: Math.max(0, m.shieldRegen),
    abilityCdMul: Math.max(0.35, 1 + m.abilityCdMul),
    repair: Math.max(0, m.repair),
    luck: Math.max(0, m.luck),
    magnet: 44 + Math.max(0, m.magnet),
    xpMul: Math.max(0.2, 1 + m.xpMul),
    coinMul: Math.max(0.2, 1 + m.coinMul),
    size: chassis.size,
    hover: chassis.hover,
  };
};

