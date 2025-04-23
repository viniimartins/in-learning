/* eslint-disable prettier/prettier */
import type { Course } from '@/http/controllers/course/type'
import type { CourseRepository } from '@/repositories/course/course-repository'

import { ResourceNotFoundError } from '../@errors/resource-not-found.error'

interface GetCourseByIdUseCaseRequest {
  courseId: Course['id']
}

export interface GetCourseByIdUseCaseResponse extends Course { }

export class GetCourseByIdUseCase {
  constructor(private courseRepository: CourseRepository) { }
  async execute({
    courseId,
  }: GetCourseByIdUseCaseRequest): Promise<GetCourseByIdUseCaseResponse> {
    const course = await this.courseRepository.findById(courseId)

    if (!course) {
      throw new ResourceNotFoundError()
    }

    return course
  }
}
