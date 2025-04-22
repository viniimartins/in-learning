import type { Course } from '@prisma/client'

import type { CourseRepository } from '@/repositories/course-repository'

import { PermissionDeniedError } from '../@errors/permission-denied-error'
import { ResourceNotFoundError } from '../@errors/resource-not-found.error'

interface DeleteCourseUseCaseRequest {
  courseId: string
  userId: string
}

interface DeleteCourseUseCaseResponse {
  course: Course
}
export class DeleteCourseUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private courseRepository: CourseRepository) { }

  async execute({
    courseId,
    userId,
  }: DeleteCourseUseCaseRequest): Promise<DeleteCourseUseCaseResponse> {
    const course = await this.courseRepository.findById(courseId)

    if (!course) {
      throw new ResourceNotFoundError()
    }

    if (course.instructorId !== userId) {
      throw new PermissionDeniedError()
    }

    await this.courseRepository.delete(courseId, userId)

    return { course }
  }
}
