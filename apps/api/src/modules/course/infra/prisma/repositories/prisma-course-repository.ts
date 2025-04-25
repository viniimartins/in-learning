/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import type {
  ICreateCourse,
  ICreateCourseRepository,
} from '@/modules/course/repositories/create-course-repository'
import type {
  IDeleteCourse,
  IDeleteCourseRepository,
} from '@/modules/course/repositories/delete-course-repository'
import type {
  IFindCourseById,
  IFindCourseByIdRepository,
} from '@/modules/course/repositories/find-course-by-id-repository'
import type {
  ISearchCourses,
  ISearchCoursesRepository,
} from '@/modules/course/repositories/search-courses-repository'

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
  }: ISearchCourses.Params): Promise<ISearchCourses.Response> {
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: {
          title: {
            contains: search,
          },
        },
        skip: (pageIndex - 1) * perPage,
        take: perPage,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.course.count({
        where: { title: { contains: search } },
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
