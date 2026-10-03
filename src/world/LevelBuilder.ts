import { Grid } from './Grid';
import { CELL, Terrain, TERRAIN, type ThemeId } from './terrain';
import { World } from './World';
import { CHAR_TO_TERRAIN } from './terrain';
import type { LevelDef } from './levels';
import { stageScaling } from './levels';
import type { GenResult } from './LevelGen';
import { Base } from '../entities/structures';
import type { SaveData } from '../meta/SaveSystem';
import { DEFAULT_COMBAT, type DifficultyCombat } from '../core/config';

export interface BuiltLevel {
  world: World;
  grid: Grid;
  cols: number;
  rows: number;
  theme: ThemeId;
  base: Base;
  playerSpawn: { x: number; y: number };
  enemySpawns: { x: number; y: number }[];
  powerupNodes: { x: number; y: number }[];
  level: LevelDef;
}

export interface BuildOpts {
  save?: SaveData;
  seed?: number;
  difficulty?: DifficultyCombat;
  stageId?: number;
  baseHpOverride?: number;
  skipBase?: boolean;
  themeOverride?: ThemeId;
}

/** Turns a handcrafted LevelDef (or a procedurally generated arena) into a live World. */
export function buildLevel(level: LevelDef, opts: BuildOpts = {}): BuiltLevel {
  const map = level.map;
  const blocksY = map.length;
  const blocksX = map.reduce((m, r) => Math.max(m, r.length), 0);
  const cols = blocksX * 2;
  const rows = blocksY * 2;
  const theme = opts.themeOverride ?? level.theme;

  const grid = new Grid(cols, rows, theme);
  grid.clear();

  let playerBlock: { bx: number; by: number } | null = null;
  let baseBlock: { bx: number; by: number } | null = null;
  const enemyBlocks: { bx: number; by: number }[] = [];
  const powerupNodes: { x: number; y: number }[] = [];

  for (let by = 0; by < blocksY; by++) {
    const row = map[by];
    for (let bx = 0; bx < row.length; bx++) {
      const ch = row[bx];
      const t = CHAR_TO_TERRAIN[ch];
      if (t !== undefined && t !== Terrain.Empty) {
        grid.fillBlock(bx, by, 1, 1, t);
        continue;
      }
      switch (ch) {
        case 'P':
          playerBlock = { bx, by };
          break;
        case 'H':
          if (!baseBlock) baseBlock = { bx, by };
          break;
        case 'E':
          enemyBlocks.push({ bx, by });
          break;
        case 'U':
          powerupNodes.push(blockToWorld(bx, by, cols, rows));
          break;
        default:
          break;
      }
    }
  }

  // --- defaults when a map omits markers -------------------------------
  if (!baseBlock && !opts.skipBase) {
    baseBlock = { bx: Math.floor(blocksX / 2) - 1, by: blocksY - 4 };
  }
  if (!playerBlock) {
    playerBlock = baseBlock
      ? { bx: Math.max(2, baseBlock.bx - 4), by: Math.min(blocksY - 3, baseBlock.by + 1) }
      : { bx: Math.floor(blocksX / 2), by: blocksY - 3 };
  }
  if (enemyBlocks.length === 0) {
    enemyBlocks.push(
      { bx: 2, by: 1 },
      { bx: Math.floor(blocksX / 2), by: 1 },
      { bx: blocksX - 3, by: 1 },
      { bx: 1, by: Math.floor(blocksY / 2) },
      { bx: blocksX - 2, by: Math.floor(blocksY / 2) },
    );
  }

  // --- HQ + fortress ring ---------------------------------------------
  const save = opts.save;
  const base = new Base();
  if (baseBlock && !opts.skipBase) {
    const barrierRank = save?.base.barrier ?? 1;
    const bw = barrierRank <= 0 ? Terrain.Empty : barrierRank >= 3 ? Terrain.Stone : Terrain.Brick;
    const barrierHp = barrierRank === 2 ? TERRAIN[Terrain.Brick].hp * 1.75 : undefined;
    const bx0 = baseBlock.bx;
    const by0 = baseBlock.by;
    // clear plaza
    for (let y = by0 - 2; y <= by0 + 3; y++)
      for (let x = bx0 - 2; x <= bx0 + 3; x++) {
        if (x < 0 || y < 0 || x >= blocksX || y >= blocksY) continue;
        grid.fillBlock(x, y, 1, 1, Terrain.Empty);
      }
    // ring
    const barrierCells: { cx: number; cy: number }[] = [];
    for (let x = bx0 - 1; x <= bx0 + 2; x++) {
      for (const y of [by0 - 1, by0 + 2]) {
        if (bw !== Terrain.Empty) {
          grid.fillBlock(x, y, 1, 1, bw, barrierHp);
          for (let oy = 0; oy < 2; oy++) for (let ox = 0; ox < 2; ox++) barrierCells.push({ cx: x * 2 + ox, cy: y * 2 + oy });
        }
      }
    }
    for (let y = by0; y <= by0 + 1; y++) {
      for (const x of [bx0 - 1, bx0 + 2]) {
        if (bw !== Terrain.Empty) {
          grid.fillBlock(x, y, 1, 1, bw, barrierHp);
          for (let oy = 0; oy < 2; oy++) for (let ox = 0; ox < 2; ox++) barrierCells.push({ cx: x * 2 + ox, cy: y * 2 + oy });
        }
      }
    }
    // keep the approach side open (classic front gap)
    grid.fillBlock(bx0, by0 - 1, 2, 1, Terrain.Empty);

    const pos = blockToWorld(bx0, by0, cols, rows, 2);
    base.init(pos.x, pos.y, opts.baseHpOverride ?? save?.base.hp ?? 500, save?.base.level ?? 1);
    base.barrierCells = barrierCells;
  }

  // --- world ------------------------------------------------------------
  const world = new World({ cols, rows, theme, seed: opts.seed });
  // copy terrain into the world grid
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const t = grid.at(cx, cy);
      if (t !== Terrain.Empty) world.grid.setCell(cx, cy, t, grid.hpAt(cx, cy));
    }
  }
  world.base = base;

  const playerSpawn = blockToWorld(playerBlock.bx, playerBlock.by, cols, rows);
  clearAround(world.grid, playerSpawn.x, playerSpawn.y, 30);
  const enemySpawns = enemyBlocks.map((b) => {
    const p = blockToWorld(b.bx, b.by, cols, rows);
    clearAround(world.grid, p.x, p.y, 26);
    return p;
  });

  world.setScaling(stageScaling(opts.stageId ?? level.id), opts.difficulty ?? DEFAULT_COMBAT, 1);

  return {
    world,
    grid: world.grid,
    cols,
    rows,
    theme,
    base,
    playerSpawn,
    enemySpawns,
    powerupNodes,
    level,
  };
}

