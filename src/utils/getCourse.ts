import { prisma } from "@/lib";
import { Prisma } from "@prisma/client";

export const getCourse = async (where: Prisma.CourseWhereUniqueInput) => {
  return prisma.course.findUnique({
    where,
    include: {
      units: {
        include: {
          lessons: {
            orderBy: {
              order: "asc",
            },
            include: {
              comments: {
                orderBy: {
                  createdAt: "desc",
                },
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      photo: true,
                      createdAt: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
          exam: {
            include: {
              questions: {
                select: {
                  id: true,
                  text: true,
                  choices: true,
                  createdAt: true,
                  examId: true,
                },
              },
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export type CourseType = Awaited<ReturnType<typeof getCourse>>;
