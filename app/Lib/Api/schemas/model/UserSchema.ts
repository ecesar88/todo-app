import { User } from '@prisma/client'
import { UserModel } from 'Database/prisma/zod'

export type UserWithoutId = Omit<User, 'id'>

export const UserSchema = UserModel

export const CreateUserSchema = UserSchema.omit({
  id: true,
})

export const UpdateUserSchema = UserSchema.omit({
  id: true,
}).optional()
