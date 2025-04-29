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
        id: z.string(),
      }),
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
      params: EnrollCourseController.validator.request.params?.parse(
        request.params,
      ),
    }

    const enrollCourseUseCase = container.resolve(EnrollCourseUseCase)
    const enrolledCourse = await enrollCourseUseCase.execute({
      courseId,
      userId: sub,
    })

    return reply.status(200).send({
      id: enrolledCourse.id,
    })
  }
}

export { EnrollCourseController }
