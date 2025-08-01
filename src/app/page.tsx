'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { playAnimalSound } from '@/utils/audio';

interface Animal {
  id: number;
  name: string;
  emoji: string;
  sound: string;
  color: string;
  x: number;
  y: number;
}

// Magical Celebration Component
const AnimalCelebration = ({ animalName, count, emoji }: { animalName: string; count: number; emoji: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Magical background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-pink-500/30 to-purple-500/30 backdrop-blur-sm animate-pulse"></div>
      
      {/* Main celebration */}
      <div className="relative">
        <div className="bg-gradient-to-br from-pink-400 via-blue-400 to-purple-500 rounded-full p-12 shadow-2xl animate-celebration-bounce border-8 border-white/50">
          <div className="text-center text-white">
            <div className="text-9xl mb-6 animate-spin-slow">{emoji}</div>
            <div className="text-6xl font-black mb-4 text-shadow-lg animate-pulse">{count}</div>
            <div className="text-3xl font-bold mb-2 animate-bounce">{animalName}s!</div>
            <div className="text-4xl animate-pulse">🌟 SUPER STAR! 🌟</div>
          </div>
        </div>
        
        {/* Magical particles flying around */}
        <div className="absolute -top-16 -left-16 text-pink-300 animate-celebration-float text-6xl">🎊</div>
        <div className="absolute -top-20 -right-16 text-blue-300 animate-celebration-float text-6xl" style={{ animationDelay: '0.3s' }}>🎉</div>
        <div className="absolute -bottom-16 -left-16 text-purple-300 animate-celebration-float text-6xl" style={{ animationDelay: '0.6s' }}>✨</div>
        <div className="absolute -bottom-20 -right-16 text-pink-400 animate-celebration-float text-6xl" style={{ animationDelay: '0.9s' }}>⭐</div>
        <div className="absolute top-0 -left-24 text-blue-400 animate-celebration-float text-5xl" style={{ animationDelay: '1.2s' }}>🌈</div>
        <div className="absolute top-0 -right-24 text-pink-500 animate-celebration-float text-5xl" style={{ animationDelay: '1.5s' }}>🦄</div>
        <div className="absolute -top-8 left-0 text-purple-400 animate-celebration-float text-5xl" style={{ animationDelay: '1.8s' }}>💎</div>
        <div className="absolute -bottom-8 right-0 text-blue-500 animate-celebration-float text-5xl" style={{ animationDelay: '2.1s' }}>🚀</div>
      </div>
    </div>
  );
};

