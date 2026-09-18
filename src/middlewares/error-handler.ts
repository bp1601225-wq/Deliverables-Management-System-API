import type { ErrorRequestHandler } from 'express'
import { Prisma } from '@prisma/client'
import type { AppError } from '../types/express.js'

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  const appError = error as AppError

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    response.status(409).json({
      success: false,
      message: 'A user with that email already exists',
    })
    return
  }

  const statusCode = appError.statusCode ?? 500
  response.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Something went wrong' : appError.message,
  })
}
