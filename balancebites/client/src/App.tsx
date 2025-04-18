import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import PokedexPage from './pages/pokedexPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokedexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
