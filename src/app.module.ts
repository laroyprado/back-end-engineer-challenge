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
import { context } from './config/context';

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
      context,
    }),
  ],
})
export class AppModule {}
