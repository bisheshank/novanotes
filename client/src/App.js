import React, { useState, useEffect } from 'react'
import Main from './components/Main';
import Journal from './components/Journal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/journal" element={<Journal />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  )
}

export default App