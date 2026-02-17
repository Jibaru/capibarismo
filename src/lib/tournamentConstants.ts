import type { RoundType } from './tournamentTypes';

// =============================================================================
// Round Configuration
// =============================================================================

export interface RoundConfig {
  round: number;
  type: RoundType;
  matchCount: number;
  label: string;
  sublabel: string;
  arcadeLabel: string;
}

export const ROUND_CONFIG: readonly RoundConfig[] = [
  { round: 0, type: 'pick-one-from-three', matchCount: 12, label: 'Ronda 1',    sublabel: '36 → 12', arcadeLabel: 'RONDA 1: ¡ELIGE!' },
  { round: 1, type: 'pick-one-from-three', matchCount: 4,  label: 'Ronda 2',    sublabel: '12 → 4',  arcadeLabel: 'RONDA 2: ¡ELIGE!' },
  { round: 2, type: '1v1',                matchCount: 2,  label: 'Semifinal',  sublabel: '4 → 2',   arcadeLabel: 'SEMIFINAL: ¡PELEA!' },
  { round: 3, type: '1v1',                matchCount: 1,  label: 'Gran Final', sublabel: '2 → 1',   arcadeLabel: 'GRAN FINAL: ¡BATALLA POR EL PERÚ!' },
] as const;

// How many parent matches feed each child match per round transition
// R0→R1: 3 pick-from-3 winners → 1 R1 pick-from-3 match
// R1→R2: 2 pick-from-3 winners → 1 R2 1v1 match
// R2→R3: 2 semifinal winners → 1 R3 final match
export const PROPAGATION_GROUP_SIZES = [3, 2, 2] as const;

// Total user decisions: 12 + 4 + 2 + 1 = 19
export const TOTAL_DECISIONS = 19;

// Total matches across all rounds
export const TOTAL_MATCHES = ROUND_CONFIG.reduce((sum, r) => sum + r.matchCount, 0); // 19

export const TOTAL_CANDIDATES = 36;

// =============================================================================
// Storage
// =============================================================================

export const TOURNAMENT_STORAGE_KEY = 'tournament-state-v2';
