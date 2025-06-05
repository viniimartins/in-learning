import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace IEnrollCourse {
  export type Params = {
    courseId: string
    userId: string
  }

  export type Response = ICourseEntity
}

interface IEnrollCourseRepository {
  enroll: (params: IEnrollCourse.Params) => Promise<IEnrollCourse.Response>
}

export { IEnrollCourse, IEnrollCourseRepository }
