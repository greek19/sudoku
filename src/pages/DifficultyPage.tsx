import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const DifficultyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName || 'Player';

  const difficulties = [
    { level: 'easy', label: 'Easy', emptyCells: 30 },
    { level: 'normal', label: 'Normal', emptyCells: 45 },
    { level: 'difficult', label: 'Difficult', emptyCells: 55 },
    { level: 'extreme', label: 'Extreme', emptyCells: 65 }
  ];

  const handleDifficultySelect = (difficulty: string) => {
    navigate('/game', { 
      state: { 
        playerName,
        difficulty
      } 
    });
  };

  return (
    <div className="difficulty-page">
      <h1>Hello, {playerName}!</h1>
      <h2>Select Difficulty Level</h2>
      <div className="difficulty-options">
        {difficulties.map((diff) => (
          <button
            key={diff.level}
            className="difficulty-button"
            onClick={() => handleDifficultySelect(diff.level)}
          >
            {diff.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyPage;