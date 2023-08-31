import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { UUID } from 'node:crypto';
import { AppError } from 'src/constants/app-error.class';

@Injectable()
export class VerifyUserPermissionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authenticatedUserId: UUID = context.switchToHttp().getNext().req
      .user.id;

    const { id }: { id: UUID } = context.switchToHttp().getResponse();

    if (authenticatedUserId !== id)
      throw new AppError(
        'Forbidden',
        'You cannot access data from another user',
        HttpStatus.FORBIDDEN,
      );

    return true;
  }
}
