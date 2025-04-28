import type { IBaseEntity } from '@/types/base-entity'

interface ILesson {
  title: string
  videoUrl: string
}

interface ICourse extends IBaseEntity {
  title: string
  description: string
  subTitle: string
  slug: string
  studentCount: number
  lessonds: ILesson[]
}

interface ICourseDTO {
  title: string
  description: string
  subTitle: string
  slug: string
  lessons: ILesson[]
}

export type { ICourse, ICourseDTO }
