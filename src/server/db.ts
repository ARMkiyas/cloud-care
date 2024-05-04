import "server-only"
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'


// Singleton pattern for creating an accelerated PrismaClient instance.
const createAcceleratedPrismaClient = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  }).$extends(withAccelerate());
};

type PrismaClientAccelerated = ReturnType<typeof createAcceleratedPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  db: PrismaClientAccelerated | undefined;
};

export const db =
  globalForPrisma.db ??
  createAcceleratedPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;
