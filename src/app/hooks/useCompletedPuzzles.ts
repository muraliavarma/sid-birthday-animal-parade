import { useState, useEffect, useCallback } from 'react';
import { PUZZLE_CONFIGS } from '../constants/puzzleConfigs';

const COMPLETED_PUZZLES_KEY = 'sid-birthday-completed-puzzles';

export const useCompletedPuzzles = () => {
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<string>>(new Set());

  // Load completed puzzles from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_PUZZLES_KEY);
      if (stored) {
        const completed = JSON.parse(stored);
        setCompletedPuzzles(new Set(completed));
      }
    } catch (error) {
      console.error('Error loading completed puzzles:', error);
    }
  }, []);

  // Save completed puzzles to localStorage whenever it changes
  useEffect(() => {
    try {
      const completedArray = [...completedPuzzles];
      localStorage.setItem(COMPLETED_PUZZLES_KEY, JSON.stringify(completedArray));
    } catch (error) {
      console.error('Error saving completed puzzles:', error);
    }
  }, [completedPuzzles]);

  const markPuzzleAsCompleted = useCallback((puzzleId: string) => {
    setCompletedPuzzles(prev => {
      const newSet = new Set([...prev, puzzleId]);
      return newSet;
    });
  }, []);

  const resetCompletedPuzzles = useCallback(() => {
    setCompletedPuzzles(new Set());
  }, []);

  const getAvailablePuzzles = useCallback(() => {
    const puzzles = PUZZLE_CONFIGS.map(puzzle => ({
      ...puzzle,
      isCompleted: completedPuzzles.has(puzzle.id)
    }));
    return puzzles;
  }, [completedPuzzles]);

  const getUncompletedPuzzles = useCallback(() => {
    return PUZZLE_CONFIGS.filter(puzzle => !completedPuzzles.has(puzzle.id));
  }, [completedPuzzles]);

  const getCompletedPuzzles = useCallback(() => {
    return PUZZLE_CONFIGS.filter(puzzle => completedPuzzles.has(puzzle.id));
  }, [completedPuzzles]);

  return {
    completedPuzzles,
    markPuzzleAsCompleted,
    resetCompletedPuzzles,
    getAvailablePuzzles,
    getUncompletedPuzzles,
    getCompletedPuzzles,
  };
}; 