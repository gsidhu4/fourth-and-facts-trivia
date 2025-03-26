import React from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const handleClick = (choice) => {
    const isCorrect = choice === question.correct_answer;
    onAnswer(isCorrect);
  };

  return (
    <div className="question-card">
      <h2>{question.question}</h2>
      {question.choices.map(choice => (
        <button key={choice} onClick={() => handleClick(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;