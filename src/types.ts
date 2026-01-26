export type Difficulty = 'easy' | 'normal' | 'difficult' | 'extreme';

export interface GameState {
  playerName: string;
  difficulty: Difficulty;
  startTime: Date | null;
  endTime: Date | null;
  errors: number;
  grid: number[][];
  initialGrid: number[][];
  selectedCell: { row: number; col: number } | null;
  gameStatus: 'playing' | 'won' | 'lost';
  errorCells: Set<string>; // Track cells with errors
}

export interface SudokuGameProps {
  onBackToMenu: () => void;
  onRestart: () => void;
}