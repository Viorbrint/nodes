import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}
  create({ name }: CreateTagDto) {
    return this.prismaService.tag.create({
      data: { name },
      include: { notes: true },
    });
  }

  findAll() {
    return this.prismaService.tag.findMany({ include: { notes: true } });
  }

  findOne(id: number) {
    return this.prismaService.tag.findUnique({
      where: { id },
      include: { notes: true },
    });
  }

  update(id: number, { name }: UpdateTagDto) {
    return this.prismaService.tag.update({
      where: { id },
      data: { name },
      include: { notes: true },
    });
  }

  remove(id: number) {
    return this.prismaService.tag.delete({
      where: { id },
      include: { notes: true },
    });
  }
}
