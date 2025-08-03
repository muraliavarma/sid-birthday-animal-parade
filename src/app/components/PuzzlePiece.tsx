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
    zIndex: isDragging ? 1000 : 10,
  };

  const getPieceContent = () => {
    const row = Math.floor(piece.id / 4);
    const col = piece.id % 4;
    
    return (
      <div 
        className="w-full h-full rounded-lg overflow-hidden box-border"
        style={{
          backgroundImage: `url(${puzzleImage})`,
          backgroundSize: '288px 288px',
          backgroundPosition: `-${col * 72}px -${row * 72}px`,
          border: '2px solid #6B7280',
          borderRadius: '8px',
          cursor: 'grab',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          opacity: isDragging ? 0.5 : 1,
          boxSizing: 'border-box',
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
      className="w-full h-full"
    >
      {getPieceContent()}
    </div>
  );
} 