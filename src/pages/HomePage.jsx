import React, { Fragment, useState } from "react";

export default function HomePage() {
  const [difficulty, setDifficulty] = useState('Facile');

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleNewGame = () => {
    alert(`Nuova partita iniziata con difficoltà: ${difficulty}`);
  };

  const handleReset = () => {
    setDifficulty('Facile');
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

