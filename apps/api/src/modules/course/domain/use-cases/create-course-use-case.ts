import type { WithoutEntityBaseProperties } from '@/modules/common/helpers/without-entity-base-properties'

import type { ICourseEntity, ILessonEntity } from '../entities/course-entity'

namespace ICreateCourse {
  export type Request = WithoutEntityBaseProperties<ICourseEntity> & {
    lessons: ILessonEntity[]
  }

  export type Response = ICourseEntity
}

interface ICreateCourseUseCase {
  execute: (params: ICreateCourse.Request) => Promise<ICreateCourse.Response>
}

export { ICreateCourse, ICreateCourseUseCase }
