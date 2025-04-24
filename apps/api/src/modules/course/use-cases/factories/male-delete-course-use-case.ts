import { PrismaCourseRepository } from '../../infra/prisma/repositories/prisma-course-repository'
import { DeleteCourseUseCase } from '../implementations/delete-course-use-case'

function makeDeleteCourseUseCase() {
  const deleteCourseRepository = new PrismaCourseRepository()
  const findCourseByIdRepository = new PrismaCourseRepository()

  return new DeleteCourseUseCase(
    deleteCourseRepository,
    findCourseByIdRepository,
  )
}

export { makeDeleteCourseUseCase }
