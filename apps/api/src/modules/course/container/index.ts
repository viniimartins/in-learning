import type {
  ICompleteCourseRepository,
  IEnrollCourseRepository,
} from '@modules/course//repositories'
import {
  COMPLETE_COURSE_REPOSITORY_TOKEN,
  CREATE_COURSE_REPOSITORY_TOKEN,
  DELETE_COURSE_REPOSITORY_TOKEN,
  ENROLL_COURSE_REPOSITORY_TOKEN,
  FIND_COURSE_BY_ID_REPOSITORY_TOKEN,
  SEARCH_COURSES_REPOSITORY_TOKEN,
  UPDATE_COURSE_REPOSITORY_TOKEN,
} from '@modules/course/constants'
import { PrismaCourseRepository } from '@modules/course/infra/prisma/repositories/prisma-course-repository'
import {
  ICreateCourseRepository,
  IDeleteCourseRepository,
  IFindCourseByIdRepository,
  ISearchCoursesRepository,
  type IUpdateCourseRepository,
} from '@modules/course/repositories'
import { container } from 'tsyringe'

container.registerSingleton<ICreateCourseRepository>(
  CREATE_COURSE_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
container.registerSingleton<IDeleteCourseRepository>(
  DELETE_COURSE_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)

container.registerSingleton<IUpdateCourseRepository>(
  UPDATE_COURSE_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)

container.registerSingleton<ISearchCoursesRepository>(
  SEARCH_COURSES_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
container.registerSingleton<IFindCourseByIdRepository>(
  FIND_COURSE_BY_ID_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
container.registerSingleton<IEnrollCourseRepository>(
  ENROLL_COURSE_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
container.registerSingleton<ICompleteCourseRepository>(
  COMPLETE_COURSE_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
