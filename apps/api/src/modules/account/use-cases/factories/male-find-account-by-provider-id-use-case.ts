import { PrismaAccountRepository } from '../../infra/prisma/repositories/prisma-account-repository'
import { FindAccountByProviderIdUseCase } from '../implementations/find-course-by-provider-id-use-case'
function makeFindAccountByProviderIdUseCase() {
  const findAccountByProviderIdRepository = new PrismaAccountRepository()
  return new FindAccountByProviderIdUseCase(findAccountByProviderIdRepository)
}

export { makeFindAccountByProviderIdUseCase }
