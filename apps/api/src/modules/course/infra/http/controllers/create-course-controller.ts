import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateCourseUseCase } from '@/modules/course/use-cases/factories/make-create-course-use-case'

class CreateCourseController {
  static route = '/courses'

  static validator = {
    request: {
      body: z.object({
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
        slug: z.string(),
        instructorId: z.string(),
        studentCount: z.number(),
        lessons: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            videoUrl: z.string(),
          }),
        ),
      }),
    },
    response: {
      201: z.object({
        id: z.string(),
      }),
      401: z.object({
        message: z.string(),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as z.infer<typeof this.validator.request.body>

    const createCourseUseCase = makeCreateCourseUseCase()
    const created = await createCourseUseCase.execute(data)

    return reply.status(201).send(created.id)
  }
}

export { CreateCourseController }
