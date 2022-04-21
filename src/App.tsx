import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './utils';
import styles from "./App.module.scss"


const TOTAL_QUESTIONS = 4;

export interface Answer {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
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
    if (!endGame) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setEndGame(true);
    }
    setNumber(nextQuestion)
  }

  return (
    <div className={styles["App"]}>
      <div className={styles['container']}>
        <h1>REACT QUIZ</h1>
        {endGame || userAnswers.length === TOTAL_QUESTIONS ? 
          <button className={styles['start']} onClick={startQuiz}>
            Start
          </button> : null}
        <div className={styles['score-questions-container']}>
          {!endGame ? <p className={styles['score']}>Score: {score}</p> : null}
          {!loading && !endGame ? <p className={styles["current-question"]}> 
            Question: {number + 1} / {TOTAL_QUESTIONS}
          </p> : null}
        </div>
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !endGame ? 
          <QuestionCard 
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}/> : null }
        {!endGame && !loading && userAnswers.length === number + 1 && 
          number !== TOTAL_QUESTIONS - 1 ? 
            <button className={styles['next']} onClick={nextQuestion}>Next Question</button>
            : null }
      </div>
    </div>
  );
}

export default App;
