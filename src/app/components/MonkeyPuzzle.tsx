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
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  isPlaced: boolean;
}

// Use the actual monkey.jpg file
const MONKEY_IMAGE = "/images/monkey.jpg";

function DraggablePuzzlePiece({ piece }: { piece: PuzzlePiece }) {
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
          backgroundImage: `url(${MONKEY_IMAGE})`,
          backgroundSize: '300px 300px',
          backgroundPosition: `-${col * 100}px -${row * 100}px`,
          border: piece.isPlaced ? '3px solid #22C55E' : '2px solid #6B7280',
          borderRadius: '8px',
          cursor: piece.isPlaced ? 'default' : 'grab',
          boxShadow: piece.isPlaced ? '0 4px 12px rgba(34, 197, 94, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
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
      className={`${piece.isPlaced ? 'animate-pulse' : 'hover:scale-105'}`}
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

function DroppablePuzzleArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: 'puzzle-area',
  });

  return (
    <div ref={setNodeRef} className="puzzle-area relative w-[300px] h-[300px] bg-gradient-to-br from-amber-100 to-orange-200 rounded-xl border-4 border-amber-300">
      {children}
    </div>
  );
}

export default function MonkeyPuzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

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
    // Track the initial mouse position
    setMousePosition({ x: 0, y: 0 });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('Drag end event:', { active: active.id, over: over?.id });
    setActiveId(null);

    const activePiece = pieces.find(p => p.id === active.id);
    if (!activePiece) {
      console.log('Active piece not found');
      return;
    }

    // Check if dropped on puzzle area using @dnd-kit's over detection
    if (over?.id === 'puzzle-area') {
      console.log('Piece dropped on puzzle area! Placing in correct position.');
      
      // Place the piece in its correct position within the puzzle area
      setPieces(prev => prev.map(p => 
        p.id === active.id 
          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true }
          : p
      ));
    } else {
      console.log('Not dropped on puzzle area. Over:', over?.id);
      
      // Fallback: check if mouse is over puzzle area
      const puzzleArea = document.querySelector('.puzzle-area');
      if (puzzleArea) {
        const puzzleRect = puzzleArea.getBoundingClientRect();
        const mouseEvent = event.activatorEvent as MouseEvent;
        const mouseX = mouseEvent?.clientX || 0;
        const mouseY = mouseEvent?.clientY || 0;
        
        const tolerance = 50;
        const isOverPuzzleArea = 
          mouseX >= puzzleRect.left - tolerance && mouseX <= puzzleRect.right + tolerance &&
          mouseY >= puzzleRect.top - tolerance && mouseY <= puzzleRect.bottom + tolerance;
        
        console.log('Fallback check - Mouse over puzzle area:', isOverPuzzleArea);
        
        if (isOverPuzzleArea) {
          console.log('Fallback: Placing piece in correct position.');
          setPieces(prev => prev.map(p => 
            p.id === active.id 
              ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true }
              : p
          ));
        }
      }
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
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Puzzle Area */}
        <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <DroppablePuzzleArea>
            {/* Correct positions grid */}
            {pieces.map(piece => (
              <div
                key={`target-${piece.id}`}
                className="absolute border-2 border-dashed border-amber-400/50 rounded-lg bg-amber-200/20"
                style={{
                  left: piece.correctX,
                  top: piece.correctY,
                  width: '100px',
                  height: '100px',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs text-amber-600 font-bold">
                  {piece.id}
                </div>
              </div>
            ))}
            
            {/* Placed pieces */}
            {pieces.filter(p => p.isPlaced).map(piece => (
              <div
                key={`placed-${piece.id}`}
                style={{
                  position: 'absolute',
                  left: piece.correctX,
                  top: piece.correctY,
                  width: '100px',
                  height: '100px',
                }}
              >
                <DraggablePuzzlePiece piece={piece} />
              </div>
            ))}
          </DroppablePuzzleArea>
        </div>

        {/* Draggable Pieces */}
        <div className="relative w-full h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl p-4">
          {pieces.filter(p => !p.isPlaced).map(piece => (
            <div
              key={piece.id}
              data-piece-id={piece.id}
              style={{
                position: 'absolute',
                left: piece.x,
                top: piece.y,
              }}
            >
              <DraggablePuzzlePiece piece={piece} />
            </div>
          ))}
        </div>
        
        <DragOverlay>
          {activeId ? (
            <div style={{ width: '100px', height: '100px', transform: 'scale(1)' }}>
              <DraggablePuzzlePiece piece={pieces.find(p => p.id === activeId)!} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

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