/** Pickups that spawn in-arena. Temporary buffs, instant heals, and permanent upgrades. */

export type PowerUpId =
  | 'rapid'
  | 'triple'
  | 'shield'
  | 'health'
  | 'damage'
  | 'speed'
  | 'pierce'
  | 'life'
  | 'emp'
  | 'fullrepair'
  | 'invuln'
  | 'weaponup'
  | 'coin'
  | 'nuke'
  | 'freeze'
  | 'basekit'
  | 'magnet';

export interface PowerUpDef {
  id: PowerUpId;
  name: string;
  desc: string;
  color: string;
  glyph: string;
  duration: number; // 0 = instant
  weight: number; // spawn weight
  minStage: number; // earliest campaign stage it can appear on
  instant: boolean;
  magnitude: number;
  sfx: 'pickup' | 'power' | 'life';
}

export const POWERUPS: Record<PowerUpId, PowerUpDef> = {
  rapid: {
    id: 'rapid',
    name: 'Rapid Fire',
    desc: '+70% fire rate',
    color: '#ffd166',
    glyph: 'R',
    duration: 12,
    weight: 12,
    minStage: 0,
    instant: false,
    magnitude: 0.7,
    sfx: 'power',
  },
  triple: {
    id: 'triple',
    name: 'Triple Shot',
    desc: 'Fires 3 shells in a spread',
    color: '#ff7ab8',
    glyph: 'W',
    duration: 14,
    weight: 8,
    minStage: 1,
    instant: false,
    magnitude: 3,
    sfx: 'power',
  },
  shield: {
    id: 'shield',
    name: 'Barrier Cell',
    desc: '+120 shield instantly',
    color: '#64ffd0',
    glyph: 'S',
    duration: 0,
    weight: 11,
    minStage: 0,
    instant: true,
    magnitude: 120,
    sfx: 'pickup',
  },
  health: {
    id: 'health',
    name: 'Repair Kit',
    desc: 'Restores 45 hull',
    color: '#8dff9a',
    glyph: '+',
    duration: 0,
    weight: 14,
    minStage: 0,
    instant: true,
    magnitude: 45,
    sfx: 'pickup',
  },
  damage: {
    id: 'damage',
    name: 'AP Rounds',
    desc: '+55% shell damage',
    color: '#ff6b3d',
    glyph: 'D',
    duration: 14,
    weight: 10,
    minStage: 1,
    instant: false,
    magnitude: 0.55,
    sfx: 'power',
  },
  speed: {
    id: 'speed',
    name: 'Overdrive',
    desc: '+45% drive speed',
    color: '#7ce7ff',
    glyph: '»',
    duration: 12,
    weight: 10,
    minStage: 0,
    instant: false,
    magnitude: 0.45,
    sfx: 'power',
  },
  pierce: {
    id: 'pierce',
    name: 'Piercing Rounds',
    desc: 'Shells pass through 2 extra targets and melt steel',
    color: '#c47bff',
    glyph: 'P',
    duration: 14,
    weight: 6,
    minStage: 4,
    instant: false,
    magnitude: 2,
    sfx: 'power',
  },
  life: {
    id: 'life',
    name: 'Reserve Hull',
    desc: '+1 life',
    color: '#ffffff',
    glyph: '♥',
    duration: 0,
    weight: 2.2,
    minStage: 0,
    instant: true,
    magnitude: 1,
    sfx: 'life',
  },
  emp: {
    id: 'emp',
    name: 'EMP Charge',
    desc: 'Resets your ability and stuns nearby enemies',
    color: '#9ab4ff',
    glyph: 'E',
    duration: 0,
    weight: 5,
    minStage: 2,
    instant: true,
    magnitude: 1,
    sfx: 'power',
  },
  fullrepair: {
    id: 'fullrepair',
    name: 'Forge Nanites',
    desc: 'Full hull restore + repairs your HQ',
    color: '#a6ff8d',
    glyph: 'F',
    duration: 0,
    weight: 4.5,
    minStage: 2,
    instant: true,
    magnitude: 1,
    sfx: 'power',
  },
  invuln: {
    id: 'invuln',
    name: 'Phase Cloak',
    desc: 'Invulnerable for 6 seconds',
    color: '#e6f7ff',
    glyph: '★',
    duration: 6,
    weight: 4,
    minStage: 3,
    instant: false,
    magnitude: 6,
    sfx: 'power',
  },
  weaponup: {
    id: 'weaponup',
    name: 'Weapon Overclock',
    desc: 'Temporary +1 weapon tier damage and velocity',
    color: '#ffca6a',
    glyph: '▲',
    duration: 16,
    weight: 6,
    minStage: 3,
    instant: false,
    magnitude: 0.3,
    sfx: 'power',
  },
  coin: {
    id: 'coin',
    name: 'Scrap Cache',
    desc: '+45 forge credits',
    color: '#ffe08a',
    glyph: '$',
    duration: 0,
    weight: 16,
    minStage: 0,
    instant: true,
    magnitude: 45,
    sfx: 'pickup',
  },
  nuke: {
    id: 'nuke',
    name: 'Tactical Nuke',
    desc: 'Damages every enemy on the field',
    color: '#ff4d4d',
    glyph: '☢',
    duration: 0,
    weight: 2.4,
    minStage: 5,
    instant: true,
    magnitude: 130,
    sfx: 'power',
  },
  freeze: {
    id: 'freeze',
    name: 'Cryo Field',
    desc: 'Freezes all enemies for 5 seconds',
    color: '#a8ecff',
    glyph: '❄',
    duration: 5,
    weight: 5,
    minStage: 4,
    instant: true,
    magnitude: 5,
    sfx: 'power',
  },
  magnet: {
    id: 'magnet',
    name: 'Tractor Field',
    desc: 'Attracts nearby pickups automatically',
    color: '#7affd4',
    glyph: 'U',
    duration: 11,
    weight: 6,
    minStage: 1,
    instant: false,
    magnitude: 250,
    sfx: 'power',
  },
  basekit: {
    id: 'basekit',
    name: 'HQ Fortification',
    desc: 'Rebuilds base barriers and adds a turret',
    color: '#ffc46b',
    glyph: '⌂',
    duration: 0,
    weight: 4,
    minStage: 2,
    instant: true,
    magnitude: 1,
    sfx: 'power',
  },
};

export const POWERUP_LIST: PowerUpDef[] = Object.values(POWERUPS);

export const getPowerUp = (id: PowerUpId): PowerUpDef => POWERUPS[id] ?? POWERUPS.health;

