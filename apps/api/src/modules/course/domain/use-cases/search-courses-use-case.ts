import { Paginated } from '@modules/common/helpers/paginated'
import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace ISearchCourses {
  export type Request = Paginated.Params & {
    isInstructor?: boolean
    instructorId?: string
  }

  export type Response = Paginated.Response<ICourseEntity>
}

interface ISearchCoursesUseCase {
  execute: (params: ISearchCourses.Request) => Promise<ISearchCourses.Response>
}

export { ISearchCourses, ISearchCoursesUseCase }
