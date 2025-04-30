'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Paginated } from '@/helpers/paginated'
import { useGetCourses } from '@/modules/course/query/get-course'

import CourseEnrolled from './course-enrolled'

export function Content() {
  const [enrolledTableParams, setEnrolledTableParams] =
    useState<Paginated.Params>({
      pageIndex: 1,
      perPage: 10,
    })

  const { pageIndex, perPage } = enrolledTableParams

  const { data: courses } = useGetCourses({
    pageIndex,
    perPage,
    isEnrolled: true,
  })

  const onChangeEnrolledTableParams = useCallback(
    (updatedParams: Partial<Paginated.Params>) => {
      return setEnrolledTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  return (
    <>
      {courses && courses?.data.length > 0 && (
        <>
          <div className="relative w-full">
            <Search className="text-muted-foreground pointer-events-none absolute left-2 top-2.5 h-4 w-4" />
            <Input
              placeholder="Qual curso você procura?"
              className="w-80 pl-9"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {courses?.data.map((course) => (
              <CourseEnrolled key={course.id} course={course} />
            ))}
          </div>

          <Pagination
            meta={courses.meta}
            onChangeParams={onChangeEnrolledTableParams}
          />
        </>
      )}

      {!courses?.data.length && (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            Você ainda não está inscrito em nenhum curso.
          </p>

          <Link href="/panel/course/catalog">
            <Button>Ver cursos</Button>
          </Link>
        </div>
      )}
    </>
  )
}
