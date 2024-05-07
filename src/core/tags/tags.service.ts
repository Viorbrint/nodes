import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async create({ name }: CreateTagDto, authorId: number) {
    if (await this.existByName(name, authorId)) {
      throw new NotFoundException(`This tag already exists.`);
    }

    return this.prismaService.tag.create({
      data: { name, authorId },
      include: { notes: true },
    });
  }

  async findAll(authorId: number) {
    const tags = await this.prismaService.tag.findMany({
      where: { authorId },
      include: { notes: true },
    });

    if (!tags.length) {
      throw new NotFoundException(`No tags found.`);
    }

    return tags;
  }

  async findOne(id: number, authorId: number) {
    const tag = await this.prismaService.tag.findUnique({
      where: { id, authorId },
      include: { notes: true },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with id = ${id} does not exist.`);
    }

    return tag;
  }

  async update(id: number, { name }: UpdateTagDto, authorId: number) {
    if (!(await this.existById(id, authorId))) {
      throw new NotFoundException(`Can't update a tag that doesn't exist.`);
    }

    return this.prismaService.tag.update({
      where: { id, authorId },
      data: { name },
      include: { notes: true },
    });
  }

  async remove(id: number, authorId: number) {
    if (!(await this.existById(id, authorId))) {
      throw new NotFoundException(`Can't delete a tag that doesn't exist.`);
    }

    return this.prismaService.tag.delete({
      where: { id, authorId },
      include: { notes: true },
    });
  }

  private async existById(id: number, authorId: number): Promise<boolean> {
    const tag = await this.prismaService.tag.findUnique({
      where: { id, authorId },
    });

    return tag ? true : false;
  }

  private async existByName(name: string, authorId: number): Promise<boolean> {
    const tag = await this.prismaService.tag.findUnique({
      where: { name, authorId },
    });

    return tag ? true : false;
  }
}
