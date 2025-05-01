'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { Loading } from '@/components/loading'
import Pagination from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Paginated } from '@/helpers/paginated'
import { useDeleteCourse } from '@/modules/course/mutation/delete-course'
import { useGetCourses } from '@/modules/course/query/get-course'

import { CourseInstructor } from './course-instructor'

export default function Content() {
  const [myCoursesTableParams, setMyCoursesTableParams] =
    useState<Paginated.Params>({
      pageIndex: 1,
      perPage: 10,
      isInstructor: true,
    })

  const { pageIndex, perPage, isInstructor } = myCoursesTableParams

  const {
    data: courses,
    queryKey,
    isLoading,
  } = useGetCourses({
    pageIndex,
    perPage,
    isInstructor,
  })

  const { mutate: deleteCourse } = useDeleteCourse({
    queryKey,
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
            {courses?.data.map((course) => {
              const { id } = course

              return (
                <CourseInstructor
                  key={id}
                  course={course}
                  handleDeleteCourse={() => deleteCourse({ course: { id } })}
                />
              )
            })}
          </div>

          <Pagination
            meta={courses.meta}
            onChangeParams={onChangeMyCoursesTableParams}
          />
        </>
      )}

      {!courses?.data.length && !isLoading && (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">
            Você ainda não cadastrou nenhum curso na plataforma.
          </p>

          <Link href="/panel/course/create">
            <Button>Cadastrar curso</Button>
          </Link>
        </div>
      )}

      {isLoading && <Loading />}
    </>
  )
}
