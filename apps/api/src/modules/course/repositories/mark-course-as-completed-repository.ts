namespace IMarkCourseAsCompleted {
  export type Params = {
    courseId: string
    userId: string
  }

  export type Response = void
}

interface IMarkCourseAsCompletedRepository {
  markCourseAsCompleted: (
    params: IMarkCourseAsCompleted.Params,
  ) => Promise<IMarkCourseAsCompleted.Response>
}

export { IMarkCourseAsCompleted, IMarkCourseAsCompletedRepository }
