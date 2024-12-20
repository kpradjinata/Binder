import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import '../styles/CoursePage.css';
import { useParams } from 'react-router-dom';
import PDFToText from 'react-pdftotext';
import { useMutation, useQuery } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../convex/_generated/api';

interface CourseData {
  name: string;
  instructor: string;
  description: string;
  progress: number;
  image?: string;
}

const CoursePage: React.FC = () => {
  const { courseName } = useParams<{ courseName: string }>();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [pdfText, setPdfText] = useState('');
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [englishImage, setEnglishImage] = useState<string>("/english.jpg");
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [quizButtonVisible, setQuizButtonVisible] = useState(false);
  const navigate = useNavigate();


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
      const mockCourseData: Record<string, CourseData> = {
        'english': {
          name: 'English',
          instructor: 'Alphonso Thompson',
          description: 'Comprehensive English language and literature course.',
          progress: 77,
          image: englishImage
        },
        'math': {
          name: 'Math',
          instructor: 'Prof.Oakland',
          description: 'Advanced mathematics covering algebra, calculus, and more.',
          progress: 96
        },
        'hist-107': {
          name: 'HIST-107',
          instructor: 'Prof. Falck',
          description: 'In-depth study of world history.',
          progress: 0
        },
        'physics': {
          name: 'Physics-121',
          instructor: 'Prof. Einstein',
          description: 'Study of Waves and Electromagnetism',
          progress: 85
        },
        'chemistry': {
          name: 'Chem-113',
          instructor: 'Prof. Curie',
          description: 'Advanced Mechanistic Organic Chemsitry',
          progress: 62
        },
        'computer-science': {
          name: 'CS-170',
          instructor: 'Prof. Turing',
          description: 'Efficient Algorithms',
          progress: 90
        }
      };

      const data = mockCourseData[courseName || ''] || null;
      setCourseData(data);
    };

    fetchCourseData();
  }, [courseName, englishImage]);

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
        'physics': {
          name: 'Physics-121',
          instructor: 'Dr. Einstein',
          description: 'Study of Waves and Electromagnetism',
          progress: 85
        },
        'chemistry': {
          name: 'Chem-113',
          instructor: 'Prof Curie',
          description: 'Advanced Mechanistic Organic Chemsitry',
          progress: 62
        },
        'computer-science': {
          name: 'CS-170',
          instructor: 'Dr. Turing',
          description: 'Efficient Algorithms',
          progress: 90
        }
      };

      // Get the course data based on the URL parameter
      const data = mockCourseData[courseName || ''] || null;
      setCourseData(data);
    };

    fetchCourseData();
  }, [courseName]);

  const getAllStudentQuizResFirst = useQuery(api.student_quiz_res.getAllStudentQuizResFirst);
  const getAllStudentQuizResSecond = useQuery(api.student_quiz_res.getAllStudentQuizResSecond);
  const getAllStudentQuizResThird = useQuery(api.student_quiz_res.getAllStudentQuizResThird);


  // Create a post request to group students based on quiz results
  console.log(getAllStudentQuizResFirst);

  // useEffect(() => {
  //   if (getAllStudentQuizResFirst && getAllStudentQuizResSecond && getAllStudentQuizResThird) {
  //     fetch("http://localhost:5001/group_students", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify([
  //         getAllStudentQuizResFirst,
  //         getAllStudentQuizResSecond,
  //         getAllStudentQuizResThird
  //       ]),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Grouped students:", data);
  //       })
  //       .catch((error) => {
  //         console.error("Error grouping students:", error);
  //       });
  //   }
  // }, [getAllStudentQuizResFirst, getAllStudentQuizResSecond, getAllStudentQuizResThird]);


  //   console.log(getAllStudentQuizResFirst);
  //   fetchCourseData();
  // }, [courseName]);

  const createHomework = useMutation(api.homeworks.createHomework);
  const createQuiz = useMutation(api.quizzes.createQuiz);
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      try {
        const text = await PDFToText(file);
        setShowQuizPopup(true);
        fetch("http://localhost:8080/analyze_text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }),
        }).then((res) => {
          res.json().then((data) => {
            console.log(data["answers"]);
            const questions: string[] = data["questions"];
            const answers: string[] = data["answers"];
            const hints: string[] = data["hints"];
            const options: string[][] = data["options"];
            createHomework({
              subject: "EECS",
              courseNumber: "16",
              name: "Homework 1",
              questions: questions,
              hints: hints,
            })
            createQuiz({
              subject: "EECS",
              courseNumber: "16",
              name: "Quiz 1",
              questions: questions,
              answerOptions: options,
              answers: answers,
            })
          })
        })

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

  const handleTakeQuiz = () => {
    setShowQuizPopup(false);
    navigate('/quiz');
  };

  const handleSkipQuiz = () => {
    setShowQuizPopup(false);
    setQuizButtonVisible(true);
  };



  return (
    <div className="course-page">
      <Sidebar />
      <main className="course-main-content">
        {/* <h1 className="page-title">{courseName}</h1> */}

        {/* <section className="add-course card"> */}


        {/* <section className="add-course card">

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


        </section> */}

        <h1 className="page-title">{courseData.name}</h1>

        <section className="course-info card">
          <h2>{courseData.name}</h2>
          {courseData.image && (
            <img src={courseData.image} alt={courseData.name} className="course-page-image" />
          )}
          <p className="instructor">Instructor: {courseData.instructor}</p>
          <p className="description">{courseData.description}</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${courseData.progress}%` }}></div>
          </div>
          <p className="progress-text">Progress: {courseData.progress}%</p>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button
            className="upload-homework"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Homework
          </button>
          {showQuizPopup && (
            <div className="quiz-popup">
              <p>Do you want to take the quiz now?</p>
              <button onClick={handleTakeQuiz}>Yes</button>
              <button onClick={handleSkipQuiz}>No</button>
            </div>
          )}
          {quizButtonVisible && (
            <button className="take-quiz-btn" onClick={() => navigate('/quiz')}>
              Take Quiz
            </button>
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
