import { useState, useCallback } from 'react';

const INITIAL_CANDLES_COUNT = 5;
const INITIAL_BALLOONS_COUNT = 4;

export const useGameState = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState<boolean[]>(() => Array(INITIAL_CANDLES_COUNT).fill(false));
  const [balloonsPopped, setBalloonsPopped] = useState<boolean[]>(() => Array(INITIAL_BALLOONS_COUNT).fill(false));

  const handleStartGame = useCallback(() => {
    setConfettiActive(true);
    setGameStarted(true);
    
    // Stop confetti after 5 seconds
    setTimeout(() => setConfettiActive(false), 5000);
  }, []);

  const blowCandle = useCallback((index: number) => {
    setCandlesBlown((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const popBalloon = useCallback((index: number) => {
    setBalloonsPopped((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameStarted(false);
    setConfettiActive(false);
    setCandlesBlown(Array(INITIAL_CANDLES_COUNT).fill(false));
    setBalloonsPopped(Array(INITIAL_BALLOONS_COUNT).fill(false));
  }, []);

  return {
    gameStarted,
    confettiActive,
    candlesBlown,
    balloonsPopped,
    handleStartGame,
    blowCandle,
    popBalloon,
    resetGame,
  };
}; 