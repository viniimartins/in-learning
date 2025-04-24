import { PrismaCourseRepository } from '../../infra/prisma/repositories/prisma-course-repository'
import { SearchCoursesUseCase } from '../implementations/search-courses-use-case'

function makeSearchCoursesUseCase() {
  const searchCoursesRepository = new PrismaCourseRepository()
  return new SearchCoursesUseCase(searchCoursesRepository)
}

export { makeSearchCoursesUseCase }
