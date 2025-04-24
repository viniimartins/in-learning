import type {
  ICreateCourse,
  ICreateCourseUseCase,
} from '../../domain/use-cases/create-course-use-case'
import type { ICreateCourseRepository } from '../../repositories/create-course-repository'

class CreateCourseUseCase implements ICreateCourseUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly courseRepository: ICreateCourseRepository) { }

  async execute(data: ICreateCourse.Request): Promise<ICreateCourse.Response> {
    const { description, title, instructorId, slug, subtitle, studentCount } =
      data

    return {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 'fake-id-123',
      instructorId,
      slug,
      subtitle,
      studentCount,
    }
  }
}

export { CreateCourseUseCase }
