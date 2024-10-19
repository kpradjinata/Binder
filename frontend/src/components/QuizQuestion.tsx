import React from 'react';

interface QuizQuestionProps {
  questionNumber: number;
  question: string;
  options: string[];
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string;
  isSubmitted: boolean;
  correctAnswer: string;
}

const questionCardStyle: React.CSSProperties = {
  backgroundColor: '#1e1e1e',
  border: '2px solid #333',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '30px',
  boxShadow: '0 2px 4px rgba(255,255,255,0.1)',
};

const questionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  color: '#e0e0e0',  // Changed from '#bb86fc' to '#e0e0e0'
  fontSize: '1.2em',
  marginBottom: '15px',
};

const answerOptionsStyle: React.CSSProperties = {
  listStyleType: 'none',
  padding: 0,
};

const answerOptionStyle: React.CSSProperties = {
  marginBottom: '10px',
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: '#e0e0e0',
};

const inputStyle: React.CSSProperties = {
  marginRight: '10px',
  accentColor: '#bb86fc',
};

const correctStyle: React.CSSProperties = {
  color: '#03dac6',
  marginLeft: '10px',
  fontWeight: 'bold',
};

const incorrectStyle: React.CSSProperties = {
  color: '#cf6679',
  marginLeft: '10px',
  fontWeight: 'bold',
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questionNumber,
  question,
  options,
  onAnswerSelect,
  selectedAnswer,
  isSubmitted,
  correctAnswer
}) => {
  return (
    <div style={questionCardStyle}>
      <h3 style={questionTitleStyle}>{questionNumber}. {question}</h3>
      <div style={answerOptionsStyle}>
        {options.map((option, index) => (
          <div key={index} style={answerOptionStyle}>
            <label style={labelStyle}>
              <input
                type="radio"
                name={`question-${questionNumber}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onAnswerSelect(option)}
                disabled={isSubmitted}
                style={inputStyle}
              />
              <span>{option}</span>
            </label>
            {isSubmitted && option === correctAnswer && <span style={correctStyle}>✓</span>}
            {isSubmitted && option === selectedAnswer && option !== correctAnswer && <span style={incorrectStyle}>✗</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;