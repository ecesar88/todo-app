import { Todo } from '@prisma/client'
import { TodoModel } from 'Database/prisma/zod'
import { atLeastOneDefined } from '../atLeastOneDefined'

export type TodoWithoutId = Omit<Todo, 'id'>

export const TodoSchema = TodoModel

export const CreateTodoSchema = TodoModel.omit({
  id: true,
})

export const UpdateTodoSchema = TodoModel.omit({
  id: true,
})
  .partial()
  .refine(atLeastOneDefined, {
    message: 'One of the fields must be defined',
  })
