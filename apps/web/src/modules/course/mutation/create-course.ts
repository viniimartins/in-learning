import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/service/api'

import type { ICourseDTO } from '../model'

interface CreateCourseParams {
  course: ICourseDTO
}

async function createCourse({ course }: CreateCourseParams) {
  const { data } = await api.post('/courses', course)

  return data
}

export { createCourse }

function useCreateCourse() {
  return useMutation({
    mutationKey: ['create-course'],
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success('Curso criado com sucesso')
    },
    onError: () => {
      toast.error('Erro ao criar o curso')
    },
  })
}

export { useCreateCourse }
