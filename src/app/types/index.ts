export interface Dimensions {
  width: number;
  height: number;
}

export interface PuzzlePiece {
  id: number;
  x: number;
  y: number;
  correctX: number;
  correctY: number;
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