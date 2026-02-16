/**
 * Tournament service — pure functions for bracket generation and state advancement.
 *
 * No side effects. All functions take state in, return new state out.
 * Storage/persistence is handled by the Zustand store layer.
 */

import { nanoid } from 'nanoid';
import type { CandidateBase } from '@/data/types';
import type {
  TournamentState,
  TournamentBracket,
  TournamentRound,
  TournamentMatch,
  MatchProgress,
  PodiumResult,
} from '@/lib/tournamentTypes';
import { ROUND_CONFIG, TOTAL_CANDIDATES } from '@/lib/tournamentConstants';

// =============================================================================
// Public API
// =============================================================================

/**
 * Create a fresh tournament state with a randomly-seeded bracket.
 */
export function createTournamentState(candidates: CandidateBase[]): TournamentState {
  if (candidates.length !== TOTAL_CANDIDATES) {
    throw new Error(`Expected ${TOTAL_CANDIDATES} candidates, got ${candidates.length}`);
  }

  return {
    id: nanoid(),
    bracket: generateBracket(candidates),
    currentRound: 0,
    currentMatchIndex: 0,
    phase: 'onboarding',
    podium: null,
    createdAt: Date.now(),
  };
}

/**
 * Advance the tournament by recording a vote. Returns a new TournamentState.
 *
 * For 1v1 matches: winnerId is the chosen candidate.
 * For pick-from-three: winnerId is the chosen candidate.
 * For final-runner-up: winnerId is the runner-up pick.
 */
export function advanceTournament(
  state: TournamentState,
  winnerId: string
): TournamentState {
  const next = structuredClone(state);
  const round = next.bracket.rounds[next.currentRound];
  const match = round.matches[next.currentMatchIndex];

  // Validate that the winner is actually in this match
  if (!match.candidates.includes(winnerId)) {
    throw new Error(`Candidate ${winnerId} is not in match ${match.id}`);
  }

  // Record the result
  match.winner = winnerId;
  match.eliminated = match.candidates.filter((id) => id !== winnerId);

  // Propagate winner to the next round's match slot
  propagateWinner(next, winnerId);

  // Advance to the next match or transition
  return advanceToNext(next);
}

/**
 * Get progress info for the HUD.
 */
export function getMatchProgress(state: TournamentState): MatchProgress {
  const roundConfig = ROUND_CONFIG[state.currentRound];
  const round = state.bracket.rounds[state.currentRound];

  // Count completed matches across all rounds
  let completedTotal = 0;
  let totalMatches = 0;
  for (const r of state.bracket.rounds) {
    for (const m of r.matches) {
      totalMatches++;
      if (m.winner) completedTotal++;
    }
  }

  // For the final round, we have 1 match for champion + implicit runner-up pick
  // Add 1 for the runner-up if in that phase or podium
  if (state.phase === 'final-runner-up' || state.phase === 'podium') {
    completedTotal++;
    totalMatches++;
  } else if (state.bracket.rounds[3]?.matches[0]) {
    totalMatches++; // account for runner-up pick in total
  }

  const overallPercent = totalMatches > 0
    ? Math.round((completedTotal / totalMatches) * 100)
    : 0;

  const matchIndex = state.currentMatchIndex;
  const matchCount = round?.matches.length ?? 0;

  return {
    current: completedTotal,
    total: totalMatches,
    roundLabel: roundConfig?.label ?? 'Final',
    matchLabel: state.phase === 'final-runner-up'
      ? 'Elige al subcampeón'
      : `Encuentro ${matchIndex + 1} de ${matchCount}`,
    overallPercent,
  };
}

/**
 * Get the current match that needs a vote.
 */
export function getCurrentMatch(state: TournamentState): TournamentMatch | null {
  const round = state.bracket.rounds[state.currentRound];
  if (!round) return null;
  return round.matches[state.currentMatchIndex] ?? null;
}

/**
 * Get candidates that were eliminated in a specific round.
 */
export function getEliminatedInRound(state: TournamentState, roundIndex: number): string[] {
  const round = state.bracket.rounds[roundIndex];
  if (!round) return [];
  return round.matches.flatMap((m) => m.eliminated);
}

/**
 * Get candidates that advanced (won) in a specific round.
 */
export function getAdvancingFromRound(state: TournamentState, roundIndex: number): string[] {
  const round = state.bracket.rounds[roundIndex];
  if (!round) return [];
  return round.matches.map((m) => m.winner).filter((id): id is string => id !== null);
}

// =============================================================================
// Bracket Generation
// =============================================================================

function generateBracket(candidates: CandidateBase[]): TournamentBracket {
  const shuffled = shuffleArray(candidates);
  const ids = shuffled.map((c) => c.id);

  // Round 0: 18 x 1v1 matches (pair sequentially)
  const round0Matches: TournamentMatch[] = [];
  for (let i = 0; i < ids.length; i += 2) {
    round0Matches.push({
      id: `r0-m${i / 2}`,
      candidates: [ids[i], ids[i + 1]],
      winner: null,
      eliminated: [],
    });
  }

  // Round 1: 9 x 1v1 matches (winners of R0 paired: [m0,m1]→m0, [m2,m3]→m1, etc.)
  const round1Matches: TournamentMatch[] = [];
  for (let i = 0; i < 9; i++) {
    round1Matches.push({
      id: `r1-m${i}`,
      candidates: [], // filled when R0 winners propagate
      winner: null,
      eliminated: [],
    });
  }

  // Round 2: 3 x pick-one-from-three (groups of 3 from R1 winners)
  const round2Matches: TournamentMatch[] = [];
  for (let i = 0; i < 3; i++) {
    round2Matches.push({
      id: `r2-m${i}`,
      candidates: [], // filled when R1 winners propagate
      winner: null,
      eliminated: [],
    });
  }

  // Round 3: 1 x final (3 candidates from R2 winners)
  const round3Matches: TournamentMatch[] = [
    {
      id: 'r3-m0',
      candidates: [], // filled when R2 winners propagate
      winner: null,
      eliminated: [],
    },
  ];

  const rounds: TournamentRound[] = [
    { roundIndex: 0, type: '1v1', matches: round0Matches, completed: false },
    { roundIndex: 1, type: '1v1', matches: round1Matches, completed: false },
    { roundIndex: 2, type: 'pick-one-from-three', matches: round2Matches, completed: false },
    { roundIndex: 3, type: 'final', matches: round3Matches, completed: false },
  ];

  return { rounds };
}

