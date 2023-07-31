/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Prisma } from '@prisma/client'
import { HttpStatus } from 'App/Lib/Api/enums/http-status.enum'
import { ZodError } from 'zod'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(exception: any, ctx: HttpContextContract) {
    if (exception.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(HttpStatus.NOT_FOUND).json({
        status: HttpStatus.NOT_FOUND,
        message: `Route not found`,
      })
    }

    if (exception instanceof ZodError) {
      switch ((exception as ZodError).name) {
        case 'ZodError': {
          return ctx.response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            message: `ValidationError`,
            errors: (exception as ZodError).issues.map(({ code, message, path, fatal }) => ({
              code,
              message,
              fatal,
              field: path.join(', '),
            })),
          })
        }
      }
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch ((exception as Prisma.PrismaClientKnownRequestError).code) {
        case 'P2025': {
          return ctx.response.status(HttpStatus.NOT_FOUND).json({
            message: `Record to delete does not exist`,
          })
        }

        case 'P2002': {
          const constraintFields = exception.meta?.target as string[]

          return ctx.response.status(HttpStatus.CONFLICT).json({
            message: `Failed to create resource due to unique violation error on one or more fields`,
            fields: constraintFields.map((field) => field),
          })
        }
        default: {
          return ctx.response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
          })
        }
      }
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(exception, ctx)
  }

  public async report(error: any, ctx: HttpContextContract) {
    if (!this.shouldReport(error)) {
      return
    }

    if (typeof error.report === 'function') {
      error.report(error, ctx)
      return
    }

    if (error instanceof ZodError) {
      Logger.error(`ValidationError: ${ZodError.name} ${JSON.stringify(error, null, 2)}`)
      return
    }

    Logger.error(error)
  }
}
