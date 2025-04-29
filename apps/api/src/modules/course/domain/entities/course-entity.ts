import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'

interface ILessonEntity {
  title: string
  videoUrl: string
}

interface ICourseEntity extends IBaseEntity {
  title: string
  slug: string
  subtitle: string
  description: string
  instructorId: string
}

interface IStudentCourseEntity {
  courseId: string
  userId: string
  progress: number
  completed: boolean
}

export { ICourseEntity, ILessonEntity, IStudentCourseEntity }
