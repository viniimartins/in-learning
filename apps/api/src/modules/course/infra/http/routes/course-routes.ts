import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { CreateCourseController } from '../controllers/create-course-controller'

const courseRoutes = (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    CreateCourseController.route,
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['Courses'],
        summary: 'Create a new course',
        security: [{ bearerAuth: [] }],

        body: CreateCourseController.validator.request.body,
        response: CreateCourseController.validator.response,
      },
    },
    CreateCourseController.handle,
  )
}

export { courseRoutes }
