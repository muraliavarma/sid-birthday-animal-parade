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

// Mobile Celebration Component
const AnimalCelebration = ({ animalName, count, emoji }: { animalName: string; count: number; emoji: string }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Mobile celebration overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/60 to-blue-500/60 animate-pulse"></div>
      
      {/* Main celebration for mobile */}
      <div className="bg-gradient-to-r from-pink-600 to-blue-600 rounded-3xl p-10 shadow-2xl animate-celebration-bounce animate-magical-glow">
        <div className="text-center text-white">
          <div className="text-9xl mb-6 animate-rainbow-shift">{emoji}</div>
          <div className="text-7xl font-black mb-4 animate-sparkle-blue-pink">{count}</div>
          <div className="text-3xl font-bold mb-4 text-shadow-lg">{animalName}s!</div>
          <div className="text-4xl animate-twinkle">🌟 AMAZING! 🌟</div>
        </div>
      </div>
      
      {/* Enhanced celebration particles */}
      <div className="absolute top-1/4 left-1/4 text-5xl animate-sparkle-blue-pink text-pink-400">🎊</div>
      <div className="absolute top-1/4 right-1/4 text-5xl animate-rainbow-shift text-blue-400" style={{ animationDelay: '0.3s' }}>🎉</div>
      <div className="absolute bottom-1/4 left-1/4 text-5xl animate-twinkle text-pink-500" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="absolute bottom-1/4 right-1/4 text-5xl animate-celebration-bounce text-blue-500" style={{ animationDelay: '0.9s' }}>⭐</div>
      <div className="absolute top-1/2 left-1/8 text-4xl animate-bubble-float text-pink-300" style={{ animationDelay: '0.2s' }}>🌈</div>
      <div className="absolute top-1/2 right-1/8 text-4xl animate-spin-slow text-blue-300" style={{ animationDelay: '0.7s' }}>💫</div>
    </div>
  );
};

