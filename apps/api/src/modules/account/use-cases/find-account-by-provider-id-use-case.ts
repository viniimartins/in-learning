/* eslint-disable prettier/prettier */

import { NotFoundError } from '@common/errors'
import { FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN } from '@modules/account/constants'
import type {
  IFindAccountByProviderId,
  IFindAccountByProviderIdUseCase,
} from '@modules/account/domain/use-cases'
import type { IFindAccountByProviderIdRepository } from '@modules/account/repositories'
import { inject, injectable } from 'tsyringe'

@injectable()
class FindAccountByProviderIdUseCase
  implements IFindAccountByProviderIdUseCase {
  constructor(
    @inject(FIND_ACCOUNT_BY_PROVIDER_ID_REPOSITORY_TOKEN)
    private readonly findAccountByProviderIdRepository: IFindAccountByProviderIdRepository,
  ) { }

  async execute(
    params: IFindAccountByProviderId.Request,
  ): Promise<IFindAccountByProviderId.Response> {
    const { userId } = params

    const foundAccount =
      await this.findAccountByProviderIdRepository.findByProviderAccountId({
        userId,
      })

    if (!foundAccount) {
      throw new NotFoundError('Account not found')
    }

    return foundAccount
  }
}

export { FindAccountByProviderIdUseCase }
