import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const NameInputPage: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      navigate('/difficulty', { state: { playerName: name } });
    }
  };

  return (
    <div className="name-input-page">
      <h1>Welcome to Sudoku Game!</h1>
      <form onSubmit={handleSubmit} className="name-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="name-input"
          maxLength={20}
        />
        <button type="submit" className="submit-button" disabled={!name.trim()}>
          Start Game
        </button>
      </form>
    </div>
  );
};

export default NameInputPage;