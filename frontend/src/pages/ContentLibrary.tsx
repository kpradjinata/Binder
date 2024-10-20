import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContentLibrary.css';
import Sidebar from '../components/Sidebar';

interface Course {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  icon: string;
}

const ContentLibrary: React.FC = () => {
  const courses: Course[] = [
    { id: '1', name: 'Introduction to React', instructor: 'John Doe', progress: 60, icon: '⚛️' },
    { id: '2', name: 'Advanced JavaScript', instructor: 'Jane Smith', progress: 30, icon: '🟨' },
    { id: '3', name: 'CSS Mastery', instructor: 'Bob Johnson', progress: 80, icon: '🎨' },
    { id: '4', name: 'Node.js Fundamentals', instructor: 'Alice Brown', progress: 45, icon: '🟢' },
    { id: '5', name: 'Python for Data Science', instructor: 'Charlie Davis', progress: 70, icon: '🐍' },
    // Add more courses as needed
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-library">
          <h1 className="page-title">My Content Library</h1>
          <div className="course-grid">
            {courses.map(course => (
              <Link to={`/course/${course.id}`} key={course.id} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <div className="course-info">
                  <h2>{course.name}</h2>
                  <p>{course.instructor}</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="progress-text">{course.progress}% Complete</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLibrary;