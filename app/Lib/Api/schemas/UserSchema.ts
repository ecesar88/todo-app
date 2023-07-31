import { z } from 'zod'
import { User } from '@prisma/client'

export const GetUserSchema: z.ZodSchema<User> = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
})

export type UserWithoutId = Omit<User, 'id'>

export const CreateUserSchema: z.ZodSchema<UserWithoutId> = z.object({
  email: z.string().email(),
  name: z.string(),
})
