import { NotFoundError } from '@/common/errors/not-found-error'

import type {
  IFindCourseById,
  IFindCourseByIdUseCase,
} from '../../domain/use-cases/find-course-by-id-use-case'
import type { IFindCourseByIdRepository } from '../../repositories/find-course-by-id-repository'

class FindCourseByIdUseCase implements IFindCourseByIdUseCase {
  private readonly courseRepository: IFindCourseByIdRepository

  constructor(courseRepository: IFindCourseByIdRepository) {
    this.courseRepository = courseRepository
  }

  async execute(
    params: IFindCourseById.Request,
  ): Promise<IFindCourseById.Response> {
    const foundCourse = await this.courseRepository.findById({
      id: params.id,
    })

    if (!foundCourse) {
      throw new NotFoundError('Course not found')
    }

    return foundCourse
  }
}

export { FindCourseByIdUseCase }
