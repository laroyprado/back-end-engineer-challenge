import { User, UserToValidate } from 'src/graphql';
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
      include: { company: true },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      include: { company: true },
    });
  }

  async findOne(id: UUID): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: { company: true },
    });
  }

  async findByEmail(email: string): Promise<UserToValidate> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async update(id: UUID, { company, ...data }: UpdateUserDto): Promise<User> {
    if (company) {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...data,
          company: {
            connectOrCreate: {
              where: { name: company },
              create: { name: company },
            },
          },
        },
        include: { company: true },
      });
    }
    return await this.prismaService.user.update({
      where: { id },
      data,
      include: { company: true },
    });
  }

  async softDelete(id: UUID): Promise<void> {
    await this.prismaService.user.delete({ where: { id } });
  }
}
