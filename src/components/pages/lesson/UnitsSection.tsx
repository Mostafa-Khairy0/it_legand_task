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
      className="col-span-1 row-span-1 md:row-span-2 p-[10px] rounded-lg"
      id="units-section"
    >
      <div className="text-[20px] font-bold">🎯 Course Highlights</div>
      <ProgressAnimation lessonId={lessonId} />
      <UnitsList courseId={courseId} lessonId={lessonId} />
    </div>
  );
};
