import React from 'react';

interface Course {
  name: string;
  instructor: string;
  progress: number;
  image: string;
}

const CourseCard: React.FC<Course> = ({ name, instructor, progress, image }) => {
  return (
    <div style={{
      width: '48%',
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    }}>
      <div style={{
        height: '100px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}></div>
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>{name}</h3>
        <p style={{ margin: '0 0 10px 0', color: '#666' }}>{instructor}</p>
        <div style={{
          height: '5px',
          backgroundColor: '#eee',
          borderRadius: '5px',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: progress === 100 ? '#4CAF50' : '#FFA500',
            borderRadius: '5px',
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
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
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Daily Overview</h2>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        marginBottom: '20px' 
      }}>
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>&lt;</button>
        <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>&gt;</button>
      </div>
    </div>
  );
};

export default CourseOverview;