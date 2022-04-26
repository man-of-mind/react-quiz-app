import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './utils';
import styles from "./App.module.scss"
import Timer from './components/Timer';
import ReactDOM from "react-dom";


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
  const [answeredStatus, setStatus] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [answeredQues, setAnsweredQues] = useState(0);



  const startQuiz = async () => {
    setNewGame(false);
    setLoading(true);
    setEndGame(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0)
    setUserAnswers([]);
    setNumber(0)
    setAnsweredQues(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (questions[number].status === false) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      questions[number].status = true;
      if(correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setStatus(true);
      setAnsweredQues(prev => prev + 1);
      setUserAnswers((prev) => [...prev, answerObject]);
    }
    console.log(userAnswers.length)
    if (userAnswers.length === TOTAL_QUESTIONS - 1) {
      console.log(userAnswers.length)
      setNewGame(true);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setEndGame(true);
    }
    setNumber(nextQuestion)
  }

  const prevQuestion = () => {
    if (number !== 0){
      setNumber(number - 1);
    }
  }

  const element = <Timer time={10} />
  console.log(element.type)
 
  //ReactDOM.findDOMNode(element)
  
  return ( <>{newGame ? 
    <div>
      <h2>Congrats...</h2>
      <p>You answered {score} questions!</p>
      <button className={styles['start']} onClick={startQuiz}>
            Play Again
      </button>
    </div> :
    <div className={styles["App"]}>
      <div className={styles['container']}>
        <h1>REACT QUIZ</h1>
        {endGame || userAnswers.length === TOTAL_QUESTIONS ? 
          <button className={styles['start']} onClick={startQuiz}>
            Start
          </button> : null}
        <div className={styles['score-questions-container']}>
          {!endGame ? <>
            <p className={styles['score']}>Score: {score} / {answeredQues}</p> 
            <Timer time={60} /></> : null
          }
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
        <div className={styles['buttons']}>
          {!loading && userAnswers.length > 0  && number > 0?
            <button className={styles['next-prev']} 
            onClick={prevQuestion}>Previous Question
            </button> : null
          }
          {!endGame && !loading && answeredStatus === true && number !== TOTAL_QUESTIONS - 1  ? 
              <button disabled={!questions[number].status} className={styles['next-prev']} onClick={nextQuestion}>Next Question</button>
              : null 
          }
        </div>
      </div>
    </div>
    }</>
  );
}

export default App;
