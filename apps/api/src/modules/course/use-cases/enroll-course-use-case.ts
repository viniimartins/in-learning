/* eslint-disable prettier/prettier */

import { ENROLL_COURSE_REPOSITORY_TOKEN } from '@modules/course/constants'
import type { IEnrollCourse, IEnrollCourseUseCase } from '@modules/course/domain/use-cases'
import type { IEnrollCourseRepository } from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'
@injectable()
class EnrollCourseUseCase implements IEnrollCourseUseCase {
  constructor(
    @inject(ENROLL_COURSE_REPOSITORY_TOKEN)
    private readonly enrollCourseRepository: IEnrollCourseRepository,
  ) { }

  async execute(
    params: IEnrollCourse.Request,
  ): Promise<IEnrollCourse.Response> {
    const enrolledCourse = await this.enrollCourseRepository.enroll({
      courseId: params.courseId,
      userId: params.userId,
    })

    return enrolledCourse
  }
}

export { EnrollCourseUseCase }
