'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { Paginated } from '@/helpers/paginated'
import { api } from '@/service/api'

async function get<T>(params: Paginated.Params) {
  const { data } = await api.get<Paginated.Response<T>>('/courses', {
    params,
  })

  return data
}

export function useGetCourses<T>(params: Paginated.Params) {
  const queryKey = ['get-courses', params]

  const query = useQuery({
    queryKey,
    queryFn: () => get<T>(params),
  })

  const { isError } = query

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao buscar os cursos')
    }
  }, [isError])

  return { ...query, queryKey }
}
