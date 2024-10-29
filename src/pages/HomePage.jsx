import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setDifficulty } from '../store/slices/gameSlice';
import { useNavigate } from "react-router-dom";


export default function HomePage() {
    const difficulty = useSelector((state) => state.game.difficulty);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDifficultyChange = (event) => {
        dispatch(setDifficulty(event.target.value));
    };

    const handleNewGame = () => {
        navigate('/sudoku')
    };

    const handleReset = () => {
        dispatch(setDifficulty('Facile'));
        alert('Impostazioni resettate');
    };


  return (
    <div className="container">
      <h1 className="title">Sudoku</h1>

      <div className="menu">
        <label className="label">
          Seleziona Difficoltà:
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            className="select"
          >
            <option value="Facile">Facile</option>
            <option value="Medio">Medio</option>
            <option value="Difficile">Difficile</option>
            <option value="Esperto">Esperto</option>
          </select>
        </label>

        <div className="button-container">
          <button onClick={handleReset} className="button">
            Reset
          </button>
          <button onClick={handleNewGame} className="button">
            Nuova Partita
          </button>
        </div>
      </div>
    </div>
  );
}

