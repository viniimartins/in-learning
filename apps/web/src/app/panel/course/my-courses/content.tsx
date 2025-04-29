'use client'

import { useCallback, useState } from 'react'

import Pagination from '@/components/pagination'
import type { Paginated } from '@/helpers/paginated'
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

  const { data: courses } = useGetCourses({
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

      {courses?.meta && (
        <Pagination
          meta={courses.meta}
          onChangeParams={onChangeMyCoursesTableParams}
        />
      )}
    </>
  )
}
