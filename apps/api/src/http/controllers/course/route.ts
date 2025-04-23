import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createCourse } from './create/create-course'
import { deleteCourse } from './delete/delete-course'
import { getCourses } from './get/get-courses'
import { getCourseById } from './get-by-id/get-by-id-course'

export async function courseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  getCourses('/courses', app)
  createCourse('/courses', app)
  deleteCourse('/courses/:courseId', app)
  getCourseById('/courses/:courseId', app)
}
