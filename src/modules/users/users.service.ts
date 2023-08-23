import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'node:crypto';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: UUID) {
    return `This action returns a #${id} user`;
  }

  update(id: UUID, updateUserInput: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: UUID) {
    return `This action removes a #${id} user`;
  }
}
