import { describe, it, expect, beforeEach } from 'vitest';
import type { CandidateBase } from '@/data/types';
import type { TournamentState } from '@/lib/tournamentTypes';
import {
  createTournamentState,
  advanceTournament,
  advanceFromTransition,
  startFromOnboarding,
  startFromBracketPreview,
  getMatchProgress,
  getCurrentMatch,
  getEliminatedInRound,
  getAdvancingFromRound,
} from '../tournamentService';

// =============================================================================
// Test Helpers
// =============================================================================

function makeCandidates(count: number): CandidateBase[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `c${i + 1}`,
    nombre: `Candidato ${i + 1}`,
  }));
}

const CANDIDATES_36 = makeCandidates(36);

/** Play through an entire round, always picking the first candidate as winner */
function playRound(state: TournamentState): TournamentState {
  let s = state;
  const round = s.bracket.rounds[s.currentRound];
  const startMatch = s.currentMatchIndex;

  for (let i = startMatch; i < round.matches.length; i++) {
    const match = getCurrentMatch(s);
    if (!match) break;
    s = advanceTournament(s, match.candidates[0]);
  }
  return s;
}

/** Play the full tournament (all 19 decisions), always picking the first candidate */
function playFullTournament(state: TournamentState): TournamentState {
  let s = state;
  // R0: 12 matches
  s = playRound(s);
  s = advanceFromTransition(s);
  // R1: 4 matches
  s = playRound(s);
  s = advanceFromTransition(s);
  // R2: 2 matches
  s = playRound(s);
  s = advanceFromTransition(s);
  // R3: 1 match
  s = playRound(s);
  return s;
}

// =============================================================================
// Tests
// =============================================================================

