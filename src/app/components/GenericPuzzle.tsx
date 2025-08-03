'use client';

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { DraggablePuzzlePiece } from './PuzzlePiece';
import { DroppablePuzzleArea } from './PuzzleArea';
import { PuzzleSelector } from './PuzzleSelector';
import { CompletionModal } from './CompletionModal';
import { usePuzzle } from '../hooks/usePuzzle';
import { PUZZLE_CONFIGS } from '../constants/puzzleConfigs';

export default function GenericPuzzle() {
  const {
    selectedPuzzle,
    pieces,
    isComplete,
    activeId,
    handleDragStart,
    handleDragEnd,
    resetPuzzle,
    handlePuzzleChange,
  } = usePuzzle();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-4">
      {/* Puzzle Selector */}
      <PuzzleSelector 
        puzzleConfigs={PUZZLE_CONFIGS}
        selectedPuzzle={selectedPuzzle}
        onPuzzleChange={handlePuzzleChange}
      />

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

      {/* Completion Modal */}
      {isComplete && (
        <CompletionModal 
          puzzleName={selectedPuzzle.name}
          onPlayAgain={resetPuzzle}
        />
      )}
    </div>
  );
} 