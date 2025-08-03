import { FloatingAnimals } from './FloatingAnimals';
import { ConfettiComponent } from './Confetti';
import { Dimensions } from '../types';
import GenericPuzzle from './GenericPuzzle';

interface GameScreenProps {
  dimensions: Dimensions;
  confettiActive: boolean;
  onBackToHome: () => void;
}

export const GameScreen = ({ dimensions, confettiActive, onBackToHome }: GameScreenProps) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-pink-400 to-blue-500 overflow-hidden relative">
      {/* Confetti */}
      <ConfettiComponent dimensions={dimensions} isActive={confettiActive} />

      {/* Floating Animals */}
      <FloatingAnimals size="small" />

      {/* Back Button */}
      <button
        onClick={onBackToHome}
        className="absolute top-2 left-2 text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-3 py-1 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-white/50 z-10"
      >
        ↩️
      </button>

      {/* Puzzle Component */}
      <div className="w-full h-full flex items-start justify-center pt-0">
        <GenericPuzzle />
      </div>
    </div>
  );
}; 