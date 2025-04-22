import type { Course, Prisma } from '@prisma/client'

export interface CourseRepository {
  create(data: Prisma.CourseCreateInput): Promise<Course>
  findById(id: string): Promise<Course | null>
  delete(courseId: string, userId: string): Promise<void>
}
