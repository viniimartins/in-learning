namespace IMarkCourseAsCompleted {
  export type Request = {
    courseId: string
    userId: string
  }

  export type Response = void
}

interface IMarkCourseAsCompletedUseCase {
  execute: (
    params: IMarkCourseAsCompleted.Request,
  ) => Promise<IMarkCourseAsCompleted.Response>
}

export { IMarkCourseAsCompleted, IMarkCourseAsCompletedUseCase }
