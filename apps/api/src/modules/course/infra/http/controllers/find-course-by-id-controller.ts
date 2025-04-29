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
      // 200: z.object({
      //   id: z.string().uuid(),
      //   title: z.string(),
      //   subtitle: z.string(),
      //   description: z.string(),
      //   slug: z.string(),
      //   studentCount: z.number(),
      //   instructorId: z.string().uuid(),
      //   createdAt: z.date(),
      //   updatedAt: z.date(),
      //   lessons: z.array(
      //     z.object({
      //       id: z.string().uuid(),
      //       title: z.string(),
      //       videoUrl: z.string(),
      //       courseId: z.string().uuid(),
      //       createdAt: z.date(),
      //       updatedAt: z.date(),
      //     }),
      //   ),
      //   instructor: z.object({
      //     id: z.string().uuid(),
      //     name: z.string().nullable(),
      //     email: z.string(),
      //     avatarUrl: z.string(),
      //     createdAt: z.date(),
      //     updatedAt: z.date(),
      //   }),
      //   studentCourses: z.array(
      //     z.object({
      //       courseId: z.string().uuid(),
      //       userId: z.string().uuid(),
      //       createdAt: z.date(),
      //       updatedAt: z.date(),
      //     }),
      //   ),
      // }),
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
