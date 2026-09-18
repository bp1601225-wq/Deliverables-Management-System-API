import type { ApiResponse } from './api.js'

export type AppError = Error & {
  statusCode?: number
}

export type ErrorResponse = ApiResponse<never>
