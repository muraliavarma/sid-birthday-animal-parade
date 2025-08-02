'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { triggerConfetti } from '@/utils/confetti';

interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
  isPlaced: boolean;
  isDragging: boolean;
}

interface LevelData {
  id: number;
  name: string;
  animal: string;
  animalName: string;
  background: string;
  pieces: number;
  gridSize: { rows: number; cols: number };
}

const levelData: Record<number, LevelData> = {
  1: {
    id: 1,
    name: 'Jungle',
    animal: '🐒',
    animalName: 'Monkey',
    background: 'from-green-400 to-green-600',
    pieces: 4,
    gridSize: { rows: 2, cols: 2 }
  },
  2: {
    id: 2,
    name: 'Ocean',
    animal: '🐬',
    animalName: 'Dolphin',
    background: 'from-blue-400 to-blue-600',
    pieces: 6,
    gridSize: { rows: 2, cols: 3 }
  },
  3: {
    id: 3,
    name: 'Arctic',
    animal: '🐧',
    animalName: 'Penguin',
    background: 'from-cyan-400 to-cyan-600',
    pieces: 6,
    gridSize: { rows: 2, cols: 3 }
  },
  4: {
    id: 4,
    name: 'Safari',
    animal: '🦁',
    animalName: 'Lion',
    background: 'from-yellow-400 to-yellow-600',
    pieces: 6,
    gridSize: { rows: 2, cols: 3 }
  },
  5: {
    id: 5,
    name: 'Forest',
    animal: '🦊',
    animalName: 'Fox',
    background: 'from-orange-400 to-orange-600',
    pieces: 6,
    gridSize: { rows: 2, cols: 3 }
  }
};

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = parseInt(params.id as string);
  const level = levelData[levelId];
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [gameState, setGameState] = useState<any>({});
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Load game state
    const savedState = localStorage.getItem('birthdayAdventureState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }

    // Initialize puzzle pieces
    initializePuzzle();
  }, [levelId]);

  const initializePuzzle = () => {
    const pieces: PuzzlePiece[] = [];
    const { rows, cols } = level.gridSize;
    
    // Calculate grid positions
    const gridWidth = cols * 80 + (cols - 1) * 10;
    const gridHeight = rows * 80 + (rows - 1) * 10;
    const gridStartX = (window.innerWidth - gridWidth) / 2;
    const gridStartY = 200;
    
    for (let i = 0; i < level.pieces; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      pieces.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 400) + 300,
        correctX: gridStartX + col * 90,
        correctY: gridStartY + row * 90,
        isPlaced: false,
        isDragging: false
      });
    }
    
    setPuzzlePieces(pieces);
  };

  const handleTouchStart = (e: React.TouchEvent, pieceId: number) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setDraggedPiece(pieceId);
    
    setPuzzlePieces(prev => prev.map(piece => 
      piece.id === pieceId ? { ...piece, isDragging: true } : piece
    ));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedPiece || !touchStart) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    setPuzzlePieces(prev => prev.map(piece => 
      piece.id === draggedPiece 
        ? { ...piece, x: piece.x + deltaX, y: piece.y + deltaY }
        : piece
    ));
    
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!draggedPiece) return;
    
    const piece = puzzlePieces.find(p => p.id === draggedPiece);
    if (!piece) return;

    // Check if piece is near correct position
    const distance = Math.sqrt(
      Math.pow(piece.x - piece.correctX, 2) + Math.pow(piece.y - piece.correctY, 2)
    );

    if (distance < 60) {
      // Piece is correctly placed
      setPuzzlePieces(prev => prev.map(p => 
        p.id === draggedPiece 
          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true, isDragging: false }
          : p
      ));

      // Check if puzzle is complete
      const updatedPieces = puzzlePieces.map(p => 
        p.id === draggedPiece 
          ? { ...p, x: p.correctX, y: p.correctY, isPlaced: true, isDragging: false }
          : p
      );
      
      if (updatedPieces.every(p => p.isPlaced)) {
        handlePuzzleComplete();
      }
    } else {
      // Return piece to original position
      setPuzzlePieces(prev => prev.map(p => 
        p.id === draggedPiece ? { ...p, isDragging: false } : p
      ));
    }
    
    setDraggedPiece(null);
    setTouchStart(null);
  };

  const handlePuzzleComplete = () => {
    setIsComplete(true);
    triggerConfetti('rainbow');
    
    setTimeout(() => {
      setShowReward(true);
      
      // Update game state
      const newCompletedLevels = [...gameState.completedLevels, levelId];
      const newGameState = {
        ...gameState,
        completedLevels: newCompletedLevels,
        totalAnimals: newCompletedLevels.length
      };
      
      localStorage.setItem('birthdayAdventureState', JSON.stringify(newGameState));
    }, 2000);
  };

  const handleContinue = () => {
    if (levelId === 5) {
      // All levels complete - show final celebration
      router.push('/birthday-adventure/celebration');
    } else {
      // Go back to world map
      router.push('/birthday-adventure');
    }
  };

  if (showReward) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 
                     flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 text-6xl animate-bounce">🎈</div>
          <div className="absolute top-20 right-10 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎈</div>
          <div className="absolute bottom-20 left-1/4 text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🎈</div>
          <div className="absolute bottom-10 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎈</div>
        </div>

        {/* Reward Content */}
        <div className="text-center space-y-8 z-10 px-4">
          <div className="text-8xl animate-bounce mb-8">{level.animal}</div>
          <div className="text-4xl font-black text-white drop-shadow-2xl mb-4">
            🎉 You did it! 🎉
          </div>
          <div className="text-2xl font-bold text-white drop-shadow-xl mb-8">
            The {level.animalName} is coming to your party!
          </div>
          <div className="text-xl font-bold text-white drop-shadow-lg mb-8">
            🎊 {level.animalName} joined the celebration! 🎊
          </div>
          
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                       text-white text-2xl font-black py-6 px-12 rounded-3xl shadow-2xl 
                       transform hover:scale-110 transition-all duration-300 border-4 border-white/50 w-full max-w-sm"
          >
            {levelId === 5 ? '🎂 See the Party! 🎂' : '🗺️ Back to Map 🗺️'}
          </button>
        </div>

        {/* Floating Decorations */}
        <div className="absolute top-1/4 left-1/4 text-5xl animate-spin-slow">🌟</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce">✨</div>
        <div className="absolute bottom-1/3 left-1/6 text-5xl animate-pulse">🎊</div>
        <div className="absolute bottom-1/4 right-1/6 text-5xl animate-bounce">🎪</div>
      </div>
    );
  }

  return (
    <div 
      className={`h-screen w-screen bg-gradient-to-br ${level.background} relative overflow-hidden`}
      ref={containerRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-pink-50 via-white to-blue-50 
                     backdrop-blur-md shadow-lg border-b-2 border-pink-200/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{level.animal}</div>
            <div className="text-lg font-bold text-gray-800">
              Help the {level.animalName}!
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧩</div>
            <div className="text-lg font-bold text-gray-800">
              {puzzlePieces.filter(p => p.isPlaced).length}/{level.pieces} Pieces
            </div>
          </div>
        </div>
      </div>

      {/* Puzzle Area */}
      <div className="pt-20 px-4 h-full relative">
        {/* Puzzle Grid */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <div className="grid gap-2 p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
            {Array.from({ length: level.gridSize.rows * level.gridSize.cols }).map((_, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-white/30 rounded-lg border-2 border-white/50 
                           flex items-center justify-center text-3xl"
              >
                {puzzlePieces.find(p => p.isPlaced && p.correctX === (index % level.gridSize.cols) * 90 + 
                                        (window.innerWidth - (level.gridSize.cols * 80 + (level.gridSize.cols - 1) * 10)) / 2 && 
                                        p.correctY === Math.floor(index / level.gridSize.cols) * 90 + 200)?.id !== undefined && 
                  <div className="text-4xl">{level.animal}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Puzzle Pieces */}
        {puzzlePieces.map((piece) => (
          <div
            key={piece.id}
            className={`absolute w-20 h-20 bg-white/90 rounded-lg border-4 border-white 
                       flex items-center justify-center text-4xl shadow-lg
                       ${piece.isPlaced ? 'opacity-50 pointer-events-none' : 'cursor-move'}
                       ${piece.isDragging ? 'z-50 scale-110' : 'hover:scale-105'}`}
            style={{
              left: piece.x,
              top: piece.y,
              transform: piece.isPlaced ? 'scale(0.8)' : 'scale(1)',
            }}
            onTouchStart={(e) => handleTouchStart(e, piece.id)}
          >
            {level.animal}
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/birthday-adventure')}
        className="absolute bottom-4 left-4 bg-gradient-to-r from-gray-500 to-gray-600 
                   hover:from-gray-600 hover:to-gray-700 text-white text-lg font-bold 
                   py-3 px-6 rounded-2xl shadow-xl transform hover:scale-105 
                   transition-all duration-300 border-2 border-white/50"
      >
        ← Back to Map
      </button>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg max-w-xs">
        <div className="text-sm font-bold text-gray-800">
          🎯 Drag the {level.animalName} pieces to complete the puzzle!
        </div>
      </div>
    </div>
  );
} 