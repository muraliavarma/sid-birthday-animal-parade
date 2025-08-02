'use client';

import { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';

export default function Home() {
  /* --------------------------- STATE MANAGEMENT -------------------------- */
  const [gameStarted, setGameStarted] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  // candlesBlown[index] === true means the candle at that index has been blown out
  const [candlesBlown, setCandlesBlown] = useState<boolean[]>(() => Array(5).fill(false));

  // balloonsPopped[index] === true means the balloon at that index has been popped
  const [balloonsPopped, setBalloonsPopped] = useState<boolean[]>(() => Array(4).fill(false));

  /* ------------------------- WINDOW DIMENSIONS -------------------------- */
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  /* ----------------------------- HANDLERS ------------------------------ */
  const handleStartGame = () => {
    // Launch confetti!
    setConfettiActive(true);
    setGameStarted(true);

    // Stop confetti after 5 seconds
    setTimeout(() => setConfettiActive(false), 5000);
  };

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

  /* ---------------------------- COMPONENTS ----------------------------- */
  const Candle = ({ index, left }: { index: number; left: string }) => (
    <div
      className="absolute top-4 cursor-pointer"
      style={{ left }}
      onClick={() => blowCandle(index)}
    >
      {/* Candle body */}
      <div className="w-2 h-8 bg-white rounded-full border border-gray-300"></div>
      {/* Flame appears only if not blown out */}
      {!candlesBlown[index] && (
        <div className="w-3 h-4 bg-orange-400 rounded-full animate-pulse mx-auto -mt-4"></div>
      )}
    </div>
  );

  const Balloon = ({ index, className }: { index: number; className: string }) => (
    !balloonsPopped[index] ? (
      <span
        className={`cursor-pointer select-none ${className}`}
        onClick={() => popBalloon(index)}
      >
        🎈
      </span>
    ) : null
  );

  /* ----------------------------- RENDER ----------------------------- */
  // ------------------ MAIN HOME (MOBILE-ONLY) ------------------
  if (!gameStarted) {
    return (
      <div className="w-screen h-screen bg-gradient-to-b from-pink-400 via-fuchsia-500 to-blue-400 overflow-hidden flex items-center justify-center relative">
        {/* Confetti */}
        {confettiActive && <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={500} recycle={false} />}

      {/* Floating Animals */}
      <span className="absolute top-6 left-6 text-8xl animate-bounce">🦁</span>
      <span className="absolute top-16 right-8 text-9xl animate-bounce" style={{animationDelay:'0.4s'}}>🐵</span>
      <span className="absolute bottom-24 left-16 text-8xl animate-bounce" style={{animationDelay:'0.8s'}}>🐯</span>
      <span className="absolute bottom-10 right-12 text-9xl animate-bounce" style={{animationDelay:'1.2s'}}>🐼</span>

        {/* Interactive Balloons */}
        <Balloon index={0} className="absolute top-10 left-10 text-8xl animate-bounce" />
        <Balloon index={1} className="absolute top-20 right-20 text-7xl animate-bounce animation-delay-500" />
        <Balloon index={2} className="absolute bottom-20 left-20 text-6xl animate-bounce animation-delay-1000" />
        <Balloon index={3} className="absolute bottom-10 right-10 text-7xl animate-bounce animation-delay-1500" />

        {/* Twinkling Stars */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-pulse">⭐</div>
        <div className="absolute top-1/3 right-1/3 text-3xl animate-pulse" style={{ animationDelay: '0.3s' }}>⭐</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse" style={{ animationDelay: '0.6s' }}>⭐</div>
        <div className="absolute bottom-1/4 right-1/4 text-3xl animate-pulse" style={{ animationDelay: '0.9s' }}>⭐</div>

        <div className="text-center z-10">
          {/* Giant Birthday Cake */}
          <div className="mb-4 relative hidden md:block">
            <div className="w-64 h-48 bg-gradient-to-b from-pink-400 to-purple-500 rounded-t-full shadow-2xl relative">
              {/* Cake Layers */}
              <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-t-full"></div>
              <div className="absolute bottom-16 w-full h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full"></div>

              {/* 5 Candles */}
              <Candle index={0} left="2rem" />
              <Candle index={1} left="4.5rem" />
              <Candle index={2} left="7rem" />
              <Candle index={3} left="9.5rem" />
              <Candle index={4} left="12rem" />
            </div>
          </div>

          {/* Giant Birthday Text */}
          <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 drop-shadow-2xl animate-bounce bg-gradient-to-r from-yellow-200 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            🎉 SID! 🎉
          </h1>

          {/* Super Fun Button */}
          <button
            onClick={handleStartGame}
            className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 active:from-pink-600 active:to-blue-600 text-white px-10 py-6 rounded-full shadow-2xl transform active:scale-95 transition-all duration-300 animate-pulse border-4 border-white"
          >
            🎮 LET&apos;S PLAY! 🎮
          </button>

          {/* Birthday Message */}
          <div className="mt-10">
            <p className="text-4xl text-white font-extrabold drop-shadow-lg animate-pulse">
              🎂 Happy 5th Birthday, Sid! 🎂
            </p>
            <p className="text-2xl text-white/90 mt-4 font-semibold">
              🎁 Click the candles &amp; balloons for surprises! 🎁
            </p>
          </div>

          {/* Fun Emojis */}
          <div className="mt-10 text-7xl animate-bounce space-x-2">
            🦄 🦕 🚀 🎪 🎨 🐼 🐯
          </div>
        </div>
      </div>
    );
  }

  /* ------------------- GAME STARTED (PLACEHOLDER) ------------------- */
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-purple-700 via-fuchsia-600 to-pink-500 overflow-hidden flex flex-col items-center justify-center relative">
      {/* Confetti */}
      {confettiActive && <Confetti width={dimensions.width} height={dimensions.height} numberOfPieces={500} recycle={false} />}

      {/* Floating Animals */}
      <span className="absolute top-6 left-6 text-8xl animate-bounce">🦁</span>
      <span className="absolute top-16 right-8 text-9xl animate-bounce" style={{animationDelay:'0.4s'}}>🐵</span>
      <span className="absolute bottom-24 left-16 text-8xl animate-bounce" style={{animationDelay:'0.8s'}}>🐯</span>
      <span className="absolute bottom-10 right-12 text-9xl animate-bounce" style={{animationDelay:'1.2s'}}>🐼</span>

      <h1 className="text-9xl font-extrabold mb-10 drop-shadow-2xl animate-bounce bg-gradient-to-r from-yellow-300 via-pink-400 to-orange-500 bg-clip-text text-transparent">Let the Adventure Begin!</h1>
      <p className="text-3xl text-white/90 mb-12">(More fun levels coming soon, Sid!)</p>

      <button
        onClick={() => setGameStarted(false)}
        className="text-5xl font-extrabold bg-red-500 hover:bg-red-600 text-white px-16 py-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
      >
        ↩️ Back to Birthday Cake
      </button>
    </div>
  );
}
