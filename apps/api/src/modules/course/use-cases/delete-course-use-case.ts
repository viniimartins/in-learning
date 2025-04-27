/* eslint-disable prettier/prettier */
import { NotFoundError } from '@common/errors/not-found-error'
import {
  DELETE_COURSE_REPOSITORY_TOKEN,
  FIND_COURSE_BY_ID_REPOSITORY_TOKEN,
} from '@modules/course/constants'
import type {
  IDeleteCourse,
  IDeleteCourseUseCase,
} from '@modules/course/domain/use-cases/delete-course-use-case'
import type {
  IDeleteCourseRepository,
  IFindCourseByIdRepository,
} from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteCourseUseCase implements IDeleteCourseUseCase {
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
      id: params.id,
    })

    if (!course) {
      throw new NotFoundError('Course not found')
    }

    await this.deleteCourseRepository.delete({
      id: params.id,
    })
  }
}
