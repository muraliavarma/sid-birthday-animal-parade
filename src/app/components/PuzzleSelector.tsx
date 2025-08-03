import { PuzzleConfig } from '../types';

interface PuzzleSelectorProps {
  puzzleConfigs: PuzzleConfig[];
  selectedPuzzle: PuzzleConfig;
  onPuzzleChange: (puzzle: PuzzleConfig) => void;
}

export const PuzzleSelector = ({ puzzleConfigs, selectedPuzzle, onPuzzleChange }: PuzzleSelectorProps) => {
  return (
    <div className="mb-2 flex gap-3 justify-center">
      {puzzleConfigs.map((puzzle) => (
        <button
          key={puzzle.id}
          onClick={() => onPuzzleChange(puzzle)}
          className={`text-4xl p-3 rounded-full transition-all duration-200 ${
            selectedPuzzle.id === puzzle.id
              ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-lg scale-110'
              : 'bg-white/80 hover:bg-white shadow-md hover:scale-105'
          }`}
        >
          {puzzle.icon}
        </button>
      ))}
    </div>
  );
}; 