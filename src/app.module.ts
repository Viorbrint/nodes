import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './core/auth/auth.module';
import { ComplexPrismaQueryModule } from './core/complex-prisma-query/complex-prisma-query.module';
import { ComplexPrismaQueryService } from './core/complex-prisma-query/complex-prisma-query.service';
import { NotesModule } from './core/notes/notes.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { PrismaService } from './core/prisma/prisma.service';
import { UsersModule } from './core/users/users.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';

@Module({
  providers: [
    PrismaService,
    ComplexPrismaQueryService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    PrismaModule,
    NotesModule,
    ComplexPrismaQueryModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
