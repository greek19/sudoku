// Test completo per la validazione degli errori
// Questo test simula diversi scenari di input per verificare che il controllo degli errori funzioni correttamente

// Mock della funzione isValidMove (versione corretta)
function isValidMove(grid, row, col, num) {
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

// Test cases
console.log('=== Testing Error Validation ===');

// Test 1: Empty grid - should be valid
const emptyGrid = Array(9).fill(0).map(() => Array(9).fill(0));
console.log('Test 1 - Empty grid, place 5 at (0,0):', isValidMove(emptyGrid, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 2: Same number in row - should be invalid
const gridWithRowConflict = JSON.parse(JSON.stringify(emptyGrid));
gridWithRowConflict[0][1] = 5;
console.log('Test 2 - Same number (5) in row at (0,1), trying to place 5 at (0,0):', !isValidMove(gridWithRowConflict, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 3: Same number in column - should be invalid
const gridWithColConflict = JSON.parse(JSON.stringify(emptyGrid));
gridWithColConflict[1][0] = 5;
console.log('Test 3 - Same number (5) in column at (1,0), trying to place 5 at (0,0):', !isValidMove(gridWithColConflict, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 4: Same number in 3x3 box - should be invalid
const gridWithBoxConflict = JSON.parse(JSON.stringify(emptyGrid));
gridWithBoxConflict[1][1] = 5;
console.log('Test 4 - Same number (5) in 3x3 box at (1,1), trying to place 5 at (0,0):', !isValidMove(gridWithBoxConflict, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 5: Different number in row - should be valid
const gridWithDifferent = JSON.parse(JSON.stringify(emptyGrid));
gridWithDifferent[0][1] = 3;
console.log('Test 5 - Different number (3) in row at (0,1), trying to place 5 at (0,0):', isValidMove(gridWithDifferent, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 6: Complex scenario - multiple conflicts
const complexGrid = JSON.parse(JSON.stringify(emptyGrid));
complexGrid[0][2] = 5; // Same row
complexGrid[2][0] = 5; // Same column
complexGrid[1][1] = 5; // Same box
console.log('Test 6 - Multiple conflicts (row, col, box), trying to place 5 at (0,0):', !isValidMove(complexGrid, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 7: Valid placement in partially filled grid
const partialGrid = JSON.parse(JSON.stringify(emptyGrid));
partialGrid[0][1] = 1;
partialGrid[0][2] = 2;
partialGrid[1][0] = 3;
partialGrid[2][0] = 4;
console.log('Test 7 - Valid placement (5) in partially filled grid at (0,0):', isValidMove(partialGrid, 0, 0, 5) ? 'PASS' : 'FAIL');

// Test 8: Edge case - placing in cell that already has the number (should be valid for clearing)
const gridWithSameNumber = JSON.parse(JSON.stringify(emptyGrid));
gridWithSameNumber[0][0] = 5;
console.log('Test 8 - Placing 5 in cell (0,0) that already has 5:', isValidMove(gridWithSameNumber, 0, 0, 5) ? 'PASS' : 'FAIL');

console.log('=== All tests completed ===');