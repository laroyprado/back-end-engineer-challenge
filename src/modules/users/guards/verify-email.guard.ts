import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { AppError } from 'src/constants/app-error.class';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';
import { UUID } from 'node:crypto';

type tUserDataRequest =
  | {
      createUserInput: CreateUserInput;
    }
  | {
      id: UUID;
      updateUserInput: UpdateUserInput;
    };

@Injectable()
export class VerifyEmailDuplicityGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userDataRequest: tUserDataRequest = context
      .switchToHttp()
      .getResponse();

    const userDataKey = Object.keys(userDataRequest).find(
      key => key === 'createUserInput' || key === 'updateUserInput',
    );

    if (userDataRequest[userDataKey].email) {
      const user = await this.usersService.findByEmail(
        userDataRequest[userDataKey].email,
      );

      if (user)
        throw new AppError(
          'Conflict',
          'Email already exists',
          HttpStatus.CONFLICT,
        );
    }

    return true;
  }
}
