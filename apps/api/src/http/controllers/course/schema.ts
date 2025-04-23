import z from 'zod'

const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
})

export const createCourseBodySchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  slug: z.string(),
  lessons: z.array(lessonSchema),
})

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  description: z.string(),
  studentCount: z.number(),
  instructorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
