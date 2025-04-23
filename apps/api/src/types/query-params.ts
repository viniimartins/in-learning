import type z from 'zod'

import type { metaQueryStringSchema } from '@/http/controllers/schema'

export type QueryParams = z.infer<typeof metaQueryStringSchema>
