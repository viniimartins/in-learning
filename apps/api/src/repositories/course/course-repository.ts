import type { Course as PrismaCourse } from '@prisma/client'

import type { User } from '@/http/controllers/auth/type'
import type { Course } from '@/http/controllers/course/type'

import type { CreateCourseRepositoryInput } from './types'

export interface CourseRepository {
  create(data: CreateCourseRepositoryInput): Promise<Course | PrismaCourse>
  findById(id: Course['id']): Promise<Course | PrismaCourse | null>
  delete(id: Course['id'], userId: User['id']): Promise<void>
}
