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

  findAll() {
    return this.prismaService.note.findMany();
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
