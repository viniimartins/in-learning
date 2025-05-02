import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { ICourseDTO } from '@/modules/course'
import { api } from '@/service/api'

import type { ICourse } from '../model'

interface Params {
  course: ICourseDTO
  id: ICourse['id']
}

async function put({ course, id }: Params) {
  const { data } = await api.put(`/courses/${id}`, course)

  return data
}

export function useUpdateCourse() {
  return useMutation({
    mutationKey: ['update-course'],
    mutationFn: put,
    onSuccess: () => {
      toast.success('Curso atualizado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao atualizar o curso')
    },
  })
}
