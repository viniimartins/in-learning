/* eslint-disable prettier/prettier */
import { prisma } from '@lib/prisma'
import type {
  ICreateCourse,
  ICreateCourseRepository,
  IDeleteCourse,
  IDeleteCourseRepository,
  IEnrollCourse,
  IEnrollCourseRepository,
  IFindCourseById,
  IFindCourseByIdRepository,
  IMarkCourseAsCompleted,
  IMarkCourseAsCompletedRepository,
  ISearchCourses,
  ISearchCoursesRepository,
} from '@modules/course/repositories'

class PrismaCourseRepository
  implements
  ICreateCourseRepository,
  IDeleteCourseRepository,
  IEnrollCourseRepository,
  IFindCourseByIdRepository,
  IMarkCourseAsCompletedRepository,
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
        courseProgress: {
          where: { userId },
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
            studentCourses: {
              some: {
                userId,
              },
            },
          }),
          ...(!isEnrolled &&
            !isInstructor && {
            NOT: {
              instructorId,
            },
          }),
        },
        include: {
          lessons: true,
          ...(isEnrolled && {
            studentCourses: true,
          }),
          ...(isInstructor && {
            instructor: true,
          }),
          courseProgress: {
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
          ...(isEnrolled && { studentCourses: { some: { userId } } }),
          ...(!isEnrolled &&
            !isInstructor && {
            NOT: {
              instructorId,
            },
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
    const studentCourse = await prisma.studentCourse.create({
      data: {
        userId,
        courseId,
      },
    })

    return studentCourse
  }

  async markCourseAsCompleted({
    courseId,
    userId,
  }: IMarkCourseAsCompleted.Params): Promise<IMarkCourseAsCompleted.Response> {

    await prisma.courseProgress.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId,
        courseId,
        completed: true,
      },
    })
  }
}

export { PrismaCourseRepository }
