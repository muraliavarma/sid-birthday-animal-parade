'use client';

import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { useWindowDimensions } from './hooks/useWindowDimensions';
import { useGameState } from './hooks/useGameState';
import { CompletedPuzzlesProvider } from './contexts/CompletedPuzzlesContext';

export default function Home() {
  const dimensions = useWindowDimensions();
  const {
    gameStarted,
    confettiActive,
    candlesBlown,
    balloonsPopped,
    handleStartGame,
    blowCandle,
    popBalloon,
    resetGame,
  } = useGameState();

  return (
    <CompletedPuzzlesProvider>
      {/* Show home screen if game hasn't started */}
      {!gameStarted ? (
        <HomeScreen
          dimensions={dimensions}
          confettiActive={confettiActive}
          candlesBlown={candlesBlown}
          balloonsPopped={balloonsPopped}
          onStartGame={handleStartGame}
          onBlowCandle={blowCandle}
          onPopBalloon={popBalloon}
        />
      ) : (
        /* Show game screen with puzzle */
        <GameScreen
          dimensions={dimensions}
          confettiActive={confettiActive}
          onBackToHome={resetGame}
        />
      )}
    </CompletedPuzzlesProvider>
  );
}
