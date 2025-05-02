import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import type { QueryKeyProps } from '@/helpers/queryKeyProps'
import { queryClient } from '@/lib/react-query'
import { api } from '@/service/api'

import type { ICourse } from '../model'

type Course = Pick<ICourse, 'id'>

interface Params {
  course: Course
}
async function exclude({ course }: Params) {
  const { data } = await api.delete(`/courses/${course.id}`)

  return data
}

function useDeleteCourse({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['delete-course'],
    mutationFn: exclude,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })

      toast.success('Curso deletado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao deletar curso')
    },
  })
}

export { useDeleteCourse }
