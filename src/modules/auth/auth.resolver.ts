import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('loginUser')
  async login(@Args() userCredentials: LoginDto) {
    return this.authService.login(userCredentials.email);
  }
}
