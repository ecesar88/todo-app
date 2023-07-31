import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpStatus } from 'App/Lib/Api/enums/http-status.enum'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import {
  CreateTodoSchema,
  TodoSchema,
  UpdateTodoSchema,
} from 'App/Lib/Api/schemas/model/TodoSchema'

export default class TodoController {
  public async get({ response: res }: HttpContextContract) {
    const todos = await prisma.todo.findMany()

    return res.status(HttpStatus.OK).send(todos.map((user) => TodoSchema.parse(user)))
  }

  public async create({ response: res, request: req }: HttpContextContract) {
    const todo = await CreateTodoSchema.parseAsync(req.body())

    const createdTodo = await prisma.todo.create({
      data: todo,
    })

    return res.status(HttpStatus.CREATED).send(createdTodo)
  }

  public async findOne({ response: res, params: { id } }: HttpContextContract) {
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
      },
    })

    return res.status(HttpStatus.OK).send(todo)
  }

  public async update({ response: res, request: req, params: { id } }: HttpContextContract) {
    const dataToUpdate = await UpdateTodoSchema.parseAsync(req.body())

    const todo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: dataToUpdate!,
    })

    return res.status(HttpStatus.OK).send(todo)
  }

  public async delete({ response: res, params: { id } }: HttpContextContract) {
    await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    })

    return res.status(HttpStatus.NO_CONTENT)
  }
}
