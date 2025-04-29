import type { Paginated } from '@modules/common/helpers/paginated'
import type { ICourseWithStudentCourseEntity } from '@modules/course/domain/entities/course-entity'

namespace ISearchCourses {
  export type Params = Paginated.Params & {
    isInstructor?: boolean
    isEnrolled?: boolean
    instructorId?: string
    userId?: string
  }

  export type Response = Paginated.Response<ICourseWithStudentCourseEntity>
}

interface ISearchCoursesRepository {
  search: (params: ISearchCourses.Params) => Promise<ISearchCourses.Response>
}

export { ISearchCourses, ISearchCoursesRepository }
