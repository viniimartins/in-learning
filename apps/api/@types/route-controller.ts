import type { z } from 'zod'

import type { authenticateWithGithubSchema } from '../src/http/controllers/auth/github/schema'

export type AuthenticateWithGithubController = {
  Body: z.infer<typeof authenticateWithGithubSchema.body>
  Reply: z.infer<
    (typeof authenticateWithGithubSchema.response)[keyof typeof authenticateWithGithubSchema.response]
  >
}
