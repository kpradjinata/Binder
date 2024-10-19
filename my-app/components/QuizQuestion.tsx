import React from 'react';
import '../styles/QuizQuestion.css';

interface QuizQuestionProps {
    questionNumber: number;
    question: string;
    options: string[];
    onAnswerSelect: (answer: string) => void;
    selectedAnswer: string;
    isSubmitted: boolean;
    correctAnswer: string;
}

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
        <div className="question-card">
            <h3 className="question-title">{questionNumber}. {question}</h3>
            <div className="answer-options">
                {options.map((option, index) => (
                    <div key={index} className="answer-option">
                        <label className="label">
                            <input
                                type="radio"
                                name={`question-${questionNumber}`}
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => onAnswerSelect(option)}
                                disabled={isSubmitted}
                                className="input"
                            />
                            <span>{option}</span>
                        </label>
                        {isSubmitted && option === correctAnswer && <span className="correct">✓</span>}
                        {isSubmitted && option === selectedAnswer && option !== correctAnswer && <span className="incorrect">✗</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizQuestion;