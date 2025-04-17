import { Search } from 'lucide-react'

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

import CourseEnrolled from '../../course-enrolled'

export default function EnrolledCoursePage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/panel">Painel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>React Native</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-8">
        <div className="relative w-full">
          <Search className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="O que você está procurando?"
            className="w-80 pl-9"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <CourseEnrolled key={index} />
          ))}
        </div>

        <Pagination />
      </div>
    </>
  )
}
