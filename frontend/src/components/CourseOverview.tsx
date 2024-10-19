import React from 'react';
import '../styles/CourseOverview.css';

interface Course {
  name: string;
  instructor: string;
  progress: number;
  image: string;
}

const CourseCard: React.FC<Course> = ({ name, instructor, progress, image }) => {
  return (
    <div className="course-card">
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
    </div>
  );
};

const CourseOverview: React.FC = () => {
  const courses: Course[] = [
    { name: 'English', instructor: 'Alphonso Thompson', progress: 77, image: '/path/to/english-image.jpg' },
    { name: 'Math', instructor: 'Oakland', progress: 96, image: '/path/to/math-image.jpg' },
    { name: 'HIST-107', instructor: 'Mr. Falck', progress: 0, image: '/path/to/history-image.jpg' },
    { name: 'Economics', instructor: 'Hoaly Flack', progress: 100, image: '/path/to/economics-image.jpg' }
  ];

  return (
    <div className="course-overview-container">
      <h2 className="overview-title">Daily Overview</h2>
      <div className="course-grid">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
      <div className="navigation-buttons">
        <button className="nav-button">&lt;</button>
        <button className="nav-button">&gt;</button>
      </div>
    </div>
  );
};

export default CourseOverview;