import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GlobalResponseInterceptor {
  public async handle({ response: res }: HttpContextContract, next: () => Promise<void>) {
    res.response.on('finish', () => {})

    await next()
  }
}
