import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector, useBoolean } from "@/hooks";
import { selectExamById } from "@/store";
import { FlaskConical } from "lucide-react";
import { MouseEventHandler } from "react";

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
      className="flex flex-row items-center justify-between px-[10px] py-[25px] w-full bg-[#00000000]"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-center gap-[5px]">
        <FlaskConical size={18} className="text-ring" />
        <div className="text-ring">{exam.title}</div>
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

export const ExamDialog = ({ examId }: { examId: number }) => {
  const [open, { on, off }] = useBoolean();
  return (
    <Dialog open={open} onOpenChange={(open) => (open ? on() : off())}>
      <DialogTrigger asChild>
        <ExamButton examId={examId} onClick={on} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {
              "Make changes to your profile here. Click save when you're done."
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
