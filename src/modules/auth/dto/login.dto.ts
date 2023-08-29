import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginUserInput } from 'src/graphql';

export class LoginDto implements LoginUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
