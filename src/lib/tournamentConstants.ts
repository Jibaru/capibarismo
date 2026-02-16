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
}

export const ROUND_CONFIG: readonly RoundConfig[] = [
  { round: 0, type: '1v1',                matchCount: 18, label: 'Ronda 1',    sublabel: '36 → 18' },
  { round: 1, type: '1v1',                matchCount: 9,  label: 'Ronda 2',    sublabel: '18 → 9' },
  { round: 2, type: 'pick-one-from-three', matchCount: 3,  label: 'Semifinal',  sublabel: '9 → 3' },
  { round: 3, type: 'final',              matchCount: 1,  label: 'Gran Final', sublabel: 'Top 3' },
] as const;

// Total user decisions: 18 + 9 + 3 + 1 (champion) + 1 (runner-up) = 32
export const TOTAL_DECISIONS = 32;

// Total matches across all rounds (not counting the runner-up pick as a separate match)
export const TOTAL_MATCHES = ROUND_CONFIG.reduce((sum, r) => sum + r.matchCount, 0); // 31

export const TOTAL_CANDIDATES = 36;

// =============================================================================
// Storage
// =============================================================================

export const TOURNAMENT_STORAGE_KEY = 'tournament-state';
