import type { IBaseEntity } from '@/types/base-entity'

interface ILesson {
  title: string
  videoUrl: string
}

interface ICourse extends IBaseEntity {
  title: string
  description: string
  subtitle: string
  slug: string
  studentCount: number
  lessons: ILesson[]
}

interface IInstructor extends IBaseEntity {
  name: string
  email: string
  avatarUrl: string
}

interface ICourseDTO {
  title: string
  description: string
  subtitle: string
  slug: string
  lessons: ILesson[]
}

interface ICourseWithInstructor extends ICourse {
  instructor: IInstructor
}

export type { ICourse, ICourseDTO, ICourseWithInstructor }
