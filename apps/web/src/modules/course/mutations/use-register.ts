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
async function register({ course }: Params) {
  const { data } = await api.post(`/courses/${course.id}/enroll`)

  return data
}

function useEnrolledCourse({ queryKey }: QueryKeyProps) {
  return useMutation({
    mutationKey: ['enrolled-course'],
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })

      toast.success('Inscrição no curso realizada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao inscrever-se no curso')
    },
  })
}

export { useEnrolledCourse }
