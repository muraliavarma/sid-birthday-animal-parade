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

// Dazzling Score Component
const DazzlingScore = ({ score }: { score: number }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative">
      <div className="text-center mt-2 bg-gradient-to-r from-pink-400 to-blue-400 bg-opacity-90 rounded-xl px-6 py-3 mx-auto max-w-xs shadow-2xl border-4 border-pink-300 transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          {/* Blue and pink sparkles */}
          <div className="absolute -top-2 -left-2 text-pink-300 animate-sparkle-blue-pink">✨</div>
          <div className="absolute -top-1 -right-1 text-blue-300 animate-sparkle-blue-pink" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute -bottom-1 -left-1 text-pink-400 animate-sparkle-blue-pink" style={{ animationDelay: '1s' }}>💫</div>
          <div className="absolute -bottom-2 -right-2 text-blue-400 animate-sparkle-blue-pink" style={{ animationDelay: '1.5s' }}>🌟</div>
          
          {/* Main score text with blue and pink gradient */}
          <p className="text-xl font-bold text-white">
            Score: <span className={`inline-block ${isAnimating ? 'animate-celebration-bounce scale-125' : ''} transition-all duration-300`}>
              {score}
            </span>
          </p>
          
          {/* Celebration emojis that appear based on score */}
          <div className="flex justify-center mt-1 space-x-1">
            {score >= 1 && <span className="text-lg animate-celebration-float">🎉</span>}
            {score >= 5 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.2s' }}>🎊</span>}
            {score >= 10 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.4s' }}>🏆</span>}
            {score >= 15 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.6s' }}>👑</span>}
            {score >= 20 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '0.8s' }}>💎</span>}
            {score >= 25 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '1s' }}>🌈</span>}
            {score >= 30 && <span className="text-lg animate-celebration-float" style={{ animationDelay: '1.2s' }}>🚀</span>}
          </div>
          
          {/* Blue and pink border animation */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400 to-blue-400 p-1 opacity-75 animate-pulse">
            <div className="bg-gradient-to-r from-pink-400 to-blue-400 rounded-lg h-full"></div>
          </div>
        </div>
      </div>
      
      {/* Floating celebration particles */}
      {isAnimating && (
        <>
          <div className="absolute -top-4 left-1/4 text-pink-300 animate-celebration-float">🎈</div>
          <div className="absolute -top-6 right-1/4 text-blue-300 animate-celebration-float" style={{ animationDelay: '0.3s' }}>🎈</div>
          <div className="absolute -top-2 left-1/2 text-pink-400 animate-celebration-float" style={{ animationDelay: '0.6s' }}>🎈</div>
          <div className="absolute -top-8 left-1/3 text-blue-400 animate-celebration-float" style={{ animationDelay: '0.9s' }}>✨</div>
          <div className="absolute -top-10 right-1/3 text-pink-500 animate-celebration-float" style={{ animationDelay: '1.2s' }}>⭐</div>
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
    { name: 'Lion', emoji: '🦁', sound: 'roar', color: 'bg-pink-400' },
    { name: 'Elephant', emoji: '🐘', sound: 'trumpet', color: 'bg-blue-400' },
    { name: 'Giraffe', emoji: '🦒', sound: 'munch', color: 'bg-pink-300' },
    { name: 'Monkey', emoji: '🐒', sound: 'ooh ooh', color: 'bg-blue-300' },
    { name: 'Penguin', emoji: '🐧', sound: 'waddle', color: 'bg-pink-500' },
    { name: 'Dinosaur', emoji: '🦕', sound: 'rawr', color: 'bg-blue-500' },
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-pink-200 relative overflow-hidden">
      {/* Birthday Header */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 w-full px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-blue-400 bg-opacity-90 rounded-lg px-4 py-2 shadow-lg text-white">
          🎉 Birthday Animal Parade! 🎉
        </h1>
        <DazzlingScore score={score} />
        <div className="text-center mt-2 bg-gradient-to-r from-blue-400 to-pink-400 bg-opacity-90 rounded-lg px-4 py-1 mx-auto max-w-xs text-white">
          <p className="text-sm font-semibold">Tap the animals to hear them!</p>
        </div>
      </div>

      {/* Animals */}
      <div className="relative w-full h-screen">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 animal-button ${animal.color} rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-6xl md:text-7xl shadow-lg border-4 ${animal.color.includes('pink') ? 'border-pink-600' : 'border-blue-600'} animate-float ${
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
      <div className="absolute top-20 right-4 md:right-10 text-4xl md:text-6xl animate-bounce text-pink-400">🎈</div>
      <div className="absolute top-40 right-8 md:right-20 text-3xl md:text-5xl animate-bounce text-blue-400" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute top-60 right-2 md:right-5 text-2xl md:text-4xl animate-bounce text-pink-500" style={{ animationDelay: '1s' }}>🎈</div>

      {/* Cake */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-6xl animate-pulse">🎂</div>

      {/* Sparkles */}
      <div className="absolute top-1/4 left-4 text-2xl animate-sparkle text-pink-300">✨</div>
      <div className="absolute top-1/3 right-1/4 text-xl animate-sparkle text-blue-300" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-1/3 left-1/4 text-xl animate-sparkle text-pink-400" style={{ animationDelay: '2s' }}>✨</div>
    </div>
  );
}
