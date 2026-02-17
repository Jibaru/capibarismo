import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { BracketTree } from './BracketTree';
import { Button } from '@/components/ui/button';
import { useGameUIStore } from '@/store/useGameUIStore';
import { ROUND_CONFIG } from '@/lib/tournamentConstants';
import type { TournamentBracket } from '@/lib/tournamentTypes';

// =============================================================================
// Types
// =============================================================================

interface BracketTreePageProps {
  bracket: TournamentBracket;
  currentRound: number;
  currentMatchIndex: number;
  onAction: () => void;
  mode: 'preview' | 'transition' | 'viewing';
  completedRoundIndex?: number;
  eliminatedCount?: number;
  advancingCount?: number;
  autoAdvanceDelay?: number; // ms, for transition mode auto-advance
  showOverviewFirst?: boolean;
}

// =============================================================================
// Component
// =============================================================================

export function BracketTreePage({
  bracket,
  currentRound,
  currentMatchIndex,
  onAction,
  mode,
  completedRoundIndex,
  eliminatedCount,
  advancingCount,
  autoAdvanceDelay,
  showOverviewFirst,
}: BracketTreePageProps) {
  const { reducedMotion } = useGameUIStore();
  const initialCountdown = mode === 'transition' && autoAdvanceDelay
    ? Math.ceil(autoAdvanceDelay / 1000)
    : null;
  const [countdown, setCountdown] = useState<number | null>(initialCountdown);

  const title = mode === 'preview'
    ? 'JUEGA EL TORNEO ELECTORAL'
    : mode === 'transition'
      ? `${ROUND_CONFIG[completedRoundIndex ?? 0]?.label.toUpperCase() ?? 'RONDA'} COMPLETA`
      : 'ESTADO DEL BRACKET';

  const stableOnAction = useCallback(() => onAction(), [onAction]);

  // Auto-advance countdown for transition mode
  useEffect(() => {
    if (mode !== 'transition' || !autoAdvanceDelay) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          stableOnAction();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, autoAdvanceDelay, stableOnAction]);

  const buttonText = mode === 'preview'
    ? 'EMPEZAR TORNEO'
    : mode === 'transition'
      ? countdown ? `SIGUIENTE RONDA (${countdown})` : 'SIGUIENTE RONDA'
      : 'CONTINUAR';

  return (
    <div className="min-h-screen fighting-game-bg flex flex-col">
      {/* Header — compact on mobile */}
      <div className="w-full bg-black/60 backdrop-blur-sm border-b border-white/10 px-4 py-1.5 sm:px-6 sm:py-4">
        <motion.h2
          initial={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-center text-[9px] sm:text-base md:text-lg font-bold text-accent uppercase tracking-wider"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          {/* On mobile: show round indicator inline instead of title */}
          <span className="hidden sm:inline">{title}</span>
          <span className="sm:hidden">
            {ROUND_CONFIG[currentRound]?.label} — Grupo {currentMatchIndex + 1}
          </span>
        </motion.h2>

        {mode === 'transition' && eliminatedCount != null && advancingCount != null && (
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.2 }}
            className="flex items-center justify-center gap-4 mt-1 sm:mt-2 text-[9px] sm:text-[10px]"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            <span className="text-red-400">{eliminatedCount} eliminados</span>
            <span className="text-white/20">|</span>
            <span className="text-yellow-400">{advancingCount} avanzan</span>
          </motion.div>
        )}
      </div>

      {/* Bracket tree */}
      <BracketTree
        bracket={bracket}
        currentRound={currentRound}
        currentMatchIndex={currentMatchIndex}
        showOverviewFirst={showOverviewFirst ?? mode === 'preview'}
      />

      {/* Action button */}
      <div className="sticky bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 py-2 sm:py-6">
        <div className="max-w-sm mx-auto">
          <Button
            onClick={onAction}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 text-sm border-2 border-white/20 hover:border-white/50 shadow-[0_4px_0_rgb(0,0,0,0.5)] hover:shadow-[0_2px_0_rgb(0,0,0,0.5)] hover:translate-y-[2px] transition-all uppercase tracking-wider"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 'clamp(0.5rem, 2vw, 0.7rem)' }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
