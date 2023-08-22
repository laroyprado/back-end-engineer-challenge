import { PrismaClient } from '@prisma/client'
import { prismaService } from 'src/db/prisma.service'

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prismaService,
};
