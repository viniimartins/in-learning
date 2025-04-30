namespace ICompleteCourse {
  export type Params = {
    courseId: string
    userId: string
  }

  export type Response = void
}

interface ICompleteCourseRepository {
  complete: (
    params: ICompleteCourse.Params,
  ) => Promise<ICompleteCourse.Response>
}

export { ICompleteCourse, ICompleteCourseRepository }
