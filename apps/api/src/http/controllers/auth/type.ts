export interface User {
  id: string
  name: string | null
  createdAt: Date
  updatedAt: Date
  email: string
  avatarUrl: string | null
}

export enum AccountProvider {
  GITHUB = 'GITHUB',
}

export interface Account {
  id: string
  provider: AccountProvider
  providerAccountId: string
  userId: string
}
