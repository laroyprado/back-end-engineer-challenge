import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation('loginUser')
  login(@Args('loginUserInput') loginUserInput: LoginDto) {
    return this.authService.login(loginUserInput.email);
  }
}
