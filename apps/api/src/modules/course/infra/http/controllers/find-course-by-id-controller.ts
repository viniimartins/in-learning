import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindCourseByIdUseCase } from '@/modules/course/use-cases/factories/male-find-course-by-id-use-case'

class FindCourseByIdController {
  static route = '/courses/:id'

  static validator = {
    request: {
      params: z.object({
        courseId: z.string(),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            image: z.string(),
            slug: z.string(),
          }),
        ),
        meta: z.object({
          pageIndex: z.number(),
          perPage: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
      401: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { courseId } = request.params as z.infer<
      typeof this.validator.request.params
    >

    const findCourseByIdUseCase = makeFindCourseByIdUseCase()
    const found = await findCourseByIdUseCase.execute({ id: courseId })

    return reply.status(200).send(found)
  }
}

export { FindCourseByIdController }
