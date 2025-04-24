import { PrismaCourseRepository } from '../../infra/prisma/repositories/prisma-course-repository'
import { CreateCourseUseCase } from '../implementations/create-course-use-case'

function makeCreateCourseUseCase() {
  const courseRepository = new PrismaCourseRepository()
  return new CreateCourseUseCase(courseRepository)
}

export { makeCreateCourseUseCase }
