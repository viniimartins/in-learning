import type { Account as PrismaAccount } from '@prisma/client'

import type { Account } from '@/http/controllers/auth/type'
import { prisma } from '@/lib/prisma'

import type { AccountRepository } from '../account/account-repository'
import type { CreateAccountRepositoryInput } from '../account/types'

export class PrismaAccountRepository implements AccountRepository {
  async findByProviderAccountId(
    providerAccountId: Account['id'],
  ): Promise<PrismaAccount | null> {
    const account = await prisma.account.findFirst({
      where: {
        providerAccountId,
      },
    })

    return account
  }

  async create(data: CreateAccountRepositoryInput): Promise<PrismaAccount> {
    const account = await prisma.account.create({
      data,
    })

    return account
  }
}
