import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { listCandidates } from '@/data';
import { TOURNAMENT_STORAGE_KEY } from '@/lib/tournamentConstants';
import type { TournamentState, MatchProgress, TournamentMatch } from '@/lib/tournamentTypes';
import {
  createTournamentState,
  advanceTournament,
  advanceFromTransition,
  startFromOnboarding,
  startFromBracketPreview,
  getMatchProgress as calcProgress,
  getCurrentMatch as calcCurrentMatch,
} from '@/services/tournamentService';

// =============================================================================
// Store Interface
// =============================================================================

interface TournamentStore {
  state: TournamentState | null;

  // Actions
  startNewTournament: () => void;
  submitVote: (winnerId: string) => void;
  advanceFromRoundTransition: () => void;
  goToBracketPreview: () => void;
  startPlaying: () => void;
  resetTournament: () => void;
}

// =============================================================================
// Selectors (use outside the store to derive data without re-renders)
// =============================================================================

export function selectProgress(store: TournamentStore): MatchProgress | null {
  return store.state ? calcProgress(store.state) : null;
}

export function selectCurrentMatch(store: TournamentStore): TournamentMatch | null {
  return store.state ? calcCurrentMatch(store.state) : null;
}

// =============================================================================
// Store
// =============================================================================

export const useTournamentStore = create<TournamentStore>()(
  persist(
    (set) => ({
      state: null,

      startNewTournament: () => {
        const candidates = listCandidates();
        const tournament = createTournamentState(candidates);
        set({ state: tournament });
      },

      submitVote: (winnerId) =>
        set((store) => {
          if (!store.state) return store;
          return { state: advanceTournament(store.state, winnerId) };
        }),

      advanceFromRoundTransition: () =>
        set((store) => {
          if (!store.state) return store;
          return { state: advanceFromTransition(store.state) };
        }),

      goToBracketPreview: () =>
        set((store) => {
          if (!store.state) return store;
          return { state: startFromOnboarding(store.state) };
        }),

      startPlaying: () =>
        set((store) => {
          if (!store.state) return store;
          return { state: startFromBracketPreview(store.state) };
        }),

      resetTournament: () => set({ state: null }),
    }),
    {
      name: TOURNAMENT_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
