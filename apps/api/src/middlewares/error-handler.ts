import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { InternalServerError } from '@/common/errors'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.log(error)

  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  throw new InternalServerError()
}
