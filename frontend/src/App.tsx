import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Groups from "./pages/Groups";
import Course from "./pages/Course";

import Quiz from './pages/Quiz';

import Discussion from './pages/Discussion';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/discussion" element={<Discussion />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/course" element={<Course />} />

        
      </Routes>
    </Router>
  );
}

export default App;