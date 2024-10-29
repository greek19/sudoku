import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateSudoku } from '../functions/commonFunctions';
import { setDifficulty } from '../store/slices/gameSlice'

export default function SudokuPage() {
    const dispatch = useDispatch();
    const difficulty = useSelector((state) => state.game.difficulty); 
    const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(0)));

    const handleGenerateSudoku = () => {
        const newGrid = generateSudoku(difficulty);
        setGrid(newGrid); 
    };

    useEffect(()=>{
        handleGenerateSudoku()
    },[difficulty])

    return (
        <div className="sudoku-container">
            <h1 className="sudoku-title">Sudoku</h1>
            <div className="grid">
                {grid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="cell">
                            {cell !== 0 ? cell : ''} 
                        </div>
                    ))
                ))}
            </div>
            <div className="number-pad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                    <button key={number} className="number-button">{number}</button>
                ))}
            </div>
            
        </div>
    );
};
