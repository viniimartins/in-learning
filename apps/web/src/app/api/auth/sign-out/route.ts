import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/login'

  cookieStore.delete('token')

  return NextResponse.redirect(redirectUrl)
}
