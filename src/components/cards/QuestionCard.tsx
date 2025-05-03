"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectQuestionById, updateQuestion } from "@/store";
import { Button } from "../ui";

export const QuestionCard = ({
  questionId,
  index,
  next,
}: {
  questionId: number;
  index: number;
  next: () => void;
}) => {
  const question = useAppSelector(selectQuestionById(questionId));

  return (
    <div className="flex flex-col justify-center items-center bg-foreground rounded-lg p-[20px] gap-[20px]">
      <div className="text-background w-full text-[24px] font-bold">{`${
        index + 1
      }. ${question.text}`}</div>
      <div className="flex flex-col gap-[20px] w-full ">
        {question?.choices?.map((choice: string, index: number) => (
          <AnswerBox
            key={index}
            choice={choice}
            questionId={questionId}
            selected={question.selected == choice}
            next={next}
          />
        ))}
      </div>
    </div>
  );
};

export const AnswerBox = ({
  questionId,
  selected,
  choice,
  next,
}: {
  questionId: number;
  selected: boolean;
  next: () => void;
  choice: string;
}) => {
  const dispatch = useAppDispatch();

  const onSelect = () => {
    dispatch(
      updateQuestion({
        id: questionId,
        changes: {
          selected: choice,
        },
      })
    );
    setTimeout(next, 500);
  };

  return (
    <Button
      onClick={onSelect}
      className={`bg-${selected ? "card" : "primary"} text-${
        selected ? "card-foreground" : "primary-foreground"
      }  hover:bg-${
        selected ? "card" : "primary"
      } p-[10px] w-full h-[auto] text-wrap break-words whitespace-normal cursor-pointer`}
    >
      <div className="text-[18px]">{choice}</div>
    </Button>
  );
};
