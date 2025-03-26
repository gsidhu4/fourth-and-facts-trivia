import React, { useEffect, useState } from 'react';
import './styles.css';
import confetti from 'canvas-confetti';

import bg1 from './images/wallpaper1.jpg';
import bg2 from './images/wallpaper2.jpg';
import bg3 from './images/wallpaper3.jpg';
import bg4 from './images/wallpaper4.jpg';
import bg5 from './images/wallpaper5.jpg';
import bg6 from './images/wallpaper6.jpg';
import bg7 from './images/wallpaper7.jpg';

const backgrounds = [bg1,bg2,bg3,bg4,bg5,bg6,bg7];

const isSameDay = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [background, setBackground] = useState(bg1); 

  useEffect(() => {
    const lastPlayed = localStorage.getItem('lastPlayed');
    const today = new Date();

    if (lastPlayed && isSameDay(new Date(lastPlayed), today)) {
      setFinished(true);
    } else {
      fetch('http://localhost:5000/api/questions/daily')
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data);
          localStorage.setItem('lastPlayed', today.toISOString());
        })
        .catch((err) => console.error('Failed to load questions', err));
    }
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % backgrounds.length;
      setBackground(backgrounds[index]);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);


  const handleAnswer = (choice) => {
    const isCorrect = choice === questions[current].correct_answer;
    if (isCorrect) setScore((prev) => prev + 1);
  
    const next = current + 1;
  
    if (next < questions.length) {
      setCurrent(next);
    } else {
      if (isCorrect && score + 1 === questions.length) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
      setFinished(true);
    }
  };
  

  const shareScore = () => {
    const text = `I scored ${score}/${questions.length} on Fourth and Facts! 🏈`;
    if (navigator.share) {
      navigator.share({ title: 'Fourth and Facts', text });
    } else {
      alert(text);
    }
  };

  
  return (
    <div
      className="app-background"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <header className="header">
          <h1> Fourth and Facts🏈 </h1>
        </header>
        <main className="main">
          {!finished ? (
            questions.length > 0 ? (
              <div className="card">
                <h2 className="question">{questions[current].question}</h2>
                <div className="choices">
                  {questions[current].choices.map((choice, idx) => (
                    <button
                      key={idx}
                      className="choice-btn"
                      onClick={() => handleAnswer(choice)}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                <p className="progress">
                  Question {current + 1} of {questions.length}
                </p>
              </div>
            ) : (
              <p className="loading">Loading questions...</p>
            )
          ) : questions.length > 0 ? (
            <div className="card">
              <h2 className="score">
                You scored {score}/{questions.length}!!
              </h2>
              <button className="share-btn" onClick={shareScore}>
                Share Your Score
              </button>
            </div>
          ) : (
            <div className="card">
              <h2 className="score">🎉 You already played today!</h2>
              <p className="progress">
                Come back tomorrow for new trivia questions 🏈
              </p>
            </div>
          )}
        </main>
        <footer className="footer">
          <p>&copy; 2024 Fourth and Facts</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
