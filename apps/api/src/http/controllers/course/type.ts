import type z from 'zod'

import { createCourseBodySchema } from './schema'

export interface Course {
  id: string
  title: string
  slug: string
  subtitle: string
  description: string
  studentCount: number
  instructorId: string
  createdAt: Date
  updatedAt: Date
}

export type CreateCourse = z.infer<typeof createCourseBodySchema>
