import { Injectable } from '@nestjs/common';
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

  create(createNoteDto: CreateNoteDto, authorId: number) {
    return this.prismaService.note.create({
      data: { authorId, ...createNoteDto },
    });
  }

  findAll(options: QueryOptions, authorId) {
    return this.complexPrismaQueryService.query(
      this.prismaService.note,
      options,
      authorId,
    );
  }

  findOne(id: number, authorId: number) {
    return this.prismaService.note.findUnique({
      where: {
        id,
        authorId,
      },
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto, authorId: number) {
    return this.prismaService.note.update({
      data: updateNoteDto,
      where: { id, authorId },
    });
  }

  remove(id: number, authorId) {
    return this.prismaService.note.delete({ where: { id, authorId } });
  }
}
