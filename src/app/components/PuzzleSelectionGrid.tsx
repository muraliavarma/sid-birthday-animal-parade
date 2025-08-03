'use client';

import { PuzzleConfigWithStatus } from '../types';

interface PuzzleSelectionGridProps {
  puzzles: PuzzleConfigWithStatus[];
  onPuzzleSelect: (puzzle: PuzzleConfigWithStatus) => void;
  currentPuzzleId: string;
}

export const PuzzleSelectionGrid = ({ puzzles, onPuzzleSelect, currentPuzzleId }: PuzzleSelectionGridProps) => {
  // Sort puzzles: uncompleted first, then completed, but keep current puzzle at the top
  const sortedPuzzles = [...puzzles].sort((a, b) => {
    // Current puzzle always comes first
    if (a.id === currentPuzzleId) return -1;
    if (b.id === currentPuzzleId) return 1;
    
    // Then uncompleted puzzles
    if (!a.isCompleted && b.isCompleted) return -1;
    if (a.isCompleted && !b.isCompleted) return 1;
    
    // Finally, sort by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mt-3">
      <h3 className="text-lg font-semibold text-white mb-2 text-center">
        Try Another Puzzle! 🧩
      </h3>
      
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {sortedPuzzles.map((puzzle) => (
          <button
            key={puzzle.id}
            onClick={() => onPuzzleSelect(puzzle)}
            className={`
              relative p-2 rounded-xl transition-all duration-300 transform hover:scale-105
              ${puzzle.isCompleted 
                ? 'bg-gradient-to-br from-green-200 to-green-400 shadow-lg' 
                : 'bg-gradient-to-br from-blue-200 to-purple-400 shadow-lg hover:shadow-xl'
              }
              ${puzzle.id === currentPuzzleId 
                ? 'ring-4 ring-yellow-400 ring-opacity-75 scale-110' 
                : ''
              }
            `}
          >
            {/* Completion indicator */}
            {puzzle.isCompleted && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
                ✓
              </div>
            )}
            
            {/* Puzzle icon */}
            <div className="text-lg mb-1">{puzzle.icon}</div>
            
            {/* Puzzle name */}
            <div className={`text-xs font-bold ${puzzle.isCompleted ? 'text-green-800' : 'text-blue-800'}`}>
              {puzzle.name}
            </div>
            
            {/* Status text */}
            <div className={`text-xs ${puzzle.isCompleted ? 'text-green-700' : 'text-blue-700'}`}>
              {puzzle.isCompleted ? 'Completed!' : 'Try this!'}
            </div>
          </button>
        ))}
      </div>
      
      {/* Summary text */}
      <div className="text-center mt-2 text-white/90 text-sm">
        {sortedPuzzles.filter(p => !p.isCompleted).length > 0 ? (
          <span>
            {sortedPuzzles.filter(p => !p.isCompleted).length} more puzzle{sortedPuzzles.filter(p => !p.isCompleted).length !== 1 ? 's' : ''} to complete! 🎯
          </span>
        ) : (
          <span className="text-yellow-200 font-bold">
            🏆 All puzzles completed! You&apos;re a master! 🏆
          </span>
        )}
      </div>
    </div>
  );
}; 