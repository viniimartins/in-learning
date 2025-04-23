import { PrismaCourseRepository } from '@/repositories/@prisma/prisma-course-repository'
import { CreateCourseUseCase } from '@/use-cases/course/create-course'

export function makeCreateCourseUseCase() {
  const courseRepository = new PrismaCourseRepository()

  const useCase = new CreateCourseUseCase(courseRepository)

  return useCase
}
