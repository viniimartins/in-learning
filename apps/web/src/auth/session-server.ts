import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import type { ISession } from './model'

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  const decoded = jwtDecode<ISession>(token)

  return decoded
}
