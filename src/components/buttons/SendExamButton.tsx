"use client";
import { selectExamById } from "@/store";
import { Button } from "../ui";
import { useAppSelector, useBoolean, useToast } from "@/hooks";
import { useActionState, useEffect, useTransition } from "react";
import { submitExamAnswers } from "@/app/actions";
import { useSuccess } from "@/hooks/useSuccess";

const initialState = {
  success: false,
  error: [],
  score: 0,
  message: "⏳ Submitting your exam... Please wait a moment",
};

export const SendExamButton = ({
  examId,
  timeEnd,
}: {
  examId: number;
  timeEnd: boolean;
}) => {
  const exam = useAppSelector(selectExamById(examId));
  const questions = useAppSelector((state) => state.questions.entities);
  const [isFinished, { on, off }] = useBoolean();
  const [state, formAction] = useActionState(submitExamAnswers, initialState);
  const [isPending, startTransition] = useTransition();
  const { loading, success, error } = useToast();
  const successAnimation = useSuccess();

  useEffect(() => {
    let answerd = 0;
    exam?.questions?.map((id) => {
      if (questions[id]?.selected) answerd++;
    });
    if (answerd == exam?.questions?.length) on();
    else off();
  }, [questions, exam, on, off]);

  const submitExam = () => {
    loading(state.message);
    startTransition(() => {
      formAction({
        userId: 1,
        examId,
        answers: exam?.questions?.map((id) => ({
          questionId: id,
          selectedAnswer: `${questions[id].selected}`,
        })),
      });
    });
  };

  useEffect(() => {
    if (!isPending)
      if (state.success) {
        success(state.message, { duration: 5000 });
        if (typeof state?.score == "number" && state?.score > 50)
          successAnimation?.play(3);
      } else if (state.errors) error(state.message);
  }, [state, isPending]);

  useEffect(() => {
    if (timeEnd) submitExam();
  }, [timeEnd]);

  return (
    <Button type="submit" disabled={!isFinished} onClick={() => submitExam()}>
      🚀 Turn In Exam
    </Button>
  );
};
