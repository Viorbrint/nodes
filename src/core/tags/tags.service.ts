import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}
  async create({ name }: CreateTagDto) {
    return this.prismaService.tag.create({
      data: { name },
      include: { notes: true },
    });
  }

  async findAll() {
    const tags = await this.prismaService.tag.findMany({
      include: { notes: true },
    });

    if (!tags.length) {
      throw new NotFoundException(`No tags found.`);
    }

    return tags;
  }

  async findOne(id: number) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id },
      include: { notes: true },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with id = ${id} does not exist.`);
    }

    return tag;
  }

  async update(id: number, { name }: UpdateTagDto) {
    await this.findOne(id);

    return this.prismaService.tag.update({
      where: { id },
      data: { name },
      include: { notes: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prismaService.tag.delete({
      where: { id },
      include: { notes: true },
    });
  }
}
