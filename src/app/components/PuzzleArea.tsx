import { useDroppable } from '@dnd-kit/core';

interface DroppablePuzzleAreaProps {
  children: React.ReactNode;
  bgColor: string;
}

export function DroppablePuzzleArea({ children, bgColor }: DroppablePuzzleAreaProps) {
  const { setNodeRef } = useDroppable({
    id: 'puzzle-area',
  });

  return (
    <div ref={setNodeRef} className={`puzzle-area relative w-[300px] h-[300px] bg-gradient-to-br ${bgColor} rounded-xl border-4 border-amber-300`}>
      {children}
    </div>
  );
} 