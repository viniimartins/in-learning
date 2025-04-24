import { ZodTypeAny } from 'zod'

interface ValidatorRequest {
  body?: ZodTypeAny
  params?: ZodTypeAny
  querystring?: ZodTypeAny
}

interface ValidatorResponse {
  [statusCode: number]: ZodTypeAny
}

export interface Validator {
  request: ValidatorRequest
  response: ValidatorResponse
}
