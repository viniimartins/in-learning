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
    response: {
      200: z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        slug: z.string(),
        instructorId: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        studentCount: z.number(),
        instructor: z
          .object({
            avatarUrl: z.string(),
            createdAt: z.date(),
            email: z.string(),
            id: z.string(),
            name: z.string(),
            updatedAt: z.date(),
          })
          .optional(),
        lessons: z
          .array(
            z.object({
              assisted: z.boolean(),
              courseId: z.string(),
              createdAt: z.date(),
              id: z.string(),
              title: z.string(),
              updatedAt: z.date(),
              videoUrl: z.string(),
            }),
          )
          .optional(),
        studentCourses: z
          .array(
            z.object({
              courseId: z.string(),
              userId: z.string(),
              progress: z.number(),
              completed: z.boolean(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          )
          .optional(),
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
      params: FindCourseByIdController.validator.request.params?.parse(
        request.params,
      ),
    }

    const findCourseByIdUseCase = container.resolve(FindCourseByIdUseCase)
    const found = await findCourseByIdUseCase.execute({
      courseId,
      userId: sub,
    })

    return reply.status(200).send(found)
  }
}

export { FindCourseByIdController }
