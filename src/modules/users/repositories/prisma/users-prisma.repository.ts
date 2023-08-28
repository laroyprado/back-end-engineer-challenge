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
      data: {
        ...data,
        company: {
          connectOrCreate: {
            where: { name: data.company },
            create: { name: data.company },
          },
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        avatarURL: true,
        createdAt: true,
        company: true,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: UUID): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: UUID, updateUserInput: UpdateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async remove(id: UUID): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
