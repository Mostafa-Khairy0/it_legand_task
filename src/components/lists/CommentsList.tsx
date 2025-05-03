import { selectLessonById } from "@/store";
import { useAppSelector } from "@/hooks";
import { CommentCard } from "../cards";
import { Fragment } from "react";
import { Separator } from "../ui";

export const CommentsList = ({ lessonId }: { lessonId: number }) => {
  const lesson = useAppSelector(selectLessonById(lessonId));
  return (
    <div className="flex flex-col gap-[20px]">
      {lesson?.comments?.map((commentId, index) => (
        <Fragment key={commentId}>
          <CommentCard commentId={commentId} />
          {index + 1 < lesson?.comments?.length && (
            <Separator orientation="horizontal" />
          )}
        </Fragment>
      ))}
    </div>
  );
};
