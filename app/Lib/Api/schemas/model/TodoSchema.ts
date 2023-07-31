import { Todo } from '@prisma/client'
import { TodoModel } from 'Database/prisma/zod'

export type TodoWithoutId = Omit<Todo, 'id'>

export const TodoSchema = TodoModel

export const CreateTodoSchema = TodoModel.omit({
  id: true,
})

export const UpdateTodoSchema = TodoModel.omit({
  id: true,
}).optional()
