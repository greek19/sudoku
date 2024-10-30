import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateSudoku } from '../functions/commonFunctions';
import { setDifficulty } from '../store/slices/gameSlice';

export default function SudokuPage() {
    const dispatch = useDispatch();
    const difficulty = useSelector((state) => state.game.difficulty); 
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(0)));
    const [selectedCell, setSelectedCell] = useState(null);

    const handleGenerateSudoku = () => {
        const newGrid = generateSudoku(difficulty);
        setGrid(newGrid); 
    };

    const handleClick = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
    };

    const handleNumberInput = (number) => {
        if (selectedCell) {
            const newGrid = grid.map(row => [...row]); // Crea una copia della griglia
            newGrid[selectedCell.row][selectedCell.col] = number; // Aggiorna la cella selezionata
            setGrid(newGrid);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key >= 1 && event.key <= 9 && selectedCell) {
            handleNumberInput(Number(event.key));
        }
    };

    useEffect(() => {
        handleGenerateSudoku();
    }, [difficulty]);

    // Aggiungi un listener per l'input da tastiera
    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedCell]);

    return (
        <div className="container text-center">
            <h1 className="sudoku-title">Sudoku</h1>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="grid">
                        {grid.map((row, rowIndex) => (
                            row.map((cell, colIndex) => {
                                const isSelected = selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex;
                                const isSameRowOrCol = selectedCell && (selectedCell.row === rowIndex || selectedCell.col === colIndex);
                                return (
                                    <div 
                                        key={`${rowIndex}-${colIndex}`} 
                                        className={`cell ${isSelected ? 'selected' : ''} ${isSameRowOrCol ? 'highlight' : ''}`}
                                        onClick={() => handleClick(rowIndex, colIndex)}
                                    >
                                        {cell !== 0 ? cell : ''}
                                    </div>
                                );
                            })
                        ))}
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-auto">
                    <div className="number-pad d-flex justify-content-center flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                            <button 
                                key={number} 
                                className="number-button btn btn-dark mx-1"
                                onClick={() => handleNumberInput(number)} // Gestisci l'input tramite i pulsanti
                            >
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
