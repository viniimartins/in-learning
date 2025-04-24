import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { CreateCourseController } from '../controllers/create-course-controller'
import { DeleteCourseController } from '../controllers/delete-course-controller'
import { FindCourseByIdController } from '../controllers/find-course-by-id-controller'

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

  app.withTypeProvider<ZodTypeProvider>().get(
    FindCourseByIdController.route,
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['Courses'],
        summary: 'Find a course by id',
        security: [{ bearerAuth: [] }],
        params: FindCourseByIdController.validator.request.params,
        response: FindCourseByIdController.validator.response,
      },
    },
    FindCourseByIdController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    DeleteCourseController.route,
    {
      preHandler: [verifyJWT],
      schema: {
        tags: ['Courses'],
        summary: 'Delete a course by id',
        security: [{ bearerAuth: [] }],
        params: DeleteCourseController.validator.request.params,
        response: DeleteCourseController.validator.response,
      },
    },
    DeleteCourseController.handle,
  )
}

export { courseRoutes }
