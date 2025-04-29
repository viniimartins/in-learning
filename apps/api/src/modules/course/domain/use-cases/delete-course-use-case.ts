namespace IDeleteCourse {
  export type Request = {
    courseId: string
    userId: string
  }

  export type Response = void
}

interface IDeleteCourseUseCase {
  execute: (params: IDeleteCourse.Request) => Promise<IDeleteCourse.Response>
}

export { IDeleteCourse, IDeleteCourseUseCase }
