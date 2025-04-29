/* eslint-disable prettier/prettier */
import { SEARCH_COURSES_REPOSITORY_TOKEN } from '@modules/course/constants'
import type {
  ISearchCourses,
  ISearchCoursesUseCase,
} from '@modules/course/domain/use-cases/search-courses-use-case'
import type { ISearchCoursesRepository } from '@modules/course/repositories/search-courses-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
class SearchCoursesUseCase implements ISearchCoursesUseCase {
  constructor(
    @inject(SEARCH_COURSES_REPOSITORY_TOKEN)
    private readonly searchCoursesRepository: ISearchCoursesRepository,
  ) { }

  async execute(
    params: ISearchCourses.Request,
  ): Promise<ISearchCourses.Response> {
    const result = await this.searchCoursesRepository.search({
      pageIndex: params.pageIndex,
      perPage: params.perPage,
      search: params.search,
      isInstructor: params.isInstructor,
      instructorId: params.instructorId,
    })

    return {
      data: result.data,
      meta: {
        pageIndex: result.meta.pageIndex,
        perPage: result.meta.perPage,
        total: result.meta.total,
        totalPages: result.meta.totalPages,
      },
    }
  }
}

export { SearchCoursesUseCase }
