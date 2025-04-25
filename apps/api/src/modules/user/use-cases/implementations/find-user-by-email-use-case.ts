import type {
  IFindUserByEmail,
  IFindUserByEmailUseCase,
} from '../../domain/use-cases/find-user-by-email-use-case'
import type { IFindUserByEmailRepository } from '../../repositories/find-user-by-email-repository'

class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  private readonly findUserByEmailRepository: IFindUserByEmailRepository

  constructor(findUserByEmailRepository: IFindUserByEmailRepository) {
    this.findUserByEmailRepository = findUserByEmailRepository
  }

  async execute(
    params: IFindUserByEmail.Request,
  ): Promise<IFindUserByEmail.Response> {
    const user = await this.findUserByEmailRepository.findByEmail(params)

    return user
  }
}

export { FindUserByEmailUseCase }
