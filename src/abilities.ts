/** Special ability definitions. */

export type AbilityId =
  | 'dash'
  | 'shield'
  | 'emp'
  | 'airstrike'
  | 'repair'
  | 'drone'
  | 'cluster'
  | 'timeslow'
  | 'magnet'
  | 'teleport';

export interface AbilityDef {
  id: AbilityId;
  name: string;
  short: string;
  desc: string;
  cooldown: number;
  duration: number;
  unlockStage: number;
  unlockCost: number;
  color: string;
  icon: string;
  tier: number;
  params: Record<string, number>;
}

export const ABILITIES: Record<AbilityId, AbilityDef> = {
  dash: {
    id: 'dash',
    name: 'Kinetic Dash',
    short: 'DASH',
    desc: 'Burst of thrust in your facing direction. Phases through brush and dodges shells.',
    cooldown: 3.4,
    duration: 0.22,
    unlockStage: 0,
    unlockCost: 0,
    color: '#7ce7ff',
    icon: '»',
    tier: 1,
    params: { impulse: 620, iframe: 0.28 },
  },
  shield: {
    id: 'shield',
    name: 'Aegis Barrier',
    short: 'SHIELD',
    desc: 'Projects an energy bubble that absorbs incoming fire and ramming damage.',
    cooldown: 15,
    duration: 4.2,
    unlockStage: 2,
    unlockCost: 400,
    color: '#64ffd0',
    icon: '◈',
    tier: 2,
    params: { absorb: 160 },
  },
  emp: {
    id: 'emp',
    name: 'EMP Pulse',
    short: 'EMP',
    desc: 'Electromagnetic shockwave: stuns enemies, detonates mines and drains enemy shields.',
    cooldown: 13,
    duration: 3.2,
    unlockStage: 3,
    unlockCost: 550,
    color: '#9ab4ff',
    icon: '◎',
    tier: 2,
    params: { radius: 190, stun: 3.2, damage: 12 },
  },
  airstrike: {
    id: 'airstrike',
    name: 'Orbital Strike',
    short: 'STRIKE',
    desc: 'Calls down a bombing run along your facing. Devastating, slow to recharge.',
    cooldown: 21,
    duration: 1.6,
    unlockStage: 5,
    unlockCost: 900,
    color: '#ff9d5c',
    icon: '✷',
    tier: 3,
    params: { bombs: 6, damage: 90, radius: 62 },
  },
  repair: {
    id: 'repair',
    name: 'Nanite Repair',
    short: 'REPAIR',
    desc: 'Rapidly restores hull integrity and patches your base structure.',
    cooldown: 17,
    duration: 2.4,
    unlockStage: 1,
    unlockCost: 320,
    color: '#8dff9a',
    icon: '✚',
    tier: 1,
    params: { hpPerSec: 42, baseHeal: 120 },
  },
  drone: {
    id: 'drone',
    name: 'Warden Drone',
    short: 'DRONE',
    desc: 'Deploys an autonomous support drone that orbits you and fires at hostile tanks.',
    cooldown: 26,
    duration: 16,
    unlockStage: 6,
    unlockCost: 1100,
    color: '#ffd66b',
    icon: '✦',
    tier: 3,
    params: { count: 1, damage: 13, fireDelay: 0.5 },
  },
  cluster: {
    id: 'cluster',
    name: 'Cluster Bloom',
    short: 'CLUSTER',
    desc: 'Fires a canister that bursts into 14 fragmentation shards around you.',
    cooldown: 12,
    duration: 0.4,
    unlockStage: 4,
    unlockCost: 700,
    color: '#ff7ab8',
    icon: '✺',
    tier: 2,
    params: { shards: 14, damage: 26 },
  },
  timeslow: {
    id: 'timeslow',
    name: 'Chrono Field',
    short: 'SLOW',
    desc: 'Dilates time for everything but you. Line up impossible shots.',
    cooldown: 24,
    duration: 4.5,
    unlockStage: 8,
    unlockCost: 1500,
    color: '#c9a6ff',
    icon: '◷',
    tier: 4,
    params: { scale: 0.34 },
  },
  magnet: {
    id: 'magnet',
    name: 'Tractor Field',
    short: 'MAGNET',
    desc: 'Pulls nearby pickups, coins and scrap straight into your hull automatically.',
    cooldown: 14,
    duration: 8,
    unlockStage: 2,
    unlockCost: 380,
    color: '#7affd4',
    icon: 'U',
    tier: 1,
    params: { radius: 240 },
  },
  teleport: {
    id: 'teleport',
    name: 'Blink Drive',
    short: 'BLINK',
    desc: 'Emergency short-range teleport toward the cursor, leaving a decoy detonation.',
    cooldown: 18,
    duration: 0.3,
    unlockStage: 10,
    unlockCost: 1900,
    color: '#ff6bf0',
    icon: '⌁',
    tier: 4,
    params: { range: 220, decoyDamage: 60, decoyRadius: 70 },
  },
};

export const ABILITY_LIST: AbilityDef[] = Object.values(ABILITIES);

export const getAbility = (id: AbilityId): AbilityDef => ABILITIES[id] ?? ABILITIES.dash;

