import { Fragment, RefObject } from "react";
import { PdfDialog, VideoPlayer } from "@/components";
import { useAppSelector } from "@/hooks";
import { selectLessonById } from "@/store";
import { BadgeHelp, MessageCircle } from "lucide-react";

export const VideoSection = ({
  lessonId,
  commentsRef,
  sendCommentRef,
}: {
  lessonId: number;
  commentsRef: RefObject<HTMLDivElement | null>;
  sendCommentRef?: RefObject<HTMLFormElement | null>;
}) => {
  const lesson = useAppSelector(selectLessonById(lessonId));

  const handleCommentsScroll = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAskScroll = () => {
    sendCommentRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Fragment>
      <div className="col-span-1 md:col-span-2 row-span-1 sticky md:static top-[10px] z-20">
        {lesson && (
          <VideoPlayer
            src={lesson?.videoSrc}
            poster={lesson?.videoPoster}
            thumbnails={lesson?.videoThumbnails}
            className=""
          />
        )}
      </div>
      <div className="col-span-1 md:col-span-2 row-span-1 flex flex-row items-center p-[10px] gap-[10px]">
        <div
          className="border-border border-2 w-[40px] h-[40px] rounded-full flex justify-center items-center"
          onClick={handleCommentsScroll}
        >
          <MessageCircle size={20} className="text-ring" />
        </div>
        <div
          className="border-border border-2 w-[40px] h-[40px] rounded-full flex justify-center items-center"
          onClick={handleAskScroll}
        >
          <BadgeHelp size={20} className="text-ring" />
        </div>
        <PdfDialog pdfUrl={lesson?.materials?.at(0) ?? ""} />
      </div>
    </Fragment>
  );
};
