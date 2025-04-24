import type { Paginated } from '@/modules/common/helpers/paginated'

import type { ICourseEntity } from '../domain/entities/course-entity'

namespace ISearchCourses {
  export type Params = Paginated.Params

  export type Response = Paginated.Response<ICourseEntity>
}

interface ISearchCoursesRepository {
  search: (params: ISearchCourses.Params) => Promise<ISearchCourses.Response>
}

export { ISearchCourses, ISearchCoursesRepository }
