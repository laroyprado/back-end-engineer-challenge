import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { CreateUserInput } from '../../../graphql';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcrypt';

export class CreateUserDto implements CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(127)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsUrl()
  @IsOptional()
  avatarURL?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(127)
  company: string;
}