// Magical Score Castle Component
const CornerScore = ({ score, animalCounts }: { score: number; animalCounts: Record<string, number> }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="fixed top-6 right-6 z-40" style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 40 }}>
      {/* Magical castle-like score display */}
      <div className="relative">
        <div className="bg-gradient-to-br from-pink-400 via-blue-400 to-purple-500 rounded-3xl p-6 shadow-2xl backdrop-blur-sm border-4 border-white/30 transform hover:scale-105 transition-all duration-300">
          {/* Castle towers */}
          <div className="absolute -top-3 -left-2 w-6 h-8 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-full"></div>
          <div className="absolute -top-3 -right-2 w-6 h-8 bg-gradient-to-b from-blue-300 to-blue-500 rounded-t-full"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-gradient-to-b from-purple-300 to-purple-500 rounded-t-full"></div>
          
          <div className="text-center">
            {/* Magical total score */}
            <div className="relative mb-4">
              <div className="text-2xl font-bold text-white mb-1">🏰 Sid's Castle 🏰</div>
              <span className={`text-5xl font-black text-white drop-shadow-2xl ${isAnimating ? 'animate-celebration-bounce scale-125' : ''} transition-all duration-300 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent`}>
                {score}
              </span>
              <div className="text-sm text-white/90 mt-1 font-semibold">Total Adventures!</div>
            </div>
            
            {/* Animal count cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {Object.entries(animalCounts).map(([animalName, count]) => (
                <div key={animalName} className="bg-white/25 rounded-2xl p-3 backdrop-blur-sm border-2 border-white/20 hover:bg-white/35 transition-all duration-200">
                  <div className="text-white text-xs font-bold mb-1">{animalName}</div>
                  <div className="text-white text-2xl font-black">{count}</div>
                </div>
              ))}
            </div>
            
            {/* Magic achievement badges */}
            <div className="flex justify-center flex-wrap gap-1">
              {score >= 1 && <span className="text-2xl animate-pulse">🌟</span>}
              {score >= 5 && <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>}
              {score >= 10 && <span className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>🏆</span>}
              {score >= 15 && <span className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>👑</span>}
              {score >= 20 && <span className="text-2xl animate-pulse" style={{ animationDelay: '0.8s' }}>💎</span>}
              {score >= 25 && <span className="text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🌈</span>}
              {score >= 30 && <span className="text-2xl animate-pulse" style={{ animationDelay: '1.2s' }}>🚀</span>}
            </div>
          </div>
        </div>
        
        {/* Magical floating particles */}
        {isAnimating && (
          <>
            <div className="absolute -top-8 left-1/4 text-pink-300 animate-celebration-float text-3xl">🦄</div>
            <div className="absolute -top-12 right-1/4 text-blue-300 animate-celebration-float text-3xl" style={{ animationDelay: '0.3s' }}>✨</div>
            <div className="absolute -top-6 left-1/2 text-purple-400 animate-celebration-float text-3xl" style={{ animationDelay: '0.6s' }}>💫</div>
            <div className="absolute -top-16 left-1/3 text-pink-400 animate-celebration-float text-3xl" style={{ animationDelay: '0.9s' }}>🌟</div>
            <div className="absolute -top-20 right-1/3 text-blue-500 animate-celebration-float text-3xl" style={{ animationDelay: '1.2s' }}>⭐</div>
          </>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [score, setScore] = useState(0);
  const [animalCounts, setAnimalCounts] = useState<Record<string, number>>({});
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [playingSound, setPlayingSound] = useState<number | null>(null);

  const animalData = useMemo((): Omit<Animal, 'id' | 'x' | 'y'>[] => [
    { name: 'Lion', emoji: '🦁', sound: 'roar', color: 'bg-gradient-to-br from-orange-400 to-yellow-500' },
    { name: 'Elephant', emoji: '🐘', sound: 'trumpet', color: 'bg-gradient-to-br from-gray-400 to-blue-500' },
    { name: 'Giraffe', emoji: '🦒', sound: 'munch', color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'Monkey', emoji: '🐒', sound: 'ooh ooh', color: 'bg-gradient-to-br from-brown-400 to-orange-500' },
    { name: 'Penguin', emoji: '🐧', sound: 'waddle', color: 'bg-gradient-to-br from-blue-400 to-gray-500' },
    { name: 'Dinosaur', emoji: '🦕', sound: 'rawr', color: 'bg-gradient-to-br from-green-400 to-blue-500' },
  ], []);

  // Function to check if a position is far enough from existing animals
  const isPositionValid = useCallback((x: number, y: number, existingAnimals: Animal[], minDistance: number = 200) => {
    return !existingAnimals.some(animal => {
      const distance = Math.sqrt((x - animal.x) ** 2 + (y - animal.y) ** 2);
      return distance < minDistance;
    });
  }, []);

  // Function to generate a valid position for an animal
  const generateValidPosition = useCallback((existingAnimals: Animal[], minDistance: number = 200) => {
    const maxAttempts = 100;
    let attempts = 0;
    
    // Use current window size or fallback to reasonable defaults
    const maxWidth = Math.min(windowSize.width || 800, 800) - 160;
    const maxHeight = (windowSize.height || 600) - 400;
    const minY = 200;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * maxWidth;
      const y = Math.random() * maxHeight + minY;
      
      if (isPositionValid(x, y, existingAnimals, minDistance)) {
        return { x, y };
      }
      attempts++;
    }
    
    // If we can't find a valid position, return a random one
    return {
      x: Math.random() * maxWidth,
      y: Math.random() * maxHeight + minY,
    };
  }, [windowSize.width, windowSize.height, isPositionValid]);

  const initializeAnimals = useCallback(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return; // Wait for window size
    
    const initialAnimals: Animal[] = [];
    
    animalData.forEach((animal, index) => {
      const position = generateValidPosition(initialAnimals, 200);
      initialAnimals.push({
        ...animal,
        id: index,
        x: position.x,
        y: position.y,
      });
    });
    
    setAnimals(initialAnimals);
  }, [animalData, generateValidPosition, windowSize.width, windowSize.height]);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  // Initialize animals when window size is available
  useEffect(() => {
    if (windowSize.width > 0 && windowSize.height > 0) {
      initializeAnimals();
    }
  }, [windowSize.width, windowSize.height, initializeAnimals]);

  const handleAnimalClick = (animal: Animal) => {
    // Set visual feedback
    setPlayingSound(animal.id);
    
    // Play the animal sound
    playAnimalSound(animal.sound);
    
    // Update total score
    setScore(prev => prev + 1);
    
    // Update individual animal count
    setAnimalCounts(prev => {
      const newCount = (prev[animal.name] || 0) + 1;
      const updatedCounts = { ...prev, [animal.name]: newCount };
      
      // Check if this animal hit a multiple of 10
      if (newCount % 10 === 0) {
        setCelebrating(animal.name);
        // Clear celebration after 3 seconds
        setTimeout(() => setCelebrating(null), 3000);
      }
      
      return updatedCounts;
    });
    
    // Clear visual feedback after sound duration
    setTimeout(() => setPlayingSound(null), 800);
    
    // Pop effect - make the animal disappear with a pop animation
    const element = document.getElementById(`animal-${animal.id}`);
    if (element) {
      // Add pop animation
      element.classList.add('animate-pop');
      element.style.transform = 'scale(1.5)';
      element.style.opacity = '0';
      
      // Remove the animal from the array temporarily
      setAnimals(prev => prev.filter(a => a.id !== animal.id));
      
      // After pop animation, respawn the animal in a new location
      setTimeout(() => {
        const newPosition = generateValidPosition(animals.filter(a => a.id !== animal.id), 200);
        
        setAnimals(prev => [...prev, {
          ...animal,
          x: newPosition.x,
          y: newPosition.y,
        }]);
        
        // Add fade-in animation to the newly spawned animal
        setTimeout(() => {
          const newElement = document.getElementById(`animal-${animal.id}`);
          if (newElement) {
            newElement.classList.add('animate-fade-in');
          }
        }, 50);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-pink-300 via-purple-300 to-blue-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating clouds */}
        <div className="absolute top-10 left-10 text-6xl text-white/40 animate-float">☁️</div>
        <div className="absolute top-20 right-20 text-8xl text-white/30 animate-float" style={{ animationDelay: '2s' }}>☁️</div>
        <div className="absolute top-40 left-1/3 text-5xl text-white/50 animate-float" style={{ animationDelay: '4s' }}>☁️</div>
        
        {/* Rainbow arcs */}
        <div className="absolute top-16 left-0 text-9xl animate-pulse opacity-20">🌈</div>
        <div className="absolute bottom-20 right-0 text-9xl animate-pulse opacity-20" style={{ animationDelay: '3s' }}>🌈</div>
      </div>

      {/* Magical Birthday Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-full px-4">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-pink-400 via-blue-400 to-purple-500 rounded-3xl px-8 py-6 shadow-2xl text-white backdrop-blur-sm border-4 border-white/30 animate-pulse">
            🎂 SID'S MAGICAL 5TH BIRTHDAY! 🎂
          </h1>
          {/* Floating birthday elements */}
          <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎈</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
          <div className="absolute -bottom-4 left-1/4 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🎊</div>
          <div className="absolute -bottom-4 right-1/4 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎉</div>
        </div>
        
        <div className="text-center mt-6 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 rounded-2xl px-8 py-4 mx-auto max-w-lg text-white backdrop-blur-sm shadow-lg border-3 border-white/20">
          <p className="text-2xl font-bold animate-pulse">🌟 Tap the Animal Friends! 🌟</p>
          <p className="text-lg font-semibold mt-1">Collect them all and become a Super Star!</p>
        </div>
      </div>

      {/* Magical Score Castle */}
      <CornerScore score={score} animalCounts={animalCounts} />

      {/* Epic Animal Celebration */}
      {celebrating && (
        <AnimalCelebration 
          animalName={celebrating} 
          count={animalCounts[celebrating]} 
          emoji={animalData.find(animal => animal.name === celebrating)?.emoji || '🎉'} 
        />
      )}

      {/* Enhanced Animal Friends */}
      <div className="relative w-full h-screen">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-300 hover:scale-125 active:scale-90 ${animal.color} rounded-full w-36 h-36 md:w-44 md:h-44 flex items-center justify-center text-7xl md:text-8xl shadow-2xl animate-float border-4 border-white/40 ${
              playingSound === animal.id ? 'animate-pulse-glow scale-110' : ''
            }`}
            style={{
              left: `${Math.min(animal.x, windowSize.width - 180)}px`,
              top: `${Math.max(animal.y, 220)}px`,
              animationDelay: `${animal.id * 0.5}s`,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
            }}
            onClick={() => handleAnimalClick(animal)}
          >
            {animal.emoji}
            {/* Magical glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-300/20 via-blue-300/20 to-purple-300/20 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Magical floating decorations */}
      <div className="absolute top-32 left-8 text-5xl animate-bounce text-pink-400">🦄</div>
      <div className="absolute top-48 left-16 text-4xl animate-bounce text-blue-400" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute top-64 left-4 text-3xl animate-bounce text-purple-400" style={{ animationDelay: '1s' }}>💎</div>

      {/* Birthday cake with candles */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-6xl animate-pulse">🎂</div>
        <div className="text-2xl font-bold text-white mt-2 bg-pink-400/80 rounded-full px-4 py-1">Happy Birthday!</div>
      </div>

      {/* Enchanted sparkles and stars everywhere */}
      <div className="absolute top-1/6 left-1/6 text-3xl animate-sparkle text-pink-300">🌟</div>
      <div className="absolute top-1/4 right-1/4 text-2xl animate-sparkle text-blue-300" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute top-1/3 left-1/3 text-4xl animate-sparkle text-purple-300" style={{ animationDelay: '2s' }}>💫</div>
      <div className="absolute top-1/2 left-1/8 text-3xl animate-sparkle text-pink-400" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute top-2/3 right-1/6 text-2xl animate-sparkle text-blue-400" style={{ animationDelay: '1.5s' }}>🌟</div>
      <div className="absolute top-3/4 left-1/4 text-3xl animate-sparkle text-purple-400" style={{ animationDelay: '0.8s' }}>✨</div>
      <div className="absolute top-5/6 right-1/3 text-4xl animate-sparkle text-pink-500" style={{ animationDelay: '2.5s' }}>💫</div>
      <div className="absolute bottom-1/4 left-1/2 text-3xl animate-sparkle text-blue-500" style={{ animationDelay: '1.2s' }}>⭐</div>
      <div className="absolute bottom-1/3 right-1/8 text-2xl animate-sparkle text-purple-500" style={{ animationDelay: '0.3s' }}>🌟</div>
      <div className="absolute bottom-1/6 left-1/6 text-3xl animate-sparkle text-pink-600" style={{ animationDelay: '1.8s' }}>✨</div>
      <div className="absolute bottom-1/8 right-1/4 text-4xl animate-sparkle text-blue-600" style={{ animationDelay: '0.7s' }}>💫</div>
      
      {/* Extra magical elements */}
      <div className="absolute top-1/5 right-1/5 text-5xl animate-bounce text-pink-300" style={{ animationDelay: '2s' }}>🦋</div>
      <div className="absolute bottom-1/5 left-1/5 text-4xl animate-bounce text-blue-300" style={{ animationDelay: '3s' }}>🌸</div>
      <div className="absolute top-3/5 right-1/8 text-3xl animate-pulse text-purple-300" style={{ animationDelay: '1.5s' }}>🔮</div>
    </div>
  );
}
