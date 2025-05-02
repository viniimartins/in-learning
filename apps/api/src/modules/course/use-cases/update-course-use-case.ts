/* eslint-disable prettier/prettier */

import { NotFoundError, UnauthorizedError } from '@common/errors'
import { FIND_COURSE_BY_ID_REPOSITORY_TOKEN, UPDATE_COURSE_REPOSITORY_TOKEN } from '@modules/course/constants'
import type { IUpdateCourse, IUpdateCourseUseCase } from '@modules/course/domain/use-cases'
import type { IFindCourseByIdRepository, IUpdateCourseRepository } from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class UpdateCourseUseCase implements IUpdateCourseUseCase {
  constructor(
    @inject(UPDATE_COURSE_REPOSITORY_TOKEN)
    private readonly updateCourseRepository: IUpdateCourseRepository,
    @inject(FIND_COURSE_BY_ID_REPOSITORY_TOKEN)
    private readonly findCourseByIdRepository: IFindCourseByIdRepository,
  ) { }

  async execute(
    data: IUpdateCourse.Request,
  ): Promise<IUpdateCourse.Response> {
    const { courseId, userId, ...rest } = data

    const course = await this.findCourseByIdRepository.findById({
      courseId,
      userId,
    })

    if (!course) {
      throw new NotFoundError('Course not found')
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedError('You are not allowed to update this course')
    }

    const updatedCourse = await this.updateCourseRepository.update({
      courseId,
      ...rest,
    })

    return updatedCourse
  }
}

export { UpdateCourseUseCase }
