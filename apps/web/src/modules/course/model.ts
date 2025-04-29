import type { IBaseEntity } from '@/helpers/base-entity'

interface ILesson extends IBaseEntity {
  courseId: string
  lessonProgress: []
  title: string
  videoUrl: string
}

interface ICourseProgress extends IBaseEntity {
  userId: string
  courseId: string
  completed: boolean
}

interface IInstructor extends IBaseEntity {
  name: string
  email: string
  avatarUrl: string
}

interface ICourse extends IBaseEntity {
  title: string
  description: string
  subtitle: string
  slug: string
  studentCount: number
  instructorId: string
  lessons: ILesson[]
  courseProgress: ICourseProgress[]
  instructor: IInstructor
}

interface ICourseDTO {
  title: string
  description: string
  subtitle: string
  slug: string
  lessons: {
    title: string
    videoUrl: string
  }[]
}

export type { ICourse, ICourseDTO, ILesson }
