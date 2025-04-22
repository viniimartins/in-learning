import type { Course } from '@prisma/client'

import type { CourseRepository } from '@/repositories/course-repository'

interface CreateCourseUseCaseRequest {
  title: string
  subtitle: string
  description: string
  slug: string
  instructorId: string
  lessons: {
    title: string
    description: string
    videoUrl: string
  }[]
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
