'use client';

import { useState } from 'react';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            {/* Giant Animal Face */}
            <div className="relative">
              {/* Ears */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-pink-400 rounded-full"></div>
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-pink-400 rounded-full"></div>
              
              {/* Main Face */}
              <div className="w-48 h-48 bg-yellow-300 rounded-full border-8 border-orange-400 relative">
                {/* Eyes */}
                <div className="absolute top-12 left-8 w-8 h-8 bg-black rounded-full"></div>
                <div className="absolute top-12 right-8 w-8 h-8 bg-black rounded-full"></div>
                
                {/* Nose */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full"></div>
                
                {/* Mouth */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded-full"></div>
                
                {/* Cheeks */}
                <div className="absolute bottom-8 left-4 w-6 h-6 bg-pink-300 rounded-full"></div>
                <div className="absolute bottom-8 right-4 w-6 h-6 bg-pink-300 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-8xl font-bold text-white mb-6 drop-shadow-2xl animate-bounce">
            🎉 SID! 🎉
          </h1>
          
          <button
            onClick={handleStartGame}
            className="text-6xl font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-12 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse border-4 border-white"
          >
            🎮 GET STARTED! 🎮
          </button>
          
          <p className="text-2xl text-white mt-6 font-semibold drop-shadow-lg">
            Happy 5th Birthday! 🎂
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-400 to-purple-600 overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Game Started!</h1>
        <p className="text-xl text-white/90">More fun coming soon! 🎮</p>
        <button
          onClick={() => setGameStarted(false)}
          className="mt-8 text-2xl font-bold bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all duration-300"
        >
          Back to Start
        </button>
      </div>
    </div>
  );
}
