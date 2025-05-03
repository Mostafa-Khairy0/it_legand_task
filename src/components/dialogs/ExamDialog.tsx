import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  ExamButton,
  QuestionsCarousel,
  DialogTitle,
  SendExamButton,
} from "@/components";
import { useAppSelector, useBoolean, useClock } from "@/hooks";
import { selectExamById } from "@/store";
import { formatClock } from "@/utils";
import { AlarmClock } from "lucide-react";

export const ExamDialog = ({ examId }: { examId: number }) => {
  const [open, { on, off }] = useBoolean();
  const [timeEnd, { on: onTimeEnd }] = useBoolean(false);
  const exam = useAppSelector(selectExamById(examId));
  const clock = useClock({
    durationInSeconds: exam.durationInMinutes * 60,
    onFinish: onTimeEnd,
  });

  return (
    <Dialog open={open} onOpenChange={(open) => (open ? on() : off())}>
      <DialogTrigger asChild>
        <ExamButton examId={examId} onClick={on} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[unset] w-[auto]">
        <DialogTitle hidden>{`Exam ${exam.title}`}</DialogTitle>
        <DialogHeader className="flex flex-row justify-center items-center">
          <div className="w-[100px] flex flex-row justify-center items-center gap-[5px] bg-yellow-400 py-[5px] px-[10px] rounded-md">
            <AlarmClock size={20} className="w-1/3" />
            <div className="w-2/3 text-center">{formatClock(clock)}</div>
          </div>
        </DialogHeader>
        <QuestionsCarousel examId={examId} />
        <DialogFooter>
          <SendExamButton examId={examId} timeEnd={timeEnd} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
