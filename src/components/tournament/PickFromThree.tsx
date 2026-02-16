import { motion, AnimatePresence } from 'framer-motion';
import { CandidateCard } from '@/components/game/CandidateCard';
import { useGameUIStore } from '@/store/useGameUIStore';
import { cn } from '@/lib/utils';
import { findCandidateBase } from '@/data';
import type { CandidateBase } from '@/data/types';

interface PickFromThreeProps {
  candidateIds: string[];
  onSelect: (winnerId: string) => void;
  context: 'semifinal' | 'champion';
  groupIndex?: number;  // for semifinal: which group (0, 1, 2)
  disabled?: boolean;
}

export function PickFromThree({
  candidateIds,
  onSelect,
  context,
  groupIndex,
  disabled,
}: PickFromThreeProps) {
  const { reducedMotion } = useGameUIStore();

  const candidates = candidateIds
    .map((id) => findCandidateBase(id))
    .filter((c): c is CandidateBase => c !== undefined);

  const title = context === 'champion'
    ? 'ELIGE A TU CAMPEÓN'
    : `ELIGE A TU FAVORITO`;

  const subtitle = context === 'semifinal' && groupIndex !== undefined
    ? `Grupo ${groupIndex + 1} de 3`
    : undefined;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Title */}
      <div className="text-center mb-4 sm:mb-6">
        <h2
          className={cn(
            'text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider',
            context === 'champion'
              ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.5)]'
              : 'text-accent'
          )}
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Candidates */}
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={candidateIds.join('-')}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.15 }}
            className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8"
          >
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                side="left"
                onSelect={() => onSelect(candidate.id)}
                disabled={disabled}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
