/* eslint-disable prettier/prettier */
import { NotFoundError } from '@/common/errors/not-found-error'

import type {
  IFindAccountByProviderId,
  IFindAccountByProviderIdUseCase,
} from '../../domain/use-cases/find-account-by-provider-id-use-case'
import type { IFindAccountByProviderIdRepository } from '../../repositories'

class FindAccountByProviderIdUseCase
  implements IFindAccountByProviderIdUseCase {
  private readonly findAccountByProviderIdRepository: IFindAccountByProviderIdRepository

  constructor(
    findAccountByProviderIdRepository: IFindAccountByProviderIdRepository,
  ) {
    this.findAccountByProviderIdRepository = findAccountByProviderIdRepository
  }

  async execute(
    params: IFindAccountByProviderId.Request,
  ): Promise<IFindAccountByProviderId.Response> {
    const foundAccount =
      await this.findAccountByProviderIdRepository.findByProviderAccountId({
        providerAccountId: params.id,
      })

    if (!foundAccount) {
      throw new NotFoundError('Account not found')
    }

    return foundAccount
  }
}

export { FindAccountByProviderIdUseCase }
