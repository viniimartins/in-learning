/* eslint-disable prettier/prettier */

import { prisma } from '@lib/prisma'
import type {
  ICreateCourse,
  ICreateCourseRepository,
  IDeleteCourse,
  IDeleteCourseRepository,
  IFindCourseById,
  IFindCourseByIdRepository,
  ISearchCourses,
  ISearchCoursesRepository,
} from '@modules/course/repositories'
import type { IEnrollCourse, IEnrollCourseRepository } from '@modules/course/repositories/enroll-course-repository'

class PrismaCourseRepository
  implements
  ICreateCourseRepository,
  IDeleteCourseRepository,
  IEnrollCourseRepository,
  IFindCourseByIdRepository,
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
        studentCourses: {
          where: {
            userId,
          }
        }
      },
    })

    return course
  }

  async delete({ id }: IDeleteCourse.Params): Promise<IDeleteCourse.Response> {
    await prisma.course.delete({
      where: { id },
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
          ...(isEnrolled && { studentCourses: { some: { userId } } }),
        },
        include: {
          ...(isEnrolled && {
            studentCourses: true,
          }),
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
    const course = await prisma.studentCourse.create({
      data: {
        userId,
        courseId,
      },
    })

    return course
  }
}

export { PrismaCourseRepository }
