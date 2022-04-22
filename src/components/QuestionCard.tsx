import React from "react";
import { Answer } from "../App";
import styles from "./questionCard.module.scss";

interface Props {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: Answer | undefined,
}

const QuestionCard: React.FC<Props> = ({ 
    question, 
    answers, 
    callback, 
    userAnswer, 
}) => {
    return(
        <>
        <p className={styles['question']} dangerouslySetInnerHTML={{ __html: question }}></p>
        <div>
            {answers.map(answer => (<div key={answer}>
                <button disabled={userAnswer ? true: false} value={answer} onClick={callback} className={styles['options']}>
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
            </div>))}
        </div>
        </>
    );
}

export default QuestionCard;