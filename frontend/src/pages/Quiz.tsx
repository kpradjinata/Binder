import React, { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';

interface QuizData {
  questions: string[];
  options: string[][];
  answers: string[];
}

const quizData: QuizData = {
  questions: [
    "What is 5 + 3?",
    "What is the square root of 16?",
    "Solve for x: 2x + 3 = 7",
    "What is the value of π (Pi) rounded to two decimal places?",
    "What is 9 * 6?",
    "What is the derivative of x^2?",
    "What is the value of cos(0)?",
    "What is 15 % 4 (15 modulo 4)?",
    "What is the sum of angles in a triangle?",
    "What is the area of a circle with radius 3?"
  ],
  options: [
    ["6", "7", "8", "9"],
    ["2", "3", "4", "5"],
    ["x = 1", "x = 2", "x = 3", "x = 4"],
    ["3.12", "3.14", "3.16", "3.18"],
    ["42", "48", "54", "56"],
    ["x", "2x", "2", "x^2"],
    ["0", "1", "-1", "undefined"],
    ["1", "2", "3", "4"],
    ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
    ["9π", "12π", "18π", "36π"]
  ],
  answers: ["8", "4", "x = 2", "3.14", "54", "2x", "1", "3", "180 degrees", "9π"]
};

const quizStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#121212',
  color: '#e0e0e0',
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: '#e0e0e0',
  color: '#000',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '20px',
};

const quizResultsStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  border: '2px solid #bb86fc',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '30px',
};

const Quiz: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(quizData.questions.length).fill(''));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    const unansweredQuestions = userAnswers.filter(answer => answer === '').length;

    if (unansweredQuestions > 0) {
      const confirmSubmit = window.confirm(
        `You haven't answered all questions. There are ${unansweredQuestions} unanswered questions. Do you want to submit anyway?`
      );
      if (!confirmSubmit) {
        return;
      }
    }

    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === quizData.answers[index]) {
        correctAnswers++;
      }
    });
    return `${correctAnswers}/${quizData.questions.length}`;
  };

  return (
    <div style={quizStyle}>
      <h2 style={{ color: '#e0e0e0' }}>Canvas-Style Quiz</h2>
      {quizData.questions.map((question, index) => (
        <QuizQuestion
          key={index}
          questionNumber={index + 1}
          question={question}
          options={quizData.options[index]}
          onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
          selectedAnswer={userAnswers[index]}
          isSubmitted={quizSubmitted}
          correctAnswer={quizData.answers[index]}
        />
      ))}
      {!quizSubmitted && (
        <button style={submitButtonStyle} onClick={handleSubmitQuiz}>Submit Quiz</button>
      )}
      {quizSubmitted && (
        <div style={quizResultsStyle}>
          <h3 style={{ color: '#e0e0e0' }}>Quiz Completed!</h3>
          <p>Your score: {calculateScore()}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;