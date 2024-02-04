import React from "react";
import Main from "./components/Main";
import Journal from "./components/Journal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Routes>
        <Route path="/journal" element={<Journal />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
