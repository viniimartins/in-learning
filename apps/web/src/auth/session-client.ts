import { useGetCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

import type { ISession } from './model'

export function getSession() {
  const getCookie = useGetCookie()

  const token = getCookie('token')

  if (!token) return null

  const decoded = jwtDecode<ISession>(token as string)

  return { ...decoded, token }
}
