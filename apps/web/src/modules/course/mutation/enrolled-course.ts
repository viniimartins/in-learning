import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/service/api'

import type { ICourse } from '../model'

type Course = Pick<ICourse, 'id'>

interface Params {
  course: Course
}
async function enrolled({ course }: Params) {
  const { data } = await api.post(`/courses/${course.id}/enroll`)

  return data
}

function useEnrolledCourse() {
  return useMutation({
    mutationKey: ['enrolled-course'],
    mutationFn: enrolled,
    onSuccess: () => {
      toast.success('Inscrição no curso realizada com sucesso')
    },
    onError: () => {
      toast.error('Erro ao inscrever-se no curso')
    },
  })
}

export { useEnrolledCourse }
