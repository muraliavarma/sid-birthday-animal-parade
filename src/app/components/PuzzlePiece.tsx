import {
  useDraggable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { PuzzlePiece as PuzzlePieceType } from '../types';

interface DraggablePuzzlePieceProps {
  piece: PuzzlePieceType;
  puzzleImage: string;
}

export function DraggablePuzzlePiece({ piece, puzzleImage }: DraggablePuzzlePieceProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: piece.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 1000 : piece.isPlaced ? 1 : 10,
  };

  const getPieceContent = () => {
    const row = Math.floor(piece.id / 3);
    const col = piece.id % 3;
    
    return (
      <div 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${puzzleImage})`,
          backgroundSize: '300px 300px',
          backgroundPosition: `-${col * 100}px -${row * 100}px`,
          border: piece.isPlaced ? 'none' : '2px solid #6B7280',
          borderRadius: '8px',
          cursor: piece.isPlaced ? 'default' : 'grab',
          boxShadow: piece.isPlaced ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: piece.isPlaced ? 'all 0.3s ease' : 'none',
          opacity: isDragging ? 0.5 : 1,
        }}
      />
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=""
    >
      <div
        style={{
          width: '100px',
          height: '100px',
        }}
      >
        {getPieceContent()}
      </div>
    </div>
  );
} 