import { PrismaCourseRepository } from '../../infra/prisma/repositories/prisma-course-repository'
import { CreateCourseUseCase } from '../implementations/create-course-use-case'

function makeCreateCourseUseCase() {
  const createCourseRepository = new PrismaCourseRepository()
  return new CreateCourseUseCase(createCourseRepository)
}

export { makeCreateCourseUseCase }
