// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SecurityList from './components/SecurityList';
import SecurityDetail from './components/SecurityDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SecurityList />} />
          <Route path="securities" element={<SecurityList />} />
          <Route path="securities/:symbol" element={<SecurityDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;