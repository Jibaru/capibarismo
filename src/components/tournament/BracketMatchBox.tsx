import { cn } from '@/lib/utils';
import { findCandidateBase } from '@/data';
import { Lock } from 'lucide-react';
import type { TournamentMatch } from '@/lib/tournamentTypes';

interface BracketMatchBoxProps {
  match: TournamentMatch;
  status: 'completed' | 'current' | 'upcoming';
  roundType: '1v1' | 'pick-one-from-three' | 'final';
}

export function BracketMatchBox({ match, status, roundType }: BracketMatchBoxProps) {
  const candidates = match.candidates.map((id) => ({
    id,
    data: findCandidateBase(id),
  }));

  const isEmpty = candidates.length === 0;

  return (
    <div
      className={cn(
        'rounded-lg border p-2 sm:p-2.5 bg-black/40 transition-all',
        status === 'completed' && 'border-white/20 opacity-80',
        status === 'current' && 'border-accent/60 animate-pulse shadow-[0_0_8px_rgba(255,193,7,0.3)]',
        status === 'upcoming' && 'border-white/10 opacity-40',
      )}
    >
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-1 py-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
              <Lock className="w-3 h-3" />
            </div>
            <span className="text-white/20 text-[10px] sm:text-xs">vs</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
              <Lock className="w-3 h-3" />
            </div>
          </div>
          <span className="text-white/15 text-[8px]" style={{ fontFamily: "'Press Start 2P', cursive" }}>¿?</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-2">
          {candidates.map((c, i) => {
            const isWinner = match.winner === c.id;
            const isEliminated = match.eliminated.includes(c.id);

            return (
              <div key={c.id} className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                {/* VS separator between candidates */}
                {i > 0 && (
                  <span className="text-white/20 text-[8px] sm:text-[10px] flex-shrink-0">
                    {roundType === '1v1' ? 'vs' : '·'}
                  </span>
                )}

                {/* Headshot */}
                <div className={cn(
                  'w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 flex-shrink-0',
                  status === 'upcoming' && 'border-white/10',
                  isWinner && 'border-yellow-400/60 shadow-[0_0_6px_rgba(255,200,0,0.3)]',
                  isEliminated && 'border-red-500/40 opacity-50',
                  !isWinner && !isEliminated && status !== 'upcoming' && 'border-white/20',
                )}>
                  {c.data?.headshot ? (
                    <img
                      src={encodeURI(c.data.headshot)}
                      alt={c.data.nombre}
                      className={cn('w-full h-full object-cover', isEliminated && 'grayscale')}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/40 text-[10px]">
                      {status === 'upcoming' ? '?' : c.id.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className={cn(
                  'text-[9px] sm:text-[10px] truncate min-w-0',
                  isWinner && 'text-yellow-400 font-bold',
                  isEliminated && 'text-white/30 line-through',
                  !isWinner && !isEliminated && 'text-white/70',
                )}>
                  {status === 'upcoming' && !c.data ? '???' : (c.data?.nombre.split(' ').slice(-1)[0] ?? c.id)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
