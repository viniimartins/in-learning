import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Header } from '@/components/header'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: {
    template: 'Admin | %s',
    default: 'Painel',
  },
}

export default async function PanelLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex min-h-screen">
        <Header />

        <section className="mt-20 flex h-auto w-full flex-1 flex-col gap-6 p-12">
          {children}
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}
