export interface Dimensions {
  width: number;
  height: number;
}

export interface PuzzlePiece {
  id: number;
  position: number; // 0-15 for 4x4 grid
  isPlaced: boolean;
}

export interface PuzzleConfig {
  id: string;
  name: string;
  image: string;
  color: string;
  icon: string;
}

export interface PuzzleConfigWithStatus extends PuzzleConfig {
  isCompleted: boolean;
}

export interface GameState {
  gameStarted: boolean;
  confettiActive: boolean;
  candlesBlown: boolean[];
  balloonsPopped: boolean[];
} 