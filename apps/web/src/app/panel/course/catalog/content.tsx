'use client'

import { Search } from 'lucide-react'
import { useCallback, useState } from 'react'

import Pagination from '@/components/pagination'
import { Input } from '@/components/ui/input'
import type { Paginated } from '@/helpers/paginated'
import { useGetCourses } from '@/modules/course/query/get-course'

import CourseCatalog from './course-catalog'

export default function Content() {
  const [catalogTableParams, setCatalogTableParams] =
    useState<Paginated.Params>({
      pageIndex: 1,
      perPage: 10,
    })

  const { pageIndex, perPage } = catalogTableParams

  const { data: courses } = useGetCourses({
    pageIndex,
    perPage,
  })

  const onChangeCatalogTableParams = useCallback(
    (updatedParams: Partial<Paginated.Params>) => {
      return setCatalogTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  return (
    <>
      <div className="relative w-full">
        <Search className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4" />
        <Input placeholder="Qual curso você procura?" className="w-80 pl-9" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {courses?.data.map((course) => (
          <CourseCatalog key={course.id} course={course} />
        ))}
      </div>

      {courses?.meta && (
        <Pagination
          meta={courses.meta}
          onChangeParams={onChangeCatalogTableParams}
        />
      )}
    </>
  )
}
