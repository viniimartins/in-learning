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
async function completed({ course }: Params) {
  const { data } = await api.post(`/courses/${course.id}/completed`)

  return data
}

function useCompletedCourse({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['completed-course'],
    mutationFn: completed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })

      toast.success('Curso concluído com sucesso')
    },
    onError: () => {
      toast.error('Erro ao concluir curso')
    },
  })
}

export { useCompletedCourse }
