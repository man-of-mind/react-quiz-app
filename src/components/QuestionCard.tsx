import React from "react";

interface Props {
    question: string,
    answers: string[],
    callback: any;
    userAnswer: any,
    questionNumber: number,
    totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({ 
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestions
}) => {
    return(
        <>
        <p className="current-question"> 
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
        <div>
            {answers.map(answer => (<div key={answer}>
                <button disabled={userAnswer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
            </div>))}
        </div>
        </>
    );
}

export default QuestionCard;