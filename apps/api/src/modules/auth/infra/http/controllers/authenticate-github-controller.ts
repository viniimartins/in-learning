import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeAuthenticateWithGithubUseCase } from '@/modules/auth/use-cases/factories/make-authenticate-github-use-case'

class AuthenticateGithubController {
  static route = '/github'

  static validator = {
    request: {
      body: z.object({
        code: z.string(),
      }),
    },
    response: {
      201: z.object({
        token: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { code } = AuthenticateGithubController.validator.request.body.parse(
      request.body,
    )

    const authenticateGithubUseCase = makeAuthenticateWithGithubUseCase()

    const { id } = await authenticateGithubUseCase.execute({
      code,
    })

    const token = await reply.jwtSign(
      {
        sub: id,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    )

    return reply.status(201).send({ token })
  }
}

export { AuthenticateGithubController }