/** Adopt a procedurally generated arena into the same BuiltLevel shape. */
export function buildFromGen(gen: GenResult, opts: BuildOpts = {}): BuiltLevel {
  const cols = gen.grid.cols;
  const rows = gen.grid.rows;
  const world = new World({ cols, rows, theme: gen.grid.theme, seed: opts.seed ?? gen.level.id });
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const t = gen.grid.at(cx, cy);
      if (t !== Terrain.Empty) world.grid.setCell(cx, cy, t, gen.grid.hpAt(cx, cy));
    }
  }
  const save = opts.save;
  const base = new Base();
  if (!opts.skipBase) {
    const pos = blockToWorld(gen.base.bx, gen.base.by, cols, rows, 2);
    base.init(pos.x, pos.y, opts.baseHpOverride ?? save?.base.hp ?? 500, save?.base.level ?? 1);
    const barrierCells: { cx: number; cy: number }[] = [];
    const barrierRank = save?.base.barrier ?? 1;
    const bw = barrierRank <= 0 ? Terrain.Empty : barrierRank >= 3 ? Terrain.Stone : Terrain.Brick;
    const barrierHp = barrierRank === 2 ? TERRAIN[Terrain.Brick].hp * 1.75 : undefined;
    for (let x = gen.base.bx - 1; x <= gen.base.bx + 2; x++)
      for (let y = gen.base.by - 1; y <= gen.base.by + 2; y++) {
        if (x === gen.base.bx || x === gen.base.bx + 1) if (y === gen.base.by || y === gen.base.by + 1) continue;
        if (bw !== Terrain.Empty) {
          world.grid.fillBlock(x, y, 1, 1, bw, barrierHp);
          for (let oy = 0; oy < 2; oy++) for (let ox = 0; ox < 2; ox++) barrierCells.push({ cx: x * 2 + ox, cy: y * 2 + oy });
        }
      }
    world.grid.fillBlock(gen.base.bx, gen.base.by - 1, 2, 1, Terrain.Empty);
    base.barrierCells = barrierCells;
  }
  world.base = base;
  const playerSpawn = blockToWorld(gen.playerSpawn.bx, gen.playerSpawn.by, cols, rows);
  clearAround(world.grid, playerSpawn.x, playerSpawn.y, 30);
  const enemySpawns = gen.enemySpawns.map((b) => blockToWorld(b.bx, b.by, cols, rows));
  world.setScaling(
    { hp: 1, damage: 1, speed: 1, rate: 1 },
    opts.difficulty ?? DEFAULT_COMBAT,
    1,
  );
  return {
    world,
    grid: world.grid,
    cols,
    rows,
    theme: gen.grid.theme,
    base,
    playerSpawn,
    enemySpawns,
    powerupNodes: [],
    level: gen.level,
  };
}

export function blockToWorld(
  bx: number,
  by: number,
  cols: number,
  rows: number,
  spanBlocks = 1,
): { x: number; y: number } {
  const x = clampWorld(bx * 2 * CELL + (spanBlocks * 2 * CELL) / 2, 24, cols * CELL - 24);
  const y = clampWorld(by * 2 * CELL + (spanBlocks * 2 * CELL) / 2, 24, rows * CELL - 24);
  return { x, y };
}

const clampWorld = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function clearAround(grid: Grid, x: number, y: number, radius: number): void {
  const c0x = Math.floor((x - radius) / CELL);
  const c1x = Math.floor((x + radius) / CELL);
  const c0y = Math.floor((y - radius) / CELL);
  const c1y = Math.floor((y + radius) / CELL);
  for (let cy = c0y; cy <= c1y; cy++)
    for (let cx = c0x; cx <= c1x; cx++) {
      if (grid.at(cx, cy) !== Terrain.Empty) {
        grid.setCell(cx, cy, Terrain.Empty);
      }
    }
}
