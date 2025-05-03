import { CommentsList, SendCommentForm } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectLessonById } from "@/store";
import { forwardRef, Ref } from "react";

export const CommentsSection = forwardRef(
  (
    {
      lessonId,
      sendCommentRef,
    }: { lessonId: number; sendCommentRef?: Ref<HTMLFormElement> },
    ref: Ref<HTMLDivElement>
  ) => {
    const lesson = useAppSelector(selectLessonById(lessonId));
    return (
      <div
        className="col-span-1 md:col-span-2 row-span-1  my-[30px]"
        id="comments-section"
        ref={ref}
      >
        <div className="text-[20px] sm:text-[24px] md-[30px] font-bold my-[20px]">{`Comments (${
          lesson?.comments?.length ?? 0
        })`}</div>
        <CommentsList lessonId={lessonId} />
        <SendCommentForm lessonId={lessonId} ref={sendCommentRef} />
      </div>
    );
  }
);
CommentsSection.displayName = "CommentsSection";
