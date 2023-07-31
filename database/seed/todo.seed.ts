import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

export async function runTodoSeed(prisma: PrismaClient) {
  const todos = Array(20)
    .fill(undefined)
    .map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        },
      })
    )

  await Promise.all(todos)
}
