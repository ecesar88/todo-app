import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import chalk from 'chalk'

export default class LogRequest {
  public async handle({ request, response: res }: HttpContextContract, next: () => Promise<void>) {
    const requestMethod = request.method()
    const requestEndpoint = request.parsedUrl.pathname
    const clientIP = request.ip()

    const logMethod = (requestStatus: number) => {
      const blackHex = '#000'
      const yellowHex = '#ffe600'
      const orangeHex = '#ff8800'

      const logString = () => {
        let spcQty = Math.floor('DELETE'.length - requestMethod.length)
        if (spcQty % 2 !== 0) spcQty--

        const spcString = Array(spcQty / 2)
          .fill(' ')
          .join('')

        return `[ ${spcString}${requestMethod}${spcString} ]`
      }

      if (requestStatus >= 100 && requestStatus < 200) {
        return chalk.bgCyan.hex(blackHex).bold(logString())
      } else if (requestStatus >= 200 && requestStatus < 300) {
        return chalk.bgGreen.hex(blackHex).bold(logString())
      } else if (requestStatus >= 400 && requestStatus < 500) {
        return chalk.bgHex(orangeHex).hex(blackHex).bold(logString())
      } else {
        return chalk.bgRedBright.hex(yellowHex).bold(logString())
      }
    }

    res.response.on('finish', () => {
      const requestStatus = res.getStatus() ?? 0

      Logger.info(
        `${chalk.yellowBright(`[Middleware.${LogRequest.name}]`)} :: ${logMethod(
          requestStatus
        )} > ${chalk.yellowBright(`HTTP ${requestStatus}`)} on ${chalk.green(
          requestEndpoint
        )} from ${chalk.green(clientIP)}`
      )
    })

    await next()
  }
}
