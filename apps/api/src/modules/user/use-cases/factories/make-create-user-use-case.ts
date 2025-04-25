import { PrismaUserRepository } from '../../infra/prisma/repositories/prisma-user-repository'
import { CreateUserUseCase } from '../implementations/create-user-use-case'

function makeCreateUserUseCase() {
  const createUserRepository = new PrismaUserRepository()
  return new CreateUserUseCase(createUserRepository)
}

export { makeCreateUserUseCase }
