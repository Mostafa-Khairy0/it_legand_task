"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PlusAnimatinos,
  LessonButton,
  Separator,
} from "@/components";
import { useAppSelector, useBoolean } from "@/hooks";
import { selectUnitById } from "@/store";
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
        <PlusAnimatinos isOpen={isOpen} toggle={toggle} />
      </CardHeader>
      {isOpen && (
        <CardContent>
          {unit.lessons.map((lessonId) => (
            <Fragment key={lessonId}>
              <LessonButton lessonId={lessonId} key={lessonId} />
              <Separator orientation="horizontal" />
            </Fragment>
          ))}
          {typeof unit.examId == "number" && (
            <ExamDialog examId={unit.examId} />
          )}
        </CardContent>
      )}
    </Card>
  );
};
