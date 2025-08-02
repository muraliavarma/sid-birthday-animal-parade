'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  isPlaced: boolean;
}

function SortablePuzzlePiece({ piece }: { piece: PuzzlePiece }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: piece.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : piece.isPlaced ? 1 : 10,
  };

  const getPieceContent = () => {
    const row = Math.floor(piece.id / 3);
    const col = piece.id % 3;
    
    // Create a simple monkey face using CSS
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-300 to-orange-400 rounded-lg relative overflow-hidden">
        {/* Monkey face elements based on position */}
        {row === 0 && col === 1 && (
          <>
            {/* Top center - forehead */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-amber-200 rounded-full"></div>
          </>
        )}
        {row === 1 && col === 1 && (
          <>
            {/* Center - main face */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-300 rounded-full border-2 border-orange-500"></div>
            {/* Eyes */}
            <div className="absolute top-8 left-6 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute top-8 right-6 w-3 h-3 bg-black rounded-full"></div>
            {/* Nose */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>
            {/* Mouth */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-black rounded-full"></div>
          </>
        )}
        {row === 2 && col === 1 && (
          <>
            {/* Bottom center - chin */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-amber-200 rounded-full"></div>
          </>
        )}
        {/* Ears */}
        {(row === 0 && col === 0) && (
          <div className="absolute top-2 left-2 w-8 h-8 bg-amber-400 rounded-full border border-orange-500"></div>
        )}
        {(row === 0 && col === 2) && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-amber-400 rounded-full border border-orange-500"></div>
        )}
        {/* Cheeks */}
        {(row === 1 && col === 0) && (
          <div className="absolute top-8 left-2 w-6 h-6 bg-pink-200 rounded-full"></div>
        )}
        {(row === 1 && col === 2) && (
          <div className="absolute top-8 right-2 w-6 h-6 bg-pink-200 rounded-full"></div>
        )}
        {/* Body parts */}
        {(row === 2 && col === 0) && (
          <div className="absolute bottom-2 left-2 w-8 h-8 bg-amber-300 rounded-full"></div>
        )}
        {(row === 2 && col === 2) && (
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-amber-300 rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${piece.isPlaced ? 'animate-pulse' : 'hover:scale-105'}`}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          border: piece.isPlaced ? '3px solid #22C55E' : '2px solid #6B7280',
          borderRadius: '8px',
          cursor: piece.isPlaced ? 'default' : 'grab',
          boxShadow: piece.isPlaced ? '0 4px 12px rgba(34, 197, 94, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
          transition: piece.isPlaced ? 'all 0.3s ease' : 'none',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {getPieceContent()}
      </div>
    </div>
  );
}

export default function MonkeyPuzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    initializePuzzle();
    setStartTime(new Date());
  }, []);

  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = [];
    const gridSize = 3;
    const pieceSize = 100;
    
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const correctX = col * pieceSize;
      const correctY = row * pieceSize;
      
      // Random starting positions around the puzzle area
      const randomX = Math.random() * 200 + 50;
      const randomY = Math.random() * 200 + 50;
      
      newPieces.push({
        id: i,
        x: randomX,
        y: randomY,
        correctX,
        correctY,
        isPlaced: false
      });
    }
    
    setPieces(newPieces);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activePiece = pieces.find(p => p.id === active.id);
    if (!activePiece) return;

    // Check if piece is near correct position
    const tolerance = 30;
    const isCorrectPosition = 
      Math.abs(activePiece.x - activePiece.correctX) < tolerance && 
      Math.abs(activePiece.y - activePiece.correctY) < tolerance;

    if (isCorrectPosition) {
      setPieces(prev => prev.map(p => 
        p.id === active.id 
          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true }
          : p
      ));
    }
  };

  useEffect(() => {
    const allPlaced = pieces.every(p => p.isPlaced);
    if (allPlaced && pieces.length > 0) {
      setIsComplete(true);
    }
  }, [pieces]);

  const resetPuzzle = () => {
    setIsComplete(false);
    initializePuzzle();
    setStartTime(new Date());
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Puzzle Area */}
      <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <div className="relative w-[300px] h-[300px] bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl border-4 border-amber-300">
          {/* Correct positions grid */}
          {pieces.map(piece => (
            <div
              key={`target-${piece.id}`}
              className="absolute border-2 border-dashed border-amber-400/50 rounded-lg"
              style={{
                left: piece.correctX,
                top: piece.correctY,
                width: '100px',
                height: '100px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Draggable Pieces */}
      <div className="relative w-full h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl p-4">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={pieces.map(p => p.id)}>
            {pieces.map(piece => (
              <div
                key={piece.id}
                style={{
                  position: 'absolute',
                  left: piece.x,
                  top: piece.y,
                }}
              >
                <SortablePuzzlePiece piece={piece} />
              </div>
            ))}
          </SortableContext>
          
          <DragOverlay>
            {activeId ? (
              <div style={{ width: '100px', height: '100px' }}>
                <SortablePuzzlePiece piece={pieces.find(p => p.id === activeId)!} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-8 rounded-2xl text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">🎉 Amazing Job, Sid! 🎉</h2>
            <p className="text-xl text-white mb-6">You completed the monkey puzzle!</p>
            <button
              onClick={resetPuzzle}
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-bold hover:bg-orange-100 transition-colors"
            >
              Play Again! 🐒
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-white/90">
        <p className="text-lg font-semibold">🐒 Drag the puzzle pieces to complete the monkey!</p>
        <p className="text-sm opacity-75">Tap and drag on mobile, click and drag on desktop</p>
      </div>
    </div>
  );
} 