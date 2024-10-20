import React, { useState, useRef } from 'react';
import Sidebar from "../components/Sidebar";
import '../styles/CoursePage.css';
import { useParams } from 'react-router-dom';
import PDFToText  from 'react-pdftotext';

const CoursePage: React.FC = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const [subject, setSubject] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pdfText, setPdfText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upcomingQuizzes = [
    { id: 1, name: 'Midterm Exam', date: 'Oct 15, 2024' },
    { id: 2, name: 'Chapter 5 Quiz', date: 'Oct 22, 2024' },
  ];

  const pastQuizzes = [
    { id: 1, name: 'Chapter 3 Quiz', date: 'Sept 30, 2024', score: '85%' },
    { id: 2, name: 'Pop Quiz', date: 'Oct 5, 2024', score: '92%' },
  ];

  const handleAddCourse = () => {
    console.log(`Adding course: ${subject} ${courseNumber}`);
    // Implement course addition logic here
  };

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


  return (
    <div className="course-page">
      <Sidebar />
      <main className="course-main-content">
        <h1 className="page-title">{courseName}</h1>
        
        <section className="add-course card">
          <h2>Add Course</h2>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Number"
            value={courseNumber}
            onChange={(e) => setCourseNumber(e.target.value)}
          />
          <button onClick={handleAddCourse}>Add Course</button>
        </section>
        
        <section className="course-info card">
          <h2>MATH 101: Calculus I</h2>
          <p className="instructor">Instructor: Dr. Jane Smith</p>
          <p className="description">Introduction to differential and integral calculus.</p>
          <div className="progress-bar">
            <div className="progress" style={{width: '70%'}}></div>
          </div>
          <p className="progress-text">Progress: 70%</p>
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