import { PrismaClient } from '@prisma/client'

//to avoid the unnecessary creation of new instances of PrismaClient (which create the connection with the db), we will create a singleton instance of PrismaClient and export it for use in our application.
const prismaClientSingleton = () => new PrismaClient()
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
