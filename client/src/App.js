import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OmikujiGenerator from './pages/OmikujiGenerator';
import OmikujiViewer from './pages/OmikujiViewer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<OmikujiGenerator />} />
        <Route path="/view/:omikujiId" element={<OmikujiViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
