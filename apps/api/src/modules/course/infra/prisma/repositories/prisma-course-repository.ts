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

class PrismaCourseRepository
  implements
  ICreateCourseRepository,
  IDeleteCourseRepository,
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
    id,
  }: IFindCourseById.Params): Promise<IFindCourseById.Response> {
    const course = await prisma.course.findUnique({
      where: { id },
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
          instructorId: isInstructor ? instructorId : undefined,
        },
      }),
      prisma.course.count({
        where: {
          title: {
            contains: search,
            mode: 'insensitive',
          },
          instructorId: isInstructor ? instructorId : undefined,
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
}

export { PrismaCourseRepository }
