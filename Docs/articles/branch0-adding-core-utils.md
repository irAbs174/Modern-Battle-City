# Merging Core Branch to Main: Foundation for Modern Battle City
### Article in MEDIUM.com: https://abbas-damerchi.medium.com/building-an-arcade-game-ep1-core-16a8f17833c8

## Overview
On this development milestone, we successfully merged the **core** branch into **main**
Establishing the foundational infrastructure for Modern Battle City.

This merge (commit `6ab58edd4dbce87410b134f2a8ce41e3966747b8`) introduced critical utilities, configuration systems & shared mathematical helpers that form the backbone of the game engine.

## What Was Merged
The core branch consolidates essential systems that every game module depends on:

### 1. **Global Configuration System** (`src/core/config.ts`)

The merged code introduced a centralized configuration file `CFG` that serves as the single source of truth for all tuning constants.
This is a best practice in game development, allowing designers & engineers to iterate on balance without touching core logic.

#### Key Configuration Sections:

**Physics & Movement:**
- Fixed timestep: `1/60` (60 FPS deterministic simulation)
- Maximum frame delta clamp: 0.25 seconds
- Player size: 26 units, base speed: 118 units/s

**Combat System:**
- Combo window: 3.2 seconds
- Critical damage multiplier: 1.8x
- Friendly fire: Disabled
- Bullet-vs-bullet collisions: Enabled

**Scoring & Progression:**
- Base kill reward: 100 points
- Combo step bonus: 0.12 multiplier
- Perfect run bonus: 2500 points
- XP growth rate: 1.22 per level

**Camera & Rendering:**
- Follow camera lead: 56 world units ahead
- Camera damping: 7 (exponential smoothing)
- Particle system caps: 1,400 particles, 900 trails, 90 texts
- Zoom range: 0.45x to 2.2x

**AI & Enemy Behavior:**
- Flow field recalculation interval: 0.28 seconds
- Enemy sight range: 460 units
- Base reaction time: 0.32 seconds

### 2. **Difficulty System**

The merge introduced a robust difficulty scaling framework with four preset levels:

| Difficulty | Enemy HP | Enemy DMG | Score Multiplier | Lives | Description |
|---|---|---|---|---|---|
| **Recruit** | 0.78x | 0.62x | 0.8x | 7 | Forgiving, great for learning |
| **Veteran** | 1.0x | 1.0x | 1.0x | 5 | Intended experience |
| **Elite** | 1.28x | 1.4x | 1.35x | 5 | Sharper AI, heavier armor |
| **Nightmare** | 1.6x | 1.85x | 1.85x | 3 | No mercy mode |

Each difficulty also adjusts:
- Boss mechanics (health scaling caps, enrage rates, summon behavior)
- Player survivability (health modifier, invulnerability frames)
- Economic rewards (coin & XP multipliers)

### 3. **Shared Math Helpers**

The core branch established utility functions that other modules depend on:

```typescript
// Viewport detection for responsive design
function isCompactViewport(w: number, h: number): boolean {
  return w < 900 || h < 620;
}

// Difficulty lookup & application
const getDifficulty = (id: DifficultyId) =>
  DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];

// Combat multiplier extraction
const combatFromDifficulty = (d): DifficultyCombat => { ... }
