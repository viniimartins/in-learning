import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { makeGetCourseUseCase } from '@/use-cases/@factories/course/make-get-course-use-case'

import { metaQueryStringSchema, metaSchema } from '../../schema'
import { courseSchema } from '../schema'

export function getCourses(path: string, app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    path,
    {
      schema: {
        tags: ['courses'],
        summary: 'Get courses',
        security: [{ bearerAuth: [] }],
        querystring: metaQueryStringSchema,
        response: {
          200: z.object({
            data: z.array(courseSchema),
            meta: metaSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const { page, perPage, name } = request.query

      const getAllCoursesUseCase = makeGetCourseUseCase()

      const paginatedCourses = await getAllCoursesUseCase.execute({
        page,
        perPage,
        name,
      })

      return reply.status(200).send(paginatedCourses)
    },
  )
}
