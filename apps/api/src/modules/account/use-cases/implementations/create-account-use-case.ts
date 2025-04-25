import type {
  ICreateAccount,
  ICreateAccountUseCase,
} from '../../domain/use-cases/create-account-use-case'
import type { ICreateAccountRepository } from '../../repositories/create-account-repository'

class CreateAccountUseCase implements ICreateAccountUseCase {
  private readonly createAccountRepository: ICreateAccountRepository

  constructor(createAccountRepository: ICreateAccountRepository) {
    this.createAccountRepository = createAccountRepository
  }

  async execute(
    params: ICreateAccount.Request,
  ): Promise<ICreateAccount.Response> {
    const createdAccount = await this.createAccountRepository.create(params)

    return createdAccount
  }
}

export { CreateAccountUseCase }
