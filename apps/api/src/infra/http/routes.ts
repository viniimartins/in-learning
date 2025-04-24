import type { FastifyInstance } from 'fastify'

import { authRoutes } from '@/http/controllers/auth/routes'
import { coursesRoutes } from '@/modules/course/infra/http/routes/course-routes'

const routes = (app: FastifyInstance) => {
  app.register(coursesRoutes, {
    prefix: '/courses',
  })

  app.register(authRoutes)
}

export { routes }