describe('tournamentService', () => {
  let state: TournamentState;

  beforeEach(() => {
    state = createTournamentState(CANDIDATES_36);
  });

  // ---------------------------------------------------------------------------
  // createTournamentState
  // ---------------------------------------------------------------------------

  describe('createTournamentState', () => {
    it('should throw if not exactly 36 candidates', () => {
      expect(() => createTournamentState(makeCandidates(10))).toThrow('Expected 36');
      expect(() => createTournamentState(makeCandidates(37))).toThrow('Expected 36');
    });

    it('should create a bracket with 4 rounds', () => {
      expect(state.bracket.rounds).toHaveLength(4);
    });

    it('should have correct match counts per round', () => {
      const counts = state.bracket.rounds.map((r) => r.matches.length);
      expect(counts).toEqual([12, 4, 2, 1]);
    });

    it('should set round types correctly', () => {
      expect(state.bracket.rounds[0].type).toBe('pick-one-from-three');
      expect(state.bracket.rounds[1].type).toBe('pick-one-from-three');
      expect(state.bracket.rounds[2].type).toBe('1v1');
      expect(state.bracket.rounds[3].type).toBe('1v1');
    });

    it('should have 3 candidates in each R0 match', () => {
      for (const match of state.bracket.rounds[0].matches) {
        expect(match.candidates).toHaveLength(3);
      }
    });

    it('should have empty candidates in R1, R2, R3', () => {
      for (let r = 1; r <= 3; r++) {
        for (const match of state.bracket.rounds[r].matches) {
          expect(match.candidates).toHaveLength(0);
        }
      }
    });

    it('should include all 36 candidates exactly once in R0', () => {
      const allIds = state.bracket.rounds[0].matches.flatMap((m) => m.candidates);
      expect(allIds).toHaveLength(36);
      expect(new Set(allIds).size).toBe(36);
    });

    it('should set initial phase to onboarding', () => {
      expect(state.phase).toBe('onboarding');
    });

    it('should start at round 0, match 0', () => {
      expect(state.currentRound).toBe(0);
      expect(state.currentMatchIndex).toBe(0);
    });

    it('should have no podium', () => {
      expect(state.podium).toBeNull();
    });

    it('should have no completed rounds', () => {
      for (const round of state.bracket.rounds) {
        expect(round.completed).toBe(false);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // advanceTournament
  // ---------------------------------------------------------------------------

  describe('advanceTournament', () => {
    it('should throw if winnerId is not in the match', () => {
      expect(() => advanceTournament(state, 'nonexistent')).toThrow('not in match');
    });

    it('should record winner and eliminated', () => {
      const match = getCurrentMatch(state)!;
      const winnerId = match.candidates[0];
      const next = advanceTournament(state, winnerId);

      const updatedMatch = next.bracket.rounds[0].matches[0];
      expect(updatedMatch.winner).toBe(winnerId);
      expect(updatedMatch.eliminated).toHaveLength(2);
      expect(updatedMatch.eliminated).not.toContain(winnerId);
    });

    it('should advance matchIndex within a round', () => {
      const match = getCurrentMatch(state)!;
      const next = advanceTournament(state, match.candidates[0]);

      expect(next.currentRound).toBe(0);
      expect(next.currentMatchIndex).toBe(1);
    });

    it('should propagate R0 winners to R1 (groups of 3)', () => {
      let s = state;
      // Play 3 R0 matches → should fill R1 match 0
      for (let i = 0; i < 3; i++) {
        const match = getCurrentMatch(s)!;
        s = advanceTournament(s, match.candidates[0]);
      }
      expect(s.bracket.rounds[1].matches[0].candidates).toHaveLength(3);
    });

    it('should transition to round-transition after completing a round', () => {
      const s = playRound(state);
      expect(s.phase).toBe('round-transition');
      expect(s.bracket.rounds[0].completed).toBe(true);
    });

    it('should not change phase mid-round', () => {
      const match = getCurrentMatch(state)!;
      const next = advanceTournament(state, match.candidates[0]);
      // Still in playing phase (original phase was onboarding, but advanceTournament
      // doesn't change phase unless end of round)
      expect(next.phase).toBe('onboarding');
    });
  });

  // ---------------------------------------------------------------------------
  // Winner propagation across rounds
  // ---------------------------------------------------------------------------

  describe('winner propagation', () => {
    it('should propagate R1 winners to R2 (groups of 2)', () => {
      let s = playRound(state);
      s = advanceFromTransition(s);
      // Play 2 R1 matches → should fill R2 match 0
      for (let i = 0; i < 2; i++) {
        const match = getCurrentMatch(s)!;
        s = advanceTournament(s, match.candidates[0]);
      }
      expect(s.bracket.rounds[2].matches[0].candidates).toHaveLength(2);
    });

    it('should propagate R2 winners to R3', () => {
      let s = playRound(state);
      s = advanceFromTransition(s);
      s = playRound(s);
      s = advanceFromTransition(s);
      // Play both R2 semis
      for (let i = 0; i < 2; i++) {
        const match = getCurrentMatch(s)!;
        s = advanceTournament(s, match.candidates[0]);
      }
      expect(s.bracket.rounds[3].matches[0].candidates).toHaveLength(2);
    });
  });

  // ---------------------------------------------------------------------------
  // Full tournament integration test
  // ---------------------------------------------------------------------------

  describe('full tournament', () => {
    it('should complete with podium after 19 decisions', () => {
      const final = playFullTournament(state);

      expect(final.phase).toBe('podium');
      expect(final.podium).not.toBeNull();
      expect(final.podium!.first).toBeTruthy();
      expect(final.podium!.second).toBeTruthy();
      expect(final.podium!.third).toBeTruthy();
    });

    it('should have 3 distinct candidates on podium', () => {
      const final = playFullTournament(state);
      const { first, second, third } = final.podium!;

      expect(new Set([first, second, third]).size).toBe(3);
    });

    it('should mark all rounds as completed', () => {
      const final = playFullTournament(state);
      for (const round of final.bracket.rounds) {
        expect(round.completed).toBe(true);
      }
    });

    it('should have winners in all matches', () => {
      const final = playFullTournament(state);
      for (const round of final.bracket.rounds) {
        for (const match of round.matches) {
          expect(match.winner).not.toBeNull();
        }
      }
    });
  });

  // ---------------------------------------------------------------------------
  // getMatchProgress
  // ---------------------------------------------------------------------------

  describe('getMatchProgress', () => {
    it('should return 0% at the start', () => {
      const progress = getMatchProgress(state);
      expect(progress.current).toBe(0);
      expect(progress.total).toBe(19);
      expect(progress.overallPercent).toBe(0);
    });

    it('should update after a vote', () => {
      const match = getCurrentMatch(state)!;
      const next = advanceTournament(state, match.candidates[0]);
      const progress = getMatchProgress(next);
      expect(progress.current).toBe(1);
      expect(progress.overallPercent).toBe(Math.round((1 / 19) * 100));
    });

    it('should return correct round label', () => {
      const progress = getMatchProgress(state);
      expect(progress.roundLabel).toBe('Ronda 1');
    });

    it('should return 100% when tournament is complete', () => {
      const final = playFullTournament(state);
      const progress = getMatchProgress(final);
      expect(progress.overallPercent).toBe(100);
    });
  });

  // ---------------------------------------------------------------------------
  // getCurrentMatch
  // ---------------------------------------------------------------------------

  describe('getCurrentMatch', () => {
    it('should return the first match at start', () => {
      const match = getCurrentMatch(state);
      expect(match).not.toBeNull();
      expect(match!.id).toBe('r0-m0');
      expect(match!.candidates).toHaveLength(3);
    });

    it('should return next match after advancing', () => {
      const match = getCurrentMatch(state)!;
      const next = advanceTournament(state, match.candidates[0]);
      const nextMatch = getCurrentMatch(next);
      expect(nextMatch!.id).toBe('r0-m1');
    });
  });

  // ---------------------------------------------------------------------------
  // getEliminatedInRound / getAdvancingFromRound
  // ---------------------------------------------------------------------------

  describe('getEliminatedInRound', () => {
    it('should return empty for incomplete round', () => {
      expect(getEliminatedInRound(state, 0)).toEqual([]);
    });

    it('should return eliminated candidates after round completion', () => {
      const s = playRound(state);
      const eliminated = getEliminatedInRound(s, 0);
      // R0: 12 matches x 2 eliminated = 24
      expect(eliminated).toHaveLength(24);
    });
  });

  describe('getAdvancingFromRound', () => {
    it('should return empty for incomplete round', () => {
      expect(getAdvancingFromRound(state, 0)).toEqual([]);
    });

    it('should return winners after round completion', () => {
      const s = playRound(state);
      const advancing = getAdvancingFromRound(s, 0);
      // R0: 12 winners
      expect(advancing).toHaveLength(12);
    });
  });

  // ---------------------------------------------------------------------------
  // Phase transitions
  // ---------------------------------------------------------------------------

  describe('advanceFromTransition', () => {
    it('should advance to next round with correct phase', () => {
      const afterR0 = playRound(state);
      expect(afterR0.phase).toBe('round-transition');

      const next = advanceFromTransition(afterR0);
      expect(next.currentRound).toBe(1);
      expect(next.currentMatchIndex).toBe(0);
      expect(next.phase).toBe('playing-pick-three');
    });

    it('should set phase to playing-1v1 for semifinal round', () => {
      let s = playRound(state);
      s = advanceFromTransition(s);
      s = playRound(s);
      const next = advanceFromTransition(s);
      expect(next.currentRound).toBe(2);
      expect(next.phase).toBe('playing-1v1');
    });
  });

  describe('startFromOnboarding', () => {
    it('should set phase to bracket-preview', () => {
      const next = startFromOnboarding(state);
      expect(next.phase).toBe('bracket-preview');
    });

    it('should not mutate original state', () => {
      const original = state.phase;
      startFromOnboarding(state);
      expect(state.phase).toBe(original);
    });
  });

  describe('startFromBracketPreview', () => {
    it('should set phase to playing-pick-three', () => {
      const next = startFromBracketPreview(state);
      expect(next.phase).toBe('playing-pick-three');
    });
  });
});
