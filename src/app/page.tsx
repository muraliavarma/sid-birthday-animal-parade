'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { playAnimalSound } from '@/utils/audio';
import { triggerMilestoneConfetti, triggerConfetti, triggerContinuousConfetti } from '@/utils/confetti';

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
    // Trigger additional confetti when celebration appears
    setTimeout(() => triggerConfetti('achievement'), 500);
    
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
          <div className="text-9xl mb-6 animate-celebration-explosion">{emoji}</div>
          <div className="text-8xl font-black mb-4 animate-confetti-shake">{count}</div>
          <div className="text-4xl font-bold mb-4 text-shadow-lg animate-rainbow-shift">
            {count >= 50 ? '🎆 INCREDIBLE! 🎆' : count >= 25 ? '🌟 AMAZING! 🌟' : count >= 10 ? '✨ FANTASTIC! ✨' : '🎉 AWESOME! 🎉'}
          </div>
          <div className="text-4xl font-bold mb-4 text-shadow-lg">WOW! {count} {animalName}s!</div>
          <div className="text-5xl animate-milestone-burst">
            {count >= 50 ? '🚀 LEGENDARY! 🚀' : count >= 25 ? '👑 CHAMPION! 👑' : '🎉 FANTASTIC! 🎉'}
          </div>
          <div className="text-3xl animate-pulse mt-2">🌟 YOU&apos;RE AWESOME! 🌟</div>
        </div>
      </div>
      
      {/* Super Exciting Celebration Particles */}
      <div className="absolute top-1/4 left-1/4 text-6xl animate-confetti-fall">🎊</div>
      <div className="absolute top-1/4 right-1/4 text-6xl animate-milestone-burst" style={{ animationDelay: '0.3s' }}>🎉</div>
      <div className="absolute bottom-1/4 left-1/4 text-6xl animate-celebration-explosion" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="absolute bottom-1/4 right-1/4 text-6xl animate-confetti-shake" style={{ animationDelay: '0.9s' }}>⭐</div>
      <div className="absolute top-1/2 left-1/8 text-5xl animate-rainbow-shift" style={{ animationDelay: '0.2s' }}>🌈</div>
      <div className="absolute top-1/2 right-1/8 text-5xl animate-sparkle-blue-pink" style={{ animationDelay: '0.7s' }}>💫</div>
      <div className="absolute top-1/3 left-1/2 text-5xl animate-celebration-explosion" style={{ animationDelay: '0.4s' }}>🦄</div>
      <div className="absolute bottom-1/3 right-1/2 text-5xl animate-milestone-burst" style={{ animationDelay: '1.1s' }}>🎪</div>
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
    <div className="w-full z-40">
      {/* Mobile-optimized score display */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-3xl p-6 shadow-2xl animate-magical-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white animate-bounce">🏆 SID&apos;S SCORE 🏆</div>
            <div className={`text-7xl font-black text-white text-shadow-lg ${isAnimating ? 'animate-bounce' : 'animate-pulse'}`}>
              {score}
            </div>
            <div className="text-lg font-bold text-white animate-pulse">AWESOME!</div>
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

// Special Confetti Overlay Component for Major Milestones
const ConfettiOverlay = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {/* Falling confetti pieces */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl animate-confetti-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {['🎊', '🎉', '✨', '⭐', '🌟', '💫', '🎈', '🎁'][Math.floor(Math.random() * 8)]}
        </div>
      ))}
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
  const [showConfettiOverlay, setShowConfettiOverlay] = useState(false);

  const animalData = useMemo((): Omit<Animal, 'id' | 'x' | 'y'>[] => [
    { name: 'Lion', emoji: '🦁', sound: 'roar', color: '' },
    { name: 'Elephant', emoji: '🐘', sound: 'trumpet', color: '' },
    { name: 'Giraffe', emoji: '🦒', sound: 'munch', color: '' },
    { name: 'Monkey', emoji: '🐒', sound: 'ooh ooh', color: '' },
    { name: 'Penguin', emoji: '🐧', sound: 'waddle', color: '' },
    { name: 'Dinosaur', emoji: '🦕', sound: 'rawr', color: '' },
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
    const maxHeight = (windowSize.height || 600) - 200; // Less height restriction for better spacing
    const minY = 120; // Adjust for scoreboard at top
    
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
    setScore(prev => {
      const newScore = prev + 1;
      
      // Trigger confetti for overall score milestones
      if (newScore % 25 === 0) {
        triggerConfetti('fireworks');
        setShowConfettiOverlay(true);
        setTimeout(() => setShowConfettiOverlay(false), 4000);
      } else if (newScore % 10 === 0) {
        triggerConfetti('rainbow');
      } else if (newScore % 5 === 0) {
        triggerConfetti('milestone');
      }
      
      return newScore;
    });
    
    // Update individual animal count
    setAnimalCounts(prev => {
      const newCount = (prev[animal.name] || 0) + 1;
      const updatedCounts = { ...prev, [animal.name]: newCount };
      
      // Check for milestone celebrations with confetti
      if (newCount % 5 === 0) {
        setCelebrating(animal.name);
        // Trigger appropriate confetti based on milestone
        triggerMilestoneConfetti(newCount);
        
        // Special continuous confetti for major milestones
        if (newCount % 25 === 0) {
          triggerContinuousConfetti(2000);
          setShowConfettiOverlay(true);
          setTimeout(() => setShowConfettiOverlay(false), 3000);
        }
        
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
              // Add super fun pop animation
        element.classList.add('animate-pop');
        element.style.transform = 'scale(2.5) rotate(360deg)';
        element.style.opacity = '0';
        element.style.filter = 'hue-rotate(360deg)';
      
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
        
        // Add exciting entrance animation
        setTimeout(() => {
          const newElement = document.getElementById(`animal-${animal.id}`);
          if (newElement) {
            newElement.classList.add('animate-fade-in');
            newElement.style.transform = 'scale(0) rotate(-360deg)';
            newElement.style.animation = 'fadeIn 0.8s ease-out forwards, bounce 1s ease-out 0.3s';
          }
        }, 50);
      }, 300);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-300 via-blue-300 via-pink-400 to-blue-400 relative overflow-hidden fixed inset-0">
      {/* White transparent background container */}
      <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-3xl border-4 border-white/30 shadow-2xl">
              {/* Scoreboard at the top - no reading needed! */}
        <div className="pt-6 px-4 z-30 relative">
          <CornerScore score={score} animalCounts={animalCounts} />
        </div>

      {/* Confetti Overlay for Major Milestones */}
      <ConfettiOverlay isActive={showConfettiOverlay} />

      {/* Mobile Animal Celebration */}
      {celebrating && (
        <AnimalCelebration 
          animalName={celebrating} 
          count={animalCounts[celebrating]} 
          emoji={animalData.find(animal => animal.name === celebrating)?.emoji || '🎉'} 
        />
      )}

      {/* Mobile-Optimized Animal Friends */}
      <div className="relative w-full h-full pt-8">
        {animals.map((animal) => (
          <div
            key={animal.id}
            id={`animal-${animal.id}`}
            className={`absolute cursor-pointer transition-all duration-300 hover:scale-150 active:scale-75 text-9xl animate-float ${
              playingSound === animal.id ? 'animate-celebration-bounce scale-150 animate-rainbow-shift' : ''
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

      {/* Super Fun Floating Decorations */}
      <div className="absolute top-24 left-4 text-5xl animate-bounce">🎈</div>
      <div className="absolute top-28 right-4 text-5xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-7xl animate-pulse">🎂</div>
      
      {/* Playful Floating Friends */}
      <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce">🌈</div>
      <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce" style={{ animationDelay: '1s' }}>🎪</div>
      <div className="absolute top-1/2 left-1/6 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎭</div>
      <div className="absolute top-2/3 right-1/6 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎨</div>
      <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce" style={{ animationDelay: '0.8s' }}>🎵</div>
      <div className="absolute bottom-1/4 right-1/3 text-4xl animate-bounce" style={{ animationDelay: '1.2s' }}>🎊</div>
      
      {/* Extra Fun Elements */}
      <div className="absolute top-1/5 left-1/2 text-4xl animate-spin-slow">🌟</div>
             <div className="absolute bottom-1/5 left-1/8 text-4xl animate-pulse">🎉</div>
       <div className="absolute bottom-1/5 right-1/8 text-4xl animate-bounce">✨</div>
      </div>
    </div>
  );
}
