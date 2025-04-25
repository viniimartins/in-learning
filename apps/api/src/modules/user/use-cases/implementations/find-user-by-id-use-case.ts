import type {
  IFindUserById,
  IFindUserByIdUseCase,
} from '../../domain/use-cases/find-user-by-id-case'
import type { IFindUserByIdRepository } from '../../repositories/find-user-by-id-repository'

class FindUserByIdUseCase implements IFindUserByIdUseCase {
  private readonly findUserByIdRepository: IFindUserByIdRepository

  constructor(findUserByIdRepository: IFindUserByIdRepository) {
    this.findUserByIdRepository = findUserByIdRepository
  }

  async execute(
    params: IFindUserById.Request,
  ): Promise<IFindUserById.Response> {
    const foundUser = await this.findUserByIdRepository.findById(params)

    return foundUser
  }
}

export { FindUserByIdUseCase }
