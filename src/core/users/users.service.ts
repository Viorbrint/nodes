import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findOne(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }
}
