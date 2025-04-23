import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeCourseGetByIdUseCase } from '@/use-cases/@factories/course/make-course-get-by-id'

import { courseSchema } from '../schema'

export function getCourseById(path: string, app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    path,
    {
      schema: {
        tags: ['courses'],
        summary: 'Get course by id',
        security: [{ bearerAuth: [] }],
        params: z.object({
          courseId: z.string().uuid(),
        }),
        response: {
          200: courseSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { courseId } = request.params

      const getCourseByIdUseCase = makeCourseGetByIdUseCase()

      const course = await getCourseByIdUseCase.execute({
        courseId,
      })

      return reply.status(200).send(course)
    },
  )
}
