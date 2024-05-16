
import React, { useEffect, useState } from 'react';
import './Ques.css';
import questionsData from './Question.json';

export default function Main() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questionsData[currentQuestion].correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div className='quizapp'>
      {showScore ? (
        <div className='scoresection'>
          <h2>Your Score: {score}/{questionsData.length}</h2>
          <button onClick={restart}>Restart</button>
        </div>
      ) : (
        <div className='questionsection'>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questionsData[currentQuestion].question}</p>
          <div className='options'>
            {questionsData[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className='timer'>
            Time left: <span>{timer}s</span>
          </div>
        </div>
      )}
    </div>
  );
}
