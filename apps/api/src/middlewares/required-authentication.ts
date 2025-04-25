import { FastifyRequest } from 'fastify'

import { UnauthorizedError } from '@/common/errors'

async function requiredAuthentication(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (err) {
    throw new UnauthorizedError()
  }
}

export { requiredAuthentication }
