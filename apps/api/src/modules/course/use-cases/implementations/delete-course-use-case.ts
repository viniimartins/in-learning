import type {
  IDeleteCourse,
  IDeleteCourseUseCase,
} from '../../domain/use-cases/delete-course-use-case'
import type { IDeleteCourseRepository } from '../../repositories/delete-course-repository'
import type { IFindCourseByIdRepository } from '../../repositories/find-course-by-id-repository'

export class DeleteCourseUseCase implements IDeleteCourseUseCase {
  private readonly deleteCourseRepository: IDeleteCourseRepository
  private readonly findCourseByIdRepository: IFindCourseByIdRepository

  constructor(
    deleteCourseRepository: IDeleteCourseRepository,
    findCourseByIdRepository: IFindCourseByIdRepository,
  ) {
    this.deleteCourseRepository = deleteCourseRepository
    this.findCourseByIdRepository = findCourseByIdRepository
  }

  async execute(
    params: IDeleteCourse.Request,
  ): Promise<IDeleteCourse.Response> {
    const course = await this.findCourseByIdRepository.findById({
      id: params.id,
    })

    if (!course) {
      throw new Error('Course not found')
    }

    await this.deleteCourseRepository.delete({
      id: params.id,
    })
  }
}
