"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from "@/components";
import { useAppSelector, useBoolean } from "@/hooks";
import { selectUnitById, selectLessonById, selectExamById } from "@/store";
import { FlaskConical, LockKeyhole, NotebookText } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { ExamDialog } from "../dialogs/ExamDialog";

export const UnitCard = ({
  unitId,
  lessonId,
}: {
  unitId: number;
  lessonId: number;
}) => {
  const unit = useAppSelector(selectUnitById(unitId));
  const [isOpen, { toggle, on }] = useBoolean(false);

  useEffect(() => {
    if (unit?.lessons.includes(lessonId)) on();
  }, [unit, lessonId, on]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{unit?.title}</CardTitle>
          <CardDescription>{unit.description}</CardDescription>
        </div>
        <PlusButton isOpen={isOpen} toggle={toggle} />
      </CardHeader>
      {isOpen && (
        <Fragment>
          <CardContent>
            {unit.lessons.map((lessonId) => (
              <Fragment key={lessonId}>
                <LessonField lessonId={lessonId} key={lessonId} />
                <Separator orientation="horizontal" />
              </Fragment>
            ))}
            {unit.examId && <ExamDialog examId={unit.examId} />}
          </CardContent>
        </Fragment>
      )}
    </Card>
  );
};

export const LessonField = ({ lessonId }: { lessonId: number }) => {
  const lesson = useAppSelector(selectLessonById(lessonId));
  const unit = useAppSelector(selectUnitById(lesson.unitId));
  return (
    <Link
      href={`/course/${unit.courseId}/unit/${unit.id}/lesson/${lessonId}`}
      className="flex flex-row items-center justify-between p-[10px]"
    >
      <div className="flex flex-row items-center justify-center gap-[5px]">
        <NotebookText size={18} className="text-ring" />
        <div className="text-ring">{lesson.title}</div>
      </div>
      <LockKeyhole size={18} className="text-ring" />
    </Link>
  );
};

export const ExamField = ({ examId }: { examId: number }) => {
  const exam = useAppSelector(selectExamById(examId));
  return (
    <div className="flex flex-row items-center justify-between p-[10px]">
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
    </div>
  );
};

const PlusButton = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <div
      onClick={toggle}
      className="w-[20px] h-[20px] flex justify-center items-center relative"
    >
      <div className="absolute rotate-0 w-[20px] h-[3px] rounded-full bg-ring"></div>
      <div
        className={`absolute rotate-${
          isOpen ? 90 : 0
        } w-[20px] h-[3px] rounded-full bg-ring transition-all duration-300`}
      ></div>
    </div>
  );
};
