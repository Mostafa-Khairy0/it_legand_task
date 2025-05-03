import Loading from "@/app/course/[courseId]/unit/[unitId]/lesson/[lessonId]/loading";
import { LessonPage } from "@/components";
import { prisma } from "@/lib";
import { deepCopy, getCourse } from "@/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      units: {
        select: {
          id: true,
          lessons: {
            select: { id: true },
          },
        },
      },
    },
  });

  return courses.flatMap((course) =>
    course.units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        courseId: `${course.id}`,
        unitId: `${unit.id}`,
        lessonId: `${lesson.id}`,
      }))
    )
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string; unitId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const course = await getCourse({ id: Number(courseId) });
  if (!course) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <LessonPage course={deepCopy(course)} lessonId={Number(lessonId)} />
    </Suspense>
  );
}
