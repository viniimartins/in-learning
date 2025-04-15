'use client'

import Link from 'next/link'
import * as React from 'react'

import { Sidebar, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="items-center">
        <Link href="/">
          <span className="text-2xl font-bold transition-transform duration-200 ease-in-out group-data-[collapsible=icon]:scale-0 group-data-[collapsible=icon]:opacity-0">
            UNIVINTE
          </span>
        </Link>
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
