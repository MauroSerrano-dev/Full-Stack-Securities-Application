import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecurityList from './components/SecurityList';
import SecurityDetail from './components/SecurityDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SecurityList />} />
        <Route path="/securities" element={<SecurityList />} />
        <Route path="/securities/:symbol" element={<SecurityDetail />} />
      </Routes>
    </Router>
  );
};

export default App;