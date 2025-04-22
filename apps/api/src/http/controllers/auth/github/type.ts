import type z from 'zod'

import type { authenticateWithGithubBodySchema } from './schema'

export type AuthenticateWithGithubBody = z.infer<
  typeof authenticateWithGithubBodySchema
>
