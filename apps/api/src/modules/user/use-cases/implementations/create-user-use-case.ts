import type {
  ICreateUser,
  ICreateUserUseCase,
} from '../../domain/use-cases/create-user-use-case'
import type { ICreateUserRepository } from '../../repositories/create-user-repository'

class CreateUserUseCase implements ICreateUserUseCase {
  private readonly createUserRepository: ICreateUserRepository

  constructor(createUserRepository: ICreateUserRepository) {
    this.createUserRepository = createUserRepository
  }

  async execute(params: ICreateUser.Request): Promise<ICreateUser.Response> {
    const user = await this.createUserRepository.create(params)

    return user
  }
}

export { CreateUserUseCase }
