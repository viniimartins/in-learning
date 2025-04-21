import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import type { AccountRepository } from '../account-repository'

export class PrismaAccountRepository implements AccountRepository {
  async findByProviderAccountId(providerAccountId: string) {
    const account = await prisma.account.findFirst({
      where: {
        providerAccountId,
      },
    })

    return account
  }

  async create(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({
      data,
    })

    return account
  }
}
