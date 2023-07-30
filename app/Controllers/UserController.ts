import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { UserModel } from 'Database/prisma/zod'

export default class UserController {
  public async get(_ctx: HttpContextContract) {
    return prisma.user.findMany()
  }

  public async create(ctx: HttpContextContract) {
    // Validate body
    const user = await UserModel.omit({ id: true }).parseAsync(ctx.request.body())

    await prisma.user.create({
      data: user,
    })
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.request.params()

    await prisma.user.delete({
      where: id,
    })
  }
}
