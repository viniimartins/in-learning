import { authenticateRoutes } from '@modules/auth/infra/http/routes/authenticate-routes'
import { coursesRoutes } from '@modules/course/infra/http/routes/course-routes'
import type { FastifyInstance } from 'fastify'

const routes = (app: FastifyInstance) => {
  app.register(coursesRoutes, {
    prefix: '/courses',
  })

  app.register(authenticateRoutes, {
    prefix: '/auth',
  })
}

export { routes }
