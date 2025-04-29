import { Paginated } from '@modules/common/helpers/paginated'
import type { ICourseWithStudentCourseEntity } from '@modules/course/domain/entities/course-entity'

namespace ISearchCourses {
  export type Request = Paginated.Params & {
    instructorId?: string
    isInstructor?: boolean
    isEnrolled?: boolean
    userId?: string
  }

  export type Response = Paginated.Response<ICourseWithStudentCourseEntity>
}

interface ISearchCoursesUseCase {
  execute: (params: ISearchCourses.Request) => Promise<ISearchCourses.Response>
}

export { ISearchCourses, ISearchCoursesUseCase }
