import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import type { Validator } from '@/modules/common/helpers/valitador'
import { makeSearchCoursesUseCase } from '@/modules/course/use-cases/factories/make-search-courses-use-case'

class SearchCoursesController {
  static route = ''

  static validator: Validator = {
    request: {
      querystring: z.object({
        pageIndex: z.coerce.number().min(1).default(1),
        perPage: z.coerce.number().min(1).max(50).default(10),
        search: z
          .string()
          .optional()
          .transform((value) => (value && value !== '' ? value : undefined)),
      }),
    },
    response: {
      200: z.object({
        data: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            image: z.string(),
            slug: z.string(),
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
    console.log(request.user)

    const {
      query: { pageIndex, perPage, search },
    } = {
      query: SearchCoursesController.validator.request.querystring?.parse(
        request.query,
      ),
    }

    const searchCoursesUseCase = makeSearchCoursesUseCase()
    const found = await searchCoursesUseCase.execute({
      pageIndex,
      perPage,
      search,
    })

    return reply.status(200).send(found)
  }
}

export { SearchCoursesController }
