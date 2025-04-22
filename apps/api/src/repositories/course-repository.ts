import type { Course, Prisma } from "@prisma/client";

export interface CourseRepository {
  create(data: Prisma.CourseCreateInput): Promise<Course>
}
