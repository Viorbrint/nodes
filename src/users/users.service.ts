import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  findOne(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
