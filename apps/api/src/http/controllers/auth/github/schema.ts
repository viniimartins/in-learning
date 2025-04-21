import { z } from 'zod'

export const authenticateWithGithubSchema = {
  tags: ['auth'],
  summary: 'Authenticate with Github',
  body: z.object({
    code: z.string(),
  }),
  response: {
    201: z.object({
      token: z.string(),
    }),
    401: z.object({
      message: z.string(),
    }),
  },
}
