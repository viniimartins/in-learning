import type { Course, CreateCourse } from '@/http/controllers/course/type'
import type { CourseRepository } from '@/repositories/course-repository'

interface CreateCourseUseCaseRequest extends CreateCourse {
  instructorId: string
}

interface CreateCourseUseCaseResponse {
  course: Course
}

export class CreateCourseUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private courseRepository: CourseRepository) { }

  async execute({
    title,
    subtitle,
    description,
    slug,
    instructorId,
    lessons,
  }: CreateCourseUseCaseRequest): Promise<CreateCourseUseCaseResponse> {
    const course = await this.courseRepository.create({
      title,
      subtitle,
      description,
      slug,
      instructor: {
        connect: {
          id: instructorId,
        },
      },
      lessons: {
        create: lessons,
      },
    })

    return { course }
  }
}
