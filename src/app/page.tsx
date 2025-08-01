'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

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
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
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
      x: Math.random() * (Math.min(window.innerWidth, 800) - 120),
      y: Math.random() * (window.innerHeight - 300) + 150, // Keep away from header
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

  const initializeAudio = useCallback(() => {
    if (!hasInteracted) {
      try {
        const ctx = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
        setAudioContext(ctx);
        setHasInteracted(true);
      } catch (error) {
        console.log('Audio not supported');
      }
    }
  }, [hasInteracted]);

  const playFallbackSound = (animal: Animal) => {
    const frequencies: Record<string, number> = {
      'roar': 150,
      'trumpet': 200,
      'munch': 300,
      'ooh ooh': 400,
      'waddle': 250,
      'rawr': 180,
    };
    
    const frequency = frequencies[animal.sound] || 300;
    
    // Create a simple oscillator using Web Audio API or fallback
    try {
      const ctx = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch {
      // If Web Audio API fails, just play a simple beep
      console.log('Using fallback audio');
    }
  };

  const playAnimalSound = (animal: Animal) => {
    // Set visual feedback
    setPlayingSound(animal.id);
    
    if (!audioContext) {
      initializeAudio();
      playFallbackSound(animal);
      setScore(prev => prev + 1);
      setTimeout(() => setPlayingSound(null), 500);
      return;
    }

    try {
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different animals
      const frequencies: Record<string, number> = {
        'roar': 150,
        'trumpet': 200,
        'munch': 300,
        'ooh ooh': 400,
        'waddle': 250,
        'rawr': 180,
      };
      
      oscillator.frequency.setValueAtTime(frequencies[animal.sound] || 300, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch {
      console.log('Audio playback failed');
      // Fallback to simple sound
      playFallbackSound(animal);
    }
    
    setScore(prev => prev + 1);
    setTimeout(() => setPlayingSound(null), 500);
  };

  const handleAnimalClick = (animal: Animal) => {
    playAnimalSound(animal);
    
    // Add a little bounce animation
    const element = document.getElementById(`animal-${animal.id}`);
    if (element) {
      element.classList.add('animate-bounce');
      setTimeout(() => {
        element.classList.remove('animate-bounce');
      }, 500);
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
            className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 animal-button ${animal.color} rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-5xl md:text-6xl shadow-lg border-4 border-white animate-float ${
              playingSound === animal.id ? 'animate-pulse-glow' : ''
            }`}
            style={{
              left: `${Math.min(animal.x, windowSize.width - 120)}px`,
              top: `${Math.max(animal.y, 150)}px`,
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
