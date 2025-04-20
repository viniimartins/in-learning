import { Search } from 'lucide-react'
import type { Metadata } from 'next'

import Pagination from '@/components/pagination'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'

import Instructor from './instructor-'

export const metadata: Metadata = {
  title: 'Instrutores',
}

export default function InstructorsPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Instrutores</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <div className="relative w-full">
          <Search className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Qual instrutor você procura?"
            className="w-80 pl-9"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Instructor key={index} />
          ))}
        </div>

        <Pagination />
      </div>
    </>
  )
}
