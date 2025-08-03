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
      className={`w-full h-full border border-dashed flex items-center justify-center transition-all duration-300 box-border ${
        piece 
          ? isCorrectPosition 
            ? 'border-green-500 bg-green-200/40 shadow-sm shadow-green-400/20' // Correct placement - subtle
            : 'border-red-600 bg-red-300/90 shadow-xl shadow-red-400/60 animate-incorrect-glow animate-placement-shake'     // Wrong placement - very prominent
          : isOver 
            ? 'border-green-500 bg-green-200/30 shadow-sm shadow-green-400/20' 
            : 'border-amber-300/30 bg-amber-100/10'
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
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gap: '0',
        padding: '0',
        boxSizing: 'border-box',
        ...(isComplete && {
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3)',
        })
      }}
    >
      {Array.from({ length: 16 }, (_, i) => {
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