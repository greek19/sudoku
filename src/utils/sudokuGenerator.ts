// Sudoku Generator Utility
// This implements a basic Sudoku puzzle generator using backtracking

export function generateSudoku(difficulty: string): { grid: number[][]; solution: number[][] } {
  // Create empty grid
  const grid: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  const solution: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));

  // Generate a complete solved Sudoku
  solveSudoku(grid);
  
  // Copy to solution
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      solution[i][j] = grid[i][j];
    }
  }

  // Remove cells based on difficulty
  const cellsToRemove = getCellsToRemove(difficulty);
  removeCells(grid, cellsToRemove);

  return { grid, solution };
}

function solveSudoku(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            
            if (solveSudoku(grid)) {
              return true;
            }
            
            grid[row][col] = 0; // Backtrack
          }
        }
        return false; // Trigger backtracking
      }
    }
  }
  return true; // All cells filled
}

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[boxRow + r][boxCol + c] === num) return false;
    }
  }

  return true;
}

function getCellsToRemove(difficulty: string): number {
  const difficultyMap: Record<string, number> = {
    'easy': 30,
    'normal': 45,
    'difficult': 55,
    'extreme': 65
  };
  
  return difficultyMap[difficulty] || 45; // Default to normal
}

function removeCells(grid: number[][], count: number): void {
  const cells = [];
  
  // Create array of all cell positions
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cells.push({ row, col });
    }
  }
  
  // Shuffle the cells
  shuffleArray(cells);
  
  // Remove the specified number of cells
  for (let i = 0; i < count; i++) {
    const { row, col } = cells[i];
    grid[row][col] = 0;
  }
}

function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Validation function to check if a move is correct
export function isValidMove(grid: number[][], row: number, col: number, num: number): boolean {
  // Check if the number is already in the row
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === num) {
      return false;
    }
  }

  // Check if the number is already in the column
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === num) {
      return false;
    }
  }

  // Check if the number is already in the 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (boxRow + r !== row && boxCol + c !== col && grid[boxRow + r][boxCol + c] === num) {
        return false;
      }
    }
  }

  return true;
}

// Check if the puzzle is complete
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