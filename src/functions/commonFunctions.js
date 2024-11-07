export function generateSudokuSolution() {
    let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    
    function isSafe(row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num || grid[x][col] === num) return false;
        }
        
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) return false;
            }
        }
        return true;
    }
    
    function fillGrid() {
        for (let i = 0; i < 81; i++) {
            let row = Math.floor(i / 9);
            let col = i % 9;
            
            if (grid[row][col] === 0) {
                const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
                
                for (let num of nums) {
                    if (isSafe(row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid()) return true;
                        grid[row][col] = 0;
                    }
                }
                
                return false;
            }
        }
        return true;
    }
    
    fillGrid();
    return grid;
}

export function removeCells(grid, difficulty) {
    let cellsToRemove;
    switch (difficulty) {
        case 'Facile':
            cellsToRemove = 30;
            break;
        case 'Medio':
            cellsToRemove = 40;
            break;
        case 'Difficile':
            cellsToRemove = 50;
            break;
        case 'Esperto':
            cellsToRemove = 55;
            break;
        default:
            cellsToRemove = 30;
    }

    let removed = 0;
    while (removed < cellsToRemove) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            removed++;
        }
    }

    return grid;
}

export function generateSudoku(difficulty) {
    let completeGrid = generateSudokuSolution();
    let puzzleGrid = removeCells(completeGrid, difficulty);
    return puzzleGrid;
}
