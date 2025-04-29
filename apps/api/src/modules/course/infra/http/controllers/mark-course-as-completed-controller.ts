import { MarkCourseAsCompletedUseCase } from '@modules/course/use-cases/mark-course-as-completed-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class MarkCourseAsCompletedController {
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
      MarkCourseAsCompletedController.validator.request.params.parse(
        request.params,
      )

    const markCourseAsCompletedUseCase = container.resolve(
      MarkCourseAsCompletedUseCase,
    )

    await markCourseAsCompletedUseCase.execute({
      courseId,
      userId: sub,
    })

    return reply.status(204).send()
  }
}

export { MarkCourseAsCompletedController }
