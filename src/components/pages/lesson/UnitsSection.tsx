import { UnitsList } from "@/components";
import { ProgressAnimation } from "@/components";

export const UnitsSection = ({
  lessonId,
  courseId,
}: {
  lessonId: number;
  courseId: number;
}) => {
  return (
    <div
      className="row-start-3 md:row-start-1 md:row-end-4 md:col-start-3 md:col-span-1 p-[10px] rounded-lg"
      id="units-section"
    >
      <div className="text-[20px] font-bold">🎯 Course Highlights</div>
      <ProgressAnimation lessonId={lessonId} />
      <UnitsList courseId={courseId} lessonId={lessonId} />
    </div>
  );
};
