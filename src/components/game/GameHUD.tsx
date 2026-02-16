import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LayoutGrid, RotateCcw } from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

interface GameHUDProps {
  roundLabel: string;
  matchLabel: string;
  overallProgress: number;
  onViewBracket: () => void;
  onNewGame: () => void;
}

// =============================================================================
// Component
// =============================================================================

export function GameHUD({
  roundLabel,
  matchLabel,
  overallProgress,
  onViewBracket,
  onNewGame,
}: GameHUDProps) {
  return (
    <div className="w-full bg-black/60 backdrop-blur-sm border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-3 sm:gap-4">
        {/* Top row: Round label + action buttons */}
        <div className="flex items-center justify-between">
          <span
            className="text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            {roundLabel}
          </span>

          <div className="flex items-center gap-2">
            <Button
              onClick={onViewBracket}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-4 border-white/20 hover:bg-white/10"
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Ver Bracket</span>
              <span className="sm:hidden">Bracket</span>
            </Button>
            <Button
              onClick={onNewGame}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-4 border-white/20 hover:bg-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Nueva</span>
            </Button>
          </div>
        </div>

        {/* Bottom row: Match label + progress bar */}
        <div className="w-full">
          <p className="text-white/80 text-xs sm:text-sm mb-2">
            {matchLabel}
          </p>
          <Progress value={overallProgress} className="h-2 sm:h-2.5" />
        </div>
      </div>
    </div>
  );
}
