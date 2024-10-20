import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Groups from "./pages/Groups";
import CoursePage from "./pages/CoursePage";
import ContentLibrary from "./pages/ContentLibrary";

import Profile from "./pages/Profile"
import LandingPage from "./pages/LandingPage";


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
        <Route path="/course/:courseName" element={<CoursePage />} />
        <Route path="/content-library" element={<ContentLibrary />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/land" element={<LandingPage />} />

      </Routes>
    </Router>
  );
}

export default App;