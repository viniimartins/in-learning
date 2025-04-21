import { FastifyInstance } from 'fastify'

import { authenticateWithGithub } from './github/authenticate'

export async function authRoutes(app: FastifyInstance) {
  authenticateWithGithub('/session/github', app)
}
