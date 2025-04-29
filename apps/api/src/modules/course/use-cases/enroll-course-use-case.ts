/* eslint-disable prettier/prettier */
import { NotFoundError } from '@common/errors/not-found-error'
import { ENROLL_COURSE_REPOSITORY_TOKEN } from '@modules/course/constants'
import type {
  IEnrollCourse,
} from '@modules/course/domain/use-cases/enroll-course-use-case'
import { inject, injectable } from 'tsyringe'

import type { IEnrollCourseUseCase } from '../domain/use-cases/enroll-course-use-case'
import type { IEnrollCourseRepository } from '../repositories/enroll-course-repository'

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

    if (!enrolledCourse) {
      throw new NotFoundError('Course not found')
    }

    return enrolledCourse
  }
}

export { EnrollCourseUseCase }
