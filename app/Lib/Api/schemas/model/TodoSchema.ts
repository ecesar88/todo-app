import { z } from 'zod'
import { Todo } from '@prisma/client'

export type TodoWithoutId = Omit<Todo, 'id'>

export const TodoSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
})

export const CreateTodoSchema = TodoSchema.omit({
  id: true,
})

export const UpdateTodoSchema = TodoSchema.omit({
  id: true,
}).optional()
