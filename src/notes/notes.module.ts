import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [PrismaModule],
})
export class NotesModule {}
