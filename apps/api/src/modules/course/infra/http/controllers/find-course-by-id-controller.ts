import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

    console.log(courseId)

    return reply.status(200).send({
      data: {
        id: '1',
        title: 'Course 1',
        description: 'Description 1',
      },
    })
  }
}

export { FindCourseByIdController }
