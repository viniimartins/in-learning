/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type {
  ICompleteCourse,
  ICompleteCourseRepository,
  ICreateCourse,
  ICreateCourseRepository,
  IDeleteCourse,
  IDeleteCourseRepository,
  IEnrollCourse,
  IEnrollCourseRepository,
  IFindCourseById,
  IFindCourseByIdRepository,
  ISearchCourses,
  ISearchCoursesRepository,
  IUpdateCourse,
  IUpdateCourseRepository,
} from '@modules/course/repositories'

class PrismaCourseRepository
  implements
  ICreateCourseRepository,
  IDeleteCourseRepository,
  IEnrollCourseRepository,
  IFindCourseByIdRepository,
  IUpdateCourseRepository,
  ICompleteCourseRepository,
  ISearchCoursesRepository {
  async create({
    instructorId,
    ...data
  }: ICreateCourse.Params): Promise<ICreateCourse.Response> {
    const course = await prisma.course.create({
      data: {
        ...data,
        instructor: {
          connect: {
            id: instructorId,
          },
        },
        lessons: {
          createMany: {
            data: data.lessons,
          },
        },
      },
      include: {
        lessons: true,
      },
    })
    return course
  }

  async findById({
    courseId,
    userId,
  }: IFindCourseById.Params): Promise<IFindCourseById.Response> {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: true,
        instructor: true,
        progress: {
          where: { userId },
        },
        students: {
          where: {
            userId,
          },
        },
      },
    })

    return course
  }

  async delete({
    courseId,
  }: IDeleteCourse.Params): Promise<IDeleteCourse.Response> {
    await prisma.course.delete({
      where: { id: courseId },
    })
  }

  async update({
    courseId,
    ...data
  }: IUpdateCourse.Params): Promise<IUpdateCourse.Response> {
    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        ...data,
        lessons: {
          createMany: {
            data: data.lessons,
          },
        },
      },
      include: {
        lessons: true,
      },
    })

    return course
  }

  async search({
    pageIndex,
    perPage,
    search,
    isInstructor,
    instructorId,
    isEnrolled,
    userId,
  }: ISearchCourses.Params): Promise<ISearchCourses.Response> {
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        skip: (pageIndex - 1) * perPage,
        take: perPage,
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
          ...(isInstructor && { instructorId }),
          ...(isEnrolled && {
            students: { some: { userId } }
          }),
          ...(!isEnrolled &&
            !isInstructor && {
            NOT: {
              instructorId,
            },
            students: { none: { userId } },
          }),
        },
        include: {
          lessons: true,
          ...(isEnrolled && {
            students: true,
          }),
          ...(isInstructor && {
            instructor: true,
          }),
          progress: {
            where: { userId },
          },
        },
      }),
      prisma.course.count({
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
          ...(isInstructor && { instructorId }),
          ...(isEnrolled && { students: { some: { userId } } }),
          ...(!isEnrolled &&
            !isInstructor && {
            NOT: {
              instructorId,
            },
            students: { none: { userId } },
          }),
        },
      }),
    ])

    return {
      data: courses,
      meta: {
        pageIndex,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async enroll({
    courseId,
    userId,
  }: IEnrollCourse.Params): Promise<IEnrollCourse.Response> {

    const course = await prisma.$transaction(async (tx) => {
      await tx.student.create({
        data: {
          userId,
          courseId,
        },
      });

      await tx.progress.create({
        data: {
          userId,
          courseId,
        },
      });

      return await tx.course.update({
        where: { id: courseId },
        data: {
          studentCount: {
            increment: 1
          }
        },
        include: {
          lessons: true,
          instructor: true,
        }
      });
    });

    return course;
  }

  async complete({
    courseId,
    userId,
  }: ICompleteCourse.Params): Promise<ICompleteCourse.Response> {

    await prisma.progress.update({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      data: {
        completed: true,
      },
    })
  }
}

export { PrismaCourseRepository }
