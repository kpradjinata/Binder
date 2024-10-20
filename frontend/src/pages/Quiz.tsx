import React, { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';
import '../styles/Quiz.css';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useEffect, useRef } from 'react';


interface QuizData {
  questions: string[];
  answerOptions: string[][];
  answers: string[];
}

const letterToIndexMap = new Map<string, number>([
  ['A', 0],
  ['B', 1],
  ['C', 2],
  ['D', 3]
]);

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
  answerOptions: [
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

const Quiz: React.FC = () => {
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(quizData?.questions.length || 0).fill(''));

  const quizDataRef = useRef<QuizData | null>(null);

  const fetchedQuiz: QuizData | undefined | null = useQuery(api.quizzes.getMostRecentQuiz);

  useEffect(() => {
    if (fetchedQuiz && !quizDataRef.current) {
      quizDataRef.current = fetchedQuiz;
      setQuizData(fetchedQuiz);
      console.log("Quiz data set:", fetchedQuiz);
      // Initialize userAnswers here if needed
      setUserAnswers(new Array(fetchedQuiz.questions?.length || 0).fill(''));
    }
  }, [fetchedQuiz]);


  // const quizzes = useQuery(api.quizzes.getMostRecentQuiz);
  // console.log(quizzes?.questions);


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
      console.log(quizData?.answers[index], answer);

      if (answer === quizData?.answerOptions[index][letterToIndexMap.get(quizData?.answers[index]) ?? 0]) {
        correctAnswers++;
      }
    });
    return `${correctAnswers}/${quizData?.questions.length}`;
  };

  return (
    <div className="quiz-container">
      <h2>Quiz (Number)</h2>
      {quizData?.questions.map((question, index) => (
        <QuizQuestion
          key={index}
          questionNumber={index + 1}
          question={question}
          answerOptions={quizData?.answerOptions[index]}
          onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
          selectedAnswer={userAnswers[index]}
          isSubmitted={quizSubmitted}
          correctAnswer={quizData?.answerOptions[index][letterToIndexMap.get(quizData?.answers[index]) ?? 0]}
        />
      ))}
      {!quizSubmitted && (
        <button className="submit-button" onClick={handleSubmitQuiz}>Submit Quiz</button>
      )}
      {quizSubmitted && (
        <div className="quiz-results">
          <h3>Quiz Completed!</h3>
          <p>Your score: {calculateScore()}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
