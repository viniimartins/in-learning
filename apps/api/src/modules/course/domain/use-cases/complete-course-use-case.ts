namespace ICompleteCourse {
  export type Request = {
    courseId: string
    userId: string
  }

  export type Response = void
}

interface ICompleteCourseUseCase {
  execute: (
    params: ICompleteCourse.Request,
  ) => Promise<ICompleteCourse.Response>
}

export { ICompleteCourse, ICompleteCourseUseCase }
