import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { authenticateWithGithubController } from './github/authenticate'
import { authenticateWithGithubSchema } from './github/schema'

export async function authRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/session/github',
    {
      schema: authenticateWithGithubSchema,
    },
    authenticateWithGithubController,
  )
}
