'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { triggerContinuousConfetti } from '@/utils/confetti';

interface GameState {
  playerName: string;
  currentLevel: number;
  completedLevels: number[];
  totalAnimals: number;
}

export default function CelebrationPage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>({
    playerName: 'Sid',
    currentLevel: 1,
    completedLevels: [],
    totalAnimals: 0,
  });
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    // Load game state
    const savedState = localStorage.getItem('birthdayAdventureState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }

    // Trigger celebration
    triggerContinuousConfetti(5000);
    
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 2000);
  }, []);

  const handleBackToMain = () => {
    router.push('/');
  };

  const handlePlayAgain = () => {
    // Reset game state
    localStorage.removeItem('birthdayAdventureState');
    router.push('/birthday-adventure');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 
                   relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎈</div>
        <div className="absolute top-20 right-10 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
        <div className="absolute bottom-20 left-1/4 text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>
        <div className="absolute bottom-10 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎈</div>
      </div>

      {/* Birthday Tent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="text-8xl mb-8 animate-pulse">🎪</div>
        <div className="text-7xl mb-6 animate-bounce">🎂</div>
      </div>

      {/* All Animals Dancing */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="grid grid-cols-5 gap-4">
          <div className="text-5xl animate-bounce">🐒</div>
          <div className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🐬</div>
          <div className="text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>🐧</div>
          <div className="text-5xl animate-bounce" style={{ animationDelay: '0.6s' }}>🦁</div>
          <div className="text-5xl animate-bounce" style={{ animationDelay: '0.8s' }}>🦊</div>
        </div>
      </div>

      {/* Final Message */}
      {showFinalMessage && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="text-center space-y-6 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl mx-4">
            <div className="text-5xl font-black text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text">
              🎉 Happy Birthday {gameState.playerName}! 🎉
            </div>
            <div className="text-2xl font-bold text-gray-800">
              🎊 All your animal friends are here to celebrate! 🎊
            </div>
            <div className="text-xl font-bold text-gray-700">
              🎂 You collected all 5 animals! 🎂
            </div>
            
            <div className="flex flex-col gap-4 justify-center">
              <button
                onClick={handlePlayAgain}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                           text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-xl 
                           transform hover:scale-110 transition-all duration-300 border-2 border-white/50 w-full"
              >
                🎮 Play Again! 🎮
              </button>
              
              <button
                onClick={handleBackToMain}
                className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 
                           text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-xl 
                           transform hover:scale-110 transition-all duration-300 border-2 border-white/50 w-full"
              >
                🎪 Back to Animal Parade 🎪
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Decorations */}
      <div className="absolute top-1/4 left-1/4 text-5xl animate-spin-slow">🌟</div>
      <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce">✨</div>
      <div className="absolute bottom-1/3 left-1/6 text-5xl animate-pulse">🎊</div>
      <div className="absolute bottom-1/4 right-1/6 text-5xl animate-bounce">🎪</div>
    </div>
  );
} 