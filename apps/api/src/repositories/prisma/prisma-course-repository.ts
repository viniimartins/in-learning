import type { Course, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { CourseRepository } from '../course-repository'

export class PrismaCourseRepository implements CourseRepository {
  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    const course = await prisma.course.create({
      data,
    })

    return course
  }

  async findById(id: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: { id },
    })

    return course
  }

  async delete(courseId: string, userId: string): Promise<void> {
    await prisma.course.delete({
      where: { id: courseId, instructorId: userId },
    })
  }
}
