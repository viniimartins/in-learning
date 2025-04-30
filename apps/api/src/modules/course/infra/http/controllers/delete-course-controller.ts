import { DeleteCourseUseCase } from '@modules/course/use-cases/delete-course-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class DeleteCourseController {
  static route = '/:courseId'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string(),
      }),
    },
    response: {
      200: z.null(),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    const {
      params: { courseId },
    } = {
      params: DeleteCourseController.validator.request.params?.parse(
        request.params,
      ),
    }

    const deleteCourseUseCase = container.resolve(DeleteCourseUseCase)
    await deleteCourseUseCase.execute({
      userId: sub,
      courseId,
    })

    return reply.status(200).send()
  }
}

export { DeleteCourseController }
