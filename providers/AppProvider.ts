import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import prisma from './PrismaClient.provider'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down

    try {
      await prisma.$disconnect()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
}
