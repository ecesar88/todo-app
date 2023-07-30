import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GlobalResponseSerializerInterceptor {
  public async handle({ response: res }: HttpContextContract, next: () => Promise<void>) {
    res.response.on('finish', () => {
      console.log(res.getBody())
      // TODO - Serialize with DTO-like validaton and data stripping
    })

    // https://stackoverflow.com/questions/54526179/node-js-difference-between-http-finish-event-response-close-event-and-respons

    await next()
  }
}
