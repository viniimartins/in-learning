import { requiredAuthentication } from '@middlewares/required-authentication'
import { CreateCourseController } from '@modules/course/infra/http/controllers/create-course-controller'
import { DeleteCourseController } from '@modules/course/infra/http/controllers/delete-course-controller'
import { FindCourseByIdController } from '@modules/course/infra/http/controllers/find-course-by-id-controller'
import { SearchCoursesController } from '@modules/course/infra/http/controllers/search-courses-controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { CompleteCourseController } from '../controllers/complete-course-controller'
import { EnrollCourseController } from '../controllers/enroll-course-controller'

const routes = (app: FastifyInstance) => {
  app.addHook('onRequest', requiredAuthentication)

  app.withTypeProvider<ZodTypeProvider>().post(
    CreateCourseController.route,
    {
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

  app.withTypeProvider<ZodTypeProvider>().get(
    SearchCoursesController.route,
    {
      schema: {
        tags: ['Courses'],
        summary: 'Search courses',
        security: [{ bearerAuth: [] }],
        querystring: SearchCoursesController.validator.request.querystring,
        response: SearchCoursesController.validator.response,
      },
    },
    SearchCoursesController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    EnrollCourseController.route,
    {
      schema: {
        tags: ['Courses'],
        summary: 'Enroll a course',
        security: [{ bearerAuth: [] }],
        params: EnrollCourseController.validator.request.params,
        response: EnrollCourseController.validator.response,
      },
    },
    EnrollCourseController.handle,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    CompleteCourseController.route,
    {
      schema: {
        tags: ['Courses'],
        summary: 'Complete a course',
        security: [{ bearerAuth: [] }],
        params: CompleteCourseController.validator.request.params,
        response: CompleteCourseController.validator.response,
      },
    },
    CompleteCourseController.handle,
  )
}

export { routes as coursesRoutes }
