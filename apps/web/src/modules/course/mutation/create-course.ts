import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { QueryKeyProps } from '@/helpers/queryKeyProps'
import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'

import type { ICourseDTO } from '../model'

interface Params {
  course: ICourseDTO
}

async function create({ course }: Params) {
  const { data } = await api.post('/courses', course)

  return data
}

function useCreateCourse({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['create-course'],
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })

      toast.success('Curso criado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao criar o curso')
    },
  })
}

export { useCreateCourse }
