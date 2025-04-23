import type { Account as PrismaAccount } from '@prisma/client'

import type { Account } from '@/http/controllers/auth/type'

import type { CreateAccountRepositoryInput } from './types'

export interface AccountRepository {
  findByProviderAccountId(
    providerAccountId: Account['id'],
  ): Promise<Account | PrismaAccount | null>
  create(data: CreateAccountRepositoryInput): Promise<Account | PrismaAccount>
}
