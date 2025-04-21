import { FastifyInstance } from 'fastify'

import { authenticateWithGithubController } from './github/authenticate'

export async function authRoutes(app: FastifyInstance) {
  authenticateWithGithubController('/session/github', app)
}
