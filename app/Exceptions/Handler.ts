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
import { HttpStatus } from 'App/Lib/Public/enums/http-status.enum'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(exception: any, ctx: HttpContextContract) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch ((exception as Prisma.PrismaClientKnownRequestError).code) {
        case 'P2025': {
          return ctx.response.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            message: `Record to delete does not exist`,
          })
        }

        case 'P2002': {
          const constraintFields = exception.meta?.target as string[]

          return ctx.response.status(HttpStatus.CONFLICT).json({
            statusCode: HttpStatus.CONFLICT,
            message: `Failed to create resource due to unique violation error on one or more fields`,
            fields: constraintFields.map((field) => field),
          })
        }
        default: {
          return ctx.response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
          })

          /**
           * Forward rest of the exceptions to the parent class
           */
          // return super.handle(exception, ctx) - don't know what this is for yet
        }
      }
    }
  }
}
