import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/QuizQuestion';
import '../styles/Quiz.css';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

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

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [groupsGenerated, setGroupsGenerated] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const fetchedQuiz: QuizData | undefined | null = useQuery(api.quizzes.getMostRecentQuiz);

  const createStudentQuizResFirst = useMutation(api.student_quiz_res.createStudentQuizResFirst);
  const createStudentQuizResSecond = useMutation(api.student_quiz_res.createStudentQuizResSecond);
  const createStudentQuizResThird = useMutation(api.student_quiz_res.createStudentQuizResThird);

  const createGroup = useMutation(api.groups.createGroup);
  const addMemberToGroup = useMutation(api.groups.addMemberToGroup);

  const studentQuizResFirst = useQuery(api.student_quiz_res.getAllStudentQuizResFirst);
  const studentQuizResSecond = useQuery(api.student_quiz_res.getAllStudentQuizResSecond);
  const studentQuizResThird = useQuery(api.student_quiz_res.getAllStudentQuizResThird);

  useEffect(() => {
    if (fetchedQuiz) {
      setQuizData(fetchedQuiz);
      setUserAnswers(new Array(fetchedQuiz.questions?.length || 0).fill(''));
    }
  }, [fetchedQuiz]);

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
    calculateScore();
    generateGroups();

    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // 3 second delay, adjust as needed
  };

  const generateGroups = () => {
    fetch('http://localhost:5001/group_students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        studentQuizResFirst,
        studentQuizResSecond,
        studentQuizResThird,
      ])
    }).then(res => res.json()).then(data => {
      console.log('Received data:', data);

      // Create all groups first
      const groupPromises = data.map(group =>
        createGroup({ groupNumber: group.group_number })
      );

      // Wait for all groups to be created
      Promise.all(groupPromises).then(groupIds => {
        // Now add members to groups
        const memberPromises = data.flatMap((group, index) =>
          group.members.map(member =>
            addMemberToGroup({
              groupId: groupIds[index],
              name: member.name,
              skills: member.skills
            })
          )
        );

        // Wait for all members to be added
        return Promise.all(memberPromises);
      }).then(() => {
        console.log('All groups and members added');
        setGroupsGenerated(true);
      }).catch(error => {
        console.error('Error creating groups or adding members:', error);
      });
    });
  }

  const calculateScore = () => {
    let correctAnswers = 0;
    userAnswers.forEach((answer, index) => {
      if (quizData && quizData.answerOptions[index] && quizData.answers[index]) {
        if (answer === quizData.answerOptions[index][letterToIndexMap.get(quizData.answers[index]) ?? 0]) {
          if (0 <= index && index <= 2) {
            createStudentQuizResFirst({
              questionIndex: index,
              isCorrect: 1,
            });
          } else if (3 <= index && index <= 5) {
            createStudentQuizResSecond({
              questionIndex: index,
              isCorrect: 1,
            });
          } else {
            createStudentQuizResThird({
              questionIndex: index,
              isCorrect: 1,
            });
          }
          correctAnswers++;
        } else {
          if (0 <= index && index <= 2) {
            createStudentQuizResFirst({
              questionIndex: index,
              isCorrect: 0,
            });
          } else if (3 <= index && index <= 5) {
            createStudentQuizResSecond({
              questionIndex: index,
              isCorrect: 0,
            });
          } else {
            createStudentQuizResThird({
              questionIndex: index,
              isCorrect: 0,
            });
          }
        }
      }
    });
    return `${correctAnswers}/${quizData?.questions.length}`;
  };

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.");
    if (confirmExit) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
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
          {groupsGenerated ? (
            <p>Groups have been generated based on your results.</p>
          ) : (
            <p>Generating groups based on your results...</p>
          )}
        </div>
      )}

      {/* New Exit button */}
      <button className="exit-button" onClick={handleExit}>
        Exit to Dashboard
      </button>
    </div>
  );
};

export default Quiz;
