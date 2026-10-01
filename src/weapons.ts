/** Weapon definitions. Data-driven: every projectile behaviour derives from these. */

export type WeaponId =
  | 'cannon'
  | 'rapid'
  | 'heavy'
  | 'plasma'
  | 'rocket'
  | 'railgun'
  | 'flame'
  | 'mortar';

export interface DotSpec {
  dps: number;
  duration: number;
}

export interface WeaponDef {
  id: WeaponId;
  name: string;
  short: string;
  desc: string;
  role: string;
  damage: number;
  /** Seconds between shots. */
  fireDelay: number;
  projSpeed: number;
  radius: number;
  pellets: number;
  spread: number;
  /** How many tanks a shell passes through before dying. */
  pierce: number;
  /** 0..1 | how much of a target's armor is ignored. */
  armorPierce: number;
  /** Radius of the explosion, 0 for none. */
  splash: number;
  splashDamage: number;
  knockback: number;
  shake: number;
  recoil: number;
  /** Destruction width in cells perpendicular to travel. */
  cutWidth: number;
  color: string;
  glow: string;
  trail: number;
  auto: boolean;
  arc: boolean;
  homing: number;
  dot?: DotSpec;
  lifetime: number;
  sfx: 'cannon' | 'rapid' | 'heavy' | 'plasma' | 'rocket' | 'rail' | 'flame' | 'mortar';
  unlockStage: number; // campaign stage index required, 0 = available
  unlockCost: number;
  tier: number;
}

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  cannon: {
    id: 'cannon',
    name: 'M-60 Field Cannon',
    short: 'CANNON',
    desc: 'The reliable workhorse. Balanced damage and a predictable arc.',
    role: 'Balanced',
    damage: 26,
    fireDelay: 0.42,
    projSpeed: 430,
    radius: 4,
    pellets: 1,
    spread: 0,
    pierce: 0,
    armorPierce: 0,
    splash: 0,
    splashDamage: 0,
    knockback: 26,
    shake: 1.6,
    recoil: 22,
    cutWidth: 1,
    color: '#ffd98a',
    glow: '#ff9d2e',
    trail: 1,
    auto: true,
    arc: false,
    homing: 0,
    lifetime: 2.4,
    sfx: 'cannon',
    unlockStage: 0,
    unlockCost: 0,
    tier: 1,
  },
  rapid: {
    id: 'rapid',
    name: 'VG-12 Rotary Cannon',
    short: 'RAPID',
    desc: 'Very high rate of fire with light rounds. Meltes soft targets, chews cover fast.',
    role: 'Suppressive',
    damage: 11,
    fireDelay: 0.105,
    projSpeed: 470,
    radius: 3,
    pellets: 1,
    spread: 0.055,
    pierce: 0,
    armorPierce: 0,
    splash: 0,
    splashDamage: 0,
    knockback: 8,
    shake: 0.65,
    recoil: 8,
    cutWidth: 1,
    color: '#a9f6ff',
    glow: '#37c9ff',
    trail: 1.15,
    auto: true,
    arc: false,
    homing: 0,
    lifetime: 1.6,
    sfx: 'rapid',
    unlockStage: 1,
    unlockCost: 650,
    tier: 1,
  },
  heavy: {
    id: 'heavy',
    name: 'BK-9 Siege Cannon',
    short: 'HEAVY',
    desc: 'Slow, brutal shells that punch through reinforced walls and stagger anything they hit.',
    role: 'Burst',
    damage: 78,
    fireDelay: 1.05,
    projSpeed: 330,
    radius: 7,
    pellets: 1,
    spread: 0,
    pierce: 1,
    armorPierce: 0.35,
    splash: 30,
    splashDamage: 26,
    knockback: 120,
    shake: 5.2,
    recoil: 62,
    cutWidth: 2,
    color: '#ffb0a0',
    glow: '#ff4d2e',
    trail: 1.5,
    auto: false,
    arc: false,
    homing: 0,
    lifetime: 2.6,
    sfx: 'heavy',
    unlockStage: 7,
    unlockCost: 4500,
    tier: 3,
  },
  plasma: {
    id: 'plasma',
    name: 'ARC-7 Plasma Lance',
    short: 'PLASMA',
    desc: 'Superheated bolts that pass through multiple targets and melt armored plating.',
    role: 'Piercing',
    damage: 30,
    fireDelay: 0.46,
    projSpeed: 380,
    radius: 6,
    pellets: 1,
    spread: 0,
    pierce: 3,
    armorPierce: 0.5,
    splash: 0,
    splashDamage: 0,
    knockback: 14,
    shake: 2,
    recoil: 16,
    cutWidth: 1,
    color: '#c8a6ff',
    glow: '#8b3dff',
    trail: 1.9,
    auto: true,
    arc: false,
    homing: 0,
    lifetime: 2.2,
    sfx: 'plasma',
    unlockStage: 3,
    unlockCost: 1600,
    tier: 2,
  },
  rocket: {
    id: 'rocket',
    name: 'HKR Swarm Launcher',
    short: 'ROCKET',
    desc: 'Unguided rockets with a heavy blast radius. Excellent against groups and structures.',
    role: 'Area',
    damage: 34,
    fireDelay: 0.78,
    projSpeed: 300,
    radius: 5,
    pellets: 1,
    spread: 0.03,
    pierce: 0,
    armorPierce: 0.25,
    splash: 56,
    splashDamage: 46,
    knockback: 150,
    shake: 6,
    recoil: 44,
    cutWidth: 2,
    color: '#ffd08a',
    glow: '#ff7a1a',
    trail: 2.4,
    auto: true,
    arc: false,
    homing: 0.9,
    lifetime: 3,
    sfx: 'rocket',
    unlockStage: 9,
    unlockCost: 5800,
    tier: 4,
  },
  railgun: {
    id: 'railgun',
    name: 'L-01 Railgun',
    short: 'RAIL',
    desc: 'Hypervelocity slug. Ignores armor entirely and drills a clean line through the arena.',
    role: 'Sniper',
    damage: 95,
    fireDelay: 1.35,
    projSpeed: 1150,
    radius: 3.5,
    pellets: 1,
    spread: 0,
    pierce: 6,
    armorPierce: 1,
    splash: 0,
    splashDamage: 0,
    knockback: 60,
    shake: 7.5,
    recoil: 90,
    cutWidth: 1,
    color: '#eaffff',
    glow: '#35f0ff',
    trail: 3.4,
    auto: false,
    arc: false,
    homing: 0,
    lifetime: 1.4,
    sfx: 'rail',
    unlockStage: 5,
    unlockCost: 3400,
    tier: 3,
  },
  flame: {
    id: 'flame',
    name: 'VK-3 Incinerator',
    short: 'FLAME',
    desc: 'Short-range napalm stream. Sets targets burning and clears brush instantly.',
    role: 'Close range',
    damage: 7.5,
    fireDelay: 0.045,
    projSpeed: 250,
    radius: 6,
    pellets: 2,
    spread: 0.34,
    pierce: 4,
    armorPierce: 0,
    splash: 12,
    splashDamage: 4,
    knockback: 4,
    shake: 0.35,
    recoil: 3,
    cutWidth: 1,
    color: '#ffca6a',
    glow: '#ff5a1f',
    trail: 0.6,
    auto: true,
    arc: false,
    homing: 0,
    dot: { dps: 26, duration: 2.6 },
    lifetime: 0.42,
    sfx: 'flame',
    unlockStage: 4,
    unlockCost: 2400,
    tier: 2,
  },
  mortar: {
    id: 'mortar',
    name: 'TM-220 Mortar',
    short: 'MORTAR',
    desc: 'Lobs arcing shells over walls. Detonates on impact with a wide, crushing blast.',
    role: 'Artillery',
    damage: 46,
    fireDelay: 1.25,
    projSpeed: 250,
    radius: 6,
    pellets: 1,
    spread: 0.02,
    pierce: 0,
    armorPierce: 0.4,
    splash: 78,
    splashDamage: 62,
    knockback: 190,
    shake: 7,
    recoil: 34,
    cutWidth: 2,
    color: '#ffe9a8',
    glow: '#ff9a3c',
    trail: 1.8,
    auto: false,
    arc: true,
    homing: 0,
    lifetime: 3.4,
    sfx: 'mortar',
    unlockStage: 11,
    unlockCost: 7600,
    tier: 4,
  },
};

