'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'

import { useSidebar } from '../ui/sidebar'

export function Header() {
  const { open } = useSidebar()

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 flex h-20 items-center border-b transition-[width,left] duration-300 ease-in-out',
        open
          ? 'left-[var(--sidebar-width)] w-[calc(100vw-var(--sidebar-width))]'
          : 'left-[var(--sidebar-width-icon)] w-[calc(100vw-var(--sidebar-width-icon))]',
      )}
    >
      <div className="flex w-full items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <h3 className="font-inter text-2xl font-bold">
            In Learning<span className="text-muted-foreground">.</span>
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <h1 className="text-muted-foreground text-sm">Profile</h1>
        </div>
      </div>
    </header>
  )
}
