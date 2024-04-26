import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { NotesModule } from './notes/notes.module';

@Module({
  providers: [PrismaService],
  imports: [PrismaModule, NotesModule],
})
export class AppModule {}
