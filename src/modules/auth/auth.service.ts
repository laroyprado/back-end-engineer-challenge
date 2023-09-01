import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);

    if (user) {
      const isValidPassword: boolean = await compare(
        userPassword,
        user.password,
      );

      if (isValidPassword) {
        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
        };
      }
    }

    return null;
  }

  async login(email: string) {
    const user = await this.usersService.findByEmail(email);

    return {
      token: this.jwtService.sign(
        {
          name: `${user.firstName} ${user.lastName}`,
        },
        {
          subject: user.id,
        },
      ),
    };
  }
}
