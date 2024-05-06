import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ComplexPrismaQueryService } from '../complex-prisma-query/complex-prisma-query.service';
import { PrismaService } from '../prisma/prisma.service';
import { QueryOptions } from 'src/common/interfaces/query-options.interface';

@Injectable()
export class NotesService {
  constructor(
    private prismaService: PrismaService,
    private complexPrismaQueryService: ComplexPrismaQueryService,
  ) {}

  create({ tags, ...data }: CreateNoteDto, authorId: number) {
    return this.prismaService.note.create({
      data: {
        authorId,
        ...data,
        tags: tags
          ? {
              connectOrCreate: tags.map(({ name }) => ({
                where: { name },
                create: { name },
              })),
            }
          : {},
      },
      include: { tags: true },
    });
  }

  async findAll(options: QueryOptions, authorId) {
    const result = await this.complexPrismaQueryService.query(
      this.prismaService.note,
      options,
      authorId,
    );

    if (!result.data.length) {
      throw new NotFoundException(`No notes found matching your request.`);
    }

    return result;
  }

  async findOne(id: number, authorId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id,
        authorId,
      },
      include: { tags: true },
    });

    if (!note) {
      throw new NotFoundException(`Note with id = ${id} does not exist.`);
    }

    return note;
  }

  async update(id: number, { tags, ...data }: UpdateNoteDto, authorId: number) {
    await this.findOne(id, authorId);

    return this.prismaService.note.update({
      data: {
        ...data,
        tags: tags
          ? {
              connectOrCreate: tags.map(({ name }) => ({
                where: { name },
                create: { name },
              })),
            }
          : {},
      },
      where: { id, authorId },
      include: { tags: true },
    });
  }

  async remove(id: number, authorId) {
    await this.findOne(id, authorId);

    return this.prismaService.note.delete({
      where: { id, authorId },
      include: { tags: true },
    });
  }
}
