import * as z from 'zod'
import { CompleteUser, RelatedUserModel } from './index'

export const TodoModel = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string().nullish(),
  done: z.boolean(),
  userId: z.number().int().nullish(),
})

export interface CompleteTodo extends z.infer<typeof TodoModel> {
  User?: CompleteUser | null
}

/**
 * RelatedTodoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTodoModel: z.ZodSchema<CompleteTodo> = z.lazy(() =>
  TodoModel.extend({
    User: RelatedUserModel.nullish(),
  })
)
