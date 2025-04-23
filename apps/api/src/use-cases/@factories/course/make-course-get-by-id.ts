import { PrismaCourseRepository } from '@/repositories/@prisma/prisma-course-repository'
import { GetCourseByIdUseCase } from '@/use-cases/course/get-course-by-id'

export function makeCourseGetByIdUseCase() {
  const courseRepository = new PrismaCourseRepository()

  const useCase = new GetCourseByIdUseCase(courseRepository)

  return useCase
}
