export interface Dimensions {
  width: number;
  height: number;
}

export interface PuzzlePiece {
  id: number;
  position: number; // 0-8 for 3x3 grid
  isPlaced: boolean;
}

export interface PuzzleConfig {
  id: string;
  name: string;
  image: string;
  color: string;
  icon: string;
}

export interface GameState {
  gameStarted: boolean;
  confettiActive: boolean;
  candlesBlown: boolean[];
  balloonsPopped: boolean[];
} 