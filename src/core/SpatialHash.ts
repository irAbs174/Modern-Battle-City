import type { Rect } from './math';

export interface Hashable {
  x: number;
  y: number;
  radius: number;
  active: boolean;
}

/**
 * Uniform-grid broad phase. Rebuilt each frame (cheap, no incremental bookkeeping)
 * and used for projectile-vs-projectile and effect-radius queries.
 */
export class SpatialHash<T extends Hashable> {
  readonly cell: number;
  private inv: number;
  private map = new Map<number, T[]>();

  constructor(cellSize = 48) {
    this.cell = cellSize;
    this.inv = 1 / cellSize;
  }

  private key(cx: number, cy: number): number {
    return (cx + 4096) * 8192 + (cy + 4096);
  }

  clear(): void {
    this.map.clear();
  }

  insert(item: T): void {
    const r = item.radius;
    const x0 = Math.floor((item.x - r) * this.inv);
    const x1 = Math.floor((item.x + r) * this.inv);
    const y0 = Math.floor((item.y - r) * this.inv);
    const y1 = Math.floor((item.y + r) * this.inv);
    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        const k = this.key(cx, cy);
        let arr = this.map.get(k);
        if (!arr) {
          arr = [];
          this.map.set(k, arr);
        }
        arr.push(item);
      }
    }
  }

  /** Query items overlapping a circle. Results may repeat across cells | dedupe by the caller if needed. */
  queryCircle(x: number, y: number, r: number, out: T[] = []): T[] {
    out.length = 0;
    const x0 = Math.floor((x - r) * this.inv);
    const x1 = Math.floor((x + r) * this.inv);
    const y0 = Math.floor((y - r) * this.inv);
    const y1 = Math.floor((y + r) * this.inv);
    const seen = new Set<T>();
    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        const arr = this.map.get(this.key(cx, cy));
        if (!arr) continue;
        for (const it of arr) {
          if (seen.has(it) || !it.active) continue;
          seen.add(it);
          const dx = it.x - x;
          const dy = it.y - y;
          const rr = r + it.radius;
          if (dx * dx + dy * dy <= rr * rr) out.push(it);
        }
      }
    }
    return out;
  }

  queryRect(rect: Rect, out: T[] = []): T[] {
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const r = Math.hypot(rect.w, rect.h) / 2;
    const res = this.queryCircle(cx, cy, r, out);
    return res.filter(
      (it) =>
        it.x + it.radius >= rect.x &&
        it.x - it.radius <= rect.x + rect.w &&
        it.y + it.radius >= rect.y &&
        it.y - it.radius <= rect.y + rect.h,
    );
  }

  get size(): number {
    return this.map.size;
  }
}
