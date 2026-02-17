import { create } from 'zustand';

interface GameUIState {
  // Overlay state
  candidateInfoOpen: boolean;
  selectedCandidateId: string | null;

  // Keyboard help
  showKeyboardHelp: boolean;

  // Effects toggle
  reducedMotion: boolean;

  // Actions
  openCandidateInfo: (candidateId: string) => void;
  closeCandidateInfo: () => void;
  toggleKeyboardHelp: () => void;
  setReducedMotion: (enabled: boolean) => void;
}

export const useGameUIStore = create<GameUIState>((set) => ({
  // Initial state
  candidateInfoOpen: false,
  selectedCandidateId: null,
  showKeyboardHelp: false,
  reducedMotion: false,

  // Actions
  openCandidateInfo: (candidateId) =>
    set({ candidateInfoOpen: true, selectedCandidateId: candidateId }),

  closeCandidateInfo: () =>
    set({ candidateInfoOpen: false, selectedCandidateId: null }),

  toggleKeyboardHelp: () =>
    set((state) => ({ showKeyboardHelp: !state.showKeyboardHelp })),

  setReducedMotion: (enabled) =>
    set({ reducedMotion: enabled }),
}));
