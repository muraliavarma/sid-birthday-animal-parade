import { useDroppable } from '@dnd-kit/core';
import { PuzzlePiece } from '../types';
import { DraggablePuzzlePiece } from './PuzzlePiece';

interface DraggablePiecesAreaProps {
  pieces: PuzzlePiece[];
  puzzleImage: string;
}

export function DraggablePiecesArea({ pieces, puzzleImage }: DraggablePiecesAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'draggable-area',
  });

  const unplacedPieces = pieces.filter(p => !p.isPlaced);

  return (
    <div 
      ref={setNodeRef}
      className={`w-full h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl p-4 transition-colors ${
        isOver ? 'bg-gradient-to-br from-pink-300 to-purple-300' : ''
      }`}
    >
      <div className="text-center text-purple-800 font-semibold mb-2">
        Drag pieces to the puzzle above
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {unplacedPieces.map(piece => (
          <div key={piece.id}>
            <DraggablePuzzlePiece piece={piece} puzzleImage={puzzleImage} />
          </div>
        ))}
      </div>
    </div>
  );
} 