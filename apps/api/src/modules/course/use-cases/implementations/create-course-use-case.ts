import type {
  ICreateCourse,
  ICreateCourseUseCase,
} from '../../domain/use-cases/create-course-use-case'
import type { ICreateCourseRepository } from '../../repositories/create-course-repository'

class CreateCourseUseCase implements ICreateCourseUseCase {
  private readonly courseRepository: ICreateCourseRepository

  constructor(courseRepository: ICreateCourseRepository) {
    this.courseRepository = courseRepository
  }

  async execute(data: ICreateCourse.Request): Promise<ICreateCourse.Response> {
    const { description, title, instructorId, slug, subtitle, studentCount } =
      data

    const createdCourse = await this.courseRepository.create({
      description,
      title,
      instructorId,
      slug,
      subtitle,
      studentCount,
      lessons: data.lessons,
    })

    return createdCourse
  }
}

export { CreateCourseUseCase }
