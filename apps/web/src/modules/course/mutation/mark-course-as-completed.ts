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
async function markCourseAsCompleted({ course }: Params) {
  const { data } = await api.post(`/courses/${course.id}/completed`)

  return data
}

function useMarkCourseAsCompleted({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['mark-course-as-completed'],
    mutationFn: markCourseAsCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })

      toast.success('Curso assistido com sucesso')
    },
    onError: () => {
      toast.error('Erro ao marcar curso como assistido')
    },
  })
}

export { useMarkCourseAsCompleted }
