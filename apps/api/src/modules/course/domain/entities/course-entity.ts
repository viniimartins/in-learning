import type { IBaseEntity } from '@modules/common/domain/entities/base-entity'

interface ILessonEntity {
  title: string
  videoUrl: string
}

interface IStudentCourseEntity {
  courseId: string
  userId: string
}
interface ICourseEntity extends IBaseEntity {
  title: string
  slug: string
  subtitle: string
  description: string
  instructorId: string
}

interface ICourseWithStudentCourseEntity extends ICourseEntity {
  studentCourses?: IStudentCourseEntity[]
}

export {
  ICourseEntity,
  ICourseWithStudentCourseEntity,
  ILessonEntity,
  IStudentCourseEntity,
}
