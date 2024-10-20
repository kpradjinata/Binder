import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/CourseOverview.css';

interface Course {
  name: string;
  instructor: string;
  progress: number;
  image: string;
}

const CourseCard: React.FC<Course> = ({ name, instructor, progress, image }) => {
  return (
    <Link to={`/course/${name.toLowerCase().replace(/\s+/g, '-')}`} className="course-card">
      <div className="course-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="course-content">
        <h3 className="course-title">{name}</h3>
        <p className="instructor-name">{instructor}</p>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ 
              width: `${progress}%`,
              backgroundColor: progress === 100 ? '#4CAF50' : '#FFA500'
            }}
          ></div>
        </div>
        <div className="progress-info">
          <span>{progress}% Progress</span>
          <span>{progress}/100</span>
        </div>
      </div>
    </Link>
  );
};

const CourseOverview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const courses: Course[] = [
    { name: 'English', instructor: 'Alphonso Thompson', progress: 77, image: '/path/to/english-image.jpg' },
    { name: 'Math', instructor: 'Oakland', progress: 96, image: '/path/to/math-image.jpg' },
    { name: 'HIST-107', instructor: 'Mr. Falck', progress: 0, image: '/path/to/history-image.jpg' },
    { name: 'Economics', instructor: 'Hoaly Flack', progress: 100, image: '/path/to/economics-image.jpg' },
    { name: 'Physics', instructor: 'Dr. Einstein', progress: 85, image: '/path/to/physics-image.jpg' },
    { name: 'Chemistry', instructor: 'Prof. Curie', progress: 62, image: '/path/to/chemistry-image.jpg' },
    { name: 'Biology', instructor: 'Dr. Watson', progress: 65, image: '/path/to/biology-image.jpg' },
    { name: 'Computer Science', instructor: 'Dr. Turing', progress: 90, image: '/path/to/cs-image.jpg' },
    { name: 'Psychology', instructor: 'Dr. Freud', progress: 75, image: '/path/to/psychology-image.jpg' },
    { name: 'Sociology', instructor: 'Dr. Durkheim', progress: 70, image: '/path/to/sociology-image.jpg' },
    { name: 'Art History', instructor: 'Prof. Monet', progress: 80, image: '/path/to/arthistory-image.jpg' },
    { name: 'Philosophy', instructor: 'Dr. Kant', progress: 50, image: '/path/to/philosophy-image.jpg' },
    { name: 'Literature', instructor: 'Prof. Shakespeare', progress: 88, image: '/path/to/literature-image.jpg' },
    { name: 'Political Science', instructor: 'Dr. Machiavelli', progress: 72, image: '/path/to/polisci-image.jpg' },
    { name: 'Astronomy', instructor: 'Dr. Sagan', progress: 95, image: '/path/to/astronomy-image.jpg' },
    { name: 'Geology', instructor: 'Prof. Wegener', progress: 68, image: '/path/to/geology-image.jpg' },
    { name: 'Music Theory', instructor: 'Prof. Mozart', progress: 82, image: '/path/to/musictheory-image.jpg' },
    { name: 'Environmental Science', instructor: 'Dr. Carson', progress: 78, image: '/path/to/envsci-image.jpg' },
    { name: 'Statistics', instructor: 'Dr. Gauss', progress: 87, image: '/path/to/statistics-image.jpg' },
    { name: 'Anthropology', instructor: 'Dr. Mead', progress: 73, image: '/path/to/anthropology-image.jpg' },
    { name: 'Linguistics', instructor: 'Prof. Chomsky', progress: 92, image: '/path/to/linguistics-image.jpg' },
    { name: 'World Religions', instructor: 'Dr. Eliade', progress: 60, image: '/path/to/religions-image.jpg' }
  ];

  const coursesPerPage = 4;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setSlideDirection('right');
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setSlideDirection('left');
      setCurrentPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection(null);
    }, 300); // Match this with your CSS transition duration

    return () => clearTimeout(timer);
  }, [currentPage]);

  const displayedCourses = courses.slice(
    currentPage * coursesPerPage,
    (currentPage + 1) * coursesPerPage
  );

  return (
    <div className="course-overview-container">
      <h2 className="overview-title">Daily Overview</h2>
      <div className={`course-grid ${slideDirection ? `slide-${slideDirection}` : ''}`}>
        {displayedCourses.map((course, index) => (
          <CourseCard key={`${currentPage}-${index}`} {...course} />
        ))}
      </div>
      <div className="navigation-buttons">
        <button className="nav-button" onClick={handlePrevious} disabled={currentPage === 0}>&lt;</button>
        <button className="nav-button" onClick={handleNext} disabled={currentPage === totalPages - 1}>&gt;</button>
      </div>
    </div>
  );
};

export default CourseOverview;