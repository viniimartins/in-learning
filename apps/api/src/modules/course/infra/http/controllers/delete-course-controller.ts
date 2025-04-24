import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteCourseUseCase } from '@/modules/course/use-cases/factories/male-delete-course-use-case'

class DeleteCourseController {
  static route = '/courses/:id'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string(),
      }),
    },
    response: {
      204: z.null(),
      401: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { courseId } = request.params as z.infer<
      typeof this.validator.request.params
    >

    const deleteCourseUseCase = makeDeleteCourseUseCase()
    await deleteCourseUseCase.execute({
      id: courseId,
    })

    return reply.status(204).send()
  }
}

export { DeleteCourseController }
