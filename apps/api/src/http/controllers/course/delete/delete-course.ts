import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeDeleteCourseUseCase } from '@/use-cases/@factories/course/make-delete-course-use-case'

export function deleteCourse(path: string, app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    path,
    {
      schema: {
        tags: ['courses'],
        summary: 'Delete a course',
        security: [{ bearerAuth: [] }],
        params: z.object({
          courseId: z.string().uuid(),
        }),
        response: {
          200: z.null(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const { courseId } = request.params

      const deleteCourseUseCase = makeDeleteCourseUseCase()

      await deleteCourseUseCase.execute({ courseId, userId })

      return reply.status(200).send()
    },
  )
}
