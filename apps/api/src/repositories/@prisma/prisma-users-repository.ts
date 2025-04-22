import type { User as PrismaUser } from '@prisma/client'

import type { User } from '@/http/controllers/auth/type'
import { prisma } from '@/lib/prisma'

import type { CreateUserRepositoryInput } from '../user/types'
import type { UsersRepository } from '../user/user-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: User['id']): Promise<PrismaUser | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: User['email']): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: CreateUserRepositoryInput): Promise<PrismaUser> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
