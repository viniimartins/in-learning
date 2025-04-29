import { EnrollCourseUseCase } from '@modules/course/use-cases/enroll-course-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class EnrollCourseController {
  static route = '/:courseId/enroll'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string(),
      }),
    },
    response: {
      200: z.object({
        courseId: z.string(),
        userId: z.string(),
        progress: z.number(),
        completed: z.boolean(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    const {
      params: { courseId },
    } = {
      params: EnrollCourseController.validator.request.params?.parse(
        request.params,
      ),
    }

    const enrollCourseUseCase = container.resolve(EnrollCourseUseCase)
    const found = await enrollCourseUseCase.execute({
      courseId,
      userId: sub,
    })

    return reply.status(200).send(found)
  }
}

export { EnrollCourseController }
