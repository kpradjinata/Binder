import React, { useState, useRef, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import CourseOverview from "../components/CourseOverview";
import GroupSession from "../components/GroupSession";
import TrendingDiscussion from "../components/TrendingDiscussion";
import UpcomingEvents from "../components/UpcomingEvents";
import InboxPopup from "../components/InboxPopup";
import '../styles/Dashboard.css';
import PDFToText from 'react-pdftotext';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

interface Course {
  name: string;
  instructor: string;
  progress: number;
  image?: string;
  description?: string;
}

const Dashboard: React.FC = () => {
  const [englishImage, setEnglishImage] = useState<string>("/english.jpg");
  const [courses, setCourses] = useState<Course[]>([
    { 
      name: 'English', 
      instructor: 'Alphonso Thompson', 
      progress: 77, 
      image: englishImage,
      description: 'Comprehensive English language and literature course.'
    },
    { 
      name: 'Math', 
      instructor: 'Oakland', 
      progress: 96,
      description: 'Advanced mathematics covering algebra, calculus, and more.'
    },
    { 
      name: 'HIST-107', 
      instructor: 'Mr. Falck', 
      progress: 0,
      description: 'In-depth study of world history.'
    },
  ]);

  const [activeTab, setActiveTab] = useState('upcoming');
  const [pdfText, setPdfText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createHomework = useMutation(api.homeworks.createHomework);
  const createQuiz = useMutation(api.quizzes.createQuiz);

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      try {
        const text = await PDFToText(file);

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
              id: "hwid",
              courseId: "test id",
              name: "Homework 1",
              questions: questions,
              hints: hints,
            })
            createQuiz({
              id: "quizid",
              courseId: "test id",
              name: "Quiz 1",
              description: "Quiz 1",
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

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="left-column">
          <CourseOverview />
          <UpcomingEvents />
          {pdfText && (
            <div className="pdf-text">
              <h3>Extracted Text:</h3>
              <pre>{pdfText}</pre>
            </div>
          )}
        </div>
        <div className="right-column">
          <GroupSession />
          <TrendingDiscussion />
          <div className="inbox">
            <h2 className="inbox-title">Inbox</h2>
            <InboxPopup />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;