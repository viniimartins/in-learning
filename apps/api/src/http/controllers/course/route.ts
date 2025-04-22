import { FastifyInstance } from 'fastify'
import { createCourse } from './create'

export async function courseRoutes(app: FastifyInstance) {
  createCourse('/courses', app)
}
