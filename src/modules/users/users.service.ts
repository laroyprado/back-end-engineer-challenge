import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'node:crypto';
import { UsersRepository } from './repositories/users.repository';
import { AppError } from 'src/constants/app-error.class';

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
    const user = await this.userRepository.findOne(id);

    if (!user)
      throw new AppError('NotFound', 'User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: UUID, updateUserInput: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserInput);
  }

  async softDelete(id: UUID) {
    await this.userRepository.softDelete(id);
  }
}
