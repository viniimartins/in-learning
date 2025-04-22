import type { Account } from '@/http/controllers/auth/type'

export interface CreateAccountRepositoryInput extends Omit<Account, 'id'> {
  id?: Account['id']
}
