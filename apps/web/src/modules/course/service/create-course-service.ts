import { api } from '@/service/api'

import type { ICourseDTO } from '../domain/course-entity'

interface CreateCourseParams {
  course: ICourseDTO
}

async function createCourse({ course }: CreateCourseParams) {
  const { data } = await api.post('/courses', course)

  return data
}

export { createCourse }
