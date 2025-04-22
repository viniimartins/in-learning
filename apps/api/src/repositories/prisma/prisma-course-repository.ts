import { prisma } from "@/lib/prisma";
import { CourseRepository } from "../course-repository";
import type { Course, Prisma } from "@prisma/client";

export class PrismaCourseRepository implements CourseRepository {
  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    const course = await prisma.course.create({
      data
    })

    return course
  }
}