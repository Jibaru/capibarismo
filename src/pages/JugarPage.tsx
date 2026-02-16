import { useEffect } from 'react';
import { VSScreen } from '@/components/game/VSScreen';
import { GameHUD } from '@/components/game/GameHUD';
import { CandidateInfoOverlay } from '@/components/game/CandidateInfoOverlay';
import { OnboardingModal } from '@/components/game/OnboardingModal';
import { BracketView } from '@/components/tournament/BracketView';
import { PickFromThree } from '@/components/tournament/PickFromThree';
import { RoundTransition } from '@/components/tournament/RoundTransition';
import { PodiumScreen } from '@/components/tournament/PodiumScreen';
import { useGameUIStore } from '@/store/useGameUIStore';
import { useTournamentStore } from '@/store/useTournamentStore';
import {
  getCurrentMatch,
  getMatchProgress,
  getEliminatedInRound,
  getAdvancingFromRound,
} from '@/services/tournamentService';
import { findCandidateBase } from '@/data';
import { useTrackJugarView } from '@/lib/posthog';

export function JugarPage() {
  const {
    state: tournament,
    startNewTournament,
    submitVote,
    submitRunnerUp,
    advanceFromRoundTransition,
    goToBracketPreview,
    startPlaying,
    resetTournament,
  } = useTournamentStore();

  const { setReducedMotion } = useGameUIStore();

  useTrackJugarView({ sessionId: tournament?.id ?? 'none' });

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [setReducedMotion]);

  // No tournament → show onboarding to start one
  if (!tournament) {
    return (
      <div className="min-h-screen fighting-game-bg flex flex-col">
        <OnboardingModal
          open={true}
          onStart={() => {
            startNewTournament();
            // After creating, advance to bracket preview
            goToBracketPreview();
          }}
        />
        <CandidateInfoOverlay />
      </div>
    );
  }

  const progress = getMatchProgress(tournament);
  const currentMatch = getCurrentMatch(tournament);

  // Phase-based rendering
  switch (tournament.phase) {
    case 'onboarding':
      return (
        <div className="min-h-screen fighting-game-bg flex flex-col">
          <OnboardingModal open={true} onStart={goToBracketPreview} />
          <CandidateInfoOverlay />
        </div>
      );

    case 'bracket-preview':
      return (
        <>
          <BracketView
            bracket={tournament.bracket}
            currentRound={tournament.currentRound}
            currentMatchIndex={tournament.currentMatchIndex}
            onStart={startPlaying}
            isPreview={true}
          />
          <CandidateInfoOverlay />
        </>
      );

    case 'playing-1v1': {
      if (!currentMatch) return null;

      const candidateA = findCandidateBase(currentMatch.candidates[0]);
      const candidateB = findCandidateBase(currentMatch.candidates[1]);

      if (!candidateA || !candidateB) return null;

      const pair = {
        pairId: currentMatch.id,
        a: {
          id: candidateA.id,
          nombre: candidateA.nombre,
          ideologia: candidateA.ideologia ?? undefined,
          fullBody: candidateA.fullBody,
          headshot: candidateA.headshot,
          partyIcon: candidateA.partyIcon,
          partido: candidateA.partido,
        },
        b: {
          id: candidateB.id,
          nombre: candidateB.nombre,
          ideologia: candidateB.ideologia ?? undefined,
          fullBody: candidateB.fullBody,
          headshot: candidateB.headshot,
          partyIcon: candidateB.partyIcon,
          partido: candidateB.partido,
        },
      };

      return (
        <div className="min-h-screen fighting-game-bg flex flex-col">
          <GameHUD
            roundLabel={progress.roundLabel}
            matchLabel={progress.matchLabel}
            overallProgress={progress.overallPercent}
            onViewBracket={goToBracketPreview}
            onNewGame={resetTournament}
          />
          <div className="flex-1 relative overflow-hidden">
            <VSScreen
              pair={pair}
              onVote={(winner) => {
                const winnerId = winner === 'A' ? candidateA.id : candidateB.id;
                submitVote(winnerId);
              }}
              roundLabel={progress.roundLabel}
            />
          </div>
          <CandidateInfoOverlay />
        </div>
      );
    }

    case 'round-transition': {
      const completedRound = tournament.currentRound;
      const eliminated = getEliminatedInRound(tournament, completedRound);
      const advancing = getAdvancingFromRound(tournament, completedRound);

      return (
        <>
          <RoundTransition
            roundIndex={completedRound}
            eliminatedIds={eliminated}
            advancingIds={advancing}
            onContinue={advanceFromRoundTransition}
          />
          <CandidateInfoOverlay />
        </>
      );
    }

    case 'playing-pick-three': {
      if (!currentMatch) return null;

      return (
        <div className="min-h-screen fighting-game-bg flex flex-col">
          <GameHUD
            roundLabel={progress.roundLabel}
            matchLabel={progress.matchLabel}
            overallProgress={progress.overallPercent}
            onViewBracket={goToBracketPreview}
            onNewGame={resetTournament}
          />
          <div className="flex-1 relative overflow-hidden">
            <PickFromThree
              candidateIds={currentMatch.candidates}
              onSelect={(winnerId) => submitVote(winnerId)}
              context="semifinal"
              groupIndex={tournament.currentMatchIndex}
            />
          </div>
          <CandidateInfoOverlay />
        </div>
      );
    }

    case 'final-champion': {
      if (!currentMatch) return null;

      return (
        <div className="min-h-screen fighting-game-bg flex flex-col">
          <GameHUD
            roundLabel={progress.roundLabel}
            matchLabel={progress.matchLabel}
            overallProgress={progress.overallPercent}
            onViewBracket={goToBracketPreview}
            onNewGame={resetTournament}
          />
          <div className="flex-1 relative overflow-hidden">
            <PickFromThree
              candidateIds={currentMatch.candidates}
              onSelect={(winnerId) => submitVote(winnerId)}
              context="champion"
            />
          </div>
          <CandidateInfoOverlay />
        </div>
      );
    }

    case 'final-runner-up': {
      const finalMatch = tournament.bracket.rounds[3].matches[0];
      const remaining = finalMatch.eliminated;

      if (remaining.length < 2) return null;

      const candidateA = findCandidateBase(remaining[0]);
      const candidateB = findCandidateBase(remaining[1]);

      if (!candidateA || !candidateB) return null;

      const pair = {
        pairId: 'final-runner-up',
        a: {
          id: candidateA.id,
          nombre: candidateA.nombre,
          ideologia: candidateA.ideologia ?? undefined,
          fullBody: candidateA.fullBody,
          headshot: candidateA.headshot,
          partyIcon: candidateA.partyIcon,
          partido: candidateA.partido,
        },
        b: {
          id: candidateB.id,
          nombre: candidateB.nombre,
          ideologia: candidateB.ideologia ?? undefined,
          fullBody: candidateB.fullBody,
          headshot: candidateB.headshot,
          partyIcon: candidateB.partyIcon,
          partido: candidateB.partido,
        },
      };

      return (
        <div className="min-h-screen fighting-game-bg flex flex-col">
          <GameHUD
            roundLabel="Gran Final"
            matchLabel="Elige al subcampeón"
            overallProgress={progress.overallPercent}
            onViewBracket={goToBracketPreview}
            onNewGame={resetTournament}
          />
          <div className="flex-1 relative overflow-hidden">
            <VSScreen
              pair={pair}
              onVote={(winner) => {
                const runnerUpId = winner === 'A' ? candidateA.id : candidateB.id;
                submitRunnerUp(runnerUpId);
              }}
              roundLabel="ELIGE AL SUBCAMPEÓN"
            />
          </div>
          <CandidateInfoOverlay />
        </div>
      );
    }

    case 'podium': {
      if (!tournament.podium) return null;

      return (
        <>
          <PodiumScreen
            podium={tournament.podium}
            onPlayAgain={resetTournament}
          />
          <CandidateInfoOverlay />
        </>
      );
    }

    default:
      return null;
  }
}
