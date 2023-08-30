import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UUID } from 'node:crypto';
import { AppError } from 'src/constants/app-error.class';

@Injectable()
export class ValidateUserIdGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id: userId }: { id: UUID } = context.switchToHttp().getResponse();

    const user = await this.usersService.findOne(userId);

    if (!user)
      throw new AppError('NotFound', 'User not found', HttpStatus.NOT_FOUND);

    return true;
  }
}
