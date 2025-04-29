import type { IStudentCourseEntity } from '@modules/course/domain/entities/course-entity'

namespace IEnrollCourse {
  export type Params = {
    courseId: string
    userId: string
  }

  export type Response = IStudentCourseEntity | null
}

interface IEnrollCourseRepository {
  enroll: (params: IEnrollCourse.Params) => Promise<IEnrollCourse.Response>
}

export { IEnrollCourse, IEnrollCourseRepository }
