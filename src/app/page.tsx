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

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [score, setScore] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [playingSound, setPlayingSound] = useState<number | null>(null);

  const animalData = useMemo((): Omit<Animal, 'id' | 'x' | 'y'>[] => [
    { name: 'Lion', emoji: '🦁', sound: 'roar', color: 'bg-yellow-400' },
    { name: 'Elephant', emoji: '🐘', sound: 'trumpet', color: 'bg-gray-400' },
    { name: 'Giraffe', emoji: '🦒', sound: 'munch', color: 'bg-yellow-300' },
    { name: 'Monkey', emoji: '🐒', sound: 'ooh ooh', color: 'bg-orange-300' },
    { name: 'Penguin', emoji: '🐧', sound: 'waddle', color: 'bg-blue-300' },
    { name: 'Dinosaur', emoji: '🦕', sound: 'rawr', color: 'bg-green-400' },
  ], []);

  const initializeAnimals = useCallback(() => {
    const initialAnimals = animalData.map((animal, index) => ({
      ...animal,
      id: index,
      x: Math.random() * (Math.min(window.innerWidth, 800) - 160),
      y: Math.random() * (window.innerHeight - 400) + 200, // Keep away from header
    }));
    setAnimals(initialAnimals);
  }, [animalData]);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    initializeAnimals();

    return () => window.removeEventListener('resize', updateWindowSize);
  }, [initializeAnimals]);

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
        const newX = Math.random() * (Math.min(windowSize.width, 800) - 160);
        const newY = Math.random() * (windowSize.height - 400) + 200;
        
        setAnimals(prev => [...prev, {
          ...animal,
          x: newX,
          y: newY,
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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* Birthday Header */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center bg-white bg-opacity-90 rounded-lg px-4 py-2 shadow-lg">
          🎉 Birthday Animal Parade! 🎉
        </h1>
        <div className="text-center mt-2 bg-white bg-opacity-90 rounded-lg px-4 py-1 mx-auto max-w-xs">
          <p className="text-lg font-semibold">Score: {score}</p>
          <p className="text-sm">Tap the animals to hear them!</p>
        </div>
      </div>

      {/* Animals */}
      <div className="relative w-full h-screen">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 animal-button ${animal.color} rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-6xl md:text-7xl shadow-lg border-4 border-white animate-float ${
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
      <div className="absolute top-20 right-4 md:right-10 text-4xl md:text-6xl animate-bounce">🎈</div>
      <div className="absolute top-40 right-8 md:right-20 text-3xl md:text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute top-60 right-2 md:right-5 text-2xl md:text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>

      {/* Cake */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl animate-pulse">🎂</div>

      {/* Sparkles */}
      <div className="absolute top-1/4 left-4 text-2xl animate-sparkle">✨</div>
      <div className="absolute top-1/3 right-1/4 text-xl animate-sparkle" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-1/3 left-1/4 text-xl animate-sparkle" style={{ animationDelay: '2s' }}>✨</div>
    </div>
  );
}
