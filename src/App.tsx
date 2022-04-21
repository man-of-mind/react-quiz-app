import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './utils';


const TOTAL_QUESTIONS = 10;

interface Answer {
  quetion: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const[score, setScore] = useState(0);
  const [endGame, setEndGame] = useState(true);



  const startQuiz = async () => {
    setLoading(true);
    setEndGame(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0)
    setUserAnswers([]);
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {endGame || userAnswers.length === TOTAL_QUESTIONS ? 
        <button className='start' onClick={startQuiz}>
          Start
        </button> : null}
      {!endGame ? <p className='score'>Score: </p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !endGame ? 
        <QuestionCard 
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}/> : null }
      {!endGame && !loading && userAnswers.length === number + 1 && 
        number !== TOTAL_QUESTIONS - 1 ? 
          <button className='next' onClick={nextQuestion}>Next Question</button>
          : null }
    </div>
  );
}

export default App;
