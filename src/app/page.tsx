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
      <div className="absolute inset-0 bg-gradient-to-b from-pink-400/50 to-blue-400/50 animate-pulse"></div>
      
      {/* Main celebration for mobile */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-3xl p-8 shadow-xl animate-bounce">
        <div className="text-center text-white">
          <div className="text-8xl mb-4">{emoji}</div>
          <div className="text-5xl font-black mb-2">{count}</div>
          <div className="text-2xl font-bold mb-2">{animalName}s!</div>
          <div className="text-3xl">🌟 AMAZING! 🌟</div>
        </div>
      </div>
      
      {/* Simple mobile particles */}
      <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce text-pink-300">🎊</div>
      <div className="absolute top-1/4 right-1/4 text-4xl animate-bounce text-blue-300" style={{ animationDelay: '0.3s' }}>🎉</div>
      <div className="absolute bottom-1/4 left-1/4 text-4xl animate-bounce text-pink-400" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="absolute bottom-1/4 right-1/4 text-4xl animate-bounce text-blue-400" style={{ animationDelay: '0.9s' }}>⭐</div>
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
      <div className="bg-gradient-to-r from-pink-400 to-blue-400 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">🎯 Score</div>
            <div className={`text-4xl font-black text-white ${isAnimating ? 'animate-bounce' : ''}`}>
              {score}
            </div>
          </div>
          
          {/* Achievement badges */}
          <div className="flex gap-1">
            {score >= 5 && <span className="text-2xl animate-pulse">🌟</span>}
            {score >= 10 && <span className="text-2xl animate-bounce">🏆</span>}
            {score >= 20 && <span className="text-2xl animate-pulse">👑</span>}
            {score >= 30 && <span className="text-2xl animate-bounce">🚀</span>}
          </div>
        </div>
        
        {/* Animal counts in a single row */}
        <div className="flex justify-between gap-1">
          {Object.entries(animalCounts).map(([animalName, count]) => (
            <div key={animalName} className="bg-white/30 rounded-xl px-2 py-1 text-center min-w-0 flex-1">
              <div className="text-white text-xs font-bold truncate">{animalName}</div>
              <div className="text-white text-lg font-black">{count}</div>
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
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-blue-200 to-pink-300 relative overflow-hidden">
      {/* Mobile Birthday Header */}
      <div className="pt-20 px-4 text-center z-30 relative">
        <h1 className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl px-6 py-4 shadow-lg">
          🎂 SID&apos;S 5TH BIRTHDAY! 🎂
        </h1>
        <div className="bg-gradient-to-r from-blue-400 to-pink-400 rounded-xl px-4 py-2 text-white shadow-md">
          <p className="text-lg font-bold">🌟 Tap the Animals! 🌟</p>
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
      <div className="relative w-full h-screen pt-32">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${animal.color} rounded-full w-24 h-24 flex items-center justify-center text-5xl shadow-xl animate-float ${
              playingSound === animal.id ? 'animate-pulse scale-110' : ''
            }`}
            style={{
              left: `${Math.min(animal.x, windowSize.width - 96)}px`,
              top: `${Math.max(animal.y, 140)}px`,
              animationDelay: `${animal.id * 0.5}s`,
            }}
            onClick={() => handleAnimalClick(animal)}
          >
            {animal.emoji}
          </div>
        ))}
      </div>

      {/* Simple mobile decorations */}
      <div className="absolute top-36 left-4 text-3xl animate-bounce text-pink-500">🎈</div>
      <div className="absolute top-40 right-4 text-3xl animate-bounce text-blue-500" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">🎂</div>
      
      {/* Mobile sparkles */}
      <div className="absolute top-1/4 left-1/4 text-2xl animate-sparkle text-pink-400">✨</div>
      <div className="absolute top-1/3 right-1/4 text-2xl animate-sparkle text-blue-400" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute top-1/2 left-1/6 text-2xl animate-sparkle text-pink-500" style={{ animationDelay: '0.5s' }}>🌟</div>
      <div className="absolute top-2/3 right-1/6 text-2xl animate-sparkle text-blue-500" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute bottom-1/3 left-1/3 text-2xl animate-sparkle text-pink-400" style={{ animationDelay: '0.8s' }}>⭐</div>
      <div className="absolute bottom-1/4 right-1/3 text-2xl animate-sparkle text-blue-400" style={{ animationDelay: '1.2s' }}>🌟</div>
    </div>
  );
}
