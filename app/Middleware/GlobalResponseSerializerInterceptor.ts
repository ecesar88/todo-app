import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GlobalResponseSerializerInterceptor {
  public async handle({ response: res }: HttpContextContract, next: () => Promise<void>) {
    // Reference:
    // https://stackoverflow.com/questions/56648926/modify-response-body-before-res-send-executes-in-expressjs
    // https://stackoverflow.com/questions/54526179/node-js-difference-between-http-finish-event-response-close-event-and-respons

    const originalResSend = res.send

    const modifyResponse = (body: any) => {
      const wasRequestSuccessfull = res.response.statusCode >= 200 && res.response.statusCode <= 300

      let response: { meta: { status: number; success: boolean }; data?: any } = {
        meta: {
          status: res.response.statusCode,
          success: res.response.statusCode >= 200 && res.response.statusCode <= 300,
        },
      }

      if (wasRequestSuccessfull) {
        response.data = body
      } else {
        response = { ...response, ...body }
      }

      return response
    }

    res.send = function () {
      arguments[0] = modifyResponse(arguments[0])
      // (body: any, generateEtag?: boolean | undefined) => void
      originalResSend.apply(res, [arguments[0], arguments[1]])
    }

    await next()
  }
}
