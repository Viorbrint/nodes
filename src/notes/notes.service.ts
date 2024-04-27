import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  create(createNoteDto: CreateNoteDto) {
    return this.prismaService.note.create({ data: createNoteDto });
  }

  async findAll({ page = 1, limit = 10 }: { page: number; limit: number }) {
    const skip = limit * (page - 1);

    const [total, data] = await Promise.all([
      this.prismaService.note.count(),
      this.prismaService.note.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      pagination: {
        limit,
        total,
        page,
        totalPages,
        prevPage: page === 1 ? null : page - 1,
        nextPage: page === totalPages ? null : page + 1,
      },
      data,
    };
  }

  findOne(id: number) {
    return this.prismaService.note.findUnique({ where: { id } });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.prismaService.note.update({
      data: updateNoteDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prismaService.note.delete({ where: { id } });
  }
}
