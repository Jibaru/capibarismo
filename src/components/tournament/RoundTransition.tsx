import { motion } from 'framer-motion';
import { useGameUIStore } from '@/store/useGameUIStore';
import { findCandidateBase } from '@/data';
import { Button } from '@/components/ui/button';
import { ROUND_CONFIG } from '@/lib/tournamentConstants';
import { cn } from '@/lib/utils';

interface RoundTransitionProps {
  roundIndex: number;
  eliminatedIds: string[];
  advancingIds: string[];
  onContinue: () => void;
}

export function RoundTransition({
  roundIndex,
  eliminatedIds,
  advancingIds,
  onContinue,
}: RoundTransitionProps) {
  const { reducedMotion } = useGameUIStore();
  const config = ROUND_CONFIG[roundIndex];

  const eliminated = eliminatedIds
    .map((id) => findCandidateBase(id))
    .filter(Boolean);

  const advancing = advancingIds
    .map((id) => findCandidateBase(id))
    .filter(Boolean);

  const staggerDelay = reducedMotion ? 0 : 0.05;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Round Complete Title */}
        <motion.h2
          initial={reducedMotion ? {} : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-sm sm:text-base md:text-xl font-bold text-accent uppercase tracking-wider text-center mb-2"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          {config?.label ?? 'Ronda'} COMPLETA
        </motion.h2>

        <motion.p
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.3 }}
          className="text-white/70 text-xs sm:text-sm mb-6 sm:mb-8 text-center"
        >
          {config?.sublabel}
        </motion.p>

        {/* Eliminated */}
        {eliminated.length > 0 && (
          <div className="w-full max-w-md mb-6 sm:mb-8">
            <p
              className="text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 text-center"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Eliminados
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {eliminated.map((candidate, i) => (
                <motion.div
                  key={candidate!.id}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * staggerDelay }}
                  className="relative flex flex-col items-center"
                >
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-red-500/50 opacity-60">
                    {candidate!.headshot ? (
                      <img
                        src={encodeURI(candidate!.headshot)}
                        alt={candidate!.nombre}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/40 text-xs">?</div>
                    )}
                    {/* Red X overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-red-900/40">
                      <span className="text-red-400 text-lg sm:text-xl font-bold">✕</span>
                    </div>
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-white/40 mt-1 text-center max-w-[48px] sm:max-w-[56px] line-clamp-1">
                    {candidate!.nombre.split(' ').pop()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Advancing */}
        {advancing.length > 0 && (
          <div className="w-full max-w-md mb-8 sm:mb-10">
            <p
              className="text-yellow-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 text-center"
              style={{ fontFamily: "'Press Start 2P', cursive" }}
            >
              Avanzan
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {advancing.map((candidate, i) => (
                <motion.div
                  key={candidate!.id}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (eliminated.length * staggerDelay) + (i * staggerDelay) }}
                  className="relative flex flex-col items-center"
                >
                  <div className={cn(
                    'w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-yellow-400/60',
                    'shadow-[0_0_8px_rgba(255,200,0,0.3)]'
                  )}>
                    {candidate!.headshot ? (
                      <img
                        src={encodeURI(candidate!.headshot)}
                        alt={candidate!.nombre}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/40 text-xs">?</div>
                    )}
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-white/70 mt-1 text-center max-w-[48px] sm:max-w-[56px] line-clamp-1">
                    {candidate!.nombre.split(' ').pop()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Continue button */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 0.8 }}
          className="w-full max-w-xs"
        >
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 text-sm border-2 border-white/20 hover:border-white/50 shadow-[0_4px_0_rgb(0,0,0,0.5)] hover:shadow-[0_2px_0_rgb(0,0,0,0.5)] hover:translate-y-[2px] transition-all uppercase tracking-wider"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 'clamp(0.5rem, 2vw, 0.7rem)' }}
          >
            SIGUIENTE RONDA
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
