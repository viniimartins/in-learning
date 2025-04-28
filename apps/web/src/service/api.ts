import { env } from '@in-learning/env'
import axios, { type AxiosError } from 'axios'
import { getCookie } from 'cookies-next'

const baseURL = env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL,
})

let token: string | null = null

async function getToken() {
  if (!token) {
    const cookieToken = await getCookie('token')

    if (cookieToken) {
      token = cookieToken
    } else {
      token = null
    }
  }

  return token
}

api.interceptors.request.use(async (config) => {
  await getToken()

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error: AxiosError) {
    if (error?.response?.status === 401) {
      window.location.href = '/api/auth/sign-out'
    }

    return Promise.reject(error)
  },
)
