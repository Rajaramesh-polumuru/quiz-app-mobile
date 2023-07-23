import { NextApiRequest, NextApiResponse } from "next";

export interface SubmittedAnswer {
  questionId: number;
  selectedOptionId: number;
}

export interface QuizResult {
  correctAnswers: number;
  wrongAnswers: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<QuizResult>
) {
  const { submittedAnswers }: { submittedAnswers: SubmittedAnswer[] } =
    req.body;

  const correctAnswers: SubmittedAnswer[] = [
    { questionId: 1, selectedOptionId: 2 },
    { questionId: 2, selectedOptionId: 3 },
    { questionId: 3, selectedOptionId: 2 },
    { questionId: 4, selectedOptionId: 2 },
    { questionId: 5, selectedOptionId: 3 },
  ];

  let correctCount = 0;
  let wrongCount = 0;

  submittedAnswers.forEach((submittedAnswer) => {
    const correctAnswer = correctAnswers.find(
      (answer) => answer.questionId === submittedAnswer.questionId
    );

    if (
      correctAnswer &&
      correctAnswer.selectedOptionId === submittedAnswer.selectedOptionId
    ) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const quizResult: QuizResult = {
    correctAnswers: correctCount,
    wrongAnswers: wrongCount,
  };

  res.status(200).json(quizResult);
}
