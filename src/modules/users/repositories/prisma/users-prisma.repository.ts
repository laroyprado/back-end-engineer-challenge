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
    return await this.prismaService.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: UUID): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: UUID, updateUserInput: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  async remove(id: UUID): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
