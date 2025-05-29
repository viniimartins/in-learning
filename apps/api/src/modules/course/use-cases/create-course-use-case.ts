/* eslint-disable prettier/prettier */
import { CREATE_COURSE_REPOSITORY_TOKEN } from '@modules/course/constants'
import type {
  ICreateCourse,
  ICreateCourseUseCase,
} from '@modules/course/domain/use-cases'
import type { ICreateCourseRepository } from '@modules/course/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class CreateCourseUseCase implements ICreateCourseUseCase {
  constructor(
    @inject(CREATE_COURSE_REPOSITORY_TOKEN)
    private readonly createCourseRepository: ICreateCourseRepository,
  ) { }

  async execute(data: ICreateCourse.Request): Promise<ICreateCourse.Response> {
    const { description, title, instructorId, slug, subtitle, lessons } =
      data

    const createdCourse = await this.createCourseRepository.create({
      description,
      title,
      instructorId,
      slug,
      subtitle,
      lessons,
    })

    return createdCourse
  }
}

export { CreateCourseUseCase }
