import { PrismaAccountRepository } from '@/repositories/@prisma/prisma-account-repository'
import { PrismaUsersRepository } from '@/repositories/@prisma/prisma-users-repository'
import { GithubOAuthService } from '@/service/github-oauth-service'

import { AuthenticateWithGithubUseCase } from '../../auth/github/authenticate'

export function makeAuthenticateWithGithubUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const accountRepository = new PrismaAccountRepository()
  const githubOAuthService = new GithubOAuthService()

  const useCase = new AuthenticateWithGithubUseCase(
    usersRepository,
    accountRepository,
    githubOAuthService,
  )

  return useCase
}
