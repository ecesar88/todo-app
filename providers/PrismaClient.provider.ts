import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['info', 'query'],
  errorFormat: 'pretty',
})

export default prisma
