import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Wardrobe from './pages/Wardrobe';
import StyleProfile from './pages/StyleProfile';
import OutfitRecommendation from './pages/OutfitRecommendation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/outfits" element={<OutfitRecommendation />} />
            <Route path="/profile" element={<StyleProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
