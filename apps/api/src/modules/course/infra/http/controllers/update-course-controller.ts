import { UpdateCourseUseCase } from '@modules/course/use-cases/update-course-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class UpdateCourseController {
  static route = '/:courseId'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string().uuid(),
      }),
      body: z.object({
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
        slug: z.string(),
        lessons: z.array(
          z.object({
            title: z.string(),
            videoUrl: z.string(),
          }),
        ),
      }),
    },
    response: {
      200: z.object({
        id: z.string(),
      }),
      401: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    const { body: data } = {
      body: UpdateCourseController.validator.request.body?.parse(request.body),
    }

    const { courseId } = UpdateCourseController.validator.request.params.parse(
      request.params,
    )

    const updateCourseUseCase = container.resolve(UpdateCourseUseCase)
    const updated = await updateCourseUseCase.execute({
      ...data,
      courseId,
      userId: sub,
    })

    return reply.status(200).send(updated)
  }
}

export { UpdateCourseController }
