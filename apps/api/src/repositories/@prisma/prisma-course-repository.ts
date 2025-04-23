import type { Course as PrismaCourse } from '@prisma/client'

import type { User } from '@/http/controllers/auth/type'
import type { Course } from '@/http/controllers/course/type'
import { prisma } from '@/lib/prisma'
import type { PaginatedResponse } from '@/types/paginated-response'
import type { QueryParams } from '@/types/query-params'

import { CourseRepository } from '../course/course-repository'
import type { CreateCourseRepositoryInput } from '../course/types'

export class PrismaCourseRepository implements CourseRepository {
  async create({
    instructorId,
    ...data
  }: CreateCourseRepositoryInput): Promise<PrismaCourse> {
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

  async findById(id: Course['id']): Promise<PrismaCourse | null> {
    const course = await prisma.course.findUnique({
      where: { id },
    })

    return course
  }

  async findAll(
    searchParams: QueryParams,
  ): Promise<PaginatedResponse<PrismaCourse>> {
    const { page, perPage, name } = searchParams

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: {
          title: {
            contains: name,
          },
        },
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.course.count({
        where: {
          title: {
            contains: name,
          },
        },
      }),
    ])

    return {
      data: courses,
      meta: {
        pageIndex: page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    }
  }

  async delete(id: Course['id'], userId: User['id']): Promise<void> {
    await prisma.course.delete({ where: { id, instructorId: userId } })
  }
}
