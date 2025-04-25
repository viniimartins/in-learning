import { PrismaUserRepository } from '../../infra/prisma/repositories/prisma-user-repository'
import { FindUserByIdUseCase } from '../implementations/find-user-by-id-use-case'

function makeFindUserByIdUseCase() {
  const findUserByIdRepository = new PrismaUserRepository()
  return new FindUserByIdUseCase(findUserByIdRepository)
}

export { makeFindUserByIdUseCase }
