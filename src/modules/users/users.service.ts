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

  async update(id: UUID, updateUserInput: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserInput);
  }

  async remove(id: UUID) {
    await this.userRepository.remove(id);
  }
}
