import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import type { Validator } from '@/modules/common/helpers/valitador'
import { makeCreateCourseUseCase } from '@/modules/course/use-cases/factories/make-create-course-use-case'

class CreateCourseController {
  static route = ''

  static validator: Validator = {
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
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      body: { data },
    } = {
      body: CreateCourseController.validator.request.body?.parse(request.body),
    }

    const createCourseUseCase = makeCreateCourseUseCase()
    const created = await createCourseUseCase.execute(data)

    return reply.status(201).send(created.id)
  }
}

export { CreateCourseController }
