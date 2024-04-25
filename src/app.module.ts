import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  providers: [PrismaService],
  imports: [PrismaModule],
})
export class AppModule {}
