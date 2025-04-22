/* eslint-disable prettier/prettier */
import type { Course, CreateCourse } from '@/http/controllers/course/type'

export interface CreateCourseRepositoryInput
  extends CreateCourse,
  Pick<Course, 'instructorId'> { }
