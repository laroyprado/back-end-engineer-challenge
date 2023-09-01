import { User, UserToValidate } from 'src/graphql';
import { CreateUserDto } from '../dto/create-user.dto';
import { UUID } from 'node:crypto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: UUID): Promise<User>;
  abstract findByEmail(email: string): Promise<UserToValidate>;
  abstract update(id: UUID, updateUserInput: UpdateUserDto): Promise<User>;
  abstract softDelete(id: UUID): Promise<void>;
}
