import { useDroppable } from '@dnd-kit/core';
import { PuzzlePiece } from '../types';
import { DraggablePuzzlePiece } from './PuzzlePiece';

interface DroppablePuzzleAreaProps {
  pieces: PuzzlePiece[];
  puzzleImage: string;
  bgColor: string;
  isComplete?: boolean;
}

function DropZone({ position, piece, puzzleImage }: { 
  position: number; 
  piece?: PuzzlePiece; 
  puzzleImage: string; 
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-zone-${position}`,
  });

  // Check if the piece is in the correct position
  const isCorrectPosition = piece && piece.id === position;

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-full border border-dashed border-amber-400/50 flex items-center justify-center transition-colors ${
        piece 
          ? isCorrectPosition 
            ? 'border-green-500 bg-green-200/50' // Correct placement
            : 'border-red-500 bg-red-200/50'     // Wrong placement
          : isOver 
            ? 'border-green-500 bg-green-200/50' 
            : 'border-amber-400/50 bg-amber-200/20'
      }`}
    >
      {piece ? (
        <DraggablePuzzlePiece piece={piece} puzzleImage={puzzleImage} />
      ) : (
        <div className="text-amber-600/50 text-xs font-medium">
          {position + 1}
        </div>
      )}
    </div>
  );
}

export function DroppablePuzzleArea({ pieces, puzzleImage, bgColor, isComplete = false }: DroppablePuzzleAreaProps) {
  return (
    <div 
      className={`puzzle-area w-72 h-72 bg-gradient-to-br ${bgColor} rounded-xl transition-all duration-1000 ${
        isComplete 
          ? 'shadow-2xl shadow-yellow-400/50 animate-pulse' 
          : 'shadow-lg'
      }`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '0',
        ...(isComplete && {
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3)',
        })
      }}
    >
      {Array.from({ length: 9 }, (_, i) => {
        const piece = pieces.find(p => p.position === i && p.isPlaced);
        return (
          <DropZone 
            key={i}
            position={i}
            piece={piece}
            puzzleImage={puzzleImage}
          />
        );
      })}
    </div>
  );
} 