// =============================================================================
// Winner Propagation
// =============================================================================

/**
 * After a match is won, propagate the winner into the correct slot in the next round.
 */
function propagateWinner(state: TournamentState, winnerId: string): void {
  const roundIndex = state.currentRound;
  const matchIndex = state.currentMatchIndex;

  if (roundIndex === 0) {
    // R0 → R1: Every 2 R0 matches feed 1 R1 match
    // R0 matches [0,1] → R1 match 0
    // R0 matches [2,3] → R1 match 1
    // etc.
    const r1MatchIndex = Math.floor(matchIndex / 2);
    const r1Match = state.bracket.rounds[1].matches[r1MatchIndex];
    r1Match.candidates.push(winnerId);
  } else if (roundIndex === 1) {
    // R1 → R2: Every 3 R1 matches feed 1 R2 match
    // R1 matches [0,1,2] → R2 match 0
    // R1 matches [3,4,5] → R2 match 1
    // R1 matches [6,7,8] → R2 match 2
    const r2MatchIndex = Math.floor(matchIndex / 3);
    const r2Match = state.bracket.rounds[2].matches[r2MatchIndex];
    r2Match.candidates.push(winnerId);
  } else if (roundIndex === 2) {
    // R2 → R3: All 3 R2 winners go into the single R3 final match
    const r3Match = state.bracket.rounds[3].matches[0];
    r3Match.candidates.push(winnerId);
  }
  // roundIndex === 3 (final): no propagation needed, handled by podium logic
}

// =============================================================================
// State Advancement
// =============================================================================

function advanceToNext(state: TournamentState): TournamentState {
  const round = state.bracket.rounds[state.currentRound];
  const isLastMatchInRound = state.currentMatchIndex >= round.matches.length - 1;

  if (state.currentRound === 3) {
    // Final round: champion just picked → go to runner-up selection
    round.completed = true;
    return handleFinalRound(state);
  }

  if (isLastMatchInRound) {
    // Round complete → transition
    round.completed = true;
    state.phase = 'round-transition';
    return state;
  }

  // More matches in current round
  state.currentMatchIndex++;
  return state;
}

function handleFinalRound(state: TournamentState): TournamentState {
  const finalMatch = state.bracket.rounds[3].matches[0];
  const champion = finalMatch.winner!;
  const remaining = finalMatch.eliminated;

  if (remaining.length === 2) {
    // Champion just picked, need runner-up selection
    state.phase = 'final-runner-up';
  }

  return state;
}

/**
 * Called when the user picks the runner-up from the remaining 2 candidates.
 * Returns state with podium result and 'podium' phase.
 */
export function pickRunnerUp(state: TournamentState, runnerUpId: string): TournamentState {
  const next = structuredClone(state);
  const finalMatch = next.bracket.rounds[3].matches[0];
  const champion = finalMatch.winner!;
  const remaining = finalMatch.eliminated;

  if (!remaining.includes(runnerUpId)) {
    throw new Error(`Candidate ${runnerUpId} is not in the final remaining candidates`);
  }

  const third = remaining.find((id) => id !== runnerUpId)!;

  next.podium = {
    first: champion,
    second: runnerUpId,
    third,
  };
  next.phase = 'podium';

  return next;
}

/**
 * Advance from round-transition to the next round's playing phase.
 */
export function advanceFromTransition(state: TournamentState): TournamentState {
  const next = structuredClone(state);
  const nextRoundIndex = next.currentRound + 1;

  if (nextRoundIndex >= next.bracket.rounds.length) {
    // Should not happen if transitions are correct
    next.phase = 'podium';
    return next;
  }

  next.currentRound = nextRoundIndex;
  next.currentMatchIndex = 0;

  const nextRound = next.bracket.rounds[nextRoundIndex];
  if (nextRound.type === '1v1') {
    next.phase = 'playing-1v1';
  } else if (nextRound.type === 'pick-one-from-three') {
    next.phase = 'playing-pick-three';
  } else if (nextRound.type === 'final') {
    next.phase = 'final-champion';
  }

  return next;
}

/**
 * Transition from onboarding to bracket preview.
 */
export function startFromOnboarding(state: TournamentState): TournamentState {
  const next = structuredClone(state);
  next.phase = 'bracket-preview';
  return next;
}

/**
 * Transition from bracket preview to first match.
 */
export function startFromBracketPreview(state: TournamentState): TournamentState {
  const next = structuredClone(state);
  next.phase = 'playing-1v1';
  return next;
}

// =============================================================================
// Utility
// =============================================================================

/** Fisher-Yates shuffle */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
