import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createCourse } from '../../service/create-course-service'

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
