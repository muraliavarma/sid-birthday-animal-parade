import { PuzzleConfig } from '../types';

interface PuzzleSelectorProps {
  puzzleConfigs: PuzzleConfig[];
  selectedPuzzle: PuzzleConfig;
  onPuzzleChange: (puzzle: PuzzleConfig) => void;
}

export function PuzzleSelector({ puzzleConfigs, selectedPuzzle, onPuzzleChange }: PuzzleSelectorProps) {
  return (
    <div className="mb-4">
      <div className="text-center text-2xl font-bold text-purple-800 mb-2">
        {selectedPuzzle.name}
      </div>
      <div className="flex gap-2 justify-center">
        {puzzleConfigs.map(puzzle => (
          <button
            key={puzzle.id}
            onClick={() => onPuzzleChange(puzzle)}
            className={`p-2 rounded-lg transition-colors ${
              selectedPuzzle.id === puzzle.id
                ? 'bg-purple-500 text-white'
                : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
            }`}
          >
            {puzzle.icon}
          </button>
        ))}
      </div>
    </div>
  );
} 