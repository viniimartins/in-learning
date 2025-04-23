import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createCourse } from './create/create-course'
import { deleteCourse } from './delete/delete-course'
import { getCourses } from './get/get-courses'

export async function courseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  createCourse('/courses', app)
  deleteCourse('/courses/:courseId', app)
  getCourses('/courses', app)
}
