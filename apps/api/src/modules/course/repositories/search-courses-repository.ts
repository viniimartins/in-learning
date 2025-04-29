import type { Paginated } from '@modules/common/helpers/paginated'
import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace ISearchCourses {
  export type Params = Paginated.Params & {
    isInstructor?: boolean
    instructorId?: string
  }

  export type Response = Paginated.Response<ICourseEntity>
}

interface ISearchCoursesRepository {
  search: (params: ISearchCourses.Params) => Promise<ISearchCourses.Response>
}

export { ISearchCourses, ISearchCoursesRepository }
