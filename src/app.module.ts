import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { NotesModule } from './notes/notes.module';
import { ComplexPrismaQueryService } from './complex-prisma-query/complex-prisma-query.service';
import { ComplexPrismaQueryModule } from './complex-prisma-query/complex-prisma-query.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [PrismaService, ComplexPrismaQueryService],
  imports: [
    PrismaModule,
    NotesModule,
    ComplexPrismaQueryModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
