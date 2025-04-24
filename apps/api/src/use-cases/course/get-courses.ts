/* eslint-disable prettier/prettier */
import type { Course } from '@/http/controllers/course/type'
import type { CourseRepository } from '@/repositories/course/course-repository'
import type { PaginatedResponse } from '@/types/paginated-response'
import type { QueryParams } from '@/types/query-params'

interface GetCourseUseCaseRequest extends QueryParams { }

export interface GetCourseUseCaseResponse extends PaginatedResponse<Course> { }

export class GetCourseUseCase {
  constructor(private courseRepository: CourseRepository) { }

  async execute({
    page,
    perPage,
    name,
  }: GetCourseUseCaseRequest): Promise<GetCourseUseCaseResponse> {
    const paginatedCourses = await this.courseRepository.findAll({
      page,
      perPage,
      name,
    })

    return paginatedCourses
  }
}
