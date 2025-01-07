import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CharacterComparison from './components/CharacterComparison';
import ViewAllCharacters from './components/ViewAllCharacters';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compare" element={<CharacterComparison />} />
        <Route path="/characters" element={<ViewAllCharacters />} />
      </Routes>
    </Router>
  );
}

export default App;
