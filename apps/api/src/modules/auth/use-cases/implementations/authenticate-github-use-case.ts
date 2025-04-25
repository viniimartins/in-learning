import { BadRequestError } from '@/common/errors/bad-request-error'
import type { GithubOAuthService } from '@/infra/services/github-oauth-service'
import { AccountProvider } from '@/modules/account/domain/entities/account-entity'
import type { PrismaAccountRepository } from '@/modules/account/infra/prisma/repositories/prisma-account-repository'
import type { ICreateUserRepository } from '@/modules/user/repositories/create-user-repository'
import type { IFindUserByEmailRepository } from '@/modules/user/repositories/find-user-by-email-repository'

import type {
  IAuthenticateGithub,
  IAuthenticateGithubUseCase,
} from '../../domain/use-cases/authentication-github-use-case'

class AuthenticateGithubUseCase implements IAuthenticateGithubUseCase {
  private readonly githubOAuthService: GithubOAuthService

  private readonly findUserByEmailRepository: IFindUserByEmailRepository
  private readonly createUserRepository: ICreateUserRepository

  private readonly findAccountByProviderAccountIdRepository: PrismaAccountRepository
  private readonly createAccountRepository: PrismaAccountRepository

  constructor(
    githubOAuthService: GithubOAuthService,
    findUserByEmailRepository: IFindUserByEmailRepository,
    createUserRepository: ICreateUserRepository,
    findAccountByProviderAccountIdRepository: PrismaAccountRepository,
    createAccountRepository: PrismaAccountRepository,
  ) {
    this.githubOAuthService = githubOAuthService
    this.findUserByEmailRepository = findUserByEmailRepository
    this.createUserRepository = createUserRepository
    this.findAccountByProviderAccountIdRepository =
      findAccountByProviderAccountIdRepository
    this.createAccountRepository = createAccountRepository
  }

  async execute(
    params: IAuthenticateGithub.Request,
  ): Promise<IAuthenticateGithub.Response> {
    const { code } = params

    const accessTokenGithub =
      await this.githubOAuthService.fetchAccessToken(code)

    const {
      id: githubId,
      name,
      email,
      avatarUrl,
    } = await this.githubOAuthService.fetchUser(accessTokenGithub)

    if (email === null) {
      throw new BadRequestError(
        'Your GitHub account must have an email to authenticate.',
      )
    }

    let user = await this.findUserByEmailRepository.findByEmail({
      email,
    })

    if (!user) {
      user = await this.createUserRepository.create({
        name,
        email,
        avatarUrl,
      })
    }

    let account =
      await this.findAccountByProviderAccountIdRepository.findByProviderAccountId(
        {
          providerAccountId: githubId,
        },
      )

    if (!account) {
      account = await this.createAccountRepository.create({
        provider: AccountProvider.GITHUB,
        providerAccountId: githubId,
        userId: user.id,
      })
    }

    return user
  }
}

export { AuthenticateGithubUseCase }
