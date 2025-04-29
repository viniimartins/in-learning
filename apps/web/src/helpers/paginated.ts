namespace Paginated {
  export type Params = {
    pageIndex: number
    perPage: number
    search?: string
    isInstructor?: boolean
  }

  export type Response<T> = {
    data: T[]
    meta: {
      pageIndex: number
      perPage: number
      total: number
      totalPages: number
    }
  }
}

export type { Paginated }
