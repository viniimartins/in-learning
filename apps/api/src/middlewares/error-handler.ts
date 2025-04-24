import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.log(error)

  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  reply.status(500).send({ message: 'Internal server error' })
}
