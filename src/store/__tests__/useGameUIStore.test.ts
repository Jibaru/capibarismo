import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameUIStore } from '../useGameUIStore';

describe('useGameUIStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const { result } = renderHook(() => useGameUIStore());
    act(() => {
      result.current.closeCandidateInfo();
      result.current.setReducedMotion(false);
      // Ensure keyboard help is off
      if (result.current.showKeyboardHelp) {
        result.current.toggleKeyboardHelp();
      }
    });
  });

  describe('Initial State', () => {
    it('should have candidateInfoOpen as false', () => {
      const { result } = renderHook(() => useGameUIStore());
      expect(result.current.candidateInfoOpen).toBe(false);
    });

    it('should have selectedCandidateId as null', () => {
      const { result } = renderHook(() => useGameUIStore());
      expect(result.current.selectedCandidateId).toBeNull();
    });

    it('should have showKeyboardHelp as false', () => {
      const { result } = renderHook(() => useGameUIStore());
      expect(result.current.showKeyboardHelp).toBe(false);
    });

    it('should have reducedMotion as false', () => {
      const { result } = renderHook(() => useGameUIStore());
      expect(result.current.reducedMotion).toBe(false);
    });
  });

  describe('Candidate Info Overlay', () => {
    it('should open candidate info with correct candidate ID', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('candidate-123');
      });

      expect(result.current.candidateInfoOpen).toBe(true);
      expect(result.current.selectedCandidateId).toBe('candidate-123');
    });

    it('should close candidate info and clear selected candidate', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('candidate-123');
      });

      expect(result.current.candidateInfoOpen).toBe(true);

      act(() => {
        result.current.closeCandidateInfo();
      });

      expect(result.current.candidateInfoOpen).toBe(false);
      expect(result.current.selectedCandidateId).toBeNull();
    });

    it('should handle opening different candidates sequentially', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('candidate-1');
      });
      expect(result.current.selectedCandidateId).toBe('candidate-1');

      act(() => {
        result.current.openCandidateInfo('candidate-2');
      });
      expect(result.current.selectedCandidateId).toBe('candidate-2');
      expect(result.current.candidateInfoOpen).toBe(true);
    });

    it('should handle opening the same candidate twice', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('candidate-123');
      });

      act(() => {
        result.current.openCandidateInfo('candidate-123');
      });

      expect(result.current.candidateInfoOpen).toBe(true);
      expect(result.current.selectedCandidateId).toBe('candidate-123');
    });
  });

  describe('Keyboard Help', () => {
    it('should toggle keyboard help from false to true', () => {
      const { result } = renderHook(() => useGameUIStore());

      expect(result.current.showKeyboardHelp).toBe(false);

      act(() => {
        result.current.toggleKeyboardHelp();
      });

      expect(result.current.showKeyboardHelp).toBe(true);
    });

    it('should toggle keyboard help from true to false', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.toggleKeyboardHelp();
      });
      expect(result.current.showKeyboardHelp).toBe(true);

      act(() => {
        result.current.toggleKeyboardHelp();
      });
      expect(result.current.showKeyboardHelp).toBe(false);
    });

    it('should toggle keyboard help multiple times', () => {
      const { result } = renderHook(() => useGameUIStore());

      expect(result.current.showKeyboardHelp).toBe(false);

      act(() => {
        result.current.toggleKeyboardHelp();
      });
      expect(result.current.showKeyboardHelp).toBe(true);

      act(() => {
        result.current.toggleKeyboardHelp();
      });
      expect(result.current.showKeyboardHelp).toBe(false);

      act(() => {
        result.current.toggleKeyboardHelp();
      });
      expect(result.current.showKeyboardHelp).toBe(true);
    });
  });

  describe('Reduced Motion', () => {
    it('should enable reduced motion', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.setReducedMotion(true);
      });

      expect(result.current.reducedMotion).toBe(true);
    });

    it('should disable reduced motion', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.setReducedMotion(true);
      });
      expect(result.current.reducedMotion).toBe(true);

      act(() => {
        result.current.setReducedMotion(false);
      });
      expect(result.current.reducedMotion).toBe(false);
    });

    it('should handle setting reduced motion to the same value', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.setReducedMotion(false);
      });
      expect(result.current.reducedMotion).toBe(false);

      act(() => {
        result.current.setReducedMotion(false);
      });
      expect(result.current.reducedMotion).toBe(false);
    });
  });

  describe('Multiple State Updates', () => {
    it('should handle multiple independent state changes', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('candidate-1');
        result.current.setReducedMotion(true);
      });

      expect(result.current.candidateInfoOpen).toBe(true);
      expect(result.current.selectedCandidateId).toBe('candidate-1');
      expect(result.current.reducedMotion).toBe(true);
    });

    it('should maintain state across different actions', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('candidate-1');
      });

      act(() => {
        result.current.setReducedMotion(true);
      });

      expect(result.current.candidateInfoOpen).toBe(true);
      expect(result.current.reducedMotion).toBe(true);

      act(() => {
        result.current.closeCandidateInfo();
      });

      expect(result.current.candidateInfoOpen).toBe(false);
      expect(result.current.reducedMotion).toBe(true);
    });
  });

  describe('Store Persistence Across Hooks', () => {
    it('should share state between multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useGameUIStore());
      const { result: result2 } = renderHook(() => useGameUIStore());

      act(() => {
        result1.current.openCandidateInfo('candidate-123');
      });

      expect(result2.current.candidateInfoOpen).toBe(true);
      expect(result2.current.selectedCandidateId).toBe('candidate-123');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string as candidate ID', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        result.current.openCandidateInfo('');
      });

      expect(result.current.candidateInfoOpen).toBe(true);
      expect(result.current.selectedCandidateId).toBe('');
    });

    it('should handle very long candidate ID', () => {
      const { result } = renderHook(() => useGameUIStore());
      const longId = 'a'.repeat(1000);

      act(() => {
        result.current.openCandidateInfo(longId);
      });

      expect(result.current.candidateInfoOpen).toBe(true);
      expect(result.current.selectedCandidateId).toBe(longId);
    });

    it('should handle rapid state changes', () => {
      const { result } = renderHook(() => useGameUIStore());

      act(() => {
        for (let i = 0; i < 100; i++) {
          result.current.toggleKeyboardHelp();
        }
      });

      expect(result.current.showKeyboardHelp).toBe(false); // Even number of toggles
    });
  });
});
