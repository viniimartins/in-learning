import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace IUpdateCourse {
  export type Request = WithoutEntityBaseProperties<ICourseEntity> & {
    courseId: string
    userId: string
  }

  export type Response = ICourseEntity
}

interface IUpdateCourseUseCase {
  execute: (params: IUpdateCourse.Request) => Promise<IUpdateCourse.Response>
}

export { IUpdateCourse, IUpdateCourseUseCase }
