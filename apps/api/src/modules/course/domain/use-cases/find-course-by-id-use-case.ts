import type { ICourseEntity } from '@modules/course/domain/entities/course-entity'

namespace IFindCourseById {
  export type Request = {
    courseId: string
    userId: string
  }

  export type Response = ICourseEntity
}

interface IFindCourseByIdUseCase {
  execute: (
    params: IFindCourseById.Request,
  ) => Promise<IFindCourseById.Response>
}

export { IFindCourseById, IFindCourseByIdUseCase }
