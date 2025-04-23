import z from 'zod'

export const metaSchema = z.object({
  pageIndex: z.number(),
  perPage: z.number(),
  total: z.number(),
  totalPages: z.number(),
})

export const metaQueryStringSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(50).default(12),
  name: z
    .string()
    .optional()
    .transform((value) => (value && value !== '' ? value : undefined)),
})
