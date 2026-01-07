import React from 'react';
import './App.css';

import { ToastContainer } from 'react-toastify';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Not-Main/Landing';
import HomePage from './Main/Home/HomePage';
import Roadmap from './Main/Roadmap/Roadmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/roadmap/:id" element={<Roadmap />} />
      </Routes>
      <ToastContainer position='top-center'/>
    </Router>
  );
}

export default App;
