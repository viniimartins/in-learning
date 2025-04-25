import type { WithoutEntityBaseProperties } from '@/modules/common/helpers/without-entity-base-properties'

import type { IAccountEntity } from '../domain/entities/account-entity'

namespace ICreateAccount {
  export type Params = WithoutEntityBaseProperties<IAccountEntity>

  export type Response = IAccountEntity
}

interface ICreateAccountRepository {
  create: (params: ICreateAccount.Params) => Promise<ICreateAccount.Response>
}

export { ICreateAccount, ICreateAccountRepository }
