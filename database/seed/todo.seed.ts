import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

export async function runTodoSeed(prisma: PrismaClient) {
  const todos = Array(10)
    .fill(undefined)
    .map(() =>
      prisma.todo.create({
        data: {
          title: faker.airline.airplane().name,
          content: faker.lorem.lines(3),
          done: faker.datatype.boolean(),
          userId: 1,
        },
      })
    )

  await Promise.all(todos)
}
