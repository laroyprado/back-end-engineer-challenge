import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AppError } from 'src/constants/app-error.class';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: any, user: any, info: any) {
    console.log(err, user, info);

    if (err || info) {
      const error = info.toString().split(': ');

      throw new AppError(error[0], error[1], HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
