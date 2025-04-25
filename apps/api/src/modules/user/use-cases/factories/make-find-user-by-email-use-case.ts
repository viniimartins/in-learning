import { PrismaUserRepository } from '../../infra/prisma/repositories/prisma-user-repository'
import { FindUserByEmailUseCase } from '../implementations/find-user-by-email-use-case'

function makeFindUserByEmailUseCase() {
  const findUserByEmailRepository = new PrismaUserRepository()
  return new FindUserByEmailUseCase(findUserByEmailRepository)
}

export { makeFindUserByEmailUseCase }
