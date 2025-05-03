import { useAppSelector } from "@/hooks";
import { selectLessonById, selectUnitById } from "@/store";
import { NotebookText, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";

export const LessonButton = ({ lessonId }: { lessonId: number }) => {
  const lesson = useAppSelector(selectLessonById(lessonId));
  const unit = useAppSelector(selectUnitById(lesson.unitId));
  return (
    <Link href={`/course/${unit.courseId}/unit/${unit.id}/lesson/${lessonId}`}>
      <Button
        variant="ghost"
        className="flex flex-row items-center justify-between px-[10px] py-[25px] w-full bg-[#00000000]"
      >
        <div className="flex flex-row items-center justify-center gap-[5px]">
          <NotebookText size={18} className="text-ring" />
          <div className="text-ring">{lesson.title}</div>
        </div>
        <LockKeyhole size={18} className="text-ring" />
      </Button>
    </Link>
  );
};
