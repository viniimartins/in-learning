'use client'

import { type PropsWithChildren } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { ReactQueryProvider } from './react-query'
import { ThemeProvider } from './theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryProvider>
        {children}
        <Toaster />
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
