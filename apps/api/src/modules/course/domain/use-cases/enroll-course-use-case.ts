import type { IStudentCourseEntity } from '@modules/course/domain/entities/course-entity'

namespace IEnrollCourse {
  export type Request = {
    courseId: string
    userId: string
  }

  export type Response = IStudentCourseEntity
}

interface IEnrollCourseUseCase {
  execute: (params: IEnrollCourse.Request) => Promise<IEnrollCourse.Response>
}

export { IEnrollCourse, IEnrollCourseUseCase }
