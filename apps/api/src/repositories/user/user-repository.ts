import type { User as PrismaUser } from '@prisma/client'

import type { User } from '@/http/controllers/auth/type'

import type { CreateUserRepositoryInput } from './types'

export interface UsersRepository {
  findById(id: string): Promise<User | PrismaUser | null>
  findByEmail(email: string): Promise<User | PrismaUser | null>
  create(data: CreateUserRepositoryInput): Promise<User | PrismaUser>
}
