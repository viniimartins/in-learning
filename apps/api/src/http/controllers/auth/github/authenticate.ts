import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export function authenticateWithGithub(path: string, app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    path,
    {
      schema: {
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
      },
    },
    async (request, reply) => {
      const { code } = request.body

      console.log(code)

      return reply.status(201).send({ token: 'fake-token' })
    },
  )
}
