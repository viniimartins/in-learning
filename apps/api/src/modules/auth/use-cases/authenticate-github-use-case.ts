/* eslint-disable prettier/prettier */
import type {
  IAuthenticateGithub,
  IAuthenticateGithubUseCase,
} from '@modules/auth/domain/use-cases/authenticate-github-use-case'
import { inject, injectable } from 'tsyringe'

import { BadRequestError } from '@/common/errors/bad-request-error'
import type { GithubOAuthService } from '@/infra/services/github-oauth-service'
import {
  CREATE_ACCOUNT_REPOSITORY_TOKEN,
  FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN,
  GITHUB_OAUTH_SERVICE_TOKEN,
} from '@/modules/account/constants'
import { AccountProvider } from '@/modules/account/domain/entities/account-entity'
import type { PrismaAccountRepository } from '@/modules/account/infra/prisma/repositories/prisma-account-repository'
import {
  CREATE_USER_REPOSITORY_TOKEN,
  FIND_USER_BY_EMAIL_REPOSITORY_TOKEN,
} from '@/modules/user/constants'
import type { ICreateUserRepository } from '@/modules/user/repositories/create-user-repository'
import type { IFindUserByEmailRepository } from '@/modules/user/repositories/find-user-by-email-repository'

@injectable()
class AuthenticateGithubUseCase implements IAuthenticateGithubUseCase {
  constructor(
    @inject(GITHUB_OAUTH_SERVICE_TOKEN)
    private readonly githubOAuthService: GithubOAuthService,
    @inject(FIND_USER_BY_EMAIL_REPOSITORY_TOKEN)
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    @inject(CREATE_USER_REPOSITORY_TOKEN)
    private readonly createUserRepository: ICreateUserRepository,
    @inject(FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN)
    private readonly findAccountByProviderAccountIdRepository: PrismaAccountRepository,
    @inject(CREATE_ACCOUNT_REPOSITORY_TOKEN)
    private readonly createAccountRepository: PrismaAccountRepository,
  ) { }

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
