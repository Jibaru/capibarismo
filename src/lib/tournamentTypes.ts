import type { CandidateID } from '@/data/types';

// =============================================================================
// Tournament Phase State Machine
// =============================================================================

export type TournamentPhase =
  | 'onboarding'
  | 'bracket-preview'
  | 'playing-pick-three'
  | 'playing-1v1'
  | 'round-transition'
  | 'podium';

// =============================================================================
// Tournament Match & Round
// =============================================================================

export type RoundType = '1v1' | 'pick-one-from-three';

export interface TournamentMatch {
  id: string;
  candidates: CandidateID[];   // 2 for 1v1, 3 for pick-from-three
  winner: CandidateID | null;
  eliminated: CandidateID[];
}

export interface TournamentRound {
  roundIndex: number;
  type: RoundType;
  matches: TournamentMatch[];
  completed: boolean;
}

// =============================================================================
// Tournament Bracket & State
// =============================================================================

export interface TournamentBracket {
  rounds: TournamentRound[];
}

export interface PodiumResult {
  first: CandidateID;
  second: CandidateID;
  third: CandidateID;
}

export interface TournamentState {
  id: string;
  bracket: TournamentBracket;
  currentRound: number;
  currentMatchIndex: number;
  phase: TournamentPhase;
  podium: PodiumResult | null;
  createdAt: number;
}

// =============================================================================
// Progress Info
// =============================================================================

export interface MatchProgress {
  current: number;       // matches completed so far (across all rounds)
  total: number;         // total matches in tournament
  roundLabel: string;    // e.g., "Ronda 1"
  arcadeRoundLabel: string; // e.g., "RONDA 1: ¡ELIGE!"
  matchLabel: string;    // e.g., "Grupo 5 de 12"
  overallPercent: number; // 0-100
}
