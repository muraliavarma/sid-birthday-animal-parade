import { PuzzleConfig } from '../types';
import { useCompletedPuzzles } from '../contexts/CompletedPuzzlesContext';

interface PuzzleSelectorProps {
  selectedPuzzle: PuzzleConfig;
  onPuzzleChange: (puzzle: PuzzleConfig) => void;
}

export function PuzzleSelector({ selectedPuzzle, onPuzzleChange }: PuzzleSelectorProps) {
  const { getAvailablePuzzles } = useCompletedPuzzles();
  const availablePuzzles = getAvailablePuzzles();

  // Sort puzzles: uncompleted first, then completed
  const sortedPuzzles = [...availablePuzzles].sort((a, b) => {
    // Uncompleted puzzles first
    if (!a.isCompleted && b.isCompleted) return -1;
    if (a.isCompleted && !b.isCompleted) return 1;
    
    // Then sort by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mb-3">
      <div className="text-center text-xl font-bold text-purple-800 mb-1">
        {selectedPuzzle.name}
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        {sortedPuzzles.map(puzzle => (
          <button
            key={puzzle.id}
            onClick={() => onPuzzleChange(puzzle)}
            className={`
              relative p-2 rounded-lg transition-all duration-300 transform hover:scale-110
              ${selectedPuzzle.id === puzzle.id
                ? 'bg-purple-500 text-white shadow-lg scale-110'
                : puzzle.isCompleted
                ? 'bg-green-200 text-green-800 hover:bg-green-300'
                : 'bg-purple-200 text-purple-800 hover:bg-purple-300'
              }
            `}
            title={`${puzzle.name} ${puzzle.isCompleted ? '(Completed)' : '(Not completed)'}`}
          >
            {/* Completion indicator */}
            {puzzle.isCompleted && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                ✓
              </div>
            )}
            
            <span 
              className="text-md"
              style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.4))' }}
            >
              {puzzle.icon}
            </span>
          </button>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="text-center mt-1 text-sm text-purple-700">
        {availablePuzzles.filter(p => p.isCompleted).length} of {availablePuzzles.length} completed
      </div>
    </div>
  );
} 