/* eslint-disable prettier/prettier */

import { COMPLETE_COURSE_REPOSITORY_TOKEN } from '@modules/course/constants'
import type { ICompleteCourse, ICompleteCourseUseCase } from '@modules/course/domain/use-cases'
import type { ICompleteCourseRepository } from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class CompleteCourseUseCase implements ICompleteCourseUseCase {
  constructor(
    @inject(COMPLETE_COURSE_REPOSITORY_TOKEN)
    private readonly completeCourseRepository: ICompleteCourseRepository,
  ) { }

  async execute(
    data: ICompleteCourse.Request,
  ): Promise<ICompleteCourse.Response> {
    const { courseId, userId } = data

    await this.completeCourseRepository.complete({
      courseId,
      userId,
    })
  }
}

export { CompleteCourseUseCase }
