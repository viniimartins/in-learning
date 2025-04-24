import { prisma } from '@/lib/prisma'
import type {
  ICreateCourse,
  ICreateCourseRepository,
} from '@/modules/course/repositories/create-course-repository'

export class PrismaCourseRepository implements ICreateCourseRepository {
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
}
