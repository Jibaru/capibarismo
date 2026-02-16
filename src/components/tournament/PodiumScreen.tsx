import { motion } from 'framer-motion';
import { useGameUIStore } from '@/store/useGameUIStore';
import { findCandidateBase } from '@/data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PodiumResult } from '@/lib/tournamentTypes';

interface PodiumScreenProps {
  podium: PodiumResult;
  onPlayAgain: () => void;
}

const PODIUM_CONFIG = [
  { key: 'first' as const,  label: 'CAMPEÓN', rank: '1', color: 'text-yellow-400', borderColor: 'border-yellow-400/60', glow: 'shadow-[0_0_20px_rgba(255,200,0,0.4)]', size: 'w-20 h-20 sm:w-24 sm:h-24' },
  { key: 'second' as const, label: 'SUBCAMPEÓN', rank: '2', color: 'text-gray-300', borderColor: 'border-gray-300/60', glow: 'shadow-[0_0_12px_rgba(192,192,192,0.3)]', size: 'w-16 h-16 sm:w-20 sm:h-20' },
  { key: 'third' as const,  label: 'TERCER LUGAR', rank: '3', color: 'text-amber-600', borderColor: 'border-amber-600/60', glow: 'shadow-[0_0_12px_rgba(180,130,50,0.3)]', size: 'w-16 h-16 sm:w-20 sm:h-20' },
] as const;

// CSS-only confetti pieces
const CONFETTI_COLORS = [
  'bg-yellow-400', 'bg-red-500', 'bg-blue-500', 'bg-green-400',
  'bg-pink-500', 'bg-purple-500', 'bg-orange-400', 'bg-cyan-400',
];

export function PodiumScreen({ podium, onPlayAgain }: PodiumScreenProps) {
  const { reducedMotion } = useGameUIStore();

  const handleShare = async () => {
    const first = findCandidateBase(podium.first);
    const second = findCandidateBase(podium.second);
    const third = findCandidateBase(podium.third);

    const text = [
      'Mi Torneo Capibarismo',
      `1. ${first?.nombre ?? podium.first}`,
      `2. ${second?.nombre ?? podium.second}`,
      `3. ${third?.nombre ?? podium.third}`,
      'Juega en capibarismo.com',
    ].join('\n');

    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // User cancelled or not supported, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/98 overflow-y-auto">
      {/* Confetti */}
      {!reducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'absolute w-2 h-2 rounded-sm',
                CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                'animate-confetti-fall'
              )}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        {/* GAME OVER title */}
        <motion.h1
          initial={reducedMotion ? {} : { scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-base sm:text-xl md:text-2xl font-bold uppercase tracking-wider mb-8 sm:mb-10 text-center animate-color-cycle"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          GAME OVER
        </motion.h1>

        {/* Podium entries - vertical stack on mobile */}
        <div className="w-full max-w-sm space-y-6 sm:space-y-8 mb-8 sm:mb-10">
          {PODIUM_CONFIG.map((config, index) => {
            const candidateId = podium[config.key];
            const candidate = findCandidateBase(candidateId);

            return (
              <motion.div
                key={config.key}
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.3 + index * 0.2 }}
                className="flex items-center gap-4"
              >
                {/* Rank number */}
                <span
                  className={cn('text-lg sm:text-xl font-bold', config.color)}
                  style={{ fontFamily: "'Press Start 2P', cursive" }}
                >
                  {config.rank}
                </span>

                {/* Headshot */}
                <div className={cn(
                  'rounded-full overflow-hidden border-3 flex-shrink-0',
                  config.borderColor,
                  config.glow,
                  config.size,
                )}>
                  {candidate?.headshot ? (
                    <img
                      src={encodeURI(candidate.headshot)}
                      alt={candidate.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/40">?</div>
                  )}
                </div>

                {/* Name + label */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm sm:text-base truncate">
                    {candidate?.nombre ?? candidateId}
                  </p>
                  <p className={cn('text-[10px] sm:text-xs font-bold uppercase tracking-wider', config.color)}
                    style={{ fontFamily: "'Press Start 2P', cursive" }}
                  >
                    {config.label}
                  </p>
                  {candidate?.partido && (
                    <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 truncate">
                      {candidate.partido}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 1.2 }}
          className="w-full max-w-xs space-y-3"
        >
          <Button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 text-sm border-2 border-white/20 hover:border-white/50 shadow-[0_4px_0_rgb(0,0,0,0.5)] hover:shadow-[0_2px_0_rgb(0,0,0,0.5)] hover:translate-y-[2px] transition-all uppercase tracking-wider"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: 'clamp(0.5rem, 2vw, 0.7rem)' }}
          >
            JUGAR DE NUEVO
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full border-white/20 hover:bg-white/10 text-white py-3 text-xs uppercase tracking-wider"
          >
            COMPARTIR
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
