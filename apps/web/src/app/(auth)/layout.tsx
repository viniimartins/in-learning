import Image from 'next/image'
import type { ReactNode } from 'react'

import bgAuth from '@/assets/auth/bg-auth.jpg'

export default async function AuthenticationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <main className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden lg:block">
          <Image
            src={bgAuth}
            alt="Image"
            priority
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mx-auto flex h-full min-w-[27.5rem] max-w-[27.5rem] flex-col items-center justify-center space-y-6 px-4 py-8">
          {children}
        </div>
      </main>
    </>
  )
}
