import { useState, useEffect, useCallback } from 'react';
import { PuzzlePiece, PuzzleConfig } from '../types';
import { PUZZLE_CONFIGS } from '../constants/puzzleConfigs';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';

export const usePuzzle = () => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleConfig>(PUZZLE_CONFIGS[0]);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const initializePuzzle = useCallback(() => {
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
  }, []);

  useEffect(() => {
    initializePuzzle();
  }, [selectedPuzzle, initializePuzzle]);

  useEffect(() => {
    const allPlaced = pieces.every(p => p.isPlaced);
    if (allPlaced && pieces.length > 0) {
      setIsComplete(true);
    }
  }, [pieces]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
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
  }, [pieces]);

  const resetPuzzle = useCallback(() => {
    setIsComplete(false);
    initializePuzzle();
  }, [initializePuzzle]);

  const handlePuzzleChange = useCallback((puzzle: PuzzleConfig) => {
    setSelectedPuzzle(puzzle);
  }, []);

  return {
    selectedPuzzle,
    pieces,
    isComplete,
    activeId,
    handleDragStart,
    handleDragEnd,
    resetPuzzle,
    handlePuzzleChange,
  };
}; 