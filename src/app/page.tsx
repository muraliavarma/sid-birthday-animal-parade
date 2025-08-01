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

// Clean Navbar Score Component
const ScoreNavbar = ({ score, animalCounts, animalData }: { 
  score: number; 
  animalCounts: Record<string, number>;
  animalData: Omit<Animal, 'id' | 'x' | 'y'>[];
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(score);
  const [displayCounts, setDisplayCounts] = useState(animalCounts);
  
  // Update local state when props change
  useEffect(() => {
    setDisplayScore(score);
    if (score > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [score]);
  
  useEffect(() => {
    setDisplayCounts(animalCounts);
  }, [animalCounts]);
  
  // Force re-render when animalCounts change
  const totalAnimalsClicked = Object.values(displayCounts).reduce((sum, count) => sum + count, 0);
  const animalCountsString = JSON.stringify(displayCounts);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-pink-50 via-white to-blue-50 backdrop-blur-md shadow-lg border-b-2 border-pink-200/50 w-full">
      <div className="flex flex-col items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 w-full max-w-none">
        {/* Total Score - Enhanced and Prettier */}
        <div className="flex items-center gap-4 sm:gap-5 bg-gradient-to-r from-pink-200 via-white to-blue-200 rounded-3xl px-6 py-4 shadow-lg border-2 border-pink-300/40 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-100/50 to-blue-100/50 animate-pulse opacity-30"></div>
          
          <div className="relative z-10 flex items-center gap-4 sm:gap-5">
            <div className="text-4xl sm:text-5xl drop-shadow-lg animate-pulse">🏆</div>
            <div className="flex flex-col items-center">
              <div className="text-sm sm:text-base font-bold text-gray-800 mb-1">🎯 SID&apos;S TOTAL SCORE 🎯</div>
              <div className={`text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg transition-all duration-300 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                {displayScore} (Debug: {totalAnimalsClicked})
              </div>
            </div>
            
            {/* Achievement badges - enhanced */}
            <div className="flex gap-2 sm:gap-3">
              {score >= 5 && <span className="text-2xl sm:text-3xl animate-sparkle-blue-pink drop-shadow-lg">🌟</span>}
              {score >= 10 && <span className="text-2xl sm:text-3xl drop-shadow-lg">🏆</span>}
              {score >= 20 && <span className="text-2xl sm:text-3xl animate-rainbow-shift drop-shadow-lg">👑</span>}
              {score >= 30 && <span className="text-2xl sm:text-3xl animate-spin-slow drop-shadow-lg">🚀</span>}
            </div>
          </div>
        </div>
        
        {/* Individual Animal Counts - Enhanced and Centered */}
        <div className="flex justify-center items-center gap-4 sm:gap-5 w-full px-2 overflow-x-auto">
          {animalData.map((animal) => {
            const count = displayCounts[animal.name] || 0;
            const isActive = count > 0;
            return (
              <div key={animal.name} className="flex flex-col items-center gap-1 px-2 py-1 min-w-fit flex-shrink-0">
                <span className={`text-2xl sm:text-3xl transition-all duration-500 ${
                  isActive ? 'drop-shadow-lg scale-110' : 'opacity-60 scale-100'
                }`}>{animal.emoji}</span>
                <span className={`text-lg sm:text-xl font-black transition-all duration-300 ${
                  isActive 
                    ? 'text-transparent bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text drop-shadow-sm' 
                    : 'text-gray-400'
                }`}>{count}</span>
                <div className="text-xs text-red-500">Debug: {animalCountsString.includes(animal.name) ? 'Y' : 'N'}</div>
              </div>
            );
          })}
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
    const minY = 140; // Adjust for taller navbar at top
    
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
    console.log('Animal clicked:', animal.name);
    
    // Set visual feedback
    setPlayingSound(animal.id);
    
    // Play the animal sound
    playAnimalSound(animal.sound);
    
    // Update total score
    const newScore = score + 1;
    setScore(newScore);
    console.log('Score updated to:', newScore);
    
    // Update individual animal count
    const newCount = (animalCounts[animal.name] || 0) + 1;
    const updatedCounts = { ...animalCounts, [animal.name]: newCount };
    setAnimalCounts(updatedCounts);
    console.log('Animal counts updated:', updatedCounts);
    
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
        setAnimals(prev => {
          const currentAnimals = prev.filter(a => a.id !== animal.id);
          const newPosition = generateValidPosition(currentAnimals, 200);
          
          return [...currentAnimals, {
            ...animal,
            x: newPosition.x,
            y: newPosition.y,
          }];
        });
        
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
      {/* Clean Navbar */}
      <ScoreNavbar 
        score={score} 
        animalCounts={animalCounts} 
        animalData={animalData} 
      />

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
      <div className="relative w-full h-full pt-32">
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
  );
}