// Mobile Score Display Component
const CornerScore = ({ score, animalCounts }: { score: number; animalCounts: Record<string, number> }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="fixed top-4 left-4 right-4 z-40">
      {/* Mobile-optimized score display */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-3xl p-6 shadow-2xl animate-magical-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white animate-twinkle">🎯 SCORE 🎯</div>
            <div className={`text-6xl font-black text-white text-shadow-lg ${isAnimating ? 'animate-celebration-bounce' : 'animate-pulse'}`}>
              {score}
            </div>
          </div>
          
          {/* Achievement badges */}
          <div className="flex flex-col gap-2">
            {score >= 5 && <span className="text-4xl animate-sparkle-blue-pink">🌟</span>}
            {score >= 10 && <span className="text-4xl animate-bounce">🏆</span>}
            {score >= 20 && <span className="text-4xl animate-rainbow-shift">👑</span>}
            {score >= 30 && <span className="text-4xl animate-spin-slow">🚀</span>}
          </div>
        </div>
        
        {/* Animal counts in a single row */}
        <div className="flex justify-between gap-2">
          {Object.entries(animalCounts).map(([animalName, count]) => (
            <div key={animalName} className="bg-white/40 rounded-2xl px-3 py-2 text-center min-w-0 flex-1 animate-bubble-float shadow-lg">
              <div className="text-white text-sm font-bold truncate">{animalName}</div>
              <div className="text-white text-2xl font-black animate-pulse">{count}</div>
            </div>
          ))}
        </div>
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
    { name: 'Lion', emoji: '🦁', sound: 'roar', color: 'bg-gradient-to-br from-pink-400 to-blue-500' },
    { name: 'Elephant', emoji: '🐘', sound: 'trumpet', color: 'bg-gradient-to-br from-blue-400 to-pink-500' },
    { name: 'Giraffe', emoji: '🦒', sound: 'munch', color: 'bg-gradient-to-br from-pink-500 to-blue-400' },
    { name: 'Monkey', emoji: '🐒', sound: 'ooh ooh', color: 'bg-gradient-to-br from-blue-500 to-pink-400' },
    { name: 'Penguin', emoji: '🐧', sound: 'waddle', color: 'bg-gradient-to-br from-pink-300 to-blue-600' },
    { name: 'Dinosaur', emoji: '🦕', sound: 'rawr', color: 'bg-gradient-to-br from-blue-300 to-pink-600' },
  ], []);

  // Function to check if a position is far enough from existing animals
  const isPositionValid = useCallback((x: number, y: number, existingAnimals: Animal[], minDistance: number = 200) => {
    return !existingAnimals.some(animal => {
      const distance = Math.sqrt((x - animal.x) ** 2 + (y - animal.y) ** 2);
      return distance < minDistance;
    });
  }, []);

  // Function to generate a valid position for an animal
  const generateValidPosition = useCallback((existingAnimals: Animal[], minDistance: number = 180) => {
    const maxAttempts = 100;
    let attempts = 0;
    
    // Use current window size or fallback to reasonable defaults
    const maxWidth = (windowSize.width || 800) - 180; // Account for bigger animals (40x40 = 160px + margin)
    const maxHeight = (windowSize.height || 600) - 300; // Less height restriction for better spacing
    const minY = 180; // Adjust for scoreboard
    
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
    setTimeout(() => setPlayingSound(null), 1200);
    
    // Pop effect - make the animal disappear with a pop animation
    const element = document.getElementById(`animal-${animal.id}`);
    if (element) {
      // Add pop animation with more excitement
      element.classList.add('animate-pop', 'animate-rainbow-shift');
      element.style.transform = 'scale(1.8)';
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
            newElement.classList.add('animate-fade-in', 'animate-twinkle');
          }
        }, 50);
      }, 300);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-300 via-blue-300 via-pink-400 to-blue-400 relative overflow-hidden fixed inset-0">
      {/* Mobile Birthday Header */}
      <div className="pt-20 px-4 text-center z-30 relative">
        <h1 className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-pink-600 to-blue-600 rounded-3xl px-8 py-6 shadow-2xl animate-magical-glow">
          🎂 SID&apos;S 5TH BIRTHDAY! 🎂
        </h1>
        <div className="bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl px-6 py-3 text-white shadow-xl animate-twinkle">
          <p className="text-xl font-bold">🌟 TAP THE ANIMALS! 🌟</p>
        </div>
      </div>

      {/* Mobile Score Display */}
      <CornerScore score={score} animalCounts={animalCounts} />

      {/* Mobile Animal Celebration */}
      {celebrating && (
        <AnimalCelebration 
          animalName={celebrating} 
          count={animalCounts[celebrating]} 
          emoji={animalData.find(animal => animal.name === celebrating)?.emoji || '🎉'} 
        />
      )}

      {/* Mobile-Optimized Animal Friends */}
      <div className="relative w-full h-full pt-32">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-300 hover:scale-125 active:scale-90 ${animal.color} rounded-full w-40 h-40 flex items-center justify-center text-8xl shadow-2xl animate-float animate-magical-glow ${
              playingSound === animal.id ? 'animate-celebration-bounce scale-125 animate-rainbow-shift' : ''
            }`}
            style={{
              left: `${Math.min(animal.x, windowSize.width - 160)}px`,
              top: `${Math.max(animal.y, 140)}px`,
              animationDelay: `${animal.id * 0.5}s`,
            }}
            onClick={() => handleAnimalClick(animal)}
          >
            {animal.emoji}
          </div>
        ))}
      </div>

      {/* Enhanced mobile decorations */}
      <div className="absolute top-36 left-4 text-4xl animate-bounce text-pink-600">🎈</div>
      <div className="absolute top-40 right-4 text-4xl animate-bounce text-blue-600" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-5xl animate-rainbow-shift">🎂</div>
      
      {/* Enhanced mobile sparkles */}
      <div className="absolute top-1/4 left-1/4 text-3xl animate-sparkle-blue-pink text-pink-500">✨</div>
      <div className="absolute top-1/3 right-1/4 text-3xl animate-twinkle text-blue-500" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute top-1/2 left-1/6 text-3xl animate-rainbow-shift text-pink-600" style={{ animationDelay: '0.5s' }}>🌟</div>
      <div className="absolute top-2/3 right-1/6 text-3xl animate-sparkle-blue-pink text-blue-600" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute bottom-1/3 left-1/3 text-3xl animate-twinkle text-pink-500" style={{ animationDelay: '0.8s' }}>⭐</div>
      <div className="absolute bottom-1/4 right-1/3 text-3xl animate-rainbow-shift text-blue-500" style={{ animationDelay: '1.2s' }}>🌟</div>
    </div>
  );
}
