import z from 'zod'

export const authenticateWithGithubBodySchema = z.object({
  code: z.string(),
})
