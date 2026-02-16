import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameUIStore } from '@/store/useGameUIStore';
import { BracketMatchBox } from './BracketMatchBox';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ROUND_CONFIG } from '@/lib/tournamentConstants';
import type { TournamentBracket } from '@/lib/tournamentTypes';
import { cn } from '@/lib/utils';

interface BracketViewProps {
  bracket: TournamentBracket;
  currentRound: number;
  currentMatchIndex: number;
  onStart: () => void;
  isPreview?: boolean;
}

export function BracketView({
  bracket,
  currentRound,
  currentMatchIndex,
  onStart,
  isPreview = false,
}: BracketViewProps) {
  const { reducedMotion } = useGameUIStore();

  return (
    <div className="min-h-screen fighting-game-bg flex flex-col">
      {/* Header */}
      <div className="w-full bg-black/60 backdrop-blur-sm border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
        <h2
          className="text-center text-xs sm:text-sm font-bold text-accent uppercase tracking-wider"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          {isPreview ? 'BRACKET DEL TORNEO' : 'ESTADO DEL BRACKET'}
        </h2>
      </div>

      {/* Bracket content - mobile: vertical list, desktop: horizontal tree */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {bracket.rounds.map((round, roundIdx) => {
            const config = ROUND_CONFIG[roundIdx];
            const isCurrentRound = roundIdx === currentRound;
            const isCompleted = round.completed;
            const isFuture = roundIdx > currentRound;

            return (
              <RoundSection
                key={roundIdx}
                roundIndex={roundIdx}
                label={config?.label ?? `Ronda ${roundIdx + 1}`}
                sublabel={config?.sublabel ?? ''}
                roundType={round.type}
                matches={round.matches}
                isCurrentRound={isCurrentRound}
                isCompleted={isCompleted}
                isFuture={isFuture}
                currentMatchIndex={isCurrentRound ? currentMatchIndex : -1}
                defaultExpanded={isCurrentRound || roundIdx === 0}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom action button */}
      <div className="sticky bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 sm:p-6">
        <div className="max-w-xs mx-auto">
          <Button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 text-sm border-2 border-white/20 hover:border-white/50 shadow-[0_4px_0_rgb(0,0,0,0.5)] hover:shadow-[0_2px_0_rgb(0,0,0,0.5)] hover:translate-y-[2px] transition-all uppercase tracking-wider"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 'clamp(0.5rem, 2vw, 0.7rem)' }}
          >
            {isPreview ? 'EMPEZAR TORNEO' : 'CONTINUAR'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Round Section (collapsible on mobile)
// =============================================================================

interface RoundSectionProps {
  roundIndex: number;
  label: string;
  sublabel: string;
  roundType: string;
  matches: any[];
  isCurrentRound: boolean;
  isCompleted: boolean;
  isFuture: boolean;
  currentMatchIndex: number;
  defaultExpanded: boolean;
  reducedMotion: boolean;
}

function RoundSection({
  roundIndex,
  label,
  sublabel,
  roundType,
  matches,
  isCurrentRound,
  isCompleted,
  isFuture,
  currentMatchIndex,
  defaultExpanded,
  reducedMotion,
}: RoundSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={cn(
      'rounded-xl border overflow-hidden',
      isCurrentRound && 'border-accent/40 bg-accent/5',
      isCompleted && 'border-green-500/20 bg-green-950/10',
      isFuture && 'border-white/10 bg-white/[0.02]',
      !isCurrentRound && !isCompleted && !isFuture && 'border-white/10',
    )}>
      {/* Round header - tap to expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={cn(
              'text-[10px] sm:text-xs font-bold uppercase tracking-wider',
              isCurrentRound && 'text-accent',
              isCompleted && 'text-green-400',
              isFuture && 'text-white/40',
            )}
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            {label}
          </span>
          <span className="text-white/40 text-[10px] sm:text-xs">
            {sublabel}
          </span>
          {isCompleted && (
            <span className="text-green-400 text-[10px]">✓</span>
          )}
        </div>
        {expanded
          ? <ChevronDown className="w-4 h-4 text-white/40" />
          : <ChevronRight className="w-4 h-4 text-white/40" />
        }
      </button>

      {/* Matches */}
      {expanded && (
        <motion.div
          initial={reducedMotion ? {} : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="px-3 pb-3 sm:px-4 sm:pb-4 space-y-2"
        >
          {matches.map((match, matchIdx) => {
            let status: 'completed' | 'current' | 'upcoming' = 'upcoming';
            if (match.winner) {
              status = 'completed';
            } else if (isCurrentRound && matchIdx === currentMatchIndex) {
              status = 'current';
            }

            return (
              <BracketMatchBox
                key={match.id}
                match={match}
                status={status}
                roundType={roundType as any}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
