/* eslint-disable prettier/prettier */
import type { Course, CreateCourse } from '@/http/controllers/course/type'
import type { CourseRepository } from '@/repositories/course/course-repository'

export interface CreateCourseUseCaseRequest
  extends CreateCourse,
  Pick<Course, 'instructorId'> { }

interface CreateCourseUseCaseResponse {
  course: Course
}

export class CreateCourseUseCase {
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
      instructorId,
      lessons,
    })

    return { course }
  }
}
