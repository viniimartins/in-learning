import type { AuthenticateWithGithubBody } from '@/http/controllers/auth/github/type'
import { AccountProvider, type User } from '@/http/controllers/auth/type'
import type { AccountRepository } from '@/repositories/account/account-repository'
import type { GithubOAuthService } from '@/service/github-oauth-service'
import { BadRequestError } from '@/use-cases/@errors/bad-request-error'

interface AuthenticateWithGithubUseCaseRequest
  // eslint-disable-next-line prettier/prettier
  extends AuthenticateWithGithubBody { }

interface AuthenticateWithGithubUseCaseResponse {
  user: User
}

export class AuthenticateWithGithubUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private accountRepository: AccountRepository,
    private githubOAuthService: GithubOAuthService,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async execute({
    code,
  }: AuthenticateWithGithubUseCaseRequest): Promise<AuthenticateWithGithubUseCaseResponse> {
    const accessToken = await this.githubOAuthService.fetchAccessToken(code)

    const {
      id: githubId,
      name,
      email,
      avatarUrl,
    } = await this.githubOAuthService.fetchUser(accessToken)

    if (email === null) {
      throw new BadRequestError(
        'Your GitHub account must have an email to authenticate.',
      )
    }

    let user = await this.usersRepository.findByEmail(email)

    if (!user) {
      user = await this.usersRepository.create({
        name,
        email,
        avatarUrl,
      })
    }

    let account = await this.accountRepository.findByProviderAccountId(githubId)

    if (!account) {
      account = await this.accountRepository.create({
        provider: AccountProvider.GITHUB,
        providerAccountId: githubId,
        userId: user.id,
      })
    }

    return {
      user,
    }
  }
}
