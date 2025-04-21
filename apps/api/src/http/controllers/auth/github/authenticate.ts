import type { FastifyReply, FastifyRequest } from 'fastify'

import type { AuthenticateWithGithubController } from '../../../../../@types/route-controller'

export async function authenticateWithGithubController(
  request: FastifyRequest<AuthenticateWithGithubController>,
  reply: FastifyReply<AuthenticateWithGithubController>,
) {
  const { code } = request.body

  console.log(code)

  return reply.status(201).send({ token: 'fake-token' })
}
