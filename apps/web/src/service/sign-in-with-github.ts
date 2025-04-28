import { api } from './api'

namespace ISignInWithGithub {
  export type Request = {
    code: string
  }

  export type Response = {
    token: string
  }
}

export async function signInWithGithub({
  code,
}: ISignInWithGithub.Request): Promise<ISignInWithGithub.Response> {
  const { data } = await api.post<ISignInWithGithub.Response>('auth/github', {
    code,
  })

  return data
}
