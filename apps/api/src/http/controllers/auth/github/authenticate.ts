import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeAuthenticateWithGithubUseCase } from '@/use-cases/@factories/auth/make-authenticate-github-use-case'

import { authenticateWithGithubBodySchema } from './schema'

export function authenticateWithGithubController(
  path: string,
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().post(
    path,
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with Github',
        body: authenticateWithGithubBodySchema,
        response: {
          201: z.object({
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.body

      const authenticateWithGithubUseCase = makeAuthenticateWithGithubUseCase()

      const { user } = await authenticateWithGithubUseCase.execute({
        code,
      })

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token })
    },
  )
}
