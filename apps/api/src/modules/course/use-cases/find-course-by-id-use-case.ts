/* eslint-disable prettier/prettier */
import { NotFoundError } from '@common/errors/not-found-error'
import { FIND_COURSE_BY_ID_REPOSITORY_TOKEN } from '@modules/course/constants'
import type {
  IFindCourseById,
  IFindCourseByIdUseCase,
} from '@modules/course/domain/use-cases/find-course-by-id-use-case'
import type { IFindCourseByIdRepository } from '@modules/course/repositories/find-course-by-id-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindCourseByIdUseCase implements IFindCourseByIdUseCase {
  constructor(
    @inject(FIND_COURSE_BY_ID_REPOSITORY_TOKEN)
    private readonly findCourseByIdRepository: IFindCourseByIdRepository,
  ) { }

  async execute(
    params: IFindCourseById.Request,
  ): Promise<IFindCourseById.Response> {
    const foundCourse = await this.findCourseByIdRepository.findById({
      courseId: params.courseId,
      userId: params.userId,
    })

    if (!foundCourse) {
      throw new NotFoundError('Course not found')
    }

    return foundCourse
  }
}

export { FindCourseByIdUseCase }
