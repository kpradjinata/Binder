import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Groups from "./pages/Groups";

import Quiz from './pages/Quiz';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/groups" element={<Groups />} />

      </Routes>
    </Router>
  );
}

export default App;