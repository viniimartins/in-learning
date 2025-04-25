/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import { AccountProvider } from '@/modules/account/domain/entities/account-entity'
import type {
  ICreateAccount,
  ICreateAccountRepository,
} from '@/modules/account/repositories/create-account-repository'
import type {
  IFindAccountByProviderId,
  IFindAccountByProviderIdRepository,
} from '@/modules/account/repositories/find-account-by-provider-id-repository'

class PrismaAccountRepository
  implements ICreateAccountRepository, IFindAccountByProviderIdRepository {
  async create(data: ICreateAccount.Params): Promise<ICreateAccount.Response> {
    const account = await prisma.account.create({
      data,
    })

    return {
      ...account,
      provider: account.provider as AccountProvider,
    }
  }

  async findByProviderAccountId({
    providerAccountId,
  }: IFindAccountByProviderId.Params): Promise<IFindAccountByProviderId.Response> {
    const account = await prisma.account.findUnique({
      where: { providerAccountId },
    })

    return {
      id: account!.id,
      userId: account!.userId,
      providerAccountId: account!.providerAccountId,
      provider: account!.provider as AccountProvider,
    }
  }
}

export { PrismaAccountRepository }
