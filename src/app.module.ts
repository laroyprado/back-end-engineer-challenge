import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  DateTimeResolver,
  EmailAddressResolver,
  JWTResolver,
  UUIDResolver,
  URLResolver,
} from 'graphql-scalars';
import { join } from 'path';
import { UsersModule } from './modules/users/users.module';
import { formatError } from './config/format.error';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      resolvers: {
        DateTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        URL: URLResolver,
        UUID: UUIDResolver,
        JWT: JWTResolver,
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'interface',
        customScalarTypeMapping: {
          DateTime: 'Date',
          EmailAddress: 'string',
          URL: 'string',
          UUID: 'string',
          JWT: 'string',
        },
      },
      csrfPrevention: true,
      formatError,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
