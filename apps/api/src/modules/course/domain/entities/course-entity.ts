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

export { ICourseEntity, ILessonEntity }
