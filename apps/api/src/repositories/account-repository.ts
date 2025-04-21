import { type Account, Prisma } from '@prisma/client'

export interface AccountRepository {
  findByProviderAccountId(providerAccountId: string): Promise<Account | null>
  create(data: Prisma.AccountCreateInput): Promise<Account>
}
