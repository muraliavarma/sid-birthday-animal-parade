'use client';

import { useEffect, useState } from 'react';

interface CompletionModalProps {
  puzzleName: string;
  onPlayAgain: () => void;
  isVisible: boolean;
}

export const CompletionModal = ({ puzzleName, onPlayAgain, isVisible }: CompletionModalProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);

  useEffect(() => {
    if (isVisible) {
      // Stagger the animations
      setTimeout(() => setShowContent(true), 300);
      setTimeout(() => setShowButton(true), 800);
      
      // Create floating celebration particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['🎈', '🎊', '🎉', '✨', '🌟', '🏆', '🎯', '🏅', '💫', '⭐'][Math.floor(Math.random() * 10)]
      }));
      setParticles(newParticles);
    } else {
      setShowContent(false);
      setShowButton(false);
      setParticles([]);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      {/* Floating celebration particles - behind the modal */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-5xl animate-celebration-bounce pointer-events-none z-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <div className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 p-8 rounded-3xl text-center shadow-2xl mx-4 animate-bounce-in relative z-20">
        {/* Floating celebration elements */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎈</div>
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
        <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</div>
        <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>✨</div>
        
        {/* Main content with staggered animation */}
        <div className={`transform transition-all duration-700 ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            🎉 Amazing Job, Sid! 🎉
          </h2>
          
          <div className="text-2xl mb-2 animate-bounce">🏆</div>
          
          <p className="text-xl text-white mb-6 font-semibold animate-fade-in-up">
            You completed the {puzzleName.toLowerCase()} puzzle!
          </p>
          
          <div className="flex justify-center space-x-2 mb-6">
            <span className="text-2xl animate-spin" style={{ animationDuration: '2s' }}>🌟</span>
            <span className="text-2xl animate-pulse">🎯</span>
            <span className="text-2xl animate-bounce">🏅</span>
          </div>
          
          {/* Additional celebration text */}
          <div className="text-lg text-white/90 mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            You&apos;re a puzzle master! 🧩✨
          </div>
        </div>

        {/* Button with delayed animation - made more visible */}
        <div className={`transform transition-all duration-500 ${showButton ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <button
            onClick={onPlayAgain}
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-2 border-4 border-orange-400"
          >
            Play Again! 🧩
          </button>
        </div>
      </div>
    </div>
  );
}; 