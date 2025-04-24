namespace IDeleteCourse {
  export type Request = {
    id: string
  }

  export type Response = void
}

interface IDeleteCourseUseCase {
  execute: (params: IDeleteCourse.Request) => Promise<IDeleteCourse.Response>
}

export { IDeleteCourse, IDeleteCourseUseCase }
