namespace Paginated {
  export type Params = {
    pageIndex: number
    perPage: number
    search?: string
    isInstructor?: boolean
  }

  export type Meta = {
    pageIndex: number
    perPage: number
    total: number
    totalPages: number
  }

  export type Response<T> = {
    data: T[]
    meta: Meta
  }
}

export type { Paginated }
