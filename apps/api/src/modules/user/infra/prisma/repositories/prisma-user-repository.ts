/* eslint-disable prettier/prettier */
import { prisma } from '@/lib/prisma'
import type {
  ICreateUser,
  ICreateUserRepository,
} from '@/modules/user/repositories/create-user-repository'
import type {
  IFindUserByEmail,
  IFindUserByEmailRepository,
} from '@/modules/user/repositories/find-user-by-email-repository'
import type {
  IFindUserById,
  IFindUserByIdRepository,
} from '@/modules/user/repositories/find-user-by-id-repository'

class PrismaUserRepository
  implements
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository {
  async create(data: ICreateUser.Params): Promise<ICreateUser.Response> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail({
    email,
  }: IFindUserByEmail.Params): Promise<IFindUserByEmail.Response> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return user
  }

  async findById({
    id,
  }: IFindUserById.Params): Promise<IFindUserById.Response> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }
}

export { PrismaUserRepository }
