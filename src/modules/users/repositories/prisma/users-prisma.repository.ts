import { User } from 'src/graphql';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UsersRepository } from '../users.repository';
import { Injectable } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: UUID): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async update(id: UUID, updateUserInput: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async remove(id: UUID): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
