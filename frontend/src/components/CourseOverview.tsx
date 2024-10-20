import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseOverview.css';

interface Course {
  name: string;
  instructor: string;
  progress: number;
  image: string;
}


const CourseCard: React.FC<Course & { loaded: boolean }> = ({ name, instructor, progress, image, loaded }) => {
  return (
    <Link to={`/course/${name.toLowerCase().replace(/\s+/g, '-')}`} className={`course-card ${loaded ? 'loaded' : ''}`}>
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
  const [courses, setCourses] = useState<Course[]>([
    { name: 'English', instructor: 'Alphonso Thompson', progress: 77, image: '/english.jpg' },
    { name: 'Math', instructor: 'Oakland', progress: 96, image: '/math.png' },
    { name: 'HIST-107', instructor: 'Mr. Falck', progress: 0, image: '/history.png' },
    { name: 'Economics', instructor: 'Hoaly Flack', progress: 100, image: 'economics.png' },
    { name: 'Physics', instructor: 'Dr. Einstein', progress: 85, image: '/path/to/physics-image.jpg' },
    { name: 'Chemistry', instructor: 'Prof. Curie', progress: 62, image: '/path/to/chemistry-image.jpg' },
    { name: 'Computer Science', instructor: 'Dr. Turing', progress: 90, image: '/path/to/cs-image.jpg' }
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newInstructorName, setNewInstructorName] = useState('');
  const [cardsLoaded, setCardsLoaded] = useState(false);

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

  const handleAddCourse = () => {
    if (newCourseName && newInstructorName) {
      const newCourse: Course = {
        name: newCourseName,
        instructor: newInstructorName,
        progress: 0,
        image: '/path/to/default-image.jpg'
      };
      setCourses(prevCourses => [...prevCourses, newCourse]);
      setNewCourseName('');
      setNewInstructorName('');
      setIsPopupOpen(false); // Close the popup
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsLoaded(true);
    }, 100);
  
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideDirection(null);
    }, 300);

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
    <CourseCard 
      key={`${currentPage}-${index}`} 
      {...course} 
      loaded={cardsLoaded} />
        ))}
      </div>
      <div className="navigation-container">
        <button className="nav-button" onClick={handlePrevious} disabled={currentPage === 0}>
          &lt;
        </button>
        <button className="add-course-button" onClick={() => setIsPopupOpen(true)}>
          Add Course
        </button>
        <button className="nav-button" onClick={handleNext} disabled={currentPage === totalPages - 1}>
          &gt;
        </button>
      </div>

      {/* Popup for adding a course */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Add New Course</h2>
            <label>
              Course Name:
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                required
              />
            </label>
            <label>
              Instructor Name:
              <input
                type="text"
                value={newInstructorName}
                onChange={(e) => setNewInstructorName(e.target.value)}
                required
              />
            </label>
            <div className="popup-buttons">
              <button onClick={handleAddCourse}>Add Course</button>
              <button onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseOverview;
