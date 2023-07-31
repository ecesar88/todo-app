import { PrismaClient } from '@prisma/client'
import { runUserSeed } from './users.seed'

async function runSeeds() {
  const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty',
  })

  await runUserSeed(prisma)
}

runSeeds()
