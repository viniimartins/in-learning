import type z from 'zod'

import type { metaSchema } from '@/http/controllers/schema'

export type Meta = z.infer<typeof metaSchema>

export interface PaginatedResponse<T> {
  data: T[]
  meta: Meta
}
