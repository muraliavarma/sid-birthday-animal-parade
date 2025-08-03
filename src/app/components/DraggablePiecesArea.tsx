import { useDroppable } from '@dnd-kit/core';
import { PuzzlePiece } from '../types';
import { DraggablePuzzlePiece } from './PuzzlePiece';
import { useEffect, useState } from 'react';

interface DraggablePiecesAreaProps {
  pieces: PuzzlePiece[];
  puzzleImage: string;
}

interface RandomPosition {
  x: number;
  y: number;
  rotation: number;
}

export function DraggablePiecesArea({ pieces, puzzleImage }: DraggablePiecesAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'draggable-area',
  });

  const unplacedPieces = pieces.filter(p => !p.isPlaced);
  const [randomPositions, setRandomPositions] = useState<RandomPosition[]>([]);

  // Generate random positions for pieces - more spread out but oriented properly
  useEffect(() => {
    const positions = unplacedPieces.map(() => ({
      x: Math.random() * 200 - 100, // Random x position between -100 and 100
      y: Math.random() * 120 - 60,  // Random y position between -60 and 60
      rotation: Math.random() * 40 - 20, // Small random rotation between -20 and 20 degrees
    }));
    setRandomPositions(positions);
  }, [unplacedPieces.length]);

  return (
    <div 
      ref={setNodeRef}
      className={`w-full h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl p-6 transition-colors relative overflow-hidden ${
        isOver ? 'bg-gradient-to-br from-pink-300 to-purple-300' : ''
      }`}
    >
      <div className="text-center text-purple-800 font-semibold mb-4 text-lg">
        Drag pieces to the puzzle above
      </div>
      
      <div className="relative w-full h-40">
        {unplacedPieces.map((piece, index) => {
          const position = randomPositions[index] || { x: 0, y: 0, rotation: 0 };
          return (
            <div 
              key={piece.id}
              className="absolute"
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
                transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
                zIndex: Math.floor(Math.random() * 5),
              }}
            >
              <DraggablePuzzlePiece piece={piece} puzzleImage={puzzleImage} />
            </div>
          );
        })}
      </div>
    </div>
  );
} 