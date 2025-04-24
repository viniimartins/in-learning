import type {
  ISearchCourses,
  ISearchCoursesUseCase,
} from '../../domain/use-cases/search-courses-use-case'
import type { ISearchCoursesRepository } from '../../repositories/search-courses-repository'

class SearchCoursesUseCase implements ISearchCoursesUseCase {
  private readonly searchCoursesRepository: ISearchCoursesRepository

  constructor(searchCoursesRepository: ISearchCoursesRepository) {
    this.searchCoursesRepository = searchCoursesRepository
  }

  async execute(
    params: ISearchCourses.Request,
  ): Promise<ISearchCourses.Response> {
    const result = await this.searchCoursesRepository.search({
      pageIndex: params.pageIndex,
      perPage: params.perPage,
      search: params.search,
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
