import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Series from './pages/Series';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/series/:id" exact element={<Series />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

