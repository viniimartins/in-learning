import type { WithoutEntityBaseProperties } from '@/modules/common/helpers/without-entity-base-properties'

import type { IAccountEntity } from '../entities/account-entity'

namespace ICreateAccount {
  export type Request = WithoutEntityBaseProperties<IAccountEntity>

  export type Response = IAccountEntity
}

interface ICreateAccountUseCase {
  execute: (params: ICreateAccount.Request) => Promise<ICreateAccount.Response>
}

export { ICreateAccount, ICreateAccountUseCase }
