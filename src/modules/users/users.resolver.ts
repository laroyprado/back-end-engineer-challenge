import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'node:crypto';
import { User } from 'src/graphql';
import { ValidateUserIdGuard } from './guards/validate-id.guard';
import { UseGuards } from '@nestjs/common';
import { VerifyEmailDuplicityGuard } from './guards/verify-email.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerifyUserPermissionGuard } from './guards/verify-permission.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(VerifyEmailDuplicityGuard)
  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserDto) {
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, VerifyUserPermissionGuard)
  @Query('user')
  findOne(@Args('id') id: UUID): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(
    JwtAuthGuard,
    VerifyUserPermissionGuard,
    ValidateUserIdGuard,
    VerifyEmailDuplicityGuard,
  )
  @Mutation('updateUser')
  update(
    @Args('id') id: UUID,
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @UseGuards(JwtAuthGuard, VerifyUserPermissionGuard, ValidateUserIdGuard)
  @Mutation('removeUser')
  softDelete(@Args('id') id: UUID) {
    return this.usersService.softDelete(id);
  }
}
