import * as z from "zod"
import { CompleteTodo, RelatedTodoModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  todos: CompleteTodo[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  todos: RelatedTodoModel.array(),
}))
