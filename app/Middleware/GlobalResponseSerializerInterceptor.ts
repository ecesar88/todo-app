import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatus } from 'App/Lib/Api/enums/http-status.enum'

export type ResponseObject = { meta: { status: number; success: boolean }; data?: any }

export default class GlobalResponseSerializerInterceptor {
  public async handle({ response: res }: HttpContextContract, next: () => Promise<void>) {
    // Reference:
    // https://stackoverflow.com/questions/56648926/modify-response-body-before-res-send-executes-in-expressjs
    // https://stackoverflow.com/questions/54526179/node-js-difference-between-http-finish-event-response-close-event-and-respons
    //

    const originalResSend = res.send

    const modifyResponse = (body: Record<string, any> | any[]) => {
      const wasRequestSuccessfull = res.response.statusCode < HttpStatus.INTERNAL_SERVER_ERROR

      let response: ResponseObject = {
        meta: {
          status: res.response.statusCode,
          success: wasRequestSuccessfull,
        },
      }

      if (wasRequestSuccessfull) {
        response.data = body ?? []
      } else {
        response = { ...response, ...body }
      }

      return response
    }

    // Intercept and modify response
    res.send = function () {
      arguments[0] = modifyResponse(arguments[0])
      // (body: any, generateEtag?: boolean | undefined) => void
      originalResSend.apply(res, [arguments[0], arguments[1]])
    }

    await next()
  }
}
