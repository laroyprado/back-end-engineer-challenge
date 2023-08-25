import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'node:crypto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserInput: CreateUserDto) {
    return await this.userRepository.create(createUserInput);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: UUID) {
    return await this.userRepository.findOne(id);
  }

  update(id: UUID, updateUserInput: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: UUID) {
    return `This action removes a #${id} user`;
  }
}
