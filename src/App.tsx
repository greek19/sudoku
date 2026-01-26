import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NameInputPage from './pages/NameInputPage';
import DifficultyPage from './pages/DifficultyPage';
import SudokuGame from './pages/SudokuGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameInputPage />} />
        <Route path="/difficulty" element={<DifficultyPage />} />
        <Route path="/game" element={<SudokuGame />} />
      </Routes>
    </Router>
  );
}

export default App;
