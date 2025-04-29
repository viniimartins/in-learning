'use client'

import { useGetCourses } from '@/modules/course/query/get-course'

import CourseInstructor from './course-instructor'

export default function Content() {
  const { data: courses } = useGetCourses({
    pageIndex: 1,
    perPage: 10,
    isInstructor: true,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {courses?.data.map((course) => <CourseInstructor key={course.id} />)}
    </div>
  )
}
