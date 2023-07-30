import { z } from 'zod'
import { User } from '@prisma/client'

export const GetUserSchema: z.ZodSchema<User> = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
})

export const CreateUserSchema: z.ZodSchema<Omit<User, 'id'>> = z.object({
  email: z.string().email(),
  name: z.string(),
})
