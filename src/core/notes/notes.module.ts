import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { ComplexPrismaQueryModule } from '../complex-prisma-query/complex-prisma-query.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [PrismaModule, ComplexPrismaQueryModule],
})
export class NotesModule {}
