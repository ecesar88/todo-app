import { User } from '@prisma/client'
import { UserModel } from 'Database/prisma/zod'
import { z } from 'zod'
import { atLeastOneDefined } from '../atLeastOneDefined'

export type UserWithoutId = Omit<User, 'id'>

export const UserSchema = UserModel.extend({
  email: z.string().email(),
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
})

export const UpdateUserSchema = UserSchema.omit({
  id: true,
})
  .partial()
  .refine(atLeastOneDefined, {
    message: 'One of the fields must be defined',
  })
