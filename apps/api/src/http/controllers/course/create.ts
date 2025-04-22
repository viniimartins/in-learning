import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { makeCreateCourseUseCase } from '@/use-cases/@factories/course/make-create-course-use-case'

export function createCourse(path: string, app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    path,
    {
      schema: {
        tags: ['courses'],
        summary: 'Create a new course',
        security: [{ bearerAuth: [] }],
        body: z.object({
          title: z.string(),
          subtitle: z.string(),
          description: z.string(),
          slug: z.string(),
          lessons: z.array(
            z.object({
              title: z.string(),
              description: z.string(),
              videoUrl: z.string(),
            }),
          ),
        }),
        response: {
          201: z.object({
            id: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.user.sub

      const { title, description, lessons, subtitle, slug } = request.body

      const createCourseUseCase = makeCreateCourseUseCase()

      const { course } = await createCourseUseCase.execute({
        title,
        description,
        lessons,
        subtitle,
        slug,
        instructorId: userId,
      })

      return reply.status(201).send({
        id: course.id,
      })
    },
  )
}
