import type { WithoutEntityBaseProperties } from '@modules/common/helpers/without-entity-base-properties'
import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace ICreateCourse {
  export type Request = WithoutEntityBaseProperties<ICourseEntity> & {
    instructorId: string
  }

  export type Response = ICourseEntity
}

interface ICreateCourseUseCase {
  execute: (params: ICreateCourse.Request) => Promise<ICreateCourse.Response>
}

export { ICreateCourse, ICreateCourseUseCase }
