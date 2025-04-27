import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type {
  ICourseEntity,
  ILessonEntity,
} from '@modules/course/domain/entities/course-entity'

namespace ICreateCourse {
  export type Params = WithoutEntityBaseProperties<ICourseEntity> & {
    lessons: ILessonEntity[]
  }

  export type Response = ICourseEntity
}

interface ICreateCourseRepository {
  create: (params: ICreateCourse.Params) => Promise<ICreateCourse.Response>
}

export { ICreateCourse, ICreateCourseRepository }
