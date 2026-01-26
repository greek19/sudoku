import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameState, Difficulty } from '../types';
import { generateImprovedSudoku as generateSudoku, isValidMove, isPuzzleComplete } from '../utils/improvedSudokuGenerator';
import '../App.css';

const SudokuGame: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playerName, difficulty } = location.state || { playerName: 'Player', difficulty: 'normal' };

  const [gameState, setGameState] = useState<GameState>({
    playerName,
    difficulty,
    startTime: new Date(),
    endTime: null,
    errors: 0,
    grid: Array(9).fill(0).map(() => Array(9).fill(0)),
    initialGrid: Array(9).fill(0).map(() => Array(9).fill(0)),
    selectedCell: null,
    gameStatus: 'playing',
    errorCells: new Set()
  });

  const [solution, setSolution] = useState<number[][]>(Array(9).fill(0).map(() => Array(9).fill(0)));
  const [currentTime, setCurrentTime] = useState<string>('00:00');

  // Generate a valid Sudoku puzzle
  useEffect(() => {
    const { grid, solution: sudokuSolution } = generateSudoku(difficulty);
    setGameState(prev => ({
      ...prev,
      grid,
      initialGrid: JSON.parse(JSON.stringify(grid))
    }));
    setSolution(sudokuSolution);
  }, [difficulty]);

  // Real-time timer
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    
    if (gameState.gameStatus === 'playing' && gameState.startTime) {
      timerInterval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor(
            (now.getTime() - (gameState?.startTime?.getTime() ?? now.getTime())) / 1000
        );
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setCurrentTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }
    
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [gameState.gameStatus, gameState.startTime]);

  const handleCellClick = (row: number, col: number) => {
    setGameState(prev => ({
      ...prev,
      selectedCell: { row, col }
    }));
  };

  const handleNumberClick = (number: number) => {
    if (!gameState.selectedCell || gameState.gameStatus !== 'playing') return;

    const { row, col } = gameState.selectedCell;
    
    // Check if cell is editable (not part of initial puzzle)
    if (gameState.initialGrid[row][col] !== 0) return;

    const newGrid = [...gameState.grid];
    const currentValue = newGrid[row][col];
    
    // If clicking the same number, clear the cell
    if (currentValue === number) {
      newGrid[row][col] = 0;
      setGameState(prev => ({
        ...prev,
        grid: newGrid
      }));
      return;
    }

    // Check if the move is valid BEFORE updating the grid
    const isValid = isValidMove(gameState.grid, row, col, number);
    const cellKey = `${row}-${col}`;
    const newErrorCells = new Set(gameState.errorCells);

    newGrid[row][col] = number;
    
    if (isValid) {
      // Remove from error cells if it was previously wrong
      newErrorCells.delete(cellKey);
      
      // Check if the puzzle is complete
      if (isPuzzleComplete(newGrid)) {
        setGameState(prev => ({
          ...prev,
          grid: newGrid,
          endTime: new Date(),
          gameStatus: 'won',
          errorCells: newErrorCells
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          grid: newGrid,
          errorCells: newErrorCells
        }));
      }
    } else {
      // Invalid move - increment error count and mark cell as error
      newErrorCells.add(cellKey);
      const newErrors = gameState.errors + 1;
      
      if (newErrors >= 3) {
        // Game over
        setGameState(prev => ({
          ...prev,
          grid: newGrid,
          endTime: new Date(),
          errors: newErrors,
          gameStatus: 'lost',
          errorCells: newErrorCells
        }));
      } else {
        // Just increment errors and mark cell
        setGameState(prev => ({
          ...prev,
          grid: newGrid,
          errors: newErrors,
          errorCells: newErrorCells
        }));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key >= '1' && e.key <= '9' && gameState.selectedCell) {
      handleNumberClick(parseInt(e.key));
    }
  };

  const getTimeElapsed = () => {
    if (!gameState.startTime) return '00:00';
    const end = gameState.endTime || new Date();
    const diff = Math.floor((end.getTime() - gameState.startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleRestart = () => {
    // Reset the game
    setGameState(prev => ({
      ...prev,
      startTime: new Date(),
      endTime: null,
      errors: 0,
      grid: [...prev.initialGrid],
      selectedCell: null,
      gameStatus: 'playing'
    }));
  };

  return (
    <div className="sudoku-game" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="game-header">
        <div className="difficulty-display">
          Difficulty: {difficulty.toUpperCase()}
        </div>
        <div className="timer">
          Time: {currentTime}
        </div>
        <div className="errors">
          Errors: {gameState.errors}/3
        </div>
      </div>

      <div className="sudoku-grid">
        {gameState.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`sudoku-cell $
                  ${gameState.selectedCell?.row === rowIndex && gameState.selectedCell?.col === colIndex ? 'selected' : ''}
                  ${gameState.initialGrid[rowIndex][colIndex] !== 0 ? 'initial' : ''}
                  ${cell !== 0 && gameState.initialGrid[rowIndex][colIndex] === 0 ? 'filled' : ''}
                  ${gameState.errorCells.has(`${rowIndex}-${colIndex}`) ? 'error' : ''}
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="number-selector">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="number-button"
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {gameState.gameStatus === 'won' && (
        <div className="game-modal">
          <div className="modal-content">
            <h2>Congratulations! You Win!</h2>
            <p>Time: {getTimeElapsed()}</p>
            <p>Errors: {gameState.errors}</p>
            <div className="modal-buttons">
              <button onClick={handleRestart}>Play Again</button>
              <button onClick={handleBackToMenu}>Back to Menu</button>
            </div>
          </div>
        </div>
      )}

      {gameState.gameStatus === 'lost' && (
        <div className="game-modal">
          <div className="modal-content">
            <h2>Game Over! You Lost!</h2>
            <p>Time: {getTimeElapsed()}</p>
            <p>Errors: {gameState.errors}</p>
            <div className="modal-buttons">
              <button onClick={handleRestart}>Try Again</button>
              <button onClick={handleBackToMenu}>Back to Menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SudokuGame;