import { CreateCourseUseCase } from '@modules/course/use-cases/create-course-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class CreateCourseController {
  static route = ''

  static validator = {
    request: {
      body: z.object({
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
        slug: z.string(),
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
    const { sub } = request.user

    const { body: data } = {
      body: CreateCourseController.validator.request.body?.parse(request.body),
    }

    const createCourseUseCase = container.resolve(CreateCourseUseCase)
    const created = await createCourseUseCase.execute({
      ...data,
      instructorId: sub,
    })

    return reply.status(201).send(created.id)
  }
}

export { CreateCourseController }
