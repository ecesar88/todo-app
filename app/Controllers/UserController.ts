import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatus } from 'App/Lib/Api/enums/http-status.enum'
import {
  CreateUserSchema,
  UserSchema,
  UpdateUserSchema,
} from 'App/Lib/Api/schemas/model/UserSchema'

export default class UserController {
  public async get({ response: res }: HttpContextContract) {
    const users = await prisma.user.findMany()

    return res.status(HttpStatus.OK).send(users.map((user) => UserSchema.parse(user)))
  }

  public async create({ response: res, request: req }: HttpContextContract) {
    const user = await CreateUserSchema.parseAsync(req.body())

    const createdUser = await prisma.user.create({
      data: user,
    })

    return res.status(HttpStatus.CREATED).send(createdUser)
  }

  public async findOne({ response: res, params: { id } }: HttpContextContract) {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    })

    return res.status(HttpStatus.OK).send(user)
  }

  public async update({ response: res, request: req, params: { id } }: HttpContextContract) {
    const dataToUpdate = await UpdateUserSchema.parseAsync(req.body())

    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: dataToUpdate!,
    })

    return res.status(HttpStatus.OK).send(user)
  }

  public async delete({ response: res, params: { id } }: HttpContextContract) {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    })

    return res.status(HttpStatus.NO_CONTENT)
  }
}
