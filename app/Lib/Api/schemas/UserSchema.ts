import { z } from 'zod'

export const GetUserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string().nullable(),
})

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
})
