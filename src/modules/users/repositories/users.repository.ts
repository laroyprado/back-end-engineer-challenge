import { User } from 'src/graphql';
import { CreateUserDto } from '../dto/create-user.dto';
import { UUID } from 'node:crypto';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: UUID): Promise<User>;
  abstract update(id: UUID, updateUserInput: UpdateUserDto): Promise<User>;
  abstract remove(id: UUID): Promise<void>;
}
