import { useState, useEffect, useCallback } from 'react';
import { PuzzlePiece, PuzzleConfig } from '../types';
import { PUZZLE_CONFIGS } from '../constants/puzzleConfigs';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useCompletedPuzzles } from '../contexts/CompletedPuzzlesContext';

export const usePuzzle = () => {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleConfig>(PUZZLE_CONFIGS[0]);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { markPuzzleAsCompleted } = useCompletedPuzzles();

  const initializePuzzle = useCallback(() => {
    // Create 16 pieces with random positions (0-15)
    const positions = Array.from({ length: 16 }, (_, i) => i);
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    
    const newPieces: PuzzlePiece[] = shuffledPositions.map((position, index) => ({
      id: index,
      position,
      isPlaced: false
    }));
    
    setPieces(newPieces);
    setIsComplete(false);
    setShowCompletionModal(false);
  }, []);

  useEffect(() => {
    initializePuzzle();
  }, [selectedPuzzle, initializePuzzle]);

  useEffect(() => {
    // Check if puzzle is complete - all pieces should be in their correct positions
    // Only check if we have pieces and they're all placed
    if (pieces.length === 0) return;
    
    const allCorrect = pieces.every(piece => piece.isPlaced && piece.position === piece.id);
    const allPlaced = pieces.every(piece => piece.isPlaced);
    
    if (allCorrect && allPlaced && pieces.length > 0) {
      setIsComplete(true);
      // Mark puzzle as completed
      markPuzzleAsCompleted(selectedPuzzle.id);
      // Add a delay before showing the completion modal so we can see the finished puzzle
      setTimeout(() => {
        setShowCompletionModal(true);
      }, 2000); // 2 second pause to admire the finished puzzle
    }
  }, [pieces, selectedPuzzle.id, markPuzzleAsCompleted]);

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
      
      // Find if there's already a piece at the target position
      const existingPiece = pieces.find(p => p.isPlaced && p.position === targetPosition);
      
      if (existingPiece) {
        // Swap the pieces
        setPieces(prev => prev.map(p => {
          if (p.id === active.id) {
            // Move the dragged piece to the target position
            return { ...p, position: targetPosition, isPlaced: true };
          } else if (p.id === existingPiece.id) {
            // Handle the existing piece based on where the dragged piece came from
            if (!activePiece.isPlaced) {
              // Dragged piece came from draggable area, so existing piece goes to draggable area
              return { ...p, isPlaced: false };
            } else {
              // Dragged piece came from another position, so swap positions
              return { ...p, position: activePiece.position, isPlaced: true };
            }
          }
          return p;
        }));
      } else {
        // Place the piece in the empty position
        setPieces(prev => prev.map(p => 
          p.id === active.id 
            ? { ...p, position: targetPosition, isPlaced: true }
            : p
        ));
      }
    } else if (dropZoneId === 'draggable-area') {
      // Dropped back in the draggable area
      setPieces(prev => prev.map(p => 
        p.id === active.id 
          ? { ...p, isPlaced: false }
          : p
      ));
    }
  }, [pieces]);

  const resetPuzzle = useCallback(() => {
    setIsComplete(false);
    setShowCompletionModal(false);
    initializePuzzle();
  }, [initializePuzzle]);

  const handlePuzzleChange = useCallback((puzzle: PuzzleConfig) => {
    setSelectedPuzzle(puzzle);
  }, []);

  return {
    selectedPuzzle,
    pieces,
    isComplete,
    showCompletionModal,
    activeId,
    handleDragStart,
    handleDragEnd,
    resetPuzzle,
    handlePuzzleChange,
  };
}; 