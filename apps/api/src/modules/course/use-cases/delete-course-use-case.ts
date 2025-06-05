/* eslint-disable prettier/prettier */

import { NotFoundError } from '@common/errors/not-found-error'
import {
  DELETE_COURSE_REPOSITORY_TOKEN,
  FIND_COURSE_BY_ID_REPOSITORY_TOKEN,
} from '@modules/course/constants'
import type {
  IDeleteCourse,
  IDeleteCourseUseCase,
} from '@modules/course/domain/use-cases'
import type {
  IDeleteCourseRepository,
  IFindCourseByIdRepository,
} from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class DeleteCourseUseCase implements IDeleteCourseUseCase {
  constructor(
    @inject(DELETE_COURSE_REPOSITORY_TOKEN)
    private readonly deleteCourseRepository: IDeleteCourseRepository,
    @inject(FIND_COURSE_BY_ID_REPOSITORY_TOKEN)
    private readonly findCourseByIdRepository: IFindCourseByIdRepository,
  ) { }

  async execute(
    params: IDeleteCourse.Request,
  ): Promise<IDeleteCourse.Response> {
    const course = await this.findCourseByIdRepository.findById({
      courseId: params.courseId,
      userId: params.userId,
    })

    if (!course) {
      throw new NotFoundError('Course not found')
    }

    await this.deleteCourseRepository.delete({
      courseId: params.courseId,
    })
  }
}

export { DeleteCourseUseCase }
