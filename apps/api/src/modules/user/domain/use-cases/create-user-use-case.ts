import type { WithoutEntityBaseProperties } from 'src/modules/common/helpers/without-entity-base-properties'

import type { IUserEntity } from '../entities/user-entity'

namespace ICreateUser {
  export type Request = WithoutEntityBaseProperties<IUserEntity>

  export type Response = IUserEntity
}

interface ICreateUserUseCase {
  execute: (params: ICreateUser.Request) => Promise<ICreateUser.Response>
}

export { ICreateUser, ICreateUserUseCase }
