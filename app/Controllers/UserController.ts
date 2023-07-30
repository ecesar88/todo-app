import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatus } from 'App/Lib/Api/enums/http-status.enum'
import { CreateUserSchema, GetUserSchema } from 'App/Lib/Api/schemas/UserSchema'

export default class UserController {
  public async get({ response: res }: HttpContextContract) {
    const users = await prisma.user.findMany()

    return res.status(HttpStatus.OK).send(users.map((user) => GetUserSchema.parse(user)))
  }

  public async create({ response: res, request: req }: HttpContextContract) {
    const user = await CreateUserSchema.parseAsync(req.body())

    const createdUser = await prisma.user.create({
      data: user,
    })

    return res.status(HttpStatus.CREATED).send(createdUser)
  }

  public async findOne({ response: res, params }: HttpContextContract) {
    const id = Number(params.id)

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    return res.status(HttpStatus.CREATED).send(user)
  }

  public async delete({ response: res, params }: HttpContextContract) {
    const id = Number(params.id)

    await prisma.user.delete({
      where: {
        id,
      },
    })

    return res.status(HttpStatus.NO_CONTENT)
  }
}
