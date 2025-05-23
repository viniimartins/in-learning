import { SearchCoursesUseCase } from '@modules/course/use-cases/search-courses-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { z } from 'zod'

class SearchCoursesController {
  static route = ''

  static validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(10),
        search: z
          .string()
          .optional()
          .transform((value) => (value && value !== '' ? value : undefined)),
        isInstructor: z.coerce.boolean().optional().default(false),
        isEnrolled: z.coerce.boolean().optional().default(false),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            subtitle: z.string(),
            description: z.string(),
            slug: z.string(),
            studentCount: z.number(),
            instructorId: z.string().uuid(),
            createdAt: z.date(),
            updatedAt: z.date(),
            lessons: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                videoUrl: z.string(),
                courseId: z.string().uuid(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
            instructor: z
              .object({
                id: z.string().uuid(),
                name: z.string().nullable(),
                email: z.string(),
                avatarUrl: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
              .optional(),
            progress: z.array(z.any()).optional(),
          }),
        ),
        meta: z.object({
          pageIndex: z.number(),
          perPage: z.number(),
          total: z.number(),
          totalPages: z.number(),
        }),
      }),
    },
  }

  static async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user

    const {
      query: { pageIndex, perPage, search, isInstructor, isEnrolled },
    } = {
      query: SearchCoursesController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchCoursesUseCase = container.resolve(SearchCoursesUseCase)
    const found = await searchCoursesUseCase.execute({
      pageIndex,
      perPage,
      search,
      isInstructor,
      instructorId: sub,
      isEnrolled,
      userId: sub,
    })

    return reply.status(200).send(found)
  }
}

export { SearchCoursesController }
