import { GithubOAuthService } from '@/infra/services/github-oauth-service'
import { PrismaAccountRepository } from '@/modules/account/infra/prisma/repositories/prisma-account-repository'
import { PrismaUserRepository } from '@/modules/user/infra/prisma/repositories/prisma-user-repository'

import { AuthenticateGithubUseCase } from '../implementations/authenticate-github-use-case'

export function makeAuthenticateWithGithubUseCase() {
  const githubOAuthService = new GithubOAuthService()
  const findUserByEmailRepository = new PrismaUserRepository()
  const createUserRepository = new PrismaUserRepository()
  const findAccountByProviderAccountIdRepository = new PrismaAccountRepository()
  const createAccountRepository = new PrismaAccountRepository()

  return new AuthenticateGithubUseCase(
    githubOAuthService,
    findUserByEmailRepository,
    createUserRepository,
    findAccountByProviderAccountIdRepository,
    createAccountRepository,
  )
}
