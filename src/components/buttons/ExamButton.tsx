import { useAppSelector } from "@/hooks";
import { selectExamById } from "@/store";
import { FlaskConical } from "lucide-react";
import { MouseEventHandler } from "react";
import { Button } from "../ui";

export const ExamButton = ({
  examId,
  onClick,
}: {
  examId: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const exam = useAppSelector(selectExamById(examId));
  return (
    <Button
      variant="ghost"
      className="flex flex-row flex-wrap items-center justify-between px-[10px] w-full bg-[#00000000] h-[auto]"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-center gap-[5px]">
        <FlaskConical size={18} className="text-ring" />
        <div className="text-ring text-wrap break-words whitespace-normal ">
          {exam.title}
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-[5px] max-w-[200px] justify-end">
        <div className="text-chart-2 bg-green-200 p-[5px] rounded-sm">
          {exam?.questions?.length ?? 0} Questions
        </div>
        <div className="text-destructive bg-red-200 p-[5px] rounded-sm">
          {exam?.durationInMinutes ?? 0} Minutes
        </div>
      </div>
    </Button>
  );
};
