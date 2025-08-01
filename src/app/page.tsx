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

// Corner Score Component
const CornerScore = ({ score }: { score: number }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50 }}>
      <div className="bg-gradient-to-br from-blue-500 via-pink-500 to-blue-600 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          {/* Large score number */}
          <div className="relative">
            <span className={`text-5xl md:text-7xl font-bold text-white drop-shadow-2xl ${isAnimating ? 'animate-celebration-bounce scale-125' : ''} transition-all duration-300`}>
              {score}
            </span>
          </div>
          
          {/* Celebration emojis based on score */}
          <div className="flex justify-center mt-3 space-x-2">
            {score >= 1 && <span className="text-lg animate-celebration-float">🎉</span>}
            {score >= 5 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.2s' }}>🎊</span>}
            {score >= 10 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.4s' }}>🏆</span>}
            {score >= 15 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.6s' }}>👑</span>}
            {score >= 20 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.8s' }}>💎</span>}
            {score >= 25 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '1s' }}>🌈</span>}
            {score >= 30 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '1.2s' }}>🚀</span>}
          </div>
        </div>
      </div>
      
      {/* Floating celebration particles - moved away from score */}
      {isAnimating && (
        <>
          <div className="absolute -top-8 left-1/4 text-blue-300 animate-celebration-float">🎈</div>
          <div className="absolute -top-12 right-1/4 text-pink-300 animate-celebration-float" style={{ animationDelay: '0.3s' }}>🎈</div>
          <div className="absolute -top-6 left-1/2 text-blue-400 animate-celebration-float" style={{ animationDelay: '0.6s' }}>🎈</div>
          <div className="absolute -top-16 left-1/3 text-pink-400 animate-celebration-float" style={{ animationDelay: '0.9s' }}>✨</div>
          <div className="absolute -top-20 right-1/3 text-blue-500 animate-celebration-float" style={{ animationDelay: '1.2s' }}>⭐</div>
        </>
      )}
    </div>
  );
};

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [score, setScore] = useState(0);
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
    
    // Update score
    setScore(prev => prev + 1);
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-pink-400 to-blue-500 relative overflow-hidden">
      {/* Birthday Header */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-opacity-95 rounded-2xl px-6 py-4 shadow-2xl text-white backdrop-blur-sm">
          🎉 HAPPY 5TH BIRTHDAY SID! 🎉
        </h1>
        <div className="text-center mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-opacity-90 rounded-xl px-6 py-3 mx-auto max-w-md text-white backdrop-blur-sm shadow-lg">
          <p className="text-lg font-semibold">Tap the animals to hear them!</p>
        </div>
      </div>

      {/* Corner Score */}
      <CornerScore score={score} />

      {/* Animals */}
      <div className="relative w-full h-screen">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 animal-button ${animal.color} rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-6xl md:text-7xl shadow-2xl animate-float ${
              playingSound === animal.id ? 'animate-pulse-glow' : ''
            }`}
            style={{
              left: `${Math.min(animal.x, windowSize.width - 160)}px`,
              top: `${Math.max(animal.y, 200)}px`,
              animationDelay: `${animal.id * 0.5}s`,
            }}
            onClick={() => handleAnimalClick(animal)}
          >
            {animal.emoji}
          </div>
        ))}
      </div>

      {/* Floating balloons */}
      <div className="absolute top-20 right-4 md:right-10 text-4xl md:text-6xl animate-bounce text-yellow-300">🎈</div>
      <div className="absolute top-40 right-8 md:right-20 text-3xl md:text-5xl animate-bounce text-pink-300" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute top-60 right-2 md:right-5 text-2xl md:text-4xl animate-bounce text-orange-300" style={{ animationDelay: '1s' }}>🎈</div>

      {/* Cake */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl animate-pulse">🎂</div>

      {/* Well-distributed sparkles across the page */}
      <div className="absolute top-1/6 left-1/6 text-2xl animate-sparkle text-yellow-300">✨</div>
      <div className="absolute top-1/4 right-1/4 text-xl animate-sparkle text-pink-300" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute top-1/3 left-1/3 text-lg animate-sparkle text-orange-300" style={{ animationDelay: '2s' }}>✨</div>
      <div className="absolute top-1/2 left-1/8 text-xl animate-sparkle text-purple-300" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute top-2/3 right-1/6 text-lg animate-sparkle text-yellow-400" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute top-3/4 left-1/4 text-xl animate-sparkle text-pink-400" style={{ animationDelay: '0.8s' }}>⭐</div>
      <div className="absolute top-5/6 right-1/3 text-lg animate-sparkle text-orange-400" style={{ animationDelay: '2.5s' }}>✨</div>
      <div className="absolute bottom-1/4 left-1/2 text-xl animate-sparkle text-purple-400" style={{ animationDelay: '1.2s' }}>⭐</div>
      <div className="absolute bottom-1/3 right-1/8 text-lg animate-sparkle text-yellow-500" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="absolute bottom-1/6 left-1/6 text-xl animate-sparkle text-pink-500" style={{ animationDelay: '1.8s' }}>⭐</div>
      <div className="absolute bottom-1/8 right-1/4 text-lg animate-sparkle text-orange-500" style={{ animationDelay: '0.7s' }}>✨</div>
    </div>
  );
}
