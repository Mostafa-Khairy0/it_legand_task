"use server";

import { prisma } from "@/lib/prisma";

type State = {
  success: boolean;
  message: string;
  errors?: string[];
  score?: number;
};

export type AnswerInput = {
  questionId: number;
  selectedAnswer: string;
};

export type SubmitAnswersParams = {
  userId: number;
  examId: number;
  answers: AnswerInput[];
};

export async function submitExamAnswers(
  _: State,
  { userId, answers, examId }: SubmitAnswersParams
) {
  try {
    let correctCount = 0;
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true },
    });
    const total = exam?.questions.length ?? 1;

    for (const { questionId, selectedAnswer } of answers) {
      const question = await prisma.question.findUnique({
        where: { id: questionId },
        select: { correctAnswer: true },
      });

      if (!question) continue;

      const isCorrect = selectedAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;

      await prisma.userAnswer.create({
        data: {
          userId,
          questionId,
          selectedAnswer,
          isCorrect,
        },
      });
    }

    return {
      success: true,
      message: formatScoreMessage(correctCount, total),
      score: Math.round((correctCount / total) * 100),
    };
  } catch (error) {
    console.error("Exam submission error:", error);
    return {
      success: false,
      message: "Internal server error",
      errors: ["Failed to process comment"],
    };
  }
}

const formatScoreMessage = (score: number, total: number): string => {
  const percentage = Math.round((score / total) * 100);

  if (percentage === 100)
    return `🎉 Perfect! You got ${score} out of ${total} - 100%!`;
  if (percentage >= 80)
    return `👏 Great job! You scored ${score} out of ${total} - ${percentage}%.`;
  if (percentage >= 50)
    return `👍 Not bad! You got ${score} out of ${total} - ${percentage}%. Keep practicing!`;

  return `💡 You scored ${score} out of ${total} - ${percentage}%. Don't give up, you'll improve!`;
};
