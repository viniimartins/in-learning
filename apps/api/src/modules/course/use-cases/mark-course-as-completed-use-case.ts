/* eslint-disable prettier/prettier */

import { MARK_COURSE_AS_COMPLETED_REPOSITORY_TOKEN, } from '@modules/course/constants'
import type { IMarkCourseAsCompleted, IMarkCourseAsCompletedUseCase, } from '@modules/course/domain/use-cases'
import type { IMarkCourseAsCompletedRepository, } from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class MarkCourseAsCompletedUseCase implements IMarkCourseAsCompletedUseCase {
  constructor(
    @inject(MARK_COURSE_AS_COMPLETED_REPOSITORY_TOKEN)
    private readonly markCourseAsCompletedRepository: IMarkCourseAsCompletedRepository,
  ) { }

  async execute(
    data: IMarkCourseAsCompleted.Request,
  ): Promise<IMarkCourseAsCompleted.Response> {
    const { courseId, userId } = data

    await this.markCourseAsCompletedRepository.markCourseAsCompleted({
      courseId,
      userId,
    })
  }
}

export { MarkCourseAsCompletedUseCase }
