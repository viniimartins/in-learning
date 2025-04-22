import { PrismaCourseRepository } from '@/repositories/@prisma/prisma-course-repository'
import { DeleteCourseUseCase } from '@/use-cases/course/delete'

export function makeDeleteCourseUseCase() {
  const courseRepository = new PrismaCourseRepository()

  const useCase = new DeleteCourseUseCase(courseRepository)

  return useCase
}
