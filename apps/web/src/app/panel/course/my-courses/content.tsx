'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'

import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import type { Paginated } from '@/helpers/paginated'
import type { ICourse } from '@/modules/course'
import { useGetCourses } from '@/modules/course/query/get-course'

import CourseInstructor from './course-instructor'

export default function Content() {
  const [myCoursesTableParams, setMyCoursesTableParams] =
    useState<Paginated.Params>({
      pageIndex: 1,
      perPage: 10,
      isInstructor: true,
    })

  const { pageIndex, perPage, isInstructor } = myCoursesTableParams

  const { data: courses } = useGetCourses<ICourse>({
    pageIndex,
    perPage,
    isInstructor,
  })

  const onChangeMyCoursesTableParams = useCallback(
    (updatedParams: Partial<Paginated.Params>) => {
      return setMyCoursesTableParams((state) => ({
        ...state,
        ...updatedParams,
      }))
    },
    [],
  )

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {courses?.data.map((course) => {
          const { id } = course

          return <CourseInstructor key={id} course={course} />
        })}
      </div>

      {!courses?.data.length && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            Você ainda não cadastrou nenhum curso na plataforma.
          </p>

          <Link href="/panel/course/create">
            <Button>Cadastrar curso</Button>
          </Link>
        </div>
      )}

      {courses && courses?.data.length > 0 && (
        <Pagination
          meta={courses.meta}
          onChangeParams={onChangeMyCoursesTableParams}
        />
      )}
    </>
  )
}
