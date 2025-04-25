import { PrismaAccountRepository } from '../../infra/prisma/repositories/prisma-account-repository'
import { CreateAccountUseCase } from '../implementations/create-account-use-case'

function makeCreateAccountUseCase() {
  const createAccountRepository = new PrismaAccountRepository()
  return new CreateAccountUseCase(createAccountRepository)
}

export { makeCreateAccountUseCase }
