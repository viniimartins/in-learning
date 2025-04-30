import { CompleteCourseUseCase } from '@modules/course/use-cases/complete-course-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class CompleteCourseController {
  static route = '/:courseId/completed'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string().uuid(),
      }),
    },
    response: {
      204: z.null(),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    const { courseId } =
      CompleteCourseController.validator.request.params.parse(request.params)

    const completeCourseUseCase = container.resolve(CompleteCourseUseCase)

    await completeCourseUseCase.execute({
      courseId,
      userId: sub,
    })

    return reply.status(204).send()
  }
}

export { CompleteCourseController }
