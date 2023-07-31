import { z } from 'zod'
import { User } from '@prisma/client'

export type UserWithoutId = Omit<User, 'id'>

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
})

export const UpdateUserSchema = UserSchema.omit({
  id: true,
}).optional()
