// Improved Sudoku Generator with proper randomization
// Uses Fisher-Yates shuffle and backtracking for better puzzles

export function generateImprovedSudoku(difficulty: string): { grid: number[][]; solution: number[][] } {
  const grid: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  const solution: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));

  // Generate a completely random solved Sudoku
  generateRandomSudoku(grid);
  
  // Copy to solution
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solution[i][j] = grid[i][j];
    }
  }

  // Remove cells based on difficulty to create the puzzle
  const cellsToRemove = getCellsToRemove(difficulty);
  removeCellsRandomly(grid, cellsToRemove);

  return { grid, solution };
}

function generateRandomSudoku(grid: number[][]): boolean {
  // Fill the grid with a completely random valid Sudoku
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (const num of numbers) {
          if (isValidMove(grid, i, j, num)) {
            grid[i][j] = num;
            
            if (generateRandomSudoku(grid)) {
              return true;
            }
            
            grid[i][j] = 0; // Backtrack
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffleArray(array: number[]): number[] {
  // Fisher-Yates shuffle algorithm for better randomization
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}



function getCellsToRemove(difficulty: string): number {
  const difficultyMap: Record<string, number> = {
    'easy': 30,
    'normal': 45,
    'difficult': 55,
    'extreme': 65
  };
  
  return difficultyMap[difficulty] || 45;
}

function removeCellsRandomly(grid: number[][], count: number): void {
  // Create array of all cell positions
  const cells = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells.push({ row, col });
    }
  }
  
  // Shuffle the cells to randomize removal
  shuffleCells(cells);
  
  // Remove the specified number of cells
  for (let i = 0; i < count; i++) {
    const { row, col } = cells[i];
    grid[row][col] = 0;
  }
}

function shuffleCells(cells: { row: number; col: number }[]): void {
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
}

// Validation functions (same as before)
export function isValidMove(grid: number[][], row: number, col: number, num: number): boolean {
  // Check if the number is already in the row (excluding the current cell)
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === num) {
      return false;
    }
  }

  // Check if the number is already in the column (excluding the current cell)
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === num) {
      return false;
    }
  }

  // Check if the number is already in the 3x3 box (excluding the current cell)
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if ((boxRow + r !== row || boxCol + c !== col) && grid[boxRow + r][boxCol + c] === num) {
        return false;
      }
    }
  }

  return true;
}

export function isPuzzleComplete(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
}