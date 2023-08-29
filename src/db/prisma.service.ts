import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { handleUserSoftDelete } from './middlewares/soft-delete.middleware';
import { handleLogger } from './middlewares/logger.middleware';
import { handleUserQueries } from './middlewares/user-queries.middleware';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'beforeExit'>
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
    this.$use(this.userSoftDeleteMiddleware);
    this.$use(this.filterActiveDeletedUsersMiddleware);
  }

  loggerMiddleware: Prisma.Middleware = handleLogger;

  userSoftDeleteMiddleware: Prisma.Middleware = handleUserSoftDelete;

  filterActiveDeletedUsersMiddleware: Prisma.Middleware = handleUserQueries;

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
