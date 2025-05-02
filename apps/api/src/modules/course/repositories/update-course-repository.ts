import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace IUpdateCourse {
  export type Params = WithoutEntityBaseProperties<ICourseEntity> & {
    courseId: string
  }

  export type Response = ICourseEntity
}

interface IUpdateCourseRepository {
  update: (params: IUpdateCourse.Params) => Promise<IUpdateCourse.Response>
}

export { IUpdateCourse, IUpdateCourseRepository }
