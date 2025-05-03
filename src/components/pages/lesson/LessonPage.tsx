"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addCourses, selectLessonById } from "@/store";
import { CourseType } from "@/utils";
import { useEffect, useRef } from "react";
import { UnitsSection } from "./UnitsSection";
import { VideoSection } from "./VideoSection";
import { CommentsSection } from "./CommentsSection";

export const LessonPage = ({
  course,
  lessonId,
}: {
  course: NonNullable<CourseType>;
  lessonId: number;
}) => {
  const dispatch = useAppDispatch();
  const commentsRef = useRef<HTMLDivElement | null>(null);
  const sendCommentRef = useRef<HTMLFormElement | null>(null);
  const lesson = useAppSelector(selectLessonById(lessonId));

  useEffect(() => {
    dispatch(addCourses([course]));
  }, [dispatch, course]);

  return (
    <div className="px-[5px] py-[5px] sm:px-[10px] sm:py-[10px] md:px-[20px] md:py-[15px]">
      <div className="text-[28px] font-[700]">{lesson?.title}</div>
      <div className="grid grid-cols-1 grid-row-[repeat(3,auto)] md:grid-cols-3 md:grid-rows-[repeat(2,auto)] gap-[5px]">
        <VideoSection
          lessonId={lessonId}
          commentsRef={commentsRef}
          sendCommentRef={sendCommentRef}
        />
        <UnitsSection lessonId={lessonId} courseId={course.id} />
        <CommentsSection
          lessonId={lessonId}
          ref={commentsRef}
          sendCommentRef={sendCommentRef}
        />
      </div>
    </div>
  );
};
