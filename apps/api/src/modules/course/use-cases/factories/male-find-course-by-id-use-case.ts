import { PrismaCourseRepository } from '../../infra/prisma/repositories/prisma-course-repository'
import { FindCourseByIdUseCase } from '../implementations/find-course-by-id-use-case'

function makeFindCourseByIdUseCase() {
  const findCourseByIdRepository = new PrismaCourseRepository()
  return new FindCourseByIdUseCase(findCourseByIdRepository)
}

export { makeFindCourseByIdUseCase }
