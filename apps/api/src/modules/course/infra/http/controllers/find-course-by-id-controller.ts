import { FindCourseByIdUseCase } from '@modules/course/use-cases/find-course-by-id-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class FindCourseByIdController {
  static route = '/:courseId'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string(),
      }),
    },
    // response: {
    //   200: z.object({
    //     title: z.string(),
    //     subtitle: z.string(),
    //     description: z.string(),
    //     slug: z.string(),
    //     instructorId: z.string().uuid(),
    //     studentCount: z.number(),
    //   }),
    //   404: z.object({
    //     message: z.string(),
    //   }),
    // },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      params: { courseId },
    } = {
      params: FindCourseByIdController.validator.request.params?.parse(
        request.params,
      ),
    }

    const findCourseByIdUseCase = container.resolve(FindCourseByIdUseCase)
    const found = await findCourseByIdUseCase.execute({ id: courseId })

    return reply.status(200).send(found)
  }
}

export { FindCourseByIdController }
