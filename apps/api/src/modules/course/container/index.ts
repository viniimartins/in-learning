import {
  CREATE_COURSE_REPOSITORY_TOKEN,
  DELETE_COURSE_REPOSITORY_TOKEN,
  ENROLL_COURSE_REPOSITORY_TOKEN,
  FIND_COURSE_BY_ID_REPOSITORY_TOKEN,
  MARK_COURSE_AS_COMPLETED_REPOSITORY_TOKEN,
  SEARCH_COURSES_REPOSITORY_TOKEN,
} from '@modules/course/constants'
import { PrismaCourseRepository } from '@modules/course/infra/prisma/repositories/prisma-course-repository'
import {
  ICreateCourseRepository,
  IDeleteCourseRepository,
  IFindCourseByIdRepository,
  ISearchCoursesRepository,
} from '@modules/course/repositories'
import { container } from 'tsyringe'

import type { IEnrollCourseRepository } from '../repositories/enroll-course-repository'
import type { IMarkCourseAsCompletedRepository } from '../repositories/mark-course-as-completed-repository'

container.registerSingleton<ICreateCourseRepository>(
  CREATE_COURSE_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
container.registerSingleton<IDeleteCourseRepository>(
  DELETE_COURSE_REPOSITORY_TOKEN,
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
container.registerSingleton<IMarkCourseAsCompletedRepository>(
  MARK_COURSE_AS_COMPLETED_REPOSITORY_TOKEN,
  PrismaCourseRepository,
)
