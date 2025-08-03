'use client';

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DroppablePuzzleArea } from './PuzzleArea';
import { DraggablePiecesArea } from './DraggablePiecesArea';
import { DraggablePuzzlePiece } from './PuzzlePiece';
import { PuzzleSelector } from './PuzzleSelector';
import { CompletionModal } from './CompletionModal';
import { usePuzzle } from '../hooks/usePuzzle';
import { PUZZLE_CONFIGS } from '../constants/puzzleConfigs';
import { PuzzleConfig } from '../types';

export default function GenericPuzzle() {
  const {
    selectedPuzzle,
    pieces,
    isComplete,
    showCompletionModal,
    activeId,
    handleDragStart,
    handleDragEnd,
    resetPuzzle,
    handlePuzzleChange,
  } = usePuzzle();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handlePuzzleSelect = (puzzle: PuzzleConfig) => {
    handlePuzzleChange(puzzle);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-4">
      {/* Puzzle Selector */}
      <PuzzleSelector 
        selectedPuzzle={selectedPuzzle}
        onPuzzleChange={handlePuzzleChange}
      />

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Puzzle Area */}
        <div className="mb-4">
          <DroppablePuzzleArea 
            pieces={pieces}
            puzzleImage={selectedPuzzle.image}
            bgColor={selectedPuzzle.color}
            isComplete={isComplete}
          />
        </div>

        {/* Draggable Pieces Area */}
        <DraggablePiecesArea 
          pieces={pieces}
          puzzleImage={selectedPuzzle.image}
        />
        
        <DragOverlay>
          {activeId ? (
            <div className="w-[72px] h-[72px]">
              <DraggablePuzzlePiece 
                piece={pieces.find(p => p.id === activeId)!} 
                puzzleImage={selectedPuzzle.image} 
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Completion Modal */}
      <CompletionModal 
        puzzleName={selectedPuzzle.name}
        puzzleId={selectedPuzzle.id}
        onPlayAgain={resetPuzzle}
        onPuzzleSelect={handlePuzzleSelect}
        isVisible={showCompletionModal}
      />
    </div>
  );
} 