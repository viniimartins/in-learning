'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { api } from '@/service/api'

import type { ICourse, ICourseWithInstructor } from '../model'

type Course = Pick<ICourse, 'id'>

interface Props {
  course: Course
}

async function get(courseId: Props['course']['id']) {
  const { data } = await api.get<ICourseWithInstructor>(`/courses/${courseId}`)

  return data
}

export function useGetCourseById({ course }: Props) {
  const queryKey = ['get-course-by-id', course.id]

  const query = useQuery({
    queryKey,
    queryFn: () => get(course.id),
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar o curso')
    }
  }, [isError])

  return { ...query, queryKey }
}
