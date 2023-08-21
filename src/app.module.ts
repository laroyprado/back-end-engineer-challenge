import { Module } from '@nestjs/common';
import { ModulesModule } from './user/modules/modules.module';
import { ModulesModule } from './users/modules/modules.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ModulesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
