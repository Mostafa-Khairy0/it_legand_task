"use client";

import {
  selectCourseById,
  selectLessonById,
  selectUnitById,
  selectCountOfLessonsInCourse,
  selectLessonOrder,
} from "@/store";
import { useAppSelector } from "./store";

export const useProgress = ({ lessonId }: { lessonId: number }) => {
  const lesson = useAppSelector(selectLessonById(lessonId));
  const unit = useAppSelector(selectUnitById(lesson?.unitId));
  const course = useAppSelector(selectCourseById(unit?.courseId));
  const totalLessons = useAppSelector(
    course ? selectCountOfLessonsInCourse(course?.id) : () => 0
  );
  const order = useAppSelector(selectLessonOrder(course?.id, lessonId));
  const progress =
    lesson && totalLessons > 0 ? (order / totalLessons) * 100 : 0;

  return { progress };
};
