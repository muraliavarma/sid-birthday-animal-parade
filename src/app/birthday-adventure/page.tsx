'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { triggerConfetti } from '@/utils/confetti';

interface GameState {
  playerName: string;
  currentLevel: number;
  completedLevels: number[];
  totalAnimals: number;
}

const levels = [
  { id: 1, name: 'Jungle', animal: '🐒', color: 'from-green-400 to-green-600', locked: false },
  { id: 2, name: 'Ocean', animal: '🐬', color: 'from-blue-400 to-blue-600', locked: false },
  { id: 3, name: 'Arctic', animal: '🐧', color: 'from-cyan-400 to-cyan-600', locked: false },
  { id: 4, name: 'Safari', animal: '🦁', color: 'from-yellow-400 to-yellow-600', locked: false },
  { id: 5, name: 'Forest', animal: '🦊', color: 'from-orange-400 to-orange-600', locked: false },
];

export default function BirthdayAdventure() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>({
    playerName: 'Sid',
    currentLevel: 1,
    completedLevels: [],
    totalAnimals: 0,
  });
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showWorldMap, setShowWorldMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load game state from localStorage
    const savedState = localStorage.getItem('birthdayAdventureState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  const saveGameState = (newState: GameState) => {
    setGameState(newState);
    localStorage.setItem('birthdayAdventureState', JSON.stringify(newState));
  };

  const handleStartAdventure = () => {
    setIsLoading(true);
    // Play start sound effect
    setTimeout(() => {
      setShowStartScreen(false);
      setShowWorldMap(true);
      setIsLoading(false);
      triggerConfetti('rainbow');
    }, 1000);
  };

  const handleLevelSelect = (levelId: number) => {
    if (levelId <= gameState.completedLevels.length + 1) {
      router.push(`/birthday-adventure/level/${levelId}`);
    }
  };

  const handleBackToMain = () => {
    router.push('/');
  };

  if (showStartScreen) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎈</div>
          <div className="absolute top-20 right-10 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
          <div className="absolute bottom-20 left-1/4 text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>
          <div className="absolute bottom-10 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎈</div>
        </div>

        {/* Birthday Tent */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-9xl mb-8 animate-pulse">🎪</div>
          <div className="text-8xl mb-6 animate-bounce">🎂</div>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center space-y-8 px-4">
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-2xl animate-pulse">
                🎉 {gameState.playerName}'s Big Birthday Animal Adventure! 🎉
              </h1>
              <div className="text-3xl sm:text-5xl font-bold text-white drop-shadow-xl animate-bounce">
                🦁 🐒 🐬 🐧 🦊
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartAdventure}
              disabled={isLoading}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                         text-white text-3xl sm:text-5xl font-black py-8 px-12 rounded-3xl 
                         shadow-2xl transform hover:scale-110 transition-all duration-300 
                         animate-pulse border-4 border-white/50 disabled:opacity-50 w-full max-w-sm"
            >
              {isLoading ? '🎵 Loading... 🎵' : '🚀 Start Adventure! 🚀'}
            </button>

            {/* Back Button */}
            <button
              onClick={handleBackToMain}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 
                         text-white text-xl sm:text-3xl font-bold py-4 px-8 rounded-2xl 
                         shadow-xl transform hover:scale-105 transition-all duration-300 
                         border-2 border-white/50 w-full max-w-sm"
            >
              ← Back to Animal Parade
            </button>
          </div>
        </div>

        {/* Floating Decorations */}
        <div className="absolute top-1/4 left-1/4 text-5xl animate-spin-slow">🌟</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce">✨</div>
        <div className="absolute bottom-1/3 left-1/6 text-5xl animate-pulse">🎊</div>
        <div className="absolute bottom-1/4 right-1/6 text-5xl animate-bounce">🎪</div>
      </div>
    );
  }

  if (showWorldMap) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-purple-300 via-pink-300 to-blue-300 relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-pink-50 via-white to-blue-50 
                       backdrop-blur-md shadow-lg border-b-2 border-pink-200/50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🗺️</div>
              <div className="text-lg font-bold text-gray-800">Animal World Map</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎯</div>
              <div className="text-lg font-bold text-gray-800">{gameState.totalAnimals}/5 Animals</div>
            </div>
          </div>
        </div>

        {/* Map Content */}
        <div className="pt-20 px-4 h-full overflow-y-auto">
          <div className="space-y-4 max-w-sm mx-auto">
            {levels.map((level, index) => {
              const isCompleted = gameState.completedLevels.includes(level.id);
              const isUnlocked = level.id <= gameState.completedLevels.length + 1;
              
              return (
                <button
                  key={level.id}
                  onClick={() => handleLevelSelect(level.id)}
                  disabled={!isUnlocked}
                  className={`relative p-6 rounded-3xl shadow-2xl transform transition-all duration-300 
                             border-4 w-full ${isCompleted ? 'border-green-400' : 'border-white/50'}
                             ${isUnlocked ? 'hover:scale-105 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                             bg-gradient-to-br ${level.color}`}
                >
                  {/* Level Number */}
                  <div className="absolute top-3 left-3 text-2xl font-black text-white drop-shadow-lg">
                    {level.id}
                  </div>

                  {/* Animal */}
                  <div className="text-6xl mb-3 animate-bounce">{level.animal}</div>

                  {/* Level Name */}
                  <div className="text-xl font-bold text-white drop-shadow-lg mb-2">
                    {level.name}
                  </div>

                  {/* Status */}
                  {isCompleted ? (
                    <div className="text-green-200 text-lg font-bold">
                      ✅ Completed!
                    </div>
                  ) : isUnlocked ? (
                    <div className="text-white text-lg font-bold">
                      🎯 Ready to Play!
                    </div>
                  ) : (
                    <div className="text-white text-lg font-bold">
                      🔒 Locked
                    </div>
                  )}

                  {/* Lock Icon */}
                  {!isUnlocked && (
                    <div className="absolute top-3 right-3 text-3xl">🔒</div>
                  )}

                  {/* Completion Confetti */}
                  {isCompleted && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 left-2 text-xl animate-bounce">🎊</div>
                      <div className="absolute top-2 right-2 text-xl animate-bounce">🎉</div>
                      <div className="absolute bottom-2 left-2 text-xl animate-bounce">✨</div>
                      <div className="absolute bottom-2 right-2 text-xl animate-bounce">🌟</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setShowStartScreen(true)}
          className="absolute bottom-4 left-4 bg-gradient-to-r from-gray-500 to-gray-600 
                     hover:from-gray-600 hover:to-gray-700 text-white text-lg font-bold 
                     py-3 px-6 rounded-2xl shadow-xl transform hover:scale-105 
                     transition-all duration-300 border-2 border-white/50"
        >
          ← Back to Start
        </button>

        {/* Floating Decorations */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-spin-slow">🌟</div>
        <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce">✨</div>
        <div className="absolute bottom-1/3 left-1/6 text-4xl animate-pulse">🎊</div>
        <div className="absolute bottom-1/4 right-1/6 text-4xl animate-bounce">🎪</div>
      </div>
    );
  }

  return null;
} 