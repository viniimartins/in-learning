export interface User {
  id: string
  name: string | null
  createdAt: Date
  updatedAt: Date
  email: string
  avatarUrl: string | null
}
