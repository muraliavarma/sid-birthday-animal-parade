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

interface PuzzleConfig {
  id: string;
  name: string;
  image: string;
  color: string;
  icon: string;
}

const PUZZLE_CONFIGS: PuzzleConfig[] = [
  {
    id: 'monkey',
    name: 'Monkey',
    image: '/images/monkey.jpg',
    color: 'from-amber-100 to-orange-200',
    icon: '🐵'
  },
  {
    id: 'lion',
    name: 'Lion',
    image: '/images/lion.jpg',
    color: 'from-yellow-100 to-orange-200',
    icon: '🦁'
  }
];

function DraggablePuzzlePiece({ piece, puzzleImage }: { piece: PuzzlePiece; puzzleImage: string }) {
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

function DroppablePuzzleArea({ children, bgColor }: { children: React.ReactNode; bgColor: string }) {
  const { setNodeRef } = useDroppable({
    id: 'puzzle-area',
  });

  return (
    <div ref={setNodeRef} className={`puzzle-area relative w-[300px] h-[300px] bg-gradient-to-br ${bgColor} rounded-xl border-4 border-amber-300`}>
      {children}
    </div>
  );
}

export default function GenericPuzzle() {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleConfig>(PUZZLE_CONFIGS[0]);
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
  }, [selectedPuzzle]);

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
    setIsComplete(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
    // Track the initial mouse position
    setMousePosition({ x: 0, y: 0 });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    const activePiece = pieces.find(p => p.id === active.id);
    if (!activePiece) {
      return;
    }

    // Check if dropped on puzzle area using @dnd-kit's over detection
    if (over?.id === 'puzzle-area') {
      // Place the piece in its correct position within the puzzle area
      setPieces(prev => prev.map(p => 
        p.id === active.id 
          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true }
          : p
      ));
    } else {
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
        
        if (isOverPuzzleArea) {
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

  const handlePuzzleChange = (puzzle: PuzzleConfig) => {
    setSelectedPuzzle(puzzle);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-4">
      {/* Puzzle Selector */}
      <div className="mb-2 flex gap-3 justify-center">
        {PUZZLE_CONFIGS.map((puzzle) => (
          <button
            key={puzzle.id}
            onClick={() => handlePuzzleChange(puzzle)}
            className={`text-4xl p-3 rounded-full transition-all duration-200 ${
              selectedPuzzle.id === puzzle.id
                ? 'bg-gradient-to-r from-orange-400 to-red-500 shadow-lg scale-110'
                : 'bg-white/80 hover:bg-white shadow-md hover:scale-105'
            }`}
          >
            {puzzle.icon}
          </button>
        ))}
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >

        {/* Puzzle Area */}
        <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-2">
          <DroppablePuzzleArea bgColor={selectedPuzzle.color}>
            {/* Correct positions grid */}
            {pieces.map(piece => (
              <div
                key={`target-${piece.id}`}
                className="absolute border-2 border-dashed border-amber-400/50 bg-amber-200/20"
                style={{
                  left: piece.correctX,
                  top: piece.correctY,
                  width: '100px',
                  height: '100px',
                  borderRadius: '8px',
                }}
              />
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
                <DraggablePuzzlePiece piece={piece} puzzleImage={selectedPuzzle.image} />
              </div>
            ))}
          </DroppablePuzzleArea>
        </div>

        {/* Draggable Pieces */}
        <div className="relative w-full h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl p-4">
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
              <DraggablePuzzlePiece piece={piece} puzzleImage={selectedPuzzle.image} />
            </div>
          ))}
        </div>
        
        <DragOverlay>
          {activeId ? (
            <div style={{ width: '100px', height: '100px', transform: 'scale(1)' }}>
              <DraggablePuzzlePiece piece={pieces.find(p => p.id === activeId)!} puzzleImage={selectedPuzzle.image} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Completion Message */}
      {isComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-6 rounded-2xl text-center shadow-2xl mx-4">
            <h2 className="text-2xl font-bold text-white mb-3">🎉 Amazing Job, Sid! 🎉</h2>
            <p className="text-lg text-white mb-4">You completed the {selectedPuzzle.name.toLowerCase()} puzzle!</p>
            <button
              onClick={resetPuzzle}
              className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition-colors"
            >
              Play Again! 🧩
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 