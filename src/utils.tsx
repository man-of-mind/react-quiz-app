export interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState =  Question & { answers: string[], status: boolean };

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const fetchQuestions = async (total: number, difficulty: Difficulty) => {
    const apiEndpoint = `https://opentdb.com/api.php?amount=${total}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(apiEndpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
        status: false
    }));
}