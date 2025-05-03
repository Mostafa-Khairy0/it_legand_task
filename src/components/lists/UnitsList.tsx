import { useAppSelector } from "@/hooks";
import { selectCourseById } from "@/store";
import { UnitCard } from "../cards";

export const UnitsList = ({
  courseId,
  lessonId,
}: {
  courseId: number;
  lessonId: number;
}) => {
  const course = useAppSelector(selectCourseById(courseId));
  return (
    <div className="flex flex-col gap-[20px]">
      {course?.units?.map((unitId) => (
        <UnitCard unitId={unitId} key={unitId} lessonId={lessonId} />
      ))}
    </div>
  );
};
