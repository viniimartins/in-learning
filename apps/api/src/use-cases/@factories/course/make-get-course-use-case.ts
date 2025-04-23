import { PrismaCourseRepository } from '@/repositories/@prisma/prisma-course-repository'
import { GetCourseUseCase } from '@/use-cases/course/get-courses'

export function makeGetCourseUseCase() {
  const courseRepository = new PrismaCourseRepository()

  const useCase = new GetCourseUseCase(courseRepository)

  return useCase
}
