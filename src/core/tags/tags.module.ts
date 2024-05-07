import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ComplexPrismaQueryModule } from '../complex-prisma-query/complex-prisma-query.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [PrismaModule, ComplexPrismaQueryModule],
})
export class TagsModule {}
