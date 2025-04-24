import type { FastifyInstance } from 'fastify'

import { requiredAuthentication } from '@/middlewares/required-authentication'
import { coursesRoutes } from '@/modules/course/infra/http/routes/course-routes'

const routes = (app: FastifyInstance) => {
  app.register(coursesRoutes, {
    prefix: '/courses',
    preHandler: [requiredAuthentication],
  })
}

export { routes }
