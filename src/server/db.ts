import "server-only"
import { PrismaClient } from '@prisma/client';

import { env } from "../env.mjs";

const globalForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined;
};

export const db =
  globalForPrisma.db ??
  new PrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.db = db;
