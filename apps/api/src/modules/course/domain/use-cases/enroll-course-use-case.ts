import type { ICourseEntity } from '../entities/course-entity'

namespace IEnrollCourse {
  export type Request = {
    courseId: string
    userId: string
  }

  export type Response = ICourseEntity
}

interface IEnrollCourseUseCase {
  execute: (params: IEnrollCourse.Request) => Promise<IEnrollCourse.Response>
}

export { IEnrollCourse, IEnrollCourseUseCase }
