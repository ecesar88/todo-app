import { PrismaClient } from '@prisma/client'
import { runUserSeed } from './users.seed'
import { runTodoSeed } from './todo.seed'

async function runSeeds() {
  const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty',
  })

  await runUserSeed(prisma)
  await runTodoSeed(prisma)
}

runSeeds()
