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
    // Create 9 pieces with random positions (0-8)
    const positions = Array.from({ length: 9 }, (_, i) => i);
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    
    const newPieces: PuzzlePiece[] = shuffledPositions.map((position, index) => ({
      id: index,
      position,
      isPlaced: false
    }));
    
    setPieces(newPieces);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    initializePuzzle();
  }, [selectedPuzzle, initializePuzzle]);

  useEffect(() => {
    // Check if puzzle is complete - all pieces should be in their correct positions
    const allCorrect = pieces.every(piece => piece.isPlaced && piece.position === piece.id);
    if (allCorrect && pieces.length > 0) {
      setIsComplete(true);
    }
  }, [pieces]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activePiece = pieces.find(p => p.id === active.id);
    if (!activePiece) return;

    // Check if dropped on a valid drop zone
    const dropZoneId = over.id as string;
    
    if (dropZoneId.startsWith('drop-zone-')) {
      const targetPosition = parseInt(dropZoneId.replace('drop-zone-', ''));
      
      // Place the piece in the dropped position
      setPieces(prev => prev.map(p => 
        p.id === active.id 
          ? { ...p, position: targetPosition, isPlaced: true }
          : p
      ));
    } else if (dropZoneId === 'draggable-area') {
      // Dropped back in the draggable area - keep piece unplaced
      setPieces(prev => prev.map(p => 
        p.id === active.id 
          ? { ...p, isPlaced: false }
          : p
      ));
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