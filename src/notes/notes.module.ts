import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ComplexPrismaQueryModule } from 'src/complex-prisma-query/complex-prisma-query.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [PrismaModule, ComplexPrismaQueryModule],
})
export class NotesModule {}
