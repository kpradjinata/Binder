import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import '../styles/CoursePage.css';
import { useParams } from 'react-router-dom';
import PDFToText from 'react-pdftotext';

interface CourseData {
  name: string;
  instructor: string;
  description: string;
  progress: number;
}

const CoursePage: React.FC = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pdfText, setPdfText] = useState('');
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upcomingQuizzes = [
    { id: 1, name: 'Midterm Exam', date: 'Oct 15, 2024' },
    { id: 2, name: 'Chapter 5 Quiz', date: 'Oct 22, 2024' },
  ];

  const pastQuizzes = [
    { id: 1, name: 'Chapter 3 Quiz', date: 'Sept 30, 2024', score: '85%' },
    { id: 2, name: 'Pop Quiz', date: 'Oct 5, 2024', score: '92%' },
  ];

  useEffect(() => {
    const fetchCourseData = async () => {
      const urlFriendlyName = courseName?.toLowerCase().replace(/-/g, ' ');
      // const data = mockCourseData[urlFriendlyName || ''] || null;
      const mockCourseData: Record<string, CourseData> = {
        'english': {
          name: 'English',
          instructor: 'Alphonso Thompson',
          description: 'Comprehensive English language and literature course.',
          progress: 77
        },
        'math': {
          name: 'Math',
          instructor: 'Oakland',
          description: 'Advanced mathematics covering algebra, calculus, and more.',
          progress: 96
        },
        'hist-107': {
          name: 'HIST-107',
          instructor: 'Mr. Falck',
          description: 'In-depth study of world history.',
          progress: 0
        },
        // Add more courses as needed
      };

      // Get the course data based on the URL parameter
      const data = mockCourseData[courseName || ''] || null;
      setCourseData(data);
    };

    fetchCourseData();
  }, [courseName]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      try {
        const text = await PDFToText(file);
        setPdfText(text);
        console.log('Extracted text:', text);
      } catch (error) {
        console.error('Error reading PDF:', error);
        alert('Failed to read PDF file');
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  if (!courseData) {
    return <div>Loading course data...</div>;
  }

  return (
    <div className="course-page">
      <Sidebar />
      <main className="course-main-content">
        <h1 className="page-title">{courseData.name}</h1>
        
        <section className="course-info card">
          <h2>{courseData.name}</h2>
          <p className="instructor">Instructor: {courseData.instructor}</p>
          <p className="description">{courseData.description}</p>
          <div className="progress-bar">
            <div className="progress" style={{width: `${courseData.progress}%`}}></div>
          </div>
          <p className="progress-text">Progress: {courseData.progress}%</p>
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileUpload} 
            ref={fileInputRef}
            style={{display: 'none'}}
          />
          <button 
            className="upload-homework" 
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Homework
          </button>
          {pdfText && (
            <div className="pdf-text">
              <h3>Extracted Text:</h3>
              <pre>{pdfText}</pre>
            </div>
          )}
        </section>
        
        <section className="quizzes card">
          <h2>Quizzes</h2>
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Quizzes
            </button>
            <button 
              className={`tab ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past Quiz Results
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'upcoming' ? (
              <ul className="quiz-list">
                {upcomingQuizzes.map(quiz => (
                  <li key={quiz.id} className="quiz-item">
                    <span className="quiz-name">{quiz.name}</span>
                    <span className="quiz-date">{quiz.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="quiz-list">
                {pastQuizzes.map(quiz => (
                  <li key={quiz.id} className="quiz-item">
                    <span className="quiz-name">{quiz.name}</span>
                    <span className="quiz-date">{quiz.date}</span>
                    <span className="quiz-score">Score: {quiz.score}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        
        <section className="course-group card">
          <h2>Course Group</h2>
          <p className="group-name">MATH 101 Study Group</p>
          <p className="group-info">15 members • Last active 2 hours ago</p>
          <button className="join-btn">Join Group</button>
        </section>
      </main>
    </div>
  );
};

export default CoursePage;