/**
 * Battlefield power for shop order and pricing.
 * Mixes sustained damage, blast on the struck target, real area (splash ≥ 24),
 * burn, armor penetration, and reach. A point-blank stream does not outrank
 * a weapon that can fight across the arena.
 */
export function weaponPower(w: WeaponDef): number {
  const rate = 1 / w.fireDelay;
  const hitPellets = w.spread > 0.2 ? 1 + (w.pellets - 1) * 0.45 : w.pellets;
  const direct = w.damage * hitPellets * rate;
  const blastOnTarget = w.splash > 0 ? (w.splashDamage + w.damage * 0.55) * hitPellets * rate : 0;
  const area = w.splash >= 24 ? (w.splash / 36) * w.splashDamage * rate : 0;
  const burn = w.dot ? w.dot.dps * Math.min(1, w.dot.duration / 2.5) * 0.65 : 0;
  const vsArmor = 1 - 0.4 * (1 - w.armorPierce);
  const line = 1 + Math.min(w.pierce, 4) * 0.07;
  const range = w.projSpeed * w.lifetime;
  const reach = range >= 600 ? 1 : range >= 300 ? 0.92 : 0.42;
  const aim = (1 - Math.min(0.28, w.spread * 0.55)) * (1 + Math.min(w.homing, 1) * 0.2);
  const lob = w.arc ? 1.22 : 1;
  const alpha = (w.damage * hitPellets + (w.splash > 0 ? w.splashDamage + w.damage * 0.55 : 0)) * vsArmor;
  return (direct * 0.55 + blastOnTarget * 0.35 + area * 0.5 + burn + alpha * 0.85) * line * reach * aim * lob;
}

/** Weakest to strongest. Costs and stage gates follow this ladder. */
export const WEAPON_LIST: WeaponDef[] = [
  WEAPONS.cannon,
  WEAPONS.rapid,
  WEAPONS.plasma,
  WEAPONS.flame,
  WEAPONS.railgun,
  WEAPONS.heavy,
  WEAPONS.rocket,
  WEAPONS.mortar,
];

export const getWeapon = (id: WeaponId): WeaponDef => WEAPONS[id] ?? WEAPONS.cannon